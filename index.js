/**
 * Host half of the file annotator bundle.
 *
 * The Client editor saves through one session command so the write stays on the
 * ordinary Harness file path: the session's sandbox policy decides whether the
 * mutation is allowed, and the same version guard the filesystem tools use
 * prevents a stale editor buffer from clobbering a newer file.
 */

const SAVE_COMMAND = 'file-annotate-save'

/** Largest editor buffer accepted by the save command, in characters. */
const MAX_SAVE_CHARS = 200_000

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
