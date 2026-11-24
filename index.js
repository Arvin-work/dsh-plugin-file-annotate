/**
 * Host half of the file annotator bundle.
 *
 * The Client editor saves through one session command so the write stays on the
 * ordinary Harness file path: the session's sandbox policy decides whether the
 * mutation is allowed, and the same version guard the filesystem tools use
 * prevents a stale editor buffer from clobbering a newer file.
 *
 * Annotations travel through Plan B: the Client posts one prepared annotation
 * message to a same-origin route, and this Host half appends it as a frozen
 * user-role context message to the very next model step of that exact session.
 * The pending entry is consumed once; a session that never sends again simply
 * lets it expire.
 */

import { createUserMessage } from '@deepseek-ai/dsh-llm'

const SAVE_COMMAND = 'file-annotate-save'

/** Largest editor buffer accepted by the save command, in characters. */
const MAX_SAVE_CHARS = 200_000

/** Same-origin Host route that accepts one pending annotation message. */
const PENDING_PATH = '/file-annotate/pending'

/** Same-origin Host route that reports the one-shot state of a pending message. */
const PENDING_STATUS_PATH = '/file-annotate/pending/status'

/**
 * Durable message-source kind written for injected annotation context. The Chat
 * projection renders unknown kinds as an injected context row, and `form` picks
 * its structural presentation (`notice`), so no core package must know us.
 */
const CONTEXT_SOURCE_KIND = 'file-annotate'

/** Largest annotation message accepted from the Client, in characters. */
const MAX_MESSAGE_CHARS = 100_000

/** Largest request body accepted, in bytes; covers a 100k code-point message. */
const MAX_BODY_BYTES = 512 * 1024

/** Bound on sessions that may hold a pending message at once. */
const MAX_PENDING_SESSIONS = 64

/** Bound on recently consumed request ids retained for status polls. */
const MAX_CONSUMED_REQUESTS = 256

/** How long an unconsumed pending message stays eligible for injection. */
const PENDING_TTL_MS = 30 * 60 * 1000

/** How long a consumed request id stays queryable through the status route. */
const CONSUMED_TTL_MS = 30 * 60 * 1000

/** Session and request ids are opaque tokens, never paths or length-unbounded text. */
const ID_PATTERN = /^[A-Za-z0-9._:-]{1,200}$/

export const inject = ['commands', 'fs', 'sandboxPolicy']

export function apply(ctx) {
  ctx.effect(
    () =>
      ctx.commands.register({
        name: SAVE_COMMAND,
        description: 'Persist edits made in the right sidebar file annotator',
        recordInput: false,
        handler: (invocation) => save(ctx, invocation),
      }),
    'file-annotate: save command',
  )

  const annotations = new PendingAnnotations()

  // Appended after the accepted user message, before any runtime context that
  // later pre-step listeners add. `prepend` mirrors dsh-session-reference: run
  // before other listeners, then post-process their final decision.
  ctx.on('agent/pre-step', (payload, next) => injectPending(ctx, annotations, payload, next), {
    prepend: true,
  })

  // The Host half also runs in compositions without a Web listener (Electron
  // serves its UI over file:// + IPC). Optional injection keeps the save
  // command alive there; on the Web GUI the two routes mount when webServer
  // activates, and unmount with it.
  ctx.inject(['webServer'], (webCtx) => {
    const webServer = webCtx.webServer
    webCtx.effect(
      () =>
        webServer.register({
          kind: 'exact',
          path: PENDING_PATH,
          handler: (req, res) => handlePendingRoute(ctx, webServer, annotations, req, res),
        }),
      'file-annotate: pending annotation route',
    )
    webCtx.effect(
      () =>
        webServer.register({
          kind: 'exact',
          path: PENDING_STATUS_PATH,
          handler: (req, res) => handleStatusRoute(ctx, webServer, annotations, req, res),
        }),
      'file-annotate: pending annotation status route',
    )
  })
}

/**
 * One-shot queue of annotation messages, at most one per session.
 *
 * A duplicate POST for the same request id is an idempotent retry. A POST with
 * a new request id replaces the old pending entry; the old id becomes unknown
 * rather than consumed, so a stale poll can never clear cards that were never
 * delivered. Both maps are bounded and time-pruned because the routes are
 * reachable by any page on this origin.
 */
class PendingAnnotations {
  #pending = new Map()
  #consumed = new Map()

  /** Store or replace the pending message for one session. */
  put(sessionId, requestId, message, now = Date.now()) {
    this.#prune(now)
    this.#pending.delete(sessionId)
    this.#pending.set(sessionId, { sessionId, requestId, message, createdAt: now })
    while (this.#pending.size > MAX_PENDING_SESSIONS) {
      const oldest = this.#pending.keys().next().value
      this.#pending.delete(oldest)
    }
  }

  /** Read the live pending entry for one session without consuming it. */
  find(sessionId, now = Date.now()) {
    this.#prune(now)
    const entry = this.#pending.get(sessionId)
    if (entry === undefined) return undefined
    if (now - entry.createdAt > PENDING_TTL_MS) {
      this.#pending.delete(sessionId)
      return undefined
    }
    return entry
  }

  /** Consume exactly this entry; a newer replacement is left untouched. */
  consume(entry, now = Date.now()) {
    if (this.#pending.get(entry.sessionId) === entry) this.#pending.delete(entry.sessionId)
    this.#markConsumed(entry.sessionId, entry.requestId, now)
  }

  /** Withdraw one request id before any step claims it; returns whether it was pending. */
  cancel(sessionId, requestId, now = Date.now()) {
    this.#prune(now)
    const entry = this.#pending.get(sessionId)
    if (entry === undefined || entry.requestId !== requestId) return false
    this.#pending.delete(sessionId)
    return true
  }

  /** Classify one request id as pending, consumed, or unknown. */
  status(sessionId, requestId, now = Date.now()) {
    this.#prune(now)
    const entry = this.#pending.get(sessionId)
    if (entry !== undefined && entry.requestId === requestId) return 'pending'
    if (this.#consumed.has(consumedKey(sessionId, requestId))) return 'consumed'
    return 'unknown'
  }

  #markConsumed(sessionId, requestId, now) {
    const key = consumedKey(sessionId, requestId)
    this.#consumed.delete(key)
    this.#consumed.set(key, now)
    while (this.#consumed.size > MAX_CONSUMED_REQUESTS) {
      const oldest = this.#consumed.keys().next().value
      this.#consumed.delete(oldest)
    }
  }

  #prune(now) {
    for (const [sessionId, entry] of this.#pending) {
      if (now - entry.createdAt > PENDING_TTL_MS) this.#pending.delete(sessionId)
    }
    for (const [key, at] of this.#consumed) {
      if (now - at > CONSUMED_TTL_MS) this.#consumed.delete(key)
    }
  }
}

function consumedKey(sessionId, requestId) {
  return `${sessionId}\u0000${requestId}`
}

function isSubagentSession(session) {
  const header = session?.header
  if (header === undefined || header === null) return false
  return header.origin === 'subagent' || header.parentSession !== undefined
}

function isInjectedContext(message, requestId) {
  const source = message?.source
  return (
    source?.kind === CONTEXT_SOURCE_KIND &&
    typeof source.requestId === 'string' &&
    source.requestId === requestId
  )
}

/**
 * Append the session's pending annotation message after its next accepted user
 * message. Runs after `next()` so other pre-step listeners have finished
 * rewriting the decision; a rejection, an aborted turn, an empty batch, or any
 * failure leaves the pending entry intact for a later step.
 */
async function injectPending(ctx, annotations, payload, next) {
  const decision = await next()
  try {
    if (decision.kind === 'reject') return decision
    const { agent, signal } = payload
    if (signal?.aborted === true) return decision
    const session = agent?.session
    const sessionId = session?.id
    if (typeof sessionId !== 'string' || sessionId === '') return decision
    if (isSubagentSession(session)) return decision
    const entry = annotations.find(sessionId)
    if (entry === undefined) return decision
    if (!Array.isArray(decision.messages)) return decision
    const userIndex = decision.messages.findLastIndex(
      (message) => message?.source?.kind === 'user',
    )
    if (userIndex === -1) return decision
    if (decision.messages.some((message) => isInjectedContext(message, entry.requestId))) {
      annotations.consume(entry)
      return decision
    }
    // createUserMessage gives the context a stable id and deep-freezes it, the
    // same immutable shape the loop commits for every accepted user message.
    const context = createUserMessage({
      source: {
        kind: CONTEXT_SOURCE_KIND,
        form: 'notice',
        version: 1,
        requestId: entry.requestId,
      },
      content: [{ type: 'text', text: entry.message }],
    })
    const messages = [
      ...decision.messages.slice(0, userIndex + 1),
      context,
      ...decision.messages.slice(userIndex + 1),
    ]
    annotations.consume(entry)
    ctx.logger.debug(
      'file-annotate: injected %d characters into session %s',
      entry.message.length,
      sessionId,
    )
    return { ...decision, messages }
  } catch (error) {
    ctx.logger.warn(error)
    return decision
  }
}

/**
 * POST /file-annotate/pending — {sessionId, requestId, message} → {ok: true}.
 * The entry stays pending until an agent/pre-step consumes it; this route never
 * injects or consumes by itself.
 *
 * DELETE /file-annotate/pending?sessionId=…&requestId=… is the Client's
 * withdrawal of an entry it no longer expects to send. It never removes a
 * different request id.
 */
async function handlePendingRoute(ctx, webServer, annotations, req, res) {
  try {
    if (!isSameOriginRequest(req, webServer)) return sendJson(res, 403, { ok: false, error: 'forbidden' })
    if (req.method === 'DELETE') {
      const { sessionId, requestId } = readQueryIds(req)
      const cancelled = annotations.cancel(sessionId, requestId)
      return sendJson(res, 200, { ok: true, cancelled })
    }
    if (req.method !== 'POST') return sendMethodNotAllowed(res, 'POST, DELETE')
    if (mediaTypeOf(req) !== 'application/json') {
      return sendJson(res, 415, { ok: false, error: 'unsupported_media_type' })
    }
    const payload = await readJsonBody(req, MAX_BODY_BYTES)
    const { sessionId, requestId, message } = validatePendingPayload(payload)
    rejectSubagentTarget(ctx, sessionId)
    annotations.put(sessionId, requestId, message)
    return sendJson(res, 200, { ok: true })
  } catch (error) {
    return failRoute(ctx, res, error)
  }
}

/**
 * GET /file-annotate/pending/status?sessionId=…&requestId=… →
 * {ok, state: 'pending'|'consumed'|'unknown', pending, consumed}.
 */
async function handleStatusRoute(ctx, webServer, annotations, req, res) {
  try {
    if (!isSameOriginRequest(req, webServer)) return sendJson(res, 403, { ok: false, error: 'forbidden' })
    if (req.method !== 'GET') return sendMethodNotAllowed(res, 'GET')
    const { sessionId, requestId } = readQueryIds(req)
    const state = annotations.status(sessionId, requestId)
    return sendJson(res, 200, {
      ok: true,
      state,
      pending: state === 'pending',
      consumed: state === 'consumed',
    })
  } catch (error) {
    return failRoute(ctx, res, error)
  }
}

/**
 * Same-origin fence for both routes, mirroring the shipped `/api` policy in
 * `dsh-client-connection`: the Host header must name this loopback (or bound)
 * listener, a cross-site fetch marker is refused, and any attached Origin must
 * carry exactly that authority. Requests without an Origin (curl, tests, a
 * same-origin GET) pass the authority check.
 */
function isSameOriginRequest(req, webServer) {
  const host = req.headers.host
  if (typeof host !== 'string' || host === '') return false
  if (req.headers['sec-fetch-site'] === 'cross-site') return false
  const protocol = webServer.protocol === 'https:' ? 'https:' : 'http:'
  let hostUrl
  try {
    hostUrl = new URL(`${protocol}//${host}`)
  } catch {
    return false
  }
  const hostname = hostUrl.hostname.toLowerCase()
  if (!isLoopbackHostname(hostname) && hostname !== boundHostname(webServer.host)) return false
  const origin = req.headers.origin
  if (origin === undefined) return true
  try {
    const originUrl = new URL(origin)
    if (originUrl.protocol !== 'http:' && originUrl.protocol !== 'https:') return false
    return originUrl.host === hostUrl.host
  } catch {
    return false
  }
}

function isLoopbackHostname(hostname) {
  if (hostname === 'localhost' || hostname === '[::1]') return true
  const parts = hostname.split('.')
  return (
    parts.length === 4 &&
    parts[0] === '127' &&
    parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255)
  )
}

function boundHostname(host) {
  const zoneAt = host.indexOf('%')
  const address = zoneAt === -1 ? host : host.slice(0, zoneAt)
  return (address.includes(':') ? `[${address}]` : address).toLowerCase()
}

function mediaTypeOf(req) {
  const contentType = req.headers['content-type']
  if (typeof contentType !== 'string') return undefined
  return contentType.split(';', 1)[0].trim().toLowerCase()
}

function isValidId(value) {
  return typeof value === 'string' && ID_PATTERN.test(value)
}

/** Read the required sessionId/requestId query pair from one route request. */
function readQueryIds(req) {
  const url = new URL(req.url ?? PENDING_PATH, 'http://localhost')
  const sessionId = url.searchParams.get('sessionId')
  const requestId = url.searchParams.get('requestId')
  if (!isValidId(sessionId) || !isValidId(requestId)) {
    throw new HttpError(400, 'invalid_payload')
  }
  return { sessionId, requestId }
}

function validatePendingPayload(payload) {
  if (payload === null || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new HttpError(400, 'invalid_payload')
  }
  const { sessionId, requestId, message } = payload
  if (!isValidId(sessionId) || !isValidId(requestId)) throw new HttpError(400, 'invalid_payload')
  if (typeof message !== 'string' || message.trim() === '') throw new HttpError(400, 'invalid_payload')
  if (message.length > MAX_MESSAGE_CHARS) throw new HttpError(413, 'too_large')
  return { sessionId, requestId, message }
}

/** Reject only a target we can positively identify as a subagent session. */
function rejectSubagentTarget(ctx, sessionId) {
  const agents = ctx.get('agents')
  if (agents === undefined) return
  const agent = agents.get(sessionId)
  if (agent !== undefined && isSubagentSession(agent.session)) {
    throw new HttpError(404, 'unknown_session')
  }
}

async function readJsonBody(req, limitBytes) {
  const declared = req.headers['content-length']
  if (typeof declared === 'string' && declared !== '') {
    const length = Number(declared)
    if (!Number.isFinite(length) || length < 0) throw new HttpError(400, 'invalid_payload')
    if (length > limitBytes) throw new HttpError(413, 'too_large')
  }
  const chunks = []
  let total = 0
  for await (const chunk of req) {
    total += chunk.length
    if (total > limitBytes) {
      req.destroy()
      throw new HttpError(413, 'too_large')
    }
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  let payload
  try {
    payload = JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw new HttpError(400, 'invalid_payload')
  }
  return payload
}

function failRoute(ctx, res, error) {
  if (error instanceof HttpError) {
    return sendJson(res, error.status, { ok: false, error: error.code })
  }
  ctx.logger.warn(error)
  if (res.headersSent) {
    res.destroy()
    return undefined
  }
  return sendJson(res, 500, { ok: false, error: 'internal' })
}

function sendMethodNotAllowed(res, allow) {
  res.writeHead(405, {
    allow,
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  res.end(JSON.stringify({ ok: false, error: 'method_not_allowed' }))
}

function sendJson(res, status, body) {
  const text = JSON.stringify(body)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(text),
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  })
  res.end(text)
}

class HttpError extends Error {
  constructor(status, code) {
    super(code)
    this.status = status
    this.code = code
  }
}

/**
 * @param {import('@deepseek-ai/dsh-commands').CommandInvocation} invocation
 */
async function save(ctx, { agent, rawInput, signal }) {
  let payload
  try {
    payload = JSON.parse(rawInput.trim())
  } catch {
    return { kind: 'error', text: 'invalid_payload' }
  }
  if (payload === null || typeof payload !== 'object') {
    return { kind: 'error', text: 'invalid_payload' }
  }
  const { path, content, version } = payload
  if (typeof path !== 'string' || path === '' || typeof content !== 'string') {
    return { kind: 'error', text: 'invalid_payload' }
  }
  if (content.length > MAX_SAVE_CHARS) return { kind: 'error', text: 'too_large' }

  const policy = ctx.sandboxPolicy.resolve({ session: agent.session })
  if (policy.mode === 'read-only') return { kind: 'error', text: 'FS_SANDBOX_DENIED' }

  const expected =
    typeof version === 'string' && version !== ''
      ? { kind: 'replaceIfVersion', version }
      : undefined

  try {
    const target = await ctx.fs.resolve(path, {
      cwd: agent.session.header.cwd,
      signal,
    })
    await ctx.fs.writeText(target, content, expected, signal, policy)
    return { kind: 'success', text: `saved ${target.displayPath}` }
  } catch (error) {
    return { kind: 'error', text: error?.code ?? 'save_failed' }
  }
}
