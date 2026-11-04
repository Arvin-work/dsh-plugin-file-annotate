window.__ModuleLoader__.load({
  id: '@local/dsh-plugin-file-annotate',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const NS = 'fileAnnotate'
    const TYPE_ID = '@local/dsh-plugin-file-annotate/editor'
    const KIND = 'file-annotate'
    const TREE_ID = '@local/dsh-plugin-file-annotate/tree'
    const TREE_KIND = 'file-annotate-tree'
    const TREE_STORE_PREFIX = 'dsh.file-annotate.tree.v1:'
    const WORKSPACE_STORE_PREFIX = 'dsh.file-annotate.workspace.v2:'
    const TREE_MAX_WATCHES = 64
    const STORAGE_PREFIX = 'dsh.file-annotate.v1:'
    const ANNOTATION_DELETED_PREFIX = 'dsh.file-annotate.deleted.v1:'
    const MAX_PAGES = 20
    const MAX_SAVE_CHARS = 200000
    const MAX_QUOTE_CHARS = 4000

    const PATTERNS = [
      '*.ts', '*.tsx', '*.mts', '*.cts', '*.js', '*.jsx', '*.mjs', '*.cjs',
      '*.json', '*.jsonc', '*.md', '*.markdown', '*.mdx', '*.txt', '*.log',
      '*.py', '*.rb', '*.go', '*.rs', '*.java', '*.kt', '*.kts', '*.scala',
      '*.c', '*.h', '*.cc', '*.cpp', '*.hpp', '*.cs', '*.php', '*.swift',
      '*.sh', '*.bash', '*.zsh', '*.fish', '*.ps1', '*.lua', '*.pl', '*.r',
      '*.css', '*.scss', '*.sass', '*.less', '*.html', '*.htm', '*.xml',
      '*.svg', '*.yml', '*.yaml', '*.toml', '*.ini', '*.conf', '.env*',
      '*.sql', '*.graphql', '*.gql', '*.proto', '*.vue', '*.svelte', '*.astro',
      '*.dart', '*.ex', '*.exs', '*.erl', '*.hs', '*.clj', '*.cljs', '*.zig',
      '*.properties', '*.gradle', '*.cmake', '*.mk',
      '.gitignore', '.dockerignore', '.editorconfig', '.npmrc', '.prettierrc',
      'README', 'README.*', 'LICENSE', 'LICENSE.*', 'CHANGELOG*', 'Makefile', 'Dockerfile',
    ]

    const zh = {
      'type.label': '文件批注',
      'guide.title': '文件批注',
      'action.annotate': '批注选中',
      'action.preview': '在预览中打开',
      'action.mdPreview': '预览',
      'review.submit': '提交',
      'review.submitHint': '把本文件批注加入对话输入框，不会直接发送',
      'review.clear': '清除',
      'review.clearHint': '清除本文件的全部批注',
      'review.confirmClear': '清除本文件的全部批注？此操作不可撤销。',
      'review.stale': '原文已改动，无法定位到原批注',
      'review.staged': '已加入对话输入框，全部批注已清除',
      'review.clearAll': '全部清除',
      'review.clearAllHint': '清除当前会话所有文件的批注',
      'review.confirmClearAll': '清除当前会话所有文件的批注？此操作不可撤销。',
      'review.clearedAll': '已清除全部批注',
      'review.label': '批注导航',
      'review.staleBadge': '原文已改',
      'review.prev': '上一条批注',
      'review.next': '下一条批注',
      'review.noComposer': '当前会话没有可用的输入框',
      'mode.label': '模式',
      'mode.annotate': '批注',
      'mode.edit': '编辑',
      'mode.annotateHint': '选中文本直接出现批注框',
      'mode.editHint': '正常选中与编辑；需要时点“批注选中”',
      'composer.publish': '发布批注',
      'composer.placeholder': '添加批注…',
      'composer.selected': '已选 {n} 字符',
      'action.annotateFile': '批注此文件',
      'action.reload': '重新加载',
      'action.save': '保存',
      'action.saving': '保存中…',
      'status.lines': '{n} 行',
      'status.selected': '已选 {n} 字符',
      'status.dirty': '未保存',
      'status.truncated': '文件较大，只载入前 {n} 页',
      'status.loading': '正在读取文件…',
      'status.saving': '正在保存…',
      'status.saveOk': '已保存到磁盘',
      'panel.empty': '选中文本后点击“批注选中”，写下你希望怎么改。',
      'composer.suggestionPlaceholder': '可选：写下你期望替换成的内容，智能体会优先照此修改。',
      'composer.cancel': '取消',
      'composer.addSuggestion': '添加建议替换内容',
      'composer.removeSuggestion': '移除建议替换内容',
      'empty.title': '文件批注',
      'empty.body': '从右侧文件树打开一个文本或代码文件，即可在编辑器中选中文本并写批注。',
      'empty.openFiles': '打开文件树',
      'error.loadFailed': '读取文件失败',
      'error.notFound': '文件不存在或已被移动',
      'error.notText': '这不是一个 UTF-8 文本文件',
      'error.tooLarge': '文件超过读取上限',
      'error.notRegular': '目标不是普通文件',
      'error.notAddress': '这个标签页没有关联文件',
      'save.readOnly': '当前会话的文件策略是只读，无法保存。请把会话权限切换为“工作区可写”后重试。',
      'save.stale': '文件已被其他操作修改，请重新加载后再保存。',
      'save.tooLarge': '文件过大，无法从右侧栏直接保存。请让智能体应用这次修改。',
      'save.failed': '保存失败',
      'save.noCommand': '当前配置没有提供保存命令',
      'save.truncated': '文件未完整载入，无法从右侧栏保存。请让智能体应用这次修改。',
      'line.one': '第 {n} 行',
      'line.many': '第 {a}–{b} 行',
      'error.noteRequired': '请先写下修改要求',
      'error.crashed': '批注编辑器加载失败',
      'msg.title': '文件批注 — {file}',
      'msg.item': '{index}. {lines}',
      'msg.quote': '选中内容：',
      'msg.note': '批注：',
      'msg.suggestion': '建议改为：',
      'msg.instruction': '请按以上批注修改 {file}，并保持文件其他部分不变。',
      'msg.truncatedQuote': '（选中内容过长，已截断）',
      'tree.title': '文件树',
      'workspace.title': '打开文件',
      'workspace.description': '浏览工作区并在右侧打开文件',
      'workspace.emptyTitle': '打开文件',
      'workspace.emptyBody': '选择要打开的文件',
      'tree.filter': '筛选文件',
      'tree.show': '显示文件树',
      'tree.hide': '隐藏文件树',
      'tree.hideHint': '点击隐藏文件树；隐藏后点左侧图标恢复',
      'tree.empty': '空目录',
      'tree.noMatch': '没有匹配项',
      'tree.loading': '加载中…',
      'tree.noWorkspace': '当前会话没有工作目录',
      'tree.error': '目录读取失败',
      'tree.refresh': '刷新文件树',
      'tree.useNative': '用原文件树打开',
    }

    const en = {
      'type.label': 'File Annotator',
      'guide.title': 'File Annotator',
      'action.annotate': 'Annotate',
      'action.preview': 'Open preview',
      'action.mdPreview': 'Preview',
      'review.submit': 'Submit',
      'review.submitHint': "Add this file's annotations to the composer draft without sending",
      'review.clear': 'Clear',
      'review.clearHint': 'Clear every annotation in this file',
      'review.confirmClear': 'Clear every annotation in this file? This cannot be undone.',
      'review.stale': 'The source changed; this annotation cannot be located',
      'review.staged': 'Added to the composer draft; all annotations cleared',
      'review.clearAll': 'Clear all',
      'review.clearAllHint': 'Clear annotations in every file of this session',
      'review.confirmClearAll': 'Clear annotations in every file of this session? This cannot be undone.',
      'review.clearedAll': 'All annotations cleared',
      'review.label': 'Annotation navigator',
      'review.staleBadge': 'Source changed',
      'review.prev': 'Previous annotation',
      'review.next': 'Next annotation',
      'review.noComposer': 'No composer is available for the active session',
      'mode.label': 'Mode',
      'mode.annotate': 'Annotate',
      'mode.edit': 'Edit',
      'mode.annotateHint': 'Selecting text opens the annotation box',
      'mode.editHint': 'Normal selection and editing; use Annotate when needed',
      'composer.publish': 'Publish annotation',
      'composer.placeholder': 'Add a note…',
      'composer.selected': '{n} selected',
      'action.annotateFile': 'Annotate this file',
      'action.reload': 'Reload',
      'action.save': 'Save',
      'action.saving': 'Saving…',
      'status.lines': '{n} lines',
      'status.selected': '{n} selected',
      'status.dirty': 'Unsaved',
      'status.truncated': 'Large file: first {n} pages loaded',
      'status.loading': 'Loading file…',
      'status.saving': 'Saving…',
      'status.saveOk': 'Saved to disk',
      'panel.empty': 'Select text and choose Annotate to describe the change you want.',
      'composer.suggestionPlaceholder': 'Optional: write the exact replacement; the agent applies it first.',
      'composer.cancel': 'Cancel',
      'composer.addSuggestion': 'Add suggested replacement',
      'composer.removeSuggestion': 'Remove suggested replacement',
      'empty.title': 'File Annotator',
      'empty.body': 'Open a text or code file from the Files tab, select text in the editor, and write an annotation.',
      'empty.openFiles': 'Open Files',
      'error.loadFailed': 'Could not read the file',
      'error.notFound': 'The file is missing or was moved',
      'error.notText': 'This is not a UTF-8 text file',
      'error.tooLarge': 'The file exceeds the read limit',
      'error.notRegular': 'The target is not a regular file',
      'error.notAddress': 'This tab is not bound to a file',
      'save.readOnly': 'The session file policy is read-only. Switch the session to workspace-write and try again.',
      'save.stale': 'The file changed since it was loaded. Reload it before saving.',
      'save.tooLarge': 'The file is too large to save from the sidebar. Ask the agent to apply the change.',
      'save.failed': 'Save failed',
      'save.noCommand': 'The save command is not available in this profile',
      'save.truncated': 'The file is not fully loaded, so it cannot be saved from the sidebar. Ask the agent to apply the change.',
      'line.one': 'Line {n}',
      'line.many': 'Lines {a}–{b}',
      'error.noteRequired': 'Write an instruction first',
      'error.crashed': 'The annotation editor failed to load',
      'msg.title': 'File annotations — {file}',
      'msg.item': '{index}. {lines}',
      'msg.quote': 'Selected text:',
      'msg.note': 'Annotation:',
      'msg.suggestion': 'Suggested replacement:',
      'msg.instruction': 'Apply the annotations above to {file}, leaving the rest of the file unchanged.',
      'msg.truncatedQuote': '(selection truncated for length)',
      'tree.title': 'File tree',
      'workspace.title': 'Open file',
      'workspace.description': 'Browse the workspace and open a file on the right',
      'workspace.emptyTitle': 'Open file',
      'workspace.emptyBody': 'Choose a file to open',
      'tree.filter': 'Filter files',
      'tree.show': 'Show file tree',
      'tree.hide': 'Hide file tree',
      'tree.hideHint': 'Click to hide the tree; use the left rail icon to restore',
      'tree.empty': 'Empty folder',
      'tree.noMatch': 'No matches',
      'tree.loading': 'Loading…',
      'tree.noWorkspace': 'This session has no working directory',
      'tree.error': 'Could not read this folder',
      'tree.refresh': 'Refresh file tree',
      'tree.useNative': 'Open the native file tree',
    }

    let runtime = null

    /** Read-only diagnostics exposed through the Cordis inspect channel. */
    const diagnostics = {
      uiVersion: 'p4-fix-2',
      treeType: false,
      treeBody: false,
      treeTitle: false,
      treeRendered: false,
      treeWatchCount: 0,
      treeLastError: null,
      composerBridgeCount: 0,
      autoScheduled: 0,
      autoOpened: 0,
      autoSkipped: [],
      applied: false,
      dictionaries: false,
      tabType: false,
      body: false,
      title: false,
      bodyRendered: false,
      filesAction: false,
      previewAction: false,
      bodyEnv: null,
      lastError: null,
      lastErrorAt: null,
      applyError: null,
      inspectError: null,
    }

    function installDiagnostics(ctx) {
      ctx.inject(['cordisInspect'], (scope) => {
        try {
          scope.effect(
            () =>
              scope.cordisInspect.register({
                manifest: {
                  id: 'fileAnnotate',
                  description:
                    'Read-only diagnostics for the right-sidebar file annotator: registration flags and the last panel error.',
                  methods: [
                    {
                      name: 'status',
                      description: 'Registration flags and the last captured panel error.',
                      inputSchema: {
                        type: 'object',
                        properties: {},
                        additionalProperties: false,
                      },
                      outputSchema: {
                        type: 'object',
                        properties: {},
                        additionalProperties: true,
                      },
                    },
                  ],
                },
                query: async (method, _input, context) => {
                  if (method !== 'status') throw new Error(`unknown fileAnnotate inspect method "${method}"`)
                  const registry = runtime === null ? undefined : runtime.sidebarRightTabs
                  let mounted = null
                  let tabs = null
                  try {
                    const controller = runtime === null ? undefined : runtime.sidebarRight
                    const onScreen = controller === undefined ? undefined : controller.mounted
                    mounted =
                      onScreen !== undefined && typeof onScreen.getSnapshot === 'function'
                        ? onScreen.getSnapshot() ?? null
                        : null
                    const sessionId = mounted ?? (context === undefined ? undefined : context.sessionId)
                    if (
                      controller !== undefined &&
                      typeof controller.tabsIn === 'function' &&
                      sessionId !== undefined
                    ) {
                      tabs = controller.tabsIn(sessionId).map((record) => ({
                        id: record.id,
                        kind: record.kind,
                        title: record.title,
                        contentId: record.contentId,
                      }))
                    }
                  } catch (error) {
                    tabs = { error: String(error?.message ?? error) }
                  }
                  let remote = null
                  try {
                    remote =
                      runtime === null
                        ? null
                        : {
                            ok: runtime.remote !== undefined,
                            workspaceFiles: typeof runtime.remote.workspaceFiles?.read === 'function',
                            commands: typeof runtime.remote.commands?.execute === 'function',
                          }
                  } catch (error) {
                    remote = { error: String(error?.message ?? error) }
                  }
                  let types = null
                  let guide = null
                  let candidates = null
                  try {
                    if (registry !== undefined && typeof registry.active === 'function') {
                      types = registry.active().map((entry) => ({
                        id: entry.definition.id,
                        kind: entry.definition.kind,
                        priority: entry.band,
                      }))
                    }
                  } catch (error) {
                    types = { error: String(error?.message ?? error) }
                  }
                  try {
                    if (registry !== undefined && typeof registry.guide === 'function') {
                      guide = registry.guide().map((entry) => ({
                        id: entry.id,
                        kind: entry.kind,
                        order: entry.order,
                      }))
                    }
                  } catch (error) {
                    guide = { error: String(error?.message ?? error) }
                  }
                  try {
                    if (registry !== undefined && typeof registry.candidates === 'function') {
                      candidates = registry
                        .candidates('dsh-resource://file/session/diag/src/foo.ts')
                        .map((definition) => definition.id)
                    }
                  } catch (error) {
                    candidates = { error: String(error?.message ?? error) }
                  }
                  return { ...diagnostics, mounted, tabs, remote, types, guide, candidates }
                },
              }),
            'file-annotate: diagnostics',
          )
        } catch (error) {
          diagnostics.inspectError = String(error?.message ?? error)
        }
      })
    }

    function apply(ctx) {
      runtime = ctx
      diagnostics.applied = true
      installDiagnostics(ctx)
      const t = ctx.locale.bind(NS)
      ctx.effect(
        () => {
          const dispose = ctx.locale.register(NS, { zh, en })
          diagnostics.dictionaries = true
          return dispose
        },
        'file-annotate: dictionaries',
      )
      ctx.effect(
        () => {
          const dispose = ctx.sidebarRightTabs.register(definition(t))
          diagnostics.tabType = true
          return dispose
        },
        'file-annotate: tab type',
      )
      ctx.effect(
        () =>
          ctx.slots.inject('sidebar.right.pane.tab', () => {
            const dispose = ctx.slots.register(
              { name: 'sidebar.right.pane.tab', key: TYPE_ID, locale: NS },
              Body,
            )
            diagnostics.body = true
            return dispose
          }),
        'file-annotate: tab body',
      )
      ctx.effect(
        () =>
          ctx.slots.inject('sidebar.right.pane.tab.title', () => {
            const dispose = ctx.slots.register(
              { name: 'sidebar.right.pane.tab.title', key: TYPE_ID, locale: NS },
              Title,
            )
            diagnostics.title = true
            return dispose
          }),
        'file-annotate: tab title',
      )
      ctx.effect(
        () => {
          const dispose = ctx.sidebarRightTabs.register(treeDefinition(t))
          diagnostics.treeType = true
          return dispose
        },
        'file-annotate: tree type',
      )
      ctx.effect(
        () =>
          ctx.slots.inject('sidebar.right.pane.tab', () => {
            const dispose = ctx.slots.register(
              { name: 'sidebar.right.pane.tab', key: TREE_ID, locale: NS },
              WorkspaceBody,
            )
            diagnostics.treeBody = true
            return dispose
          }),
        'file-annotate: tree body',
      )
      ctx.effect(
        () =>
          ctx.slots.inject('sidebar.right.pane.tab.title', () => {
            const dispose = ctx.slots.register(
              { name: 'sidebar.right.pane.tab.title', key: TREE_ID, locale: NS },
              TreeTitle,
            )
            diagnostics.treeTitle = true
            return dispose
          }),
        'file-annotate: tree title',
      )
      ctx.effect(
        () =>
          ctx.slots.inject('conversation.composer.dock', () => {
            const dispose = ctx.slots.register(
              {
                name: 'conversation.composer.dock',
                id: 'file-annotate-bridge',
                order: 100,
              },
              ComposerBridge,
            )
            return dispose
          }),
        'file-annotate: composer bridge',
      )
      ctx.effect(
        () =>
          ctx.slots.inject('sidebar.right.tab.document.actions', () => {
            const dispose = ctx.slots.register(
              {
                name: 'sidebar.right.tab.document.actions',
                id: 'file-annotate',
                order: 10,
                locale: NS,
                label: () => t('action.annotate'),
              },
              PreviewAnnotateAction,
            )
            diagnostics.previewAction = true
            return dispose
          }),
        'file-annotate: preview action',
      )
      ctx.effect(
        () =>
          ctx.slots.inject('sidebar.right.tab.files.actions', () => {
            const dispose = ctx.slots.register(
              {
                name: 'sidebar.right.tab.files.actions',
                id: 'file-annotate-open',
                order: 5,
                locale: NS,
                label: () => t('guide.title'),
              },
              FilesAnnotateAction,
            )
            diagnostics.filesAction = true
            return dispose
          }),
        'file-annotate: files action',
      )
    }

    /** Turn the previewed file into an annotator tab from the preview header. */
    function PreviewAnnotateAction({ absolutePath, sessionId, useSessions, t }) {
      const cwd =
        typeof useSessions === 'function'
          ? useSessions((sessions) =>
              sessions === undefined || sessions === null || sessions.byId === undefined
                ? undefined
                : sessions.byId[sessionId]?.cwd,
            )
          : undefined
      if (typeof absolutePath !== 'string' || absolutePath === '') return null
      let path = absolutePath
      if (typeof cwd === 'string' && cwd !== '') {
        const root = cwd.replace(/\/+$/, '')
        if (path === root) path = ''
        else if (path.startsWith(`${root}/`)) path = path.slice(root.length + 1)
      }
      const address = `dsh-resource://file/session/${encodeURIComponent(sessionId)}/${path
        .split('/')
        .map(encodeURIComponent)
        .join('/')}`
      return h(
        'button',
        {
          type: 'button',
          style: {
            appearance: 'none',
            border: '1px solid var(--dsw-alias-border-l1)',
            background: 'transparent',
            color: 'var(--dsw-alias-label-secondary)',
            borderRadius: '6px',
            padding: '3px 6px',
            cursor: 'pointer',
            lineHeight: 1,
            fontSize: '12px',
          },
          title: t('action.annotateFile'),
          'aria-label': t('action.annotateFile'),
          onClick: () => {
            try {
              runtime.sidebarRight.openResource(address, { kind: KIND })
            } catch {
              // Keep the read-only preview when the annotator cannot open.
            }
          },
        },
        '✎',
      )
    }

    /** Compact Files-tab header control that opens the annotator page directly. */
    function FilesAnnotateAction({ t }) {
      return h(
        'button',
        {
          type: 'button',
          style: {
            appearance: 'none',
            border: '1px solid var(--dsw-alias-border-l1)',
            background: 'transparent',
            color: 'var(--dsw-alias-label-secondary)',
            borderRadius: '6px',
            padding: '3px 6px',
            cursor: 'pointer',
            lineHeight: 1,
            fontSize: '12px',
          },
          title: t('guide.title'),
          'aria-label': t('guide.title'),
          onClick: () => {
            try {
              runtime.sidebarRight.openTab(KIND, {})
            } catch {
              // A profile without the right sidebar keeps the Files tab.
            }
          },
        },
        '✎',
      )
    }


    function TreeGuideIcon() {
      return h(
        'svg',
        {
          viewBox: '0 0 24 24',
          width: 18,
          height: 18,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.6,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
        },
        h('path', { d: 'M3 7.5A2.5 2.5 0 0 1 5.5 5h4l2 2h7A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z' }),
        h('path', { d: 'M8 12h8M8 15h5' }),
      )
    }

    function TreeFolderIcon({ open }) {
      return h(
        'svg',
        {
          viewBox: '0 0 16 16',
          width: 14,
          height: 14,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
        },
        open
          ? h('path', { d: 'M2 6.5V5a1.5 1.5 0 0 1 1.5-1.5h3L8 5h4.5A1.5 1.5 0 0 1 14 6.5v.5M2.6 6.5h11.2l-1.1 5.2a1.5 1.5 0 0 1-1.5 1.3H4.4a1.5 1.5 0 0 1-1.5-1.3z' })
          : h('path', { d: 'M2 5.5A1.5 1.5 0 0 1 3.5 4h3L8 5.5h4.5A1.5 1.5 0 0 1 14 7v4.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5z' }),
      )
    }

    function TreeRefreshIcon() {
      return h(
        'svg',
        {
          viewBox: '0 0 16 16',
          width: 14,
          height: 14,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.4,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
        },
        h('path', { d: 'M13 8a5 5 0 1 1-1.5-3.6' }),
        h('path', { d: 'M13 2.5V5h-2.5' }),
      )
    }


    const workspaceTitleListeners = new Set()
    let workspaceTitleAddress = null

    function setWorkspaceTitle(address) {
      const next = typeof address === 'string' && address !== '' ? address : null
      if (next === workspaceTitleAddress) return
      workspaceTitleAddress = next
      for (const listener of workspaceTitleListeners) {
        try {
          listener()
        } catch {
          // A title subscriber must not break the tab strip.
        }
      }
    }

    function useWorkspaceTitle() {
      const [address, setAddress] = React.useState(workspaceTitleAddress)
      React.useEffect(() => {
        const listener = () => setAddress(workspaceTitleAddress)
        workspaceTitleListeners.add(listener)
        setAddress(workspaceTitleAddress)
        return () => workspaceTitleListeners.delete(listener)
      }, [])
      return address
    }

    function TreeTitle({ t }) {
      const selected = useWorkspaceTitle()
      const parsed = selected === null ? null : parseFileAddress(selected)
      const label = parsed === null ? t('workspace.title') : basename(parsed.path)
      return h(
        'span',
        { className: 'dsh-fa-tree-title' },
        h('span', { className: 'dsh-fa-tree-title-icon' }, h(TreeFolderIcon, { open: true })),
        label,
      )
    }

    class TreeBoundary extends React.Component {
      constructor(props) {
        super(props)
        this.state = { error: null }
      }

      static getDerivedStateFromError(error) {
        return { error }
      }

      componentDidCatch(error) {
        diagnostics.treeLastError = String((error && (error.stack || error.message)) || error)
      }

      render() {
        if (this.state.error === null) return this.props.children
        const tr = typeof this.props.t === 'function' ? this.props.t : (key) => key
        return h(
          'div',
          { className: 'dsh-fa-tree' },
          h(StyleTag),
          h('div', { className: 'dsh-fa-tree-note error' }, tr('tree.error')),
          h('pre', { className: 'dsh-fa-tree-error' }, String((this.state.error && this.state.error.message) || this.state.error)),
          h(
            'div',
            { className: 'dsh-fa-tree-fallback-actions' },
            h(
              'button',
              {
                type: 'button',
                className: 'dsh-fa-tree-btn',
                onClick: () => {
                  try {
                    runtime.sidebarRight.openTab('files', { replaceTab: true })
                  } catch {
                    // The native Files tab may be unavailable in this profile.
                  }
                },
              },
              tr('tree.useNative'),
            ),
          ),
        )
      }
    }

    function treeStorageKey(sessionId) {
      return `${TREE_STORE_PREFIX}${sessionId}`
    }

    function loadTreeState(sessionId) {
      try {
        const raw = window.localStorage.getItem(treeStorageKey(sessionId))
        if (raw === null) return { expanded: [], scrollTop: 0 }
        const parsed = JSON.parse(raw)
        if (parsed === null || typeof parsed !== 'object') return { expanded: [], scrollTop: 0 }
        return {
          expanded: Array.isArray(parsed.expanded)
            ? parsed.expanded.filter((value) => typeof value === 'string')
            : [],
          scrollTop: Number.isFinite(parsed.scrollTop) ? parsed.scrollTop : 0,
        }
      } catch {
        return { expanded: [], scrollTop: 0 }
      }
    }

    function saveTreeState(sessionId, state) {
      try {
        window.localStorage.setItem(
          treeStorageKey(sessionId),
          JSON.stringify({ expanded: state.expanded, scrollTop: state.scrollTop }),
        )
      } catch {
        // The tree still works when storage is unavailable.
      }
    }

    function treeRootOf(cwd) {
      if (typeof cwd !== 'string' || cwd === '') return ''
      if (/^[A-Za-z]:[\\/]$/.test(cwd)) return cwd.slice(0, 2)
      return cwd.replace(/[/\\]+$/, '') || '/'
    }

    function treeChildPath(parent, name) {
      return `${String(parent).replace(/[/\\]+$/, '')}/${name}`
    }

    function sortTreeEntries(entries) {
      return [...entries].sort((left, right) => {
        const leftDir = left.type === 'directory' ? 0 : 1
        const rightDir = right.type === 'directory' ? 0 : 1
        if (leftDir !== rightDir) return leftDir - rightDir
        return String(left.name).localeCompare(String(right.name), undefined, {
          sensitivity: 'base',
          numeric: true,
        })
      })
    }

    function fuzzyTreeMatch(name, query) {
      const haystack = String(name).toLowerCase()
      const needle = String(query).toLowerCase()
      if (needle === '' || haystack.includes(needle)) return true
      let index = 0
      for (const char of haystack) {
        if (char === needle[index]) index += 1
        if (index >= needle.length) return true
      }
      return false
    }

    function fileAddressForSession(sessionId, root, absolutePath) {
      let path = String(absolutePath).replace(/\\/g, '/')
      if (typeof root === 'string' && root !== '') {
        const base = root.replace(/\\/g, '/').replace(/[/\\]+$/, '') || (root === '/' ? '' : root)
        if (base !== '' && path === base) path = ''
        else if (base !== '' && path.startsWith(`${base}/`)) path = path.slice(base.length + 1)
      }
      return `dsh-resource://file/session/${encodeURIComponent(sessionId)}/${path
        .split('/')
        .map(encodeURIComponent)
        .join('/')}`
    }

    const TREE_NON_TEXT_EXTENSIONS = new Set(
      'pdf png jpg jpeg gif webp bmp ico doc docx ppt pptx xls xlsx zip gz tar 7z rar wasm exe dmg mp3 mp4 mov avi woff woff2 ttf otf eot'.split(
        ' ',
      ),
    )

    function isTextualName(name) {
      const value = String(name)
      const dot = value.lastIndexOf('.')
      const ext = dot === -1 ? '' : value.slice(dot + 1).toLowerCase()
      return !TREE_NON_TEXT_EXTENSIONS.has(ext)
    }

    const composerBridges = new Map()
    const composerBridgeListeners = new Set()

    function notifyComposerBridges() {
      diagnostics.composerBridgeCount = composerBridges.size
      for (const listener of composerBridgeListeners) {
        try {
          listener()
        } catch {
          // A listener re-render must not break the bridge table.
        }
      }
    }

    function setComposerBridge(sessionId, bridge) {
      composerBridges.set(sessionId, bridge)
      notifyComposerBridges()
    }

    function removeComposerBridge(sessionId, bridge) {
      if (composerBridges.get(sessionId) !== bridge) return
      composerBridges.delete(sessionId)
      notifyComposerBridges()
    }

    function useComposerBridge(sessionId) {
      const [, force] = React.useState(0)
      React.useEffect(() => {
        const listener = () => force((value) => value + 1)
        composerBridgeListeners.add(listener)
        return () => composerBridgeListeners.delete(listener)
      }, [])
      return sessionId === undefined || sessionId === null
        ? undefined
        : composerBridges.get(sessionId)
    }

    /** Hidden session-scoped bridge that lends the composer draft actions to the root workbench. */
    function ComposerBridge({ sessionId, useInput, inputActions }) {
      const draftRef = React.useRef('')
      draftRef.current = useInput((state) =>
        state === undefined || state === null || typeof state.draft !== 'string' ? '' : state.draft,
      )
      const bridge = React.useMemo(() => {
        const append = (text) => {
          if (
            typeof text !== 'string' ||
            text === '' ||
            inputActions === undefined ||
            inputActions === null
          ) {
            return false
          }
          try {
            const base =
              draftRef.current.trim() === '' ? '' : draftRef.current.replace(/\s+$/, '')
            inputActions.setDraft(base === '' ? text : `${base}\n\n${text}`)
            return true
          } catch {
            return false
          }
        }
        return { append }
      }, [inputActions])
      React.useEffect(() => {
        if (typeof sessionId !== 'string' || sessionId === '') return undefined
        setComposerBridge(sessionId, bridge)
        return () => removeComposerBridge(sessionId, bridge)
      }, [sessionId, bridge])
      return null
    }

    function readSessionAnnotations(sessionId) {
      if (typeof sessionId !== 'string' || sessionId === '') return []
      const items = []
      const deleted = loadDeletedAnnotations(sessionId)
      try {
        const keys = []
        for (let index = 0; index < window.localStorage.length; index += 1) {
          const key = window.localStorage.key(index)
          if (key !== null && key.startsWith(STORAGE_PREFIX)) keys.push(key)
        }
        for (const key of keys) {
          const address = key.slice(STORAGE_PREFIX.length)
          const parsed = parseFileAddress(address)
          if (parsed === null || parsed.sessionId !== sessionId) continue
          const raw = window.localStorage.getItem(key)
          if (raw === null) continue
          const list = JSON.parse(raw)
          if (!Array.isArray(list)) continue
          for (const annotation of list) {
            if (
              annotation === null ||
              typeof annotation !== 'object' ||
              typeof annotation.id !== 'string' ||
              typeof annotation.note !== 'string' ||
              typeof annotation.quote !== 'string' ||
              deleted.has(`${address}::${annotation.id}`)
            ) {
              continue
            }
            items.push({
              key: `${address}::${annotation.id}`,
              address,
              path: parsed.path,
              annotation,
            })
          }
        }
      } catch {
        return []
      }
      return items.sort((left, right) => {
        const byPath = left.path.localeCompare(right.path)
        if (byPath !== 0) return byPath
        return (left.annotation.startLine || 0) - (right.annotation.startLine || 0)
      })
    }

    const reviewCursorBySession = new Map()

    function notifyAnnotationsChanged() {
      try {
        window.dispatchEvent(new Event('file-annotate:annotations-changed'))
      } catch {
        // Same-document refresh is an enhancement; the next poll still catches up.
      }
    }

    function notifyAnnotationsCleared() {
      try {
        window.dispatchEvent(new Event('file-annotate:annotations-cleared'))
      } catch {
        // Other open editors refresh on their next poll.
      }
    }

    function useSessionAnnotations(sessionId) {
      const [items, setItems] = React.useState(() =>
        typeof sessionId === 'string' && sessionId !== '' ? readSessionAnnotations(sessionId) : [],
      )
      React.useEffect(() => {
        if (typeof sessionId !== 'string' || sessionId === '') {
          setItems([])
          return undefined
        }
        let alive = true
        const refresh = () => {
          if (alive) setItems(readSessionAnnotations(sessionId))
        }
        refresh()
        const timer = setInterval(refresh, 1500)
        window.addEventListener('storage', refresh)
        return () => {
          alive = false
          clearInterval(timer)
          window.removeEventListener('storage', refresh)
        }
      }, [sessionId])
      return items
    }

    function treeDefinition(t) {
      return {
        id: TREE_ID,
        kind: TREE_KIND,
        priority: 'builtin',
        keepMounted: true,
        title: () => t('workspace.title'),
        guide: [
          {
            id: 'open-file',
            order: 15,
            title: () => t('workspace.title'),
            description: () => t('workspace.description'),
            icon: TreeGuideIcon,
          },
        ],
      }
    }

    function definition(t) {
      return {
        id: TYPE_ID,
        kind: KIND,
        priority: 'extension',
        patterns: PATTERNS,
        keepMounted: true,
        title: (address) => {
          const parsed = parseFileAddress(address)
          return parsed === null ? t('type.label') : basename(parsed.path)
        },
        guide: [],
      }
    }

    function Title({ useTabInfo, t }) {
      const info = useTabInfo()
      const tab = info === undefined || info === null ? undefined : info.tab
      const address = tab === undefined || tab === null ? '' : tab.contentId
      const parsed = parseFileAddress(address)
      const label = parsed === null ? t('type.label') : basename(parsed.path)
      return h(
        'span',
        {
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          title: parsed === null ? label : parsed.path,
        },
        h('span', { 'aria-hidden': true, style: { opacity: 0.75 } }, '✎'),
        label,
      )
    }

    let lastBodyAddress = ''

    class BodyBoundary extends React.Component {
      constructor(props) {
        super(props)
        this.state = { error: null }
      }

      static getDerivedStateFromError(error) {
        return { error }
      }

      componentDidCatch(error, info) {
        console.error('file-annotator: slot body crashed', error, info)
      }

      render() {
        if (this.state.error === null) return this.props.children
        return h(EditorErrorPane, { error: this.state.error, t: this.props.t })
      }
    }

    function EditorShell(props) {
      const info = props.useTabInfo()
      const tab = info === undefined || info === null ? undefined : info.tab
      const address = tab === undefined || tab === null ? '' : tab.contentId
      lastBodyAddress = typeof address === 'string' ? address : ''
      diagnostics.bodyRendered = true
      diagnostics.bodyEnv = ['useTabInfo', 'useInput', 'inputActions', 'useSessions', 't']
        .map((name) => `${name}:${typeof props[name]}`)
        .join(', ')
      return h(EditorBody, props)
    }

    function Body(props) {
      return h(BodyBoundary, { t: props.t }, h(EditorShell, props))
    }

    function EditorErrorPane({ error, t }) {
      const tr = typeof t === 'function' ? t : (key) => key
      const detail = String((error && (error.stack || error.message)) || error)
      const shown = detail.length > 4000 ? `${detail.slice(0, 4000)}…` : detail
      diagnostics.lastError = shown
      diagnostics.lastErrorAt = Date.now()
      return h(
        'div',
        {
          className: 'dsh-fa-root',
          style: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: 0,
            overflow: 'auto',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: '16px',
              alignItems: 'flex-start',
            },
          },
          h('div', { style: { fontWeight: 600, fontSize: '13px' } }, tr('error.crashed')),
          h(
            'pre',
            {
              style: {
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                font: '11px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                color: 'var(--dsw-alias-state-error-primary)',
                maxHeight: '50vh',
                overflow: 'auto',
                width: '100%',
                boxSizing: 'border-box',
              },
            },
            shown,
          ),
          h(
            'div',
            { style: { display: 'flex', gap: '8px' } },
            h(
              'button',
              {
                type: 'button',
                className: 'dsh-fa-btn',
                onClick: () => {
                  try {
                    if (lastBodyAddress !== '') {
                      runtime.sidebarRight.openResource(lastBodyAddress, {
                        kind: 'text',
                        replaceTab: true,
                      })
                    }
                  } catch {
                    // Keep the error pane when the preview cannot open either.
                  }
                },
              },
              tr('action.preview'),
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'dsh-fa-btn',
                onClick: () => window.location.reload(),
              },
              tr('action.reload'),
            ),
          ),
        ),
      )
    }



    function EditorTreeIcon() {
      return h(
        'svg',
        {
          viewBox: '0 0 16 16',
          width: 14,
          height: 14,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.35,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
        },
        h('path', { d: 'M1.8 3.2h4.1l1.2 1.4h7.1v8.2H1.8z' }),
        h('path', { d: 'M1.8 5.8h12.4' }),
      )
    }

    function EditorFileTree({ sessionId, root, currentAddress, t, onOpen, onClose }) {
      const initial = loadTreeState(sessionId)
      const [expanded, setExpanded] = React.useState(() => new Set(initial.expanded))
      const [levels, setLevels] = React.useState({})
      const [filter, setFilter] = React.useState('')
      const [focusedPath, setFocusedPath] = React.useState(null)
      const generationsRef = React.useRef(new Map())
      const aliveRef = React.useRef(true)
      const watchesRef = React.useRef(new Map())
      const refreshTimersRef = React.useRef(new Map())
      const scrollRef = React.useRef(null)
      const rowRefs = React.useRef(new Map())
      const savedScrollRef = React.useRef(initial.scrollTop)
      const restoredRef = React.useRef(false)
      const saveTimerRef = React.useRef(null)
      const expandedRef = React.useRef(expanded)
      expandedRef.current = expanded

      React.useEffect(() => {
        aliveRef.current = true
        return () => {
          aliveRef.current = false
        }
      }, [])

      const loadDir = (path, background) => {
        if (root === '' || typeof path !== 'string' || path === '') return
        const key = `${sessionId}::${path}`
        const generation = (generationsRef.current.get(key) || 0) + 1
        generationsRef.current.set(key, generation)
        if (!background) {
          setLevels((previous) => ({
            ...previous,
            [path]: {
              status: previous[path] === undefined ? 'loading' : previous[path].status,
              entries: previous[path] === undefined ? [] : previous[path].entries,
              truncated: previous[path] === undefined ? false : previous[path].truncated,
            },
          }))
        }
        ;(async () => {
          try {
            const result = await runtime.remote.workspaceFiles.list(sessionId, path)
            if (!aliveRef.current || generationsRef.current.get(key) !== generation) return
            if (!result.ok) {
              if (!background) {
                setLevels((previous) => ({
                  ...previous,
                  [path]: { status: 'error', entries: [], truncated: false, error: result.error },
                }))
              }
              return
            }
            const value = result.value
            setLevels((previous) => ({
              ...previous,
              [path]: {
                status: 'ready',
                entries: Array.isArray(value.entries) ? value.entries : [],
                truncated: value.truncated === true,
              },
            }))
          } catch (error) {
            if (!aliveRef.current || generationsRef.current.get(key) !== generation) return
            if (!background) {
              setLevels((previous) => ({
                ...previous,
                [path]: { status: 'error', entries: [], truncated: false, error },
              }))
            }
          }
        })()
      }

      const stopWatch = (path) => {
        const watch = watchesRef.current.get(path)
        if (watch === undefined) return
        watchesRef.current.delete(path)
        diagnostics.treeWatchCount = watchesRef.current.size
        watch.controller.abort()
        try {
          if (watch.stream !== undefined && typeof watch.stream.dispose === 'function') {
            const disposed = watch.stream.dispose()
            if (disposed !== undefined && typeof disposed.catch === 'function') disposed.catch(() => {})
          }
        } catch {
          // Disposal is best-effort; the abort listener also releases the stream.
        }
        const timer = refreshTimersRef.current.get(path)
        if (timer !== undefined) {
          clearTimeout(timer)
          refreshTimersRef.current.delete(path)
        }
      }

      const startWatch = (path) => {
        if (root === '' || watchesRef.current.has(path)) return
        if (typeof runtime.remote.$stream !== 'function') return
        if (watchesRef.current.size >= TREE_MAX_WATCHES) {
          const oldest = watchesRef.current.keys().next().value
          if (oldest !== undefined) stopWatch(oldest)
        }
        const controller = new AbortController()
        let stream
        try {
          stream = runtime.remote.$stream({
            name: `file-annotate-tree:${path}`,
            open: (lifetime) => runtime.remote.workspaceFiles.changes(sessionId, path, lifetime),
            ended: () => new Error(`directory watch ended: ${path}`),
          })
        } catch {
          return
        }
        watchesRef.current.set(path, { controller, stream })
        diagnostics.treeWatchCount = watchesRef.current.size
        ;(async () => {
          try {
            for await (const item of stream) {
              if (controller.signal.aborted) return
              if (item.value !== undefined && item.value.kind === 'ready') {
                if (typeof item.accept === 'function') item.accept()
                continue
              }
              if (item.value !== undefined && item.value.kind === 'change') {
                const pending = refreshTimersRef.current.get(path)
                if (pending !== undefined) clearTimeout(pending)
                refreshTimersRef.current.set(
                  path,
                  setTimeout(() => {
                    refreshTimersRef.current.delete(path)
                    if (!controller.signal.aborted) loadDir(path, true)
                  }, 180),
                )
              }
            }
          } catch {
            // A closed or failed watch falls back to manual refresh.
          }
        })()
      }

      const stopAllWatches = () => {
        for (const path of [...watchesRef.current.keys()]) stopWatch(path)
      }

      React.useEffect(() => {
        if (root === '') return
        const saved = loadTreeState(sessionId)
        setExpanded(new Set(saved.expanded))
        savedScrollRef.current = saved.scrollTop
        restoredRef.current = false
        setFocusedPath(null)
        setLevels({})
        loadDir(root)
        for (const path of saved.expanded.slice(0, 64)) loadDir(path)
      }, [root, sessionId])

      React.useEffect(() => {
        if (root === '') return
        const wanted = new Set([root, ...expanded])
        for (const path of [...watchesRef.current.keys()]) {
          if (!wanted.has(path)) stopWatch(path)
        }
        for (const path of wanted) startWatch(path)
      }, [root, sessionId, expanded])

      React.useEffect(() => () => stopAllWatches(), [root, sessionId])

      React.useEffect(() => {
        if (root === '' || restoredRef.current) return
        if (levels[root] === undefined) return
        const list = scrollRef.current
        if (list === null) return
        list.scrollTop = savedScrollRef.current
        restoredRef.current = true
      }, [root, sessionId, levels])

      React.useEffect(
        () => () => {
          if (saveTimerRef.current !== null) clearTimeout(saveTimerRef.current)
          saveTreeState(sessionId, {
            expanded: [...expandedRef.current],
            scrollTop: savedScrollRef.current,
          })
        },
        [sessionId],
      )

      const persistScroll = () => {
        saveTreeState(sessionId, {
          expanded: [...expandedRef.current],
          scrollTop: savedScrollRef.current,
        })
      }

      const onScroll = (event) => {
        savedScrollRef.current = event.currentTarget.scrollTop
        if (saveTimerRef.current !== null) clearTimeout(saveTimerRef.current)
        saveTimerRef.current = setTimeout(() => {
          saveTimerRef.current = null
          persistScroll()
        }, 120)
      }

      const toggleDir = (path) => {
        setExpanded((previous) => {
          const next = new Set(previous)
          if (next.has(path)) {
            next.delete(path)
            for (const candidate of [...next]) {
              if (candidate.startsWith(`${path}/`)) next.delete(candidate)
            }
          } else {
            next.add(path)
            const level = levels[path]
            if (level === undefined || level.status === 'error') loadDir(path)
            else loadDir(path, true)
          }
          saveTreeState(sessionId, {
            expanded: [...next],
            scrollTop: savedScrollRef.current,
          })
          return next
        })
      }

      const refresh = () => {
        setLevels({})
        if (root !== '') loadDir(root)
        for (const path of expanded) loadDir(path)
      }

      const matches = (entry) =>
        filter.trim() === '' || entry.type === 'directory' || fuzzyTreeMatch(entry.name, filter)

      const rows = []
      const collect = (path, depth) => {
        const level = levels[path]
        if (level === undefined) {
          rows.push({ kind: 'status', key: `status:${path}`, depth, text: t('tree.loading') })
          return
        }
        if (level.status === 'loading' && level.entries.length === 0) {
          rows.push({ kind: 'status', key: `status:${path}`, depth, text: t('tree.loading') })
          return
        }
        if (level.status === 'error') {
          rows.push({ kind: 'error', key: `error:${path}`, depth, path })
          return
        }
        const entries = sortTreeEntries(level.entries.filter(matches))
        if (entries.length === 0) {
          rows.push({
            kind: 'status',
            key: `empty:${path}`,
            depth,
            text: filter.trim() === '' ? t('tree.empty') : t('tree.noMatch'),
          })
          return
        }
        for (const entry of entries) {
          const childPath = treeChildPath(path, entry.name)
          const directory = entry.type === 'directory'
          const open = expanded.has(childPath)
          rows.push({
            kind: 'row',
            key: childPath,
            path: childPath,
            entry,
            directory,
            open,
            depth,
            address: fileAddressForSession(sessionId, root, childPath),
          })
          if (directory && open) collect(childPath, depth + 1)
        }
      }
      if (root !== '') collect(root, 0)

      const rowItems = rows.filter((row) => row.kind === 'row')

      const focusRowAt = (path) => {
        setFocusedPath(path)
        const node = rowRefs.current.get(path)
        if (node === undefined) return
        try {
          node.focus()
          node.scrollIntoView({ block: 'nearest' })
        } catch {
          // The row may be gone after a collapse/refresh.
        }
      }

      const onTreeKeyDown = (event) => {
        if (rowItems.length === 0) return
        const index = rowItems.findIndex((row) => row.path === focusedPath)
        const current = index < 0 ? undefined : rowItems[index]
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          const target = rowItems[index < 0 ? 0 : Math.min(rowItems.length - 1, index + 1)]
          if (target !== undefined) focusRowAt(target.path)
        } else if (event.key === 'ArrowUp') {
          event.preventDefault()
          const target = rowItems[index < 0 ? rowItems.length - 1 : Math.max(0, index - 1)]
          if (target !== undefined) focusRowAt(target.path)
        } else if (event.key === 'Home') {
          event.preventDefault()
          if (rowItems[0] !== undefined) focusRowAt(rowItems[0].path)
        } else if (event.key === 'End') {
          event.preventDefault()
          if (rowItems[rowItems.length - 1] !== undefined) focusRowAt(rowItems[rowItems.length - 1].path)
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          if (current === undefined) return
          if (current.directory && !current.open) {
            toggleDir(current.path)
            focusRowAt(current.path)
          } else if (current.directory && current.open) {
            const child = rowItems[index + 1]
            if (child !== undefined && child.depth > current.depth) focusRowAt(child.path)
          }
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault()
          if (current === undefined) return
          if (current.directory && current.open) {
            toggleDir(current.path)
            focusRowAt(current.path)
          } else {
            for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
              if (rowItems[cursor].depth < current.depth) {
                focusRowAt(rowItems[cursor].path)
                break
              }
            }
          }
        } else if (event.key === 'Enter' || event.key === ' ') {
          // A focused row button activates itself; only the list itself needs
          // the roving Enter/Space handling, otherwise directories toggle twice.
          if (event.target !== event.currentTarget) return
          event.preventDefault()
          if (current === undefined) return
          if (current.directory) toggleDir(current.path)
          else onOpen(current.address)
        }
      }

      const renderRow = (row) => {
        if (row.kind === 'error') {
          return h(
            'button',
            {
              key: row.key,
              type: 'button',
              className: 'dsh-fa-filetree-status error',
              style: { paddingLeft: `${6 + row.depth * 12}px` },
              onClick: () => loadDir(row.path),
            },
            t('tree.error'),
          )
        }
        if (row.kind === 'status') {
          return h(
            'div',
            {
              key: row.key,
              className: 'dsh-fa-filetree-status',
              style: { paddingLeft: `${6 + row.depth * 12}px` },
            },
            row.text,
          )
        }
        const active = row.address === currentAddress
        const focused = row.path === focusedPath
        const classes = [
          'dsh-fa-filetree-row',
          active ? 'active' : '',
          focused ? 'focused' : '',
        ]
          .filter(Boolean)
          .join(' ')
        return h(
          'button',
          {
            key: row.key,
            ref: (node) => {
              if (node === null) rowRefs.current.delete(row.path)
              else rowRefs.current.set(row.path, node)
            },
            type: 'button',
            role: 'treeitem',
            'aria-expanded': row.directory ? row.open : undefined,
            'aria-selected': active || focused,
            tabIndex: -1,
            className: classes,
            style: { paddingLeft: `${6 + row.depth * 12}px` },
            title: row.entry.name,
            onClick: () => {
              setFocusedPath(row.path)
              if (row.directory) toggleDir(row.path)
              else onOpen(row.address)
            },
            onDoubleClick: () => {
              if (!row.directory) onOpen(row.address)
            },
            onFocus: () => setFocusedPath(row.path),
          },
          h('span', { className: 'dsh-fa-filetree-caret' }, row.directory ? (row.open ? '▾' : '▸') : ''),
          h('span', { className: 'dsh-fa-filetree-name' }, row.entry.name),
        )
      }

      return h(
        'div',
        { className: 'dsh-fa-filetree-inner' },
        h(
          'div',
          { className: 'dsh-fa-filetree-head' },
          h(
            'button',
            {
              type: 'button',
              className: 'dsh-fa-filetree-btn',
              title: t('tree.hideHint'),
              'aria-label': t('tree.hideHint'),
              onClick: onClose,
            },
            h(EditorTreeIcon),
          ),
          h('span', { className: 'dsh-fa-filetree-title', title: root }, root === '' ? t('tree.title') : basename(root)),
          h(
            'button',
            { type: 'button', className: 'dsh-fa-filetree-btn', title: t('tree.refresh'), 'aria-label': t('tree.refresh'), onClick: refresh },
            h(TreeRefreshIcon),
          ),
          h(
            'button',
            { type: 'button', className: 'dsh-fa-filetree-btn', title: t('tree.hide'), 'aria-label': t('tree.hide'), onClick: onClose },
            '×',
          ),
        ),
        h('input', {
          type: 'search',
          className: 'dsh-fa-filetree-filter',
          value: filter,
          placeholder: t('tree.filter'),
          'aria-label': t('tree.filter'),
          onChange: (event) => setFilter(event.currentTarget.value),
          onKeyDown: (event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              const first = rowItems[0]
              if (first !== undefined) focusRowAt(first.path)
              else if (scrollRef.current !== null) scrollRef.current.focus()
            }
          },
        }),
        h(
          'div',
          {
            className: 'dsh-fa-filetree-list',
            ref: scrollRef,
            role: 'tree',
            tabIndex: 0,
            'aria-label': t('tree.title'),
            onScroll,
            onKeyDown: onTreeKeyDown,
          },
          root === ''
            ? h(
                'div',
                { className: 'dsh-fa-filetree-status', style: { paddingLeft: '6px' } },
                t('tree.noWorkspace'),
              )
            : rows.map(renderRow),
        ),
      )
    }

    function workspaceStorageKey(tabId) {
      return `${WORKSPACE_STORE_PREFIX}${tabId || 'global'}`
    }

    function loadWorkspaceState(tabId) {
      const fallback = { selected: null, treeOpen: true, width: 240 }
      try {
        const raw = window.localStorage.getItem(workspaceStorageKey(tabId))
        if (raw === null) return fallback
        const parsed = JSON.parse(raw)
        if (parsed === null || typeof parsed !== 'object') return fallback
        const width = Number.isFinite(parsed.width)
          ? Math.min(360, Math.max(160, parsed.width))
          : fallback.width
        return {
          selected: typeof parsed.selected === 'string' && parsed.selected !== '' ? parsed.selected : null,
          treeOpen: parsed.treeOpen !== false,
          width,
        }
      } catch {
        return fallback
      }
    }

    function saveWorkspaceState(tabId, state) {
      try {
        window.localStorage.setItem(
          workspaceStorageKey(tabId),
          JSON.stringify({
            selected: state.selected,
            treeOpen: state.treeOpen === true,
            width: state.width,
          }),
        )
      } catch {
        // The workspace still works when storage is unavailable.
      }
    }

    function WorkspaceEmpty({ t }) {
      return h(
        'div',
        { className: 'dsh-fa-workspace-empty' },
        h('div', { className: 'dsh-fa-workspace-empty-icon' }, h(EditorTreeIcon)),
        h('div', { className: 'dsh-fa-workspace-empty-title' }, t('workspace.emptyTitle')),
        h('div', { className: 'dsh-fa-workspace-empty-body' }, t('workspace.emptyBody')),
      )
    }

    function WorkspaceContent(props) {
      diagnostics.treeRendered = true
      const { useTabInfo, sessionId, useSessions, t } = props
      const info = useTabInfo()
      const tab = info === undefined || info === null ? undefined : info.tab
      const tabId = tab === undefined || tab === null ? '' : tab.id
      const cwd = useSessions((sessions) =>
        sessions === undefined || sessions === null || sessions.byId === undefined
          ? undefined
          : sessions.byId[sessionId]?.cwd,
      )
      const root = treeRootOf(cwd)
      const rootClass = 'dsh-fa-workspace-root'
      const initial = React.useRef(null)
      if (initial.current === null) initial.current = loadWorkspaceState(tabId)
      const [selected, setSelected] = React.useState(initial.current.selected)
      const [focusRequest, setFocusRequest] = React.useState(null)
      const [treeOpen, setTreeOpen] = React.useState(initial.current.treeOpen)
      const [width, setWidth] = React.useState(initial.current.width)
      const dragRef = React.useRef(null)

      React.useEffect(() => {
        const state = loadWorkspaceState(tabId)
        setSelected(state.selected)
        setTreeOpen(state.treeOpen)
        setWidth(state.width)
      }, [tabId])

      React.useEffect(() => {
        const timer = setTimeout(() => {
          saveWorkspaceState(tabId, { selected, treeOpen, width })
        }, 150)
        return () => clearTimeout(timer)
      }, [tabId, selected, treeOpen, width])

      React.useEffect(() => {
        setWorkspaceTitle(selected)
      }, [selected])

      React.useEffect(() => () => setWorkspaceTitle(null), [])

      const openFile = (address) => {
        const parsed = parseFileAddress(address)
        if (parsed !== null && !isTextualName(parsed.path)) {
          try {
            runtime.sidebarRight.openResource(address)
          } catch {
            // A type that cannot claim this address keeps the workspace unchanged.
          }
          return
        }
        setSelected(address)
        setFocusRequest(null)
      }

      const openTargetFile = (address, params) => {
        setSelected(address)
        setFocusRequest(
          params === undefined || params === null
            ? null
            : {
                address,
                line: params.line,
                from: params.from,
                to: params.to,
                token: Date.now(),
              },
        )
      }

      const onResizeStart = (event) => {
        event.preventDefault()
        try {
          event.currentTarget.setPointerCapture(event.pointerId)
        } catch {
          // Pointer capture is an enhancement.
        }
        dragRef.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startWidth: width,
        }
      }

      const onResizeMove = (event) => {
        const drag = dragRef.current
        if (drag === null) return
        const next = Math.min(360, Math.max(160, drag.startWidth + (event.clientX - drag.startX)))
        setWidth(next)
      }

      const onResizeEnd = (event) => {
        const drag = dragRef.current
        if (drag === null) return
        dragRef.current = null
        try {
          event.currentTarget.releasePointerCapture(drag.pointerId)
        } catch {
          // Ignore a capture that was already released.
        }
        saveWorkspaceState(tabId, { selected, treeOpen, width })
      }

      const onResizeKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          setWidth((current) => Math.min(360, current + 16))
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault()
          setWidth((current) => Math.max(160, current - 16))
        }
      }

      return h(
        'div',
        { className: rootClass },
        h(StyleTag),
        treeOpen
          ? h(
              'div',
              { className: 'dsh-fa-workspace-tree', style: { width: `${width}px` } },
              h(EditorFileTree, {
                sessionId,
                root,
                currentAddress: selected,
                t,
                onOpen: openFile,
                onClose: () => setTreeOpen(false),
              }),
              h('div', {
                className: 'dsh-fa-workspace-resizer',
                role: 'separator',
                'aria-orientation': 'vertical',
                'aria-label': t('tree.title'),
                'aria-valuemin': 160,
                'aria-valuemax': 360,
                'aria-valuenow': width,
                tabIndex: 0,
                onPointerDown: onResizeStart,
                onPointerMove: onResizeMove,
                onPointerUp: onResizeEnd,
                onPointerCancel: onResizeEnd,
                onKeyDown: onResizeKeyDown,
              }),
            )
          : h(
              'div',
              { className: 'dsh-fa-workspace-rail' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dsh-fa-workspace-rail-btn',
                  title: t('tree.show'),
                  'aria-label': t('tree.show'),
                  onClick: () => setTreeOpen(true),
                },
                h(EditorTreeIcon),
              ),
            ),
        h(
          'div',
          { className: 'dsh-fa-workspace-main' },
          selected === null || selected === ''
            ? h(WorkspaceEmpty, { t })
            : h(Body, { ...props, address: selected, onOpenFile: openTargetFile, focusRequest, key: selected }),
        ),
      )
    }

    function WorkspaceBody(props) {
      return h(TreeBoundary, { t: props.t }, h(WorkspaceContent, props))
    }

    function EditorBody(props) {
      const { useTabInfo, useInput, inputActions, sessionId, useSessions, t } = props
      const info = useTabInfo()
      const tab = info === undefined || info === null ? undefined : info.tab
      const address =
        typeof props.address === 'string' && props.address !== ''
          ? props.address
          : tab === undefined || tab === null
            ? ''
            : tab.contentId
      const navigation = tab === undefined || tab === null ? undefined : tab.navigation
      const navigationParams =
        navigation === undefined || navigation === null ? undefined : navigation.params
      const externalFocus =
        props.focusRequest !== undefined &&
        props.focusRequest !== null &&
        props.focusRequest.address === address
          ? props.focusRequest
          : undefined
      const targetParams = externalFocus !== undefined ? externalFocus : navigationParams
      const parsed = React.useMemo(() => parseFileAddress(address), [address])
      const parsedPath = parsed === null ? '' : parsed.path
      const cwd = useSessions((sessions) =>
        sessions === undefined || sessions === null || sessions.byId === undefined
          ? undefined
          : sessions.byId[sessionId]?.cwd,
      )
      const [doc, setDoc] = React.useState(null)
      const [draft, setDraft] = React.useState('')
      const [phase, setPhase] = React.useState(parsed === null ? 'empty' : 'loading')
      const [loadError, setLoadError] = React.useState(null)
      const [reloadTick, setReloadTick] = React.useState(0)
      const [annotations, setAnnotations] = React.useState(() => loadAnnotations(address))
      const [hydratedAddress, setHydratedAddress] = React.useState(address)
      const [composer, setComposer] = React.useState(null)
      const [note, setNote] = React.useState('')
      const [suggestion, setSuggestion] = React.useState('')
      const [showSuggestion, setShowSuggestion] = React.useState(false)
      const [selection, setSelection] = React.useState({ start: 0, end: 0 })
      const [saving, setSaving] = React.useState(false)
      const [status, setStatus] = React.useState(null)
      const [mode, setMode] = React.useState(() => readStoredMode())
      const [mdPreview, setMdPreview] = React.useState(false)
      const [scrollTop, setScrollTop] = React.useState(0)
      const [composing, setComposing] = React.useState(false)
      const [globalIndex, setGlobalIndex] = React.useState(() => {
        const cursor = reviewCursorBySession.get(sessionId)
        return typeof cursor === 'number' ? cursor : 0
      })
      const bridge = useComposerBridge(sessionId)
      const composerDraft = useInput((state) =>
        state === undefined || state === null || typeof state.draft !== 'string' ? '' : state.draft,
      )
      const sessionAnnotations = useSessionAnnotations(sessionId)

      const taRef = React.useRef(null)
      const gutterRef = React.useRef(null)
      const noteRef = React.useRef(null)
      const preRef = React.useRef(null)
      const codeRef = React.useRef(null)
      const viewRef = React.useRef(null)
      const blockRef = React.useRef(null)
      const editorScrollRef = React.useRef(0)
      const autoTimerRef = React.useRef(null)
      const composerRef = React.useRef(null)
      const modeRef = React.useRef(mode)
      const suppressAutoRef = React.useRef(false)
      const navigationFocusRef = React.useRef('')
      const noteComposingRef = React.useRef(false)
      const noteCompositionEndAtRef = React.useRef(0)
      const dragFromEditorRef = React.useRef(false)
      const scheduleRef = React.useRef(null)
      composerRef.current = composer
      modeRef.current = mode

      const language = React.useMemo(() => languageOf(parsedPath), [parsedPath])
      const rootClass = 'dsh-fa-root'
      const dirty = doc !== null && draft !== doc.text
      const lines = React.useMemo(() => draft.split('\n').length, [draft])
      const highlighted = React.useMemo(() => renderHighlight(draft, language), [draft, language])
      const selectedChars = Math.max(0, selection.end - selection.start)
      const globalAnnotations = React.useMemo(() => {
        const others = sessionAnnotations.filter((item) => item.address !== address)
        const deleted = loadDeletedAnnotations(sessionId)
        const current = annotations
          .filter((annotation) => !deleted.has(`${address}::${annotation.id}`))
          .map((annotation) => ({
            key: `${address}::${annotation.id}`,
            address,
            path: parsedPath,
            annotation,
          }))
        return [...others, ...current].sort(
          (left, right) =>
            String(left.path).localeCompare(String(right.path)) ||
            left.annotation.start - right.annotation.start,
        )
      }, [sessionAnnotations, annotations, address, parsedPath])

      React.useEffect(() => {
        if (parsed === null) {
          setPhase('empty')
          setDoc(null)
          setDraft('')
          return undefined
        }
        const controller = new AbortController()
        setPhase('loading')
        setLoadError(null)
        setDoc(null)
        let live = true
        readAll(runtime.remote, sessionId, parsed.path, controller.signal)
          .then((result) => {
            if (!live) return
            setDoc(result)
            setDraft(result.text)
            setPhase('ready')
          })
          .catch((error) => {
            if (!live || controller.signal.aborted) return
            setLoadError(friendlyError(error, t))
            setPhase('error')
          })
        return () => {
          live = false
          controller.abort()
        }
      }, [sessionId, parsedPath, reloadTick])

      React.useEffect(() => {
        setAnnotations(loadAnnotations(address))
        setHydratedAddress(address)
      }, [address])

      React.useEffect(() => {
        if (hydratedAddress !== address) return
        persistAnnotations(address, annotations)
      }, [address, hydratedAddress, annotations])


      React.useEffect(() => {
        if (globalAnnotations.length === 0) {
          setGlobalIndex(0)
          return
        }
        const cursor = reviewCursorBySession.get(sessionId)
        if (
          typeof cursor === 'number' &&
          globalAnnotations[cursor] !== undefined &&
          globalAnnotations[cursor].address === address
        ) {
          setGlobalIndex(cursor)
          return
        }
        const first = globalAnnotations.findIndex((item) => item.address === address)
        const next = first >= 0 ? first : 0
        setGlobalIndex(next)
        reviewCursorBySession.set(sessionId, next)
      }, [address, sessionId, globalAnnotations])

      React.useEffect(() => {
        const onCleared = () => setAnnotations([])
        window.addEventListener('file-annotate:annotations-cleared', onCleared)
        return () => window.removeEventListener('file-annotate:annotations-cleared', onCleared)
      }, [])

      React.useEffect(() => {
        const onCursor = (event) => {
          const detail = event.detail
          if (
            detail !== undefined &&
            detail !== null &&
            detail.sessionId === sessionId &&
            Number.isFinite(detail.index)
          ) {
            setGlobalIndex(detail.index)
          }
        }
        window.addEventListener('file-annotate:review-cursor', onCursor)
        return () => window.removeEventListener('file-annotate:review-cursor', onCursor)
      }, [sessionId])

      React.useEffect(() => {
        if (doc === null || annotations.length === 0 || draft.length > MAX_SAVE_CHARS) return undefined
        const timer = setTimeout(() => {
          setAnnotations((previous) => {
            let changed = false
            const next = previous.map((annotation) => {
              const moved = relocateAnnotation(annotation, draft)
              if (moved !== annotation) changed = true
              return moved
            })
            return changed ? next : previous
          })
        }, 260)
        return () => clearTimeout(timer)
      }, [draft, doc, annotations.length])


      React.useEffect(() => {
        if (composer !== null && noteRef.current !== null) noteRef.current.focus({ preventScroll: true })
      }, [composer])

      React.useEffect(() => {
        if (doc === null || targetParams === undefined || targetParams === null) return
        const line = Number.isFinite(targetParams.line) ? targetParams.line : undefined
        const from = Number.isFinite(targetParams.from) ? targetParams.from : undefined
        const to = Number.isFinite(targetParams.to) ? targetParams.to : undefined
        if (line === undefined && from === undefined && to === undefined) return
        const ta = taRef.current
        if (ta === null) return
        const revision =
          externalFocus !== undefined
            ? externalFocus.token
            : navigation !== undefined && navigation !== null && Number.isFinite(navigation.revision)
              ? navigation.revision
              : 0
        const signature = `${address}:${revision}:${String(line)}:${String(from)}:${String(to)}`
        if (navigationFocusRef.current === signature) return
        navigationFocusRef.current = signature
        let start = 0
        let end = 0
        const clamp = (value) => Math.max(0, Math.min(draft.length, value))
        if (from !== undefined && to !== undefined) {
          start = clamp(from)
          end = clamp(to)
        } else if (line !== undefined) {
          start = offsetAtLine(draft, line)
          const newline = draft.indexOf('\n', start)
          end = newline < 0 ? draft.length : newline
        }
        if (end < start) end = start
        suppressAutoRef.current = true
        try {
          ta.focus()
          ta.setSelectionRange(start, end)
          ta.scrollTop = Math.max(0, ((line === undefined ? 1 : line) - 3) * 19.2)
        } catch {
          // The textarea may have been replaced while switching files.
        }
        setSelection({ start, end })
        window.setTimeout(() => {
          suppressAutoRef.current = false
        }, 300)
      }, [doc, draft, address, navigation, navigationParams, externalFocus, targetParams])

      React.useEffect(() => {
        persistMode(mode)
      }, [mode])

      React.useEffect(() => {
        setMdPreview(false)
      }, [address])


      React.useEffect(
        () => () => {
          if (autoTimerRef.current !== null) clearTimeout(autoTimerRef.current)
        },
        [],
      )

      React.useEffect(() => {
        const onDocumentMouseUp = () => {
          if (!dragFromEditorRef.current) return
          dragFromEditorRef.current = false
          if (scheduleRef.current !== null) scheduleRef.current()
        }
        document.addEventListener('mouseup', onDocumentMouseUp)
        return () => document.removeEventListener('mouseup', onDocumentMouseUp)
      }, [])

      React.useEffect(() => {
        if (composer === null) {
          const ta = taRef.current
          if (ta !== null) {
            ta.scrollTop = editorScrollRef.current
            if (preRef.current !== null) {
              preRef.current.scrollTop = ta.scrollTop
              preRef.current.scrollLeft = ta.scrollLeft
            }
          }
          return
        }
        const view = viewRef.current
        if (view === null) return
        // Keep the same code scroll position as the textarea. Centering the
        // composer here was what made the line numbers appear to jump the
        // moment a selection opened the annotation composer.
        view.scrollTop = Math.max(
          0,
          Math.min(editorScrollRef.current, view.scrollHeight - view.clientHeight),
        )
      }, [composer])

      const syncSelection = () => {
        const ta = taRef.current
        if (ta === null) return
        setSelection((previous) =>
          previous.start === ta.selectionStart && previous.end === ta.selectionEnd
            ? previous
            : { start: ta.selectionStart, end: ta.selectionEnd },
        )
      }

      const beginCompose = () => {
        const ta = taRef.current
        const start = ta === null ? selection.start : ta.selectionStart
        const end = ta === null ? selection.end : ta.selectionEnd
        if (end <= start) {
          setStatus({ kind: 'info', text: t('panel.empty') })
          return
        }
        const quote = draft.slice(start, end)
        const startLine = lineAt(draft, start)
        const endLine = lineAt(draft, Math.max(start, end - 1))
        editorScrollRef.current = ta === null ? 0 : ta.scrollTop
        setComposer({ start, end, quote, startLine, endLine })
        setNote('')
        setSuggestion('')
        setShowSuggestion(false)
      }

      const scheduleAutoAnnotate = () => {
        if (mode !== 'annotate' || composer !== null || suppressAutoRef.current) return
        diagnostics.autoScheduled += 1
        if (autoTimerRef.current !== null) clearTimeout(autoTimerRef.current)
        autoTimerRef.current = setTimeout(() => {
          autoTimerRef.current = null
          if (modeRef.current !== 'annotate' || composerRef.current !== null) {
            diagnostics.autoSkipped.push('mode-or-open')
            return
          }
          const ta = taRef.current
          if (ta === null || ta.selectionEnd <= ta.selectionStart) {
            diagnostics.autoSkipped.push('no-range')
            return
          }
          diagnostics.autoOpened += 1
          beginCompose()
        }, 220)
      }

      scheduleRef.current = scheduleAutoAnnotate

      const commitAnnotation = () => {
        if (composer === null) return
        const text = note.trim()
        if (text === '') {
          setStatus({ kind: 'error', text: t('error.noteRequired') })
          return
        }
        const annotation = {
          id: `a${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
          start: composer.start,
          end: composer.end,
          startLine: composer.startLine,
          endLine: composer.endLine,
          quote: composer.quote,
          note: text,
          suggestion: suggestion.trim(),
          sent: false,
          stale: false,
          createdAt: Date.now(),
        }
        setAnnotations((previous) => [...previous, annotation].sort((a, b) => a.start - b.start))
        setComposer(null)
        setStatus(null)
      }

      const save = async () => {
        if (doc === null || draft === doc.text) return
        if (doc.truncated) {
          setStatus({ kind: 'error', text: t('save.truncated') })
          return
        }
        if (draft.length > MAX_SAVE_CHARS) {
          setStatus({ kind: 'error', text: t('save.tooLarge') })
          return
        }
        if (runtime.remote?.commands === undefined) {
          setStatus({ kind: 'error', text: t('save.noCommand') })
          return
        }
        setSaving(true)
        setStatus({ kind: 'info', text: t('status.saving') })
        try {
          const payload = JSON.stringify({
            path: doc.absolutePath || parsedPath,
            content: draft,
            version: doc.version,
          })
          const result = await runtime.remote.commands.execute(
            sessionId,
            `/file-annotate-save ${payload}`,
            [],
          )
          if (result.ok === false) {
            setStatus({ kind: 'error', text: `${t('save.failed')}: ${result.error.message}` })
            return
          }
          const value = result.value
          if (value === undefined || value.kind === 'error') {
            setStatus({ kind: 'error', text: saveFailureText(value, t) })
            return
          }
          let version = doc.version
          try {
            const stat = await runtime.remote.workspaceFiles.stat(
              sessionId,
              doc.absolutePath || parsedPath,
              new AbortController().signal,
            )
            if (stat.ok) version = stat.value.version
          } catch {
            // Keep the previous version; the next save reports a stale guard.
          }
          setDoc({ ...doc, text: draft, version })
          setStatus({ kind: 'ok', text: t('status.saveOk') })
        } catch (error) {
          setStatus({ kind: 'error', text: `${t('save.failed')}: ${String(error?.message ?? error)}` })
        } finally {
          setSaving(false)
        }
      }

      const onKeyDown = (event) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
          event.preventDefault()
          if (dirty && !saving) save()
          return
        }
        if (event.key === 'Tab' && !event.shiftKey) {
          event.preventDefault()
          const ta = event.currentTarget
          const start = ta.selectionStart
          const end = ta.selectionEnd
          const next = `${draft.slice(0, start)}  ${draft.slice(end)}`
          setDraft(next)
          requestAnimationFrame(() => {
            const current = taRef.current
            if (current === null) return
            current.selectionStart = start + 2
            current.selectionEnd = start + 2
          })
        }
      }

      const handleScroll = (event) => {
        const ta = event.currentTarget
        setScrollTop(ta.scrollTop)
        if (gutterRef.current !== null) gutterRef.current.scrollTop = ta.scrollTop
        if (preRef.current !== null) {
          preRef.current.scrollTop = ta.scrollTop
          preRef.current.scrollLeft = ta.scrollLeft
        }
      }

      const focusGlobal = (item) => {
        if (item === undefined) return
        if (mdPreview) setMdPreview(false)
        if (item.annotation.stale === true) {
          setStatus({ kind: 'info', text: t('review.stale') })
          return
        }
        const ta = taRef.current
        if (ta === null) return
        suppressAutoRef.current = true
        const start = Math.max(0, Math.min(draft.length, item.annotation.start))
        const end = Math.max(start, Math.min(draft.length, item.annotation.end))
        try {
          ta.focus()
          ta.setSelectionRange(start, end)
          ta.scrollTop = Math.max(0, (item.annotation.startLine - 3) * 19.2)
        } catch {
          // The textarea may have been replaced while switching files.
        }
        setSelection({ start, end })
        window.setTimeout(() => {
          suppressAutoRef.current = false
        }, 300)
      }

      const navigateGlobal = (delta) => {
        if (globalAnnotations.length === 0) return
        const next =
          ((globalIndex + delta) % globalAnnotations.length + globalAnnotations.length) %
          globalAnnotations.length
        const item = globalAnnotations[next]
        reviewCursorBySession.set(sessionId, next)
        setGlobalIndex(next)
        try {
          window.dispatchEvent(
            new CustomEvent('file-annotate:review-cursor', {
              detail: { sessionId, index: next },
            }),
          )
        } catch {
          // Cross-file cursor sync is an enhancement; the index is already set.
        }
        if (item.address === address) {
          focusGlobal(item)
          return
        }
        const params =
          item.annotation.stale === true
            ? undefined
            : {
                line: item.annotation.startLine,
                from: item.annotation.start,
                to: item.annotation.end,
              }
        if (typeof props.onOpenFile === 'function') {
          props.onOpenFile(item.address, params)
          return
        }
        try {
          runtime.sidebarRight.openResource(item.address, {
            kind: KIND,
            replaceTab: tab === undefined || tab === null ? undefined : tab.id,
            params,
          })
        } catch (error) {
          setStatus({ kind: 'error', text: String((error && error.message) || error) })
        }
      }

      const appendComposer = (text) => {
        if (
          inputActions !== undefined &&
          inputActions !== null &&
          typeof inputActions.setDraft === 'function'
        ) {
          try {
            const base = composerDraft.trim() === '' ? '' : composerDraft.replace(/\s+$/, '')
            inputActions.setDraft(base === '' ? text : `${base}\n\n${text}`)
            return true
          } catch {
            // Fall through to the session bridge when the composer is being replaced.
          }
        }
        return bridge === undefined ? false : bridge.append(text)
      }

      const submitReview = () => {
        if (globalAnnotations.length === 0) return
        const groups = new Map()
        for (const item of globalAnnotations) {
          const key = item.address
          if (!groups.has(key)) {
            groups.set(key, { path: item.path || item.address, annotations: [] })
          }
          groups.get(key).annotations.push(item.annotation)
        }
        const message = [...groups.values()]
          .map((group) => buildMessage(group.path, group.annotations, t))
          .join('\n\n')
        if (!appendComposer(message)) {
          setStatus({ kind: 'error', text: t('review.noComposer') })
          return
        }
        for (const item of globalAnnotations) {
          markAnnotationDeleted(sessionId, item.address, item.annotation.id)
        }
        setAnnotations([])
        setGlobalIndex(0)
        notifyAnnotationsCleared()
        setStatus({ kind: 'info', text: t('review.staged') })
      }

      const clearReview = () => {
        if (typeof window.confirm === 'function' && !window.confirm(t('review.confirmClear'))) return
        for (const annotation of annotations) {
          markAnnotationDeleted(sessionId, address, annotation.id)
        }
        setAnnotations([])
        setStatus(null)
      }

      const clearAllReview = () => {
        if (typeof window.confirm === 'function' && !window.confirm(t('review.confirmClearAll'))) return
        const items = readSessionAnnotations(sessionId)
        const addresses = new Set(items.map((item) => item.address))
        for (const item of items) {
          markAnnotationDeleted(sessionId, item.address, item.annotation.id)
        }
        for (const annotation of annotations) {
          markAnnotationDeleted(sessionId, address, annotation.id)
        }
        if (annotations.length > 0) addresses.add(address)
        for (const target of addresses) {
          try {
            window.localStorage.removeItem(STORAGE_PREFIX + target)
          } catch {
            // Tombstones still hide the annotations when storage is unavailable.
          }
        }
        setAnnotations([])
        setGlobalIndex(0)
        notifyAnnotationsChanged()
        notifyAnnotationsCleared()
        setStatus({ kind: 'info', text: t('review.clearedAll') })
      }

      const openPreview = () => {
        if (parsed === null) return
        try {
          runtime.sidebarRight.openResource(address, { kind: 'text', preferNewPane: true })
        } catch (error) {
          setStatus({ kind: 'error', text: String(error?.message ?? error) })
        }
      }

      const openFiles = () => {
        try {
          runtime.sidebarRight.openTab('files', { replaceTab: true })
        } catch {
          // A profile without the files tab simply keeps this page.
        }
      }

      if (phase === 'empty' || phase === 'error') {
        return h(
          'div',
          { className: rootClass },
          h(StyleTag),
          h(
            'div',
            { className: 'dsh-fa-empty' },
            h('div', { className: 'dsh-fa-empty-title' }, phase === 'empty' ? t('empty.title') : t('error.loadFailed')),
            h(
              'p',
              { className: 'dsh-fa-empty-body' },
              phase === 'empty' ? t('empty.body') : loadError,
            ),
            phase === 'empty'
              ? h('button', { type: 'button', className: 'dsh-fa-btn', onClick: openFiles }, t('empty.openFiles'))
              : h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsh-fa-btn',
                    onClick: () => setReloadTick((value) => value + 1),
                  },
                  t('action.reload'),
                ),
          ),
        )
      }

      if (phase === 'loading' || doc === null) {
        return h(
          'div',
          { className: rootClass },
          h(StyleTag),
          h('div', { className: 'dsh-fa-empty' }, h('div', { className: 'dsh-fa-empty-body' }, t('status.loading'))),
        )
      }

      const gutterText = buildGutter(lines)
      const header = h(
        'div',
        { className: 'dsh-fa-toolbar' },
        h(
          'span',
          {
            className: 'dsh-fa-name',
            title: doc.absolutePath || parsedPath,
          },
          basename(parsedPath),
        ),
        h(
          'span',
          { className: 'dsh-fa-meta', title: cwd || '' },
          t('status.lines', { n: lines }),
          dirty ? ` · ${t('status.dirty')}` : '',
          selectedChars > 0 ? ` · ${t('status.selected', { n: selectedChars })}` : '',
          draft.length > MAX_SAVE_CHARS ? ` · ${t('status.plain')}` : '',
        ),
        h('span', { className: 'dsh-fa-spacer' }),
        h(
          'div',
          { className: 'dsh-fa-modes', role: 'group', 'aria-label': t('mode.label') },
          h(
            'button',
            {
              type: 'button',
              className: mode === 'annotate' ? 'dsh-fa-mode active' : 'dsh-fa-mode',
              'aria-pressed': mode === 'annotate',
              title: t('mode.annotateHint'),
              onClick: () => {
                setMode('annotate')
                setMdPreview(false)
                const ta = taRef.current
                if (ta !== null && ta.selectionEnd > ta.selectionStart) beginCompose()
              },
            },
            `✎ ${t('mode.annotate')}`,
          ),
          h(
            'button',
            {
              type: 'button',
              className: mode === 'edit' ? 'dsh-fa-mode active' : 'dsh-fa-mode',
              'aria-pressed': mode === 'edit',
              title: t('mode.editHint'),
              onClick: () => {
                setMode('edit')
                setMdPreview(false)
                setComposer(null)
              },
            },
            `⌨ ${t('mode.edit')}`,
          ),
        ),
        language === 'markdown'
          ? h(
              'button',
              {
                type: 'button',
                className: mdPreview ? 'dsh-fa-btn primary' : 'dsh-fa-btn',
                title: t('action.mdPreview'),
                'aria-pressed': mdPreview,
                onClick: () => setMdPreview((value) => !value),
              },
              t('action.mdPreview'),
            )
          : null,
        h(
          'button',
          {
            type: 'button',
            className: 'dsh-fa-btn glyph',
            title: t('action.preview'),
            'aria-label': t('action.preview'),
            onClick: openPreview,
          },
          '↗',
        ),
        h(
          'button',
          {
            type: 'button',
            className: 'dsh-fa-btn glyph',
            title: dirty ? `${t('action.reload')} — ${t('status.dirty')}` : t('action.reload'),
            'aria-label': t('action.reload'),
            disabled: dirty,
            onClick: () => setReloadTick((value) => value + 1),
          },
          '⟳',
        ),
        h(
          'button',
          {
            type: 'button',
            className: 'dsh-fa-btn primary',
            disabled: !dirty || saving || doc.truncated,
            title: doc.truncated ? t('save.truncated') : t('action.save'),
            onClick: save,
          },
          saving ? t('action.saving') : t('action.save'),
        ),
      )

      const statusLine =
        status === null
          ? null
          : h(
              'div',
              {
                className:
                  status.kind === 'error'
                    ? 'dsh-fa-status error'
                    : status.kind === 'ok'
                      ? 'dsh-fa-status ok'
                      : 'dsh-fa-status',
                role: status.kind === 'error' ? 'alert' : 'status',
                'aria-live': status.kind === 'error' ? 'assertive' : 'polite',
              },
              status.text,
            )

      const currentGlobal = globalAnnotations[globalIndex]

      return h(
        'div',
        { className: rootClass },
        h(StyleTag),
        header,
        doc.truncated
          ? h('div', { className: 'dsh-fa-note' }, t('status.truncated', { n: MAX_PAGES }))
          : null,
        statusLine,
        h(
          'div',
          { className: 'dsh-fa-editor' },
          mdPreview
            ? h('div', { className: 'dsh-fa-md' }, ...renderMarkdown(draft))
            : composer === null
            ? h(
                React.Fragment,
                null,
                h('pre', { ref: gutterRef, className: 'dsh-fa-gutter', 'aria-hidden': true }, gutterText),
                h(
                  'div',
                  { ref: codeRef, className: composing ? 'dsh-fa-code composing' : 'dsh-fa-code' },
                  h(
                    'pre',
                    { ref: preRef, className: 'dsh-fa-highlight', 'aria-hidden': true },
                    highlighted,
                    '\n',
                  ),
                  h('textarea', {
                    ref: taRef,
                    className: 'dsh-fa-textarea',
                    value: draft,
                    spellCheck: false,
                    autoCapitalize: 'off',
                    autoCorrect: 'off',
                    wrap: 'off',
                    'aria-label': t('type.label'),
                    onChange: (event) => setDraft(event.currentTarget.value),
                    onSelect: () => {
                      syncSelection()
                      scheduleAutoAnnotate()
                    },
                    onKeyUp: (event) => {
                      syncSelection()
                      const selectAll =
                        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'a'
                      if (event.shiftKey || selectAll) scheduleAutoAnnotate()
                    },
                    onMouseUp: () => {
                      syncSelection()
                      scheduleAutoAnnotate()
                    },
                    onClick: syncSelection,
                    onMouseDown: () => {
                      dragFromEditorRef.current = true
                    },
                    onKeyDown,
                    onScroll: handleScroll,
                    onCompositionStart: () => setComposing(true),
                    onCompositionEnd: () => setComposing(false),
                  }),
                ),
              )
            : renderAnnotationView(),
        ),
        globalAnnotations.length > 0 && phase === 'ready'
          ? h(
              'div',
              { className: 'dsh-fa-review', role: 'group', 'aria-label': t('review.label') },
              h(
                'div',
                {
                  className:
                    currentGlobal === undefined || currentGlobal.annotation.stale !== true
                      ? 'dsh-fa-review-note'
                      : 'dsh-fa-review-note stale',
                  'aria-live': 'polite',
                  title: currentGlobal === undefined ? '' : currentGlobal.annotation.note,
                },
                currentGlobal === undefined
                  ? ''
                  : currentGlobal.annotation.stale === true
                    ? `${t('review.staleBadge')} · ${currentGlobal.annotation.note}`
                    : currentGlobal.annotation.note,
              ),
              h(
                'div',
                { className: 'dsh-fa-review-row' },
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsh-fa-review-submit',
                    title: t('review.submitHint'),
                    disabled: annotations.length === 0,
                    onClick: submitReview,
                  },
                  t('review.submit'),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsh-fa-review-text',
                    title: t('review.clearHint'),
                    disabled: annotations.length === 0,
                    onClick: clearReview,
                  },
                  t('review.clear'),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsh-fa-review-text danger',
                    title: t('review.clearAllHint'),
                    onClick: clearAllReview,
                  },
                  t('review.clearAll'),
                ),
                h(
                  'span',
                  {
                    className: 'dsh-fa-review-count',
                    title: currentGlobal === undefined ? '' : currentGlobal.annotation.note,
                  },
                  `${globalIndex + 1}/${globalAnnotations.length}`,
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsh-fa-review-nav',
                    title: t('review.prev'),
                    'aria-label': t('review.prev'),
                    onClick: () => navigateGlobal(-1),
                  },
                  '↑',
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsh-fa-review-nav',
                    title: t('review.next'),
                    'aria-label': t('review.next'),
                    onClick: () => navigateGlobal(1),
                  },
                  '↓',
                ),
              ),
            )
          : null,
      )

      function gutterRange(start, count) {
        const parts = []
        for (let index = 0; index < count; index += 1) parts.push(String(start + index))
        return parts.join('\n')
      }

      function renderViewRow(text, startLine, keyName, selected) {
        const count = text.split('\n').length
        return h(
          'div',
          {
            key: keyName,
            className: selected ? 'dsh-fa-view-row selected' : 'dsh-fa-view-row',
          },
          h(
            'pre',
            { className: 'dsh-fa-view-gutter', 'aria-hidden': true },
            gutterRange(startLine, count),
          ),
          h('pre', { className: 'dsh-fa-view-code' }, renderHighlight(text, language), '\n'),
        )
      }

      function renderAnnotationView() {
        const all = draft.split('\n')
        const start = Math.max(1, composer.startLine)
        const end = Math.max(start, composer.endLine)
        const before = all.slice(0, start - 1).join('\n')
        const selected = all.slice(start - 1, end).join('\n')
        const after = all.slice(end).join('\n')
        const rows = []
        if (before !== '') rows.push(renderViewRow(before, 1, 'before', false))
        rows.push(renderViewRow(selected, start, 'selected', true))
        rows.push(
          h(
            'div',
            { key: 'composer', className: 'dsh-fa-annotate-row', ref: blockRef },
            h('div', { className: 'dsh-fa-view-gutter', 'aria-hidden': true }),
            renderInlineComposer(),
          ),
        )
        if (after !== '') rows.push(renderViewRow(after, end + 1, 'after', false))
        return h('div', { ref: viewRef, className: 'dsh-fa-view' }, rows)
      }

      function renderInlineComposer() {
        const selected = Math.max(0, composer.end - composer.start)
        return h(
          'div',
          { className: 'dsh-fa-inline' },
          h(
            'div',
            { className: 'dsh-fa-inline-meta' },
            lineRange(composer.startLine, composer.endLine, t),
            ` · ${t('composer.selected', { n: selected })}`,
          ),
          h('textarea', {
            ref: noteRef,
            className: 'dsh-fa-inline-input',
            rows: 4,
            value: note,
            placeholder: t('composer.placeholder'),
            'aria-label': t('composer.placeholder'),
            onChange: (event) => setNote(event.currentTarget.value),
            onCompositionStart: () => {
              noteComposingRef.current = true
            },
            onCompositionEnd: () => {
              noteComposingRef.current = false
              noteCompositionEndAtRef.current = Date.now()
            },
            onKeyDown: (event) => {
              const composing =
                noteComposingRef.current ||
                Date.now() - noteCompositionEndAtRef.current < 80 ||
                (event.nativeEvent !== undefined &&
                  (event.nativeEvent.isComposing === true || event.nativeEvent.keyCode === 229))
              if (composing) return
              if (event.key === 'Escape') {
                event.preventDefault()
                setComposer(null)
                return
              }
              // Enter publishes; Shift+Enter keeps the textarea newline. Never
              // publish while an IME composition is still being confirmed.
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                commitAnnotation()
              }
            },
          }),
          showSuggestion
            ? h(
                'div',
                { className: 'dsh-fa-inline-suggestion' },
                h('textarea', {
                  className: 'dsh-fa-inline-input',
                  rows: 2,
                  'aria-label': t('composer.suggestionPlaceholder'),
                  value: suggestion,
                  placeholder: t('composer.suggestionPlaceholder'),
                  onChange: (event) => setSuggestion(event.currentTarget.value),
                }),
              )
            : null,
          h(
            'div',
            { className: 'dsh-fa-inline-actions' },
            h(
              'button',
              {
                type: 'button',
                className: 'dsh-fa-link',
                onClick: () => {
                  if (showSuggestion) {
                    setShowSuggestion(false)
                    setSuggestion('')
                  } else {
                    setShowSuggestion(true)
                  }
                },
              },
              showSuggestion
                ? t('composer.removeSuggestion')
                : `+ ${t('composer.addSuggestion')}`,
            ),
            h('span', { className: 'dsh-fa-spacer' }),
            h(
              'button',
              { type: 'button', className: 'dsh-fa-btn', onClick: () => setComposer(null) },
              t('composer.cancel'),
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'dsh-fa-btn publish',
                disabled: note.trim() === '',
                onClick: commitAnnotation,
              },
              t('composer.publish'),
            ),
          ),
        )
      }

    }

    function StyleTag() {
      return h('style', null, CSS)
    }

    const CSS = `
.dsh-fa-root { position:relative; display:flex; flex-direction:column; height:100%; min-height:0; overflow:hidden; color:var(--fa-text); background:var(--fa-bg); font-size:12px; }
.dsh-fa-root, .dsh-fa-workspace-root { --fa-bg:var(--shiki-background, var(--dsw-alias-markdown-code-block)); --fa-surface:var(--dsw-alias-bg-layer-1); --fa-elevated:var(--dsw-alias-bg-layer-2); --fa-border:var(--dsw-alias-border-l1); --fa-text:var(--shiki-foreground, var(--dsw-alias-label-primary)); --fa-muted:var(--dsw-alias-label-secondary); --fa-dim:var(--dsw-alias-label-secondary); --fa-accent:var(--dsw-alias-brand-primary); --fa-sel:color-mix(in srgb, var(--dsw-alias-brand-primary) 28%, transparent); --fa-kw:var(--shiki-token-keyword); --fa-str:var(--shiki-token-string); --fa-com:var(--shiki-token-comment); --fa-num:var(--shiki-token-constant); --fa-fn:var(--shiki-token-function); --fa-ok:var(--dsw-alias-state-success-primary); --fa-danger:var(--dsw-alias-state-error-primary); --fa-warn:var(--dsw-alias-state-warn-primary); --fa-caret:var(--dsw-alias-label-primary); --fa-shadow:none; }
.dsh-fa-review { position:absolute; right:14px; bottom:14px; z-index:20; display:flex; flex-direction:column; align-items:stretch; gap:2px; padding:4px; border:1px solid var(--fa-border); border-radius:10px; background:var(--fa-elevated); box-shadow:var(--fa-shadow); color:var(--fa-text); }
.dsh-fa-review-row { display:flex; align-items:center; gap:2px; }
.dsh-fa-review-note.stale { color:var(--fa-warn); }
.dsh-fa-review-note { max-width:360px; padding:2px 6px; color:var(--fa-muted); font-size:11px; line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.dsh-fa-review-submit { appearance:none; height:26px; padding:0 10px; border:0; border-radius:7px; background:var(--fa-ok); color:var(--dsw-alias-bg-base); font:inherit; font-size:11px; font-weight:600; cursor:pointer; }
.dsh-fa-review-submit:hover { filter:brightness(1.06); }
.dsh-fa-review-text { appearance:none; height:26px; padding:0 8px; border:0; border-radius:7px; background:transparent; color:var(--fa-muted); font:inherit; font-size:11px; cursor:pointer; }
.dsh-fa-review-text:hover { background:var(--fa-surface); color:var(--fa-text); }
.dsh-fa-review-text.danger { color:var(--fa-danger); }
.dsh-fa-review-text.danger:hover { background:color-mix(in srgb, var(--fa-danger) 12%, transparent); color:var(--fa-danger); }
.dsh-fa-review-count { min-width:76px; padding:0 4px; text-align:center; color:var(--fa-muted); font:11px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
.dsh-fa-review-nav { appearance:none; width:26px; height:26px; border:0; border-radius:7px; background:transparent; color:var(--fa-muted); font:13px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; cursor:pointer; }
.dsh-fa-review-nav:hover { background:var(--fa-surface); color:var(--fa-text); }
.dsh-fa-toolbar { display:flex; flex-wrap:nowrap; align-items:center; gap:6px; height:38px; min-height:38px; box-sizing:border-box; padding:0 8px; border-bottom:1px solid var(--fa-border); background:var(--fa-bg); overflow:hidden; }
.dsh-fa-name { min-width:0; flex:0 1 auto; max-width:40%; font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.dsh-fa-meta { min-width:0; flex:0 1 auto; color:var(--fa-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:11px; }
.dsh-fa-spacer { flex:1 1 auto; }
.dsh-fa-btn { flex:none; appearance:none; border:1px solid var(--fa-border); background:transparent; color:var(--fa-text); border-radius:6px; font:inherit; font-size:11px; line-height:1; padding:5px 8px; cursor:pointer; white-space:nowrap; }
.dsh-fa-btn:hover:not(:disabled) { background:var(--fa-elevated); }
.dsh-fa-btn:disabled { opacity:.45; cursor:default; }
.dsh-fa-btn.primary { border-color:var(--fa-accent); color:var(--fa-accent); font-weight:600; }
.dsh-fa-btn.primary:hover:not(:disabled) { background:color-mix(in srgb, var(--fa-accent) 14%, transparent); }
.dsh-fa-btn.glyph { padding:5px 7px; font-size:13px; }
.dsh-fa-btn.annotate { border-color:var(--fa-accent); color:var(--fa-accent); }
.dsh-fa-link { appearance:none; border:0; background:none; color:var(--fa-muted); font:inherit; font-size:11px; padding:2px 0; cursor:pointer; text-align:left; }
.dsh-fa-link:hover { color:var(--fa-accent); }
.dsh-fa-note { padding:4px 8px; color:var(--fa-warn); font-size:11px; border-bottom:1px solid var(--fa-border); }
.dsh-fa-status { padding:4px 8px; font-size:11px; color:var(--fa-muted); border-bottom:1px solid var(--fa-border); }
.dsh-fa-status.ok { color:var(--fa-ok); }
.dsh-fa-status.error { color:var(--fa-danger); }
.dsh-fa-editor { position:relative; display:flex; flex:1 1 auto; min-height:120px; overflow:hidden; background:var(--fa-bg); }
.dsh-fa-md { flex:1 1 auto; min-width:0; overflow:auto; padding:24px 30px 64px; background:var(--fa-bg); color:var(--fa-text); font-size:13px; line-height:1.75; }
.dsh-fa-md > :first-child { margin-top:0; }
.dsh-fa-md h1, .dsh-fa-md h2, .dsh-fa-md h3, .dsh-fa-md h4, .dsh-fa-md h5, .dsh-fa-md h6 { margin:1.2em 0 .5em; font-weight:650; line-height:1.3; color:var(--fa-text); }
.dsh-fa-md h1 { font-size:1.75em; padding-bottom:.25em; border-bottom:1px solid var(--fa-border); }
.dsh-fa-md h2 { font-size:1.4em; padding-bottom:.2em; border-bottom:1px solid var(--fa-border); }
.dsh-fa-md h3 { font-size:1.18em; }
.dsh-fa-md h4 { font-size:1.05em; }
.dsh-fa-md h5, .dsh-fa-md h6 { font-size:1em; color:var(--fa-muted); }
.dsh-fa-md p { margin:.7em 0; }
.dsh-fa-md ul, .dsh-fa-md ol { margin:.7em 0; padding-left:1.7em; }
.dsh-fa-md li { margin:.22em 0; }
.dsh-fa-md li > input[type="checkbox"] { margin-right:.45em; vertical-align:middle; accent-color:var(--fa-accent); }
.dsh-fa-md blockquote { margin:.8em 0; padding:.15em 0 .15em 1em; border-left:3px solid var(--fa-border); color:var(--fa-muted); }
.dsh-fa-md blockquote p { margin:.35em 0; }
.dsh-fa-md code { padding:.12em .35em; border:1px solid var(--fa-border); border-radius:4px; background:var(--fa-elevated); font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size:.92em; }
.dsh-fa-md pre { margin:.8em 0; padding:12px 14px; border:1px solid var(--fa-border); border-radius:8px; background:var(--fa-surface); overflow:auto; }
.dsh-fa-md pre code { padding:0; border:0; background:transparent; border-radius:0; font-size:12px; line-height:1.6; }
.dsh-fa-md a { color:var(--fa-accent); text-decoration:underline; text-underline-offset:2px; }
.dsh-fa-md a:hover { filter:brightness(1.1); }
.dsh-fa-md hr { margin:1.4em 0; border:0; border-top:1px solid var(--fa-border); }
.dsh-fa-md table { width:100%; max-width:100%; margin:.8em 0; border-collapse:collapse; display:block; overflow:auto; font-size:12.5px; }
.dsh-fa-md th, .dsh-fa-md td { padding:6px 10px; border:1px solid var(--fa-border); text-align:left; vertical-align:top; }
.dsh-fa-md th { background:var(--fa-surface); font-weight:600; }
.dsh-fa-md img { max-width:100%; height:auto; border-radius:6px; }
.dsh-fa-md strong { font-weight:650; }
.dsh-fa-md em { font-style:italic; }

.dsh-fa-filetree-inner { display:flex; flex-direction:column; min-height:0; flex:1; }
.dsh-fa-filetree-head { flex:none; height:38px; box-sizing:border-box; display:flex; align-items:center; gap:2px; padding:0 6px 0 10px; border-bottom:1px solid var(--fa-border); background:var(--fa-bg); }
.dsh-fa-filetree-title { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--fa-muted); font-size:10px; text-transform:uppercase; letter-spacing:.06em; }
.dsh-fa-filetree-btn { appearance:none; width:24px; height:24px; box-sizing:border-box; border:1px solid var(--fa-border); background:var(--fa-bg); color:var(--fa-muted); cursor:pointer; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; font-size:12px; padding:0; }
.dsh-fa-filetree-btn:hover { background:var(--fa-elevated); color:var(--fa-text); }
.dsh-fa-filetree-filter { flex:none; margin:6px 8px; height:24px; padding:0 7px; border:1px solid var(--fa-border); border-radius:6px; background:var(--fa-bg); color:var(--fa-text); font:11px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; outline:none; }
.dsh-fa-filetree-filter:focus { border-color:var(--fa-accent); }
.dsh-fa-filetree-list { flex:1; min-height:0; overflow:auto; padding:2px 4px 8px; }
.dsh-fa-filetree-row { appearance:none; width:100%; height:26px; display:flex; align-items:center; gap:2px; padding:0 4px; border:0; border-radius:5px; background:transparent; color:var(--fa-text); font:11px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; text-align:left; cursor:pointer; white-space:nowrap; }
.dsh-fa-filetree-row:hover { background:var(--fa-elevated); }
.dsh-fa-filetree-row.active { background:var(--fa-sel); color:var(--fa-text); }
.dsh-fa-filetree-row.focused:focus-visible { outline:1px solid var(--fa-accent); outline-offset:-1px; }
.dsh-fa-filetree-list:focus-visible { outline:1px solid var(--fa-accent); outline-offset:-1px; }
.dsh-fa-filetree-caret { flex:none; width:10px; color:var(--fa-dim); font-size:9px; text-align:center; }
.dsh-fa-filetree-name { min-width:0; overflow:hidden; text-overflow:ellipsis; }
.dsh-fa-filetree-status { padding:8px; color:var(--fa-muted); font-size:10px; }
.dsh-fa-filetree-status.error { width:100%; border:0; background:transparent; text-align:left; color:var(--fa-danger); cursor:pointer; }
.dsh-fa-workspace-root { display:flex; flex:1 1 auto; height:100%; min-height:0; background:var(--fa-bg); color:var(--fa-text); font-size:12px; }
.dsh-fa-workspace-tree { position:relative; flex:none; display:flex; flex-direction:column; min-height:0; background:var(--fa-bg); border-right:1px solid var(--fa-border); overflow:hidden; }
.dsh-fa-workspace-tree .dsh-fa-filetree-inner { flex:1 1 auto; min-height:0; }
.dsh-fa-workspace-resizer { position:absolute; top:0; right:0; width:5px; height:100%; cursor:col-resize; z-index:5; }
.dsh-fa-workspace-resizer:hover { background:color-mix(in srgb, var(--fa-accent) 25%, transparent); }
.dsh-fa-workspace-rail { flex:none; width:30px; display:flex; flex-direction:column; align-items:center; padding-top:6px; background:var(--fa-bg); border-right:1px solid var(--fa-border); }
.dsh-fa-workspace-rail-btn { width:24px; height:24px; box-sizing:border-box; display:inline-flex; align-items:center; justify-content:center; border:1px solid var(--fa-border); border-radius:6px; background:var(--fa-bg); color:var(--fa-muted); cursor:pointer; }
.dsh-fa-workspace-rail-btn:hover { background:var(--fa-elevated); color:var(--fa-text); }
.dsh-fa-workspace-main { flex:1 1 auto; min-width:0; min-height:0; display:flex; flex-direction:column; }
.dsh-fa-workspace-empty { flex:1 1 auto; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; color:var(--fa-muted); }
.dsh-fa-workspace-empty-icon { display:flex; color:var(--fa-dim); }
.dsh-fa-workspace-empty-icon svg { width:30px; height:30px; }
.dsh-fa-workspace-empty-title { font-size:13px; font-weight:600; color:var(--fa-text); }
.dsh-fa-workspace-empty-body { font-size:11px; }
.dsh-fa-btn.glyph.active { background:color-mix(in srgb, var(--fa-accent) 14%, transparent); border-color:var(--fa-accent); color:var(--fa-accent); }
.dsh-fa-gutter { position:absolute; left:0; top:0; bottom:0; z-index:2; width:44px; height:100%; box-sizing:border-box; margin:0; padding:8px 8px 8px 4px; text-align:right; color:var(--fa-dim); background:var(--fa-bg); border-right:none; font:12px/1.6 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-variant-numeric:tabular-nums; white-space:pre; overflow:hidden; user-select:none; }
.dsh-fa-code { position:relative; flex:1 1 auto; min-width:0; overflow:hidden; background:var(--fa-bg); }
.dsh-fa-highlight { position:absolute; inset:0; margin:0; padding:8px 8px 8px 52px; overflow:hidden; white-space:pre; tab-size:2; font:12px/1.6 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; color:var(--fa-text); pointer-events:none; }
.dsh-fa-textarea { position:absolute; inset:0; box-sizing:border-box; width:100%; height:100%; margin:0; padding:8px 8px 8px 52px; border:0; outline:none; resize:none; background:transparent; color:transparent; caret-color:var(--fa-caret); font:12px/1.6 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space:pre; overflow:auto; scrollbar-gutter:stable; tab-size:2; }
.dsh-fa-textarea::selection { background:var(--fa-sel); color:transparent; }
.dsh-fa-code.composing .dsh-fa-highlight { visibility:hidden; }
.dsh-fa-code.composing .dsh-fa-textarea { color:var(--fa-text); }
.dsh-fa-tok-kw { color:var(--fa-kw); }
.dsh-fa-tok-str { color:var(--fa-str); }
.dsh-fa-tok-num { color:var(--fa-num); }
.dsh-fa-tok-com { color:var(--fa-com); font-style:italic; }
.dsh-fa-tok-fn { color:var(--fa-fn); }
.dsh-fa-modes { display:inline-flex; flex:none; border:1px solid var(--fa-border); border-radius:7px; overflow:hidden; }
.dsh-fa-mode { appearance:none; border:0; background:transparent; color:var(--fa-muted); font:inherit; font-size:11px; line-height:1; padding:5px 8px; cursor:pointer; }
.dsh-fa-mode.active { background:var(--fa-elevated); color:var(--fa-text); }
.dsh-fa-mode + .dsh-fa-mode { border-left:1px solid var(--fa-border); }
.dsh-fa-view { position:relative; flex:1 1 auto; min-height:0; overflow:auto; scrollbar-gutter:stable; padding:8px 0; background:var(--fa-bg); font:12px/1.6 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
.dsh-fa-view-row { display:flex; align-items:flex-start; }
.dsh-fa-view-row.selected { background:transparent; }
.dsh-fa-view-row.selected .dsh-fa-view-gutter { background:var(--fa-bg); }
.dsh-fa-view-row.selected .dsh-fa-view-code { background:var(--fa-sel); background-clip:content-box; }
.dsh-fa-view-gutter { flex:0 0 44px; box-sizing:border-box; width:44px; margin:0; padding:0 8px 0 4px; text-align:right; color:var(--fa-dim); background:var(--fa-bg); white-space:pre; font:inherit; line-height:1.6; font-variant-numeric:tabular-nums; user-select:none; }
.dsh-fa-view-code { flex:1 1 auto; min-width:0; margin:0; padding:0 8px; white-space:pre; color:var(--fa-text); font:inherit; line-height:1.6; tab-size:2; }
.dsh-fa-annotate-row { display:flex; align-items:stretch; }
.dsh-fa-annotate-row .dsh-fa-view-gutter { background:var(--fa-bg); }
.dsh-fa-inline { flex:1 1 auto; min-width:0; margin:8px 10px 12px 8px; padding:8px; display:flex; flex-direction:column; gap:6px; background:var(--fa-elevated); border:1px solid var(--fa-border); border-radius:10px; box-shadow:var(--fa-shadow); }
.dsh-fa-inline-meta { color:var(--fa-muted); font-size:11px; }
.dsh-fa-inline-input { box-sizing:border-box; width:100%; min-height:92px; margin:0; padding:2px 0; border:0; background:transparent; color:var(--fa-text); font-family:inherit; font-size:13px; line-height:1.6; resize:none; outline:none; }
.dsh-fa-inline-input::placeholder { color:var(--fa-dim); }
.dsh-fa-inline-suggestion { border-top:1px solid var(--fa-border); padding-top:6px; }
.dsh-fa-inline-suggestion .dsh-fa-inline-input { min-height:56px; font-size:12px; }
.dsh-fa-inline-actions { display:flex; align-items:center; gap:8px; }
.dsh-fa-btn.publish { background:var(--fa-accent); border-color:var(--fa-accent); color:var(--dsw-alias-bg-base); font-weight:600; }
.dsh-fa-btn.publish:hover:not(:disabled) { background:var(--fa-accent); opacity:.9; }
.dsh-fa-btn.publish:disabled { opacity:.45; }
.dsh-fa-empty { flex:1 1 auto; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; padding:24px; text-align:center; }
.dsh-fa-empty-title { font-weight:600; font-size:13px; }
.dsh-fa-empty-body { margin:0; color:var(--fa-muted); font-size:12px; line-height:1.6; max-width:280px; }
.dsh-fa-tree { display:flex; flex-direction:column; height:100%; min-height:0; color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-base); font-size:12px; }
.dsh-fa-tree-note { padding:4px 10px; color:var(--dsw-alias-label-secondary); font-size:11px; line-height:1.5; }
.dsh-fa-tree-note.error { color:var(--dsw-alias-state-error-primary); }
.dsh-fa-tree-title { display:inline-flex; align-items:center; gap:6px; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.dsh-fa-tree-title-icon { display:inline-flex; color:var(--dsw-alias-label-secondary); }
.dsh-fa-tree-error { margin:0 10px; padding:8px; border:1px solid var(--dsw-alias-border-l2); border-radius:8px; background:var(--dsw-alias-bg-layer-1); color:var(--dsw-alias-state-error-primary); font:11px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space:pre-wrap; overflow:auto; max-height:240px; }
.dsh-fa-tree-fallback-actions { padding:10px; }
.dsh-fa-tree-btn { height:28px; padding:0 10px; border:1px solid var(--dsw-alias-border-l2); border-radius:8px; background:transparent; color:var(--dsw-alias-label-primary); font:inherit; font-size:12px; cursor:pointer; }
.dsh-fa-tree-btn:hover { border-color:var(--dsw-alias-border-l1); background:var(--dsw-alias-bg-layer-2); }
`

    function parseFileAddress(address) {
      if (typeof address !== 'string') return null
      const prefix = 'dsh-resource://file/session/'
      if (!address.startsWith(prefix)) return null
      const rest = address.slice(prefix.length)
      const slash = rest.indexOf('/')
      if (slash < 0) return null
      try {
        const sessionId = decodeURIComponent(rest.slice(0, slash))
        const path = decodeURIComponent(rest.slice(slash + 1))
        if (sessionId === '' || path === '') return null
        return { sessionId, path }
      } catch {
        return null
      }
    }

    function basename(path) {
      if (typeof path !== 'string' || path === '') return ''
      const normalized = path.replace(/\\/g, '/').replace(/\/+$/, '')
      const index = normalized.lastIndexOf('/')
      return index < 0 ? normalized : normalized.slice(index + 1)
    }

    const MODE_KEY = 'dsh.file-annotate.mode'

    function readStoredMode() {
      try {
        return window.localStorage.getItem(MODE_KEY) === 'edit' ? 'edit' : 'annotate'
      } catch {
        return 'annotate'
      }
    }

    function persistMode(mode) {
      try {
        window.localStorage.setItem(MODE_KEY, mode)
      } catch {
        // The preference stays in memory when storage is unavailable.
      }
    }

    function languageOf(path) {
      const name = basename(path).toLowerCase()
      const dot = name.lastIndexOf('.')
      const ext = dot === -1 ? name : name.slice(dot + 1)
      switch (ext) {
        case 'py':
        case 'pyw':
          return 'python'
        case 'js':
        case 'jsx':
        case 'ts':
        case 'tsx':
        case 'mjs':
        case 'cjs':
        case 'mts':
        case 'cts':
          return 'js'
        case 'json':
        case 'jsonc':
          return 'json'
        case 'md':
        case 'markdown':
        case 'mdx':
          return 'markdown'
        case 'sh':
        case 'bash':
        case 'zsh':
        case 'fish':
          return 'shell'
        case 'yml':
        case 'yaml':
        case 'toml':
        case 'ini':
        case 'conf':
          return 'config'
        case 'css':
        case 'scss':
        case 'sass':
        case 'less':
          return 'css'
        case 'html':
        case 'htm':
        case 'xml':
        case 'svg':
        case 'vue':
        case 'svelte':
        case 'astro':
          return 'html'
        default:
          return 'text'
      }
    }

    const TOKENIZER_CACHE = new Map()

    const PY_KEYWORDS = new Set(
      'False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield'.split(
        ' ',
      ),
    )
    const JS_KEYWORDS = new Set(
      'as async await break case catch class const continue debugger default delete do else enum export extends false finally for from function get if implements import in instanceof interface let new null of package private protected public readonly return set static super switch this throw true try typeof undefined var void while with yield'.split(
        ' ',
      ),
    )
    const SHELL_KEYWORDS = new Set(
      'case do done elif else esac fi for function if in local return select then until while export echo cd'.split(' '),
    )
    const CONFIG_KEYWORDS = new Set('true false null yes no on off'.split(' '))
    const JSON_KEYWORDS = new Set('true false null'.split(' '))

    function tokenizerFor(language) {
      const cached = TOKENIZER_CACHE.get(language)
      if (cached !== undefined) return cached
      const parts = []
      if (language === 'python' || language === 'shell' || language === 'config') {
        parts.push('(?<comment>#[^\\n]*)')
      } else if (language === 'html') {
        parts.push('(?<comment><!--[\\s\\S]*?-->)')
      } else if (language !== 'json' && language !== 'markdown' && language !== 'text') {
        parts.push('(?<comment>\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)')
      }
      parts.push(
        "(?<string>\"\"\"[\\s\\S]*?\"\"\"|'''[\\s\\S]*?'''|\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*')",
      )
      parts.push('(?<number>\\b0[xX][\\da-fA-F]+\\b|\\b\\d+(?:\\.\\d+)?\\b)')
      const keywords =
        language === 'python'
          ? PY_KEYWORDS
          : language === 'js'
            ? JS_KEYWORDS
            : language === 'shell'
              ? SHELL_KEYWORDS
              : language === 'config'
                ? CONFIG_KEYWORDS
                : language === 'json'
                  ? JSON_KEYWORDS
                  : null
      if (keywords !== null) {
        parts.push(`(?<keyword>\\b(?:${[...keywords].join('|')})\\b)`)
      }
      parts.push('(?<fn>[A-Za-z_$][\\w$]*)(?=\\s*\\()')
      const re = new RegExp(parts.join('|'), 'g')
      TOKENIZER_CACHE.set(language, re)
      return re
    }

    function tokenize(code, language) {
      if (
        code === '' ||
        code.length > 200000 ||
        language === 'text' ||
        language === 'markdown'
      ) {
        return [{ text: code, cls: null }]
      }
      const re = tokenizerFor(language)
      re.lastIndex = 0
      const tokens = []
      let last = 0
      let guard = 0
      let match
      while ((match = re.exec(code)) !== null && guard < 20000) {
        guard += 1
        if (match.index > last) tokens.push({ text: code.slice(last, match.index), cls: null })
        const groups = match.groups ?? {}
        const cls = groups.comment
          ? 'com'
          : groups.string
            ? 'str'
            : groups.number
              ? 'num'
              : groups.keyword
                ? 'kw'
                : groups.fn
                  ? 'fn'
                  : null
        tokens.push({ text: match[0], cls })
        last = match.index + match[0].length
        if (match[0].length === 0) re.lastIndex += 1
      }
      if (last < code.length) tokens.push({ text: code.slice(last), cls: null })
      return tokens
    }


    function markdownSafeUrl(value) {
      const url = String(value).trim()
      if (/^https?:\/\//i.test(url) || /^mailto:/i.test(url)) return url
      return null
    }

    function markdownInline(text, keyBase) {
      const nodes = []
      const pattern =
        /(`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|\*[^*]+\*|_[^_]+_|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\))/g
      let last = 0
      let match
      let index = 0
      while ((match = pattern.exec(text)) !== null) {
        if (match.index > last) nodes.push(text.slice(last, match.index))
        const token = match[0]
        const key = `${keyBase}-${index}`
        if (token.startsWith('`') && token.endsWith('`')) {
          nodes.push(h('code', { key }, token.slice(1, -1)))
        } else if (token.startsWith('![')) {
          const image = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(token)
          const url = image === null ? null : markdownSafeUrl(image[2].split(/\s+/)[0])
          nodes.push(
            image !== null && url !== null
              ? h('img', { key, src: url, alt: image[1], loading: 'lazy' })
              : token,
          )
        } else if (token.startsWith('[')) {
          const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)
          const url = link === null ? null : markdownSafeUrl(link[2].split(/\s+/)[0])
          nodes.push(
            link !== null && url !== null
              ? h(
                  'a',
                  { key, href: url, target: '_blank', rel: 'noreferrer noopener' },
                  ...markdownInline(link[1], `${key}-label`),
                )
              : token,
          )
        } else if (token.startsWith('**') || token.startsWith('__')) {
          nodes.push(h('strong', { key }, ...markdownInline(token.slice(2, -2), `${key}-strong`)))
        } else if (token.startsWith('~~')) {
          nodes.push(h('del', { key }, ...markdownInline(token.slice(2, -2), `${key}-del`)))
        } else {
          nodes.push(h('em', { key }, ...markdownInline(token.slice(1, -1), `${key}-em`)))
        }
        last = match.index + token.length
        index += 1
      }
      if (last < text.length) nodes.push(text.slice(last))
      return nodes
    }

    function markdownTableCells(line) {
      return String(line)
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((cell) => cell.trim())
    }

    function renderMarkdown(text) {
      const lines = String(text).replace(/\r\n?/g, '\n').split('\n')
      const blocks = []
      let index = 0
      let key = 0
      const nextKey = () => `md-${key++}`
      const isBlockStart = (line, at) => {
        if (/^\s*(#{1,6})\s+/.test(line)) return true
        if (/^\s*```/.test(line)) return true
        if (/^\s*>/.test(line)) return true
        if (/^\s*([-*+]|\d+\.)\s+/.test(line)) return true
        if (/^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/.test(line)) return true
        return (
          line.includes('|') &&
          at + 1 < lines.length &&
          /^\s*\|?\s*:?-{3,}/.test(lines[at + 1])
        )
      }

      while (index < lines.length) {
        const line = lines[index]
        if (/^\s*$/.test(line)) {
          index += 1
          continue
        }

        const fence = /^\s*```([A-Za-z0-9_+-]*)\s*$/.exec(line)
        if (fence !== null) {
          const code = []
          index += 1
          while (index < lines.length && !/^\s*```\s*$/.test(lines[index])) {
            code.push(lines[index])
            index += 1
          }
          if (index < lines.length) index += 1
          blocks.push(
            h(
              'pre',
              { key: nextKey(), 'data-lang': fence[1] || undefined },
              h('code', null, code.join('\n')),
            ),
          )
          continue
        }

        const heading = /^\s*(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line)
        if (heading !== null) {
          const level = Math.min(6, heading[1].length)
          blocks.push(
            h(`h${level}`, { key: nextKey() }, ...markdownInline(heading[2], `${key}-h`)),
          )
          index += 1
          continue
        }

        if (/^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/.test(line)) {
          blocks.push(h('hr', { key: nextKey() }))
          index += 1
          continue
        }

        if (/^\s*>/.test(line)) {
          const quoted = []
          while (index < lines.length && /^\s*>/.test(lines[index])) {
            quoted.push(lines[index].replace(/^\s*>\s?/, ''))
            index += 1
          }
          const children = []
          quoted.forEach((part, partIndex) => {
            if (partIndex > 0) children.push(h('br', { key: `${key}-br-${partIndex}` }))
            children.push(...markdownInline(part, `${key}-quote-${partIndex}`))
          })
          blocks.push(h('blockquote', { key: nextKey() }, ...children))
          continue
        }

        const listMatch = /^\s*([-*+]|\d+\.)\s+(.*)$/.exec(line)
        if (listMatch !== null) {
          const ordered = listMatch[1].endsWith('.')
          const items = []
          while (index < lines.length) {
            const item = /^\s*([-*+]|\d+\.)\s+(.*)$/.exec(lines[index])
            if (item === null || item[1].endsWith('.') !== ordered) break
            let content = item[2]
            index += 1
            while (
              index < lines.length &&
              !/^\s*$/.test(lines[index]) &&
              !/^\s*([-*+]|\d+\.)\s+/.test(lines[index]) &&
              /^\s{2,}/.test(lines[index])
            ) {
              content += ` ${lines[index].trim()}`
              index += 1
            }
            items.push(content)
            if (index < lines.length && /^\s*$/.test(lines[index])) {
              index += 1
              break
            }
          }
          blocks.push(
            h(
              ordered ? 'ol' : 'ul',
              { key: nextKey() },
              ...items.map((content, itemIndex) => {
                const task = /^\[([ xX])\]\s+(.*)$/.exec(content)
                const itemKey = `${key}-li-${itemIndex}`
                return h(
                  'li',
                  { key: itemKey },
                  task !== null
                    ? h(
                        React.Fragment,
                        null,
                        h('input', {
                          type: 'checkbox',
                          checked: task[1].toLowerCase() === 'x',
                          disabled: true,
                          readOnly: true,
                        }),
                        ' ',
                        ...markdownInline(task[2], `${itemKey}-task`),
                      )
                    : h(React.Fragment, null, ...markdownInline(content, itemKey)),
                )
              }),
            ),
          )
          continue
        }

        if (
          line.includes('|') &&
          index + 1 < lines.length &&
          /^\s*\|?\s*:?-{3,}/.test(lines[index + 1])
        ) {
          const headers = markdownTableCells(line)
          index += 2
          const rows = []
          while (index < lines.length && lines[index].includes('|') && !/^\s*$/.test(lines[index])) {
            rows.push(markdownTableCells(lines[index]))
            index += 1
          }
          blocks.push(
            h(
              'table',
              { key: nextKey() },
              h(
                'thead',
                null,
                h(
                  'tr',
                  null,
                  ...headers.map((cell, cellIndex) =>
                    h('th', { key: `${key}-th-${cellIndex}` }, ...markdownInline(cell, `${key}-th-${cellIndex}`)),
                  ),
                ),
              ),
              h(
                'tbody',
                null,
                ...rows.map((cells, rowIndex) =>
                  h(
                    'tr',
                    { key: `${key}-tr-${rowIndex}` },
                    ...headers.map((_, cellIndex) =>
                      h(
                        'td',
                        { key: `${key}-td-${rowIndex}-${cellIndex}` },
                        ...markdownInline(
                          cells[cellIndex] === undefined ? '' : cells[cellIndex],
                          `${key}-td-${rowIndex}-${cellIndex}`,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          )
          continue
        }

        const paragraph = []
        while (index < lines.length) {
          const candidate = lines[index]
          if (/^\s*$/.test(candidate)) break
          if (paragraph.length > 0 && isBlockStart(candidate, index)) break
          paragraph.push(candidate)
          index += 1
        }
        const paragraphKey = nextKey()
        const children = []
        paragraph.forEach((part, partIndex) => {
          if (partIndex > 0) children.push(h('br', { key: `${paragraphKey}-br-${partIndex}` }))
          children.push(...markdownInline(part, `${paragraphKey}-${partIndex}`))
        })
        blocks.push(h('p', { key: paragraphKey }, ...children))
      }
      return blocks
    }

    function renderHighlight(code, language) {
      const tokens = tokenize(code, language)
      return tokens.map((token, index) =>
        token.cls === null
          ? h('span', { key: index }, token.text)
          : h('span', { key: index, className: `dsh-fa-tok-${token.cls}` }, token.text),
      )
    }

    function lineAt(text, offset) {
      let line = 1
      const end = Math.max(0, Math.min(offset, text.length))
      for (let index = 0; index < end; index += 1) {
        if (text.charCodeAt(index) === 10) line += 1
      }
      return line
    }

    function offsetAtLine(text, line) {
      const lines = String(text).split('\n')
      const target = Math.max(1, Math.min(lines.length, Math.floor(line)))
      let offset = 0
      for (let index = 0; index < target - 1; index += 1) offset += lines[index].length + 1
      return Math.min(offset, String(text).length)
    }

    function relocateAnnotation(annotation, text) {
      const quote = typeof annotation.quote === 'string' ? annotation.quote : ''
      if (quote === '') return annotation
      const oldStart = Math.max(0, Math.min(text.length, annotation.start))
      if (text.slice(oldStart, oldStart + quote.length) === quote) {
        return annotation.stale === true ? { ...annotation, stale: false } : annotation
      }
      let best = -1
      let bestDistance = Infinity
      let cursor = text.indexOf(quote)
      let attempts = 0
      while (cursor !== -1 && attempts < 256) {
        const distance = Math.abs(cursor - oldStart)
        if (distance < bestDistance) {
          best = cursor
          bestDistance = distance
        }
        cursor = text.indexOf(quote, cursor + 1)
        attempts += 1
      }
      if (best === -1) {
        return annotation.stale === true ? annotation : { ...annotation, stale: true }
      }
      const startLine = lineAt(text, best)
      const endLine = lineAt(text, Math.max(best, best + quote.length - 1))
      if (
        best === annotation.start &&
        best + quote.length === annotation.end &&
        startLine === annotation.startLine &&
        endLine === annotation.endLine
      ) {
        return annotation.stale === true ? { ...annotation, stale: false } : annotation
      }
      return {
        ...annotation,
        start: best,
        end: best + quote.length,
        startLine,
        endLine,
        stale: false,
      }
    }

    function lineRange(startLine, endLine, t) {
      return startLine === endLine
        ? t('line.one', { n: startLine })
        : t('line.many', { a: startLine, b: endLine })
    }

    function truncate(text, max) {
      if (typeof text !== 'string') return ''
      return text.length > max ? `${text.slice(0, max)}…` : text
    }

    function buildGutter(lines) {
      const count = Math.min(lines, 20000)
      const parts = new Array(count)
      for (let index = 1; index <= count; index += 1) parts[index - 1] = String(index)
      return parts.join('\n')
    }

    async function readAll(remote, sessionId, path, signal) {
      let text = ''
      let offset = 1
      let last = null
      for (let pageIndex = 0; pageIndex < MAX_PAGES; pageIndex += 1) {
        const result = await remote.workspaceFiles.read(sessionId, path, { offset }, signal)
        if (!result.ok) throw result.error
        const page = result.value
        if (page === undefined) throw new Error('empty page')
        last = page
        if (typeof page.text === 'string' && page.text !== '') {
          if (text !== '' && !text.endsWith('\n')) text += '\n'
          text += page.text
        }
        if (page.eof) {
          return {
            text,
            version: page.version,
            absolutePath: page.absolutePath,
            bytes: page.bytes,
            truncated: false,
          }
        }
        if (!page.lines) break
        offset += page.lines
      }
      return {
        text,
        version: last?.version,
        absolutePath: last?.absolutePath,
        bytes: last?.bytes,
        truncated: true,
      }
    }

    function friendlyError(error, t) {
      const code = error?.code
      if (code === 'workspace-file/not-found') return t('error.notFound')
      if (code === 'workspace-file/not-text') return t('error.notText')
      if (code === 'workspace-file/too-large') return t('error.tooLarge')
      if (code === 'workspace-file/not-regular-file') return t('error.notRegular')
      if (code === 'workspace-file/unknown-workspace' || code === 'workspace-file/unsupported-address') return t('error.notAddress')
      return `${t('error.loadFailed')}: ${String(error?.message ?? error)}`
    }

    function saveFailureText(value, t) {
      const code = value?.text
      if (code === 'FS_SANDBOX_DENIED') return t('save.readOnly')
      if (code === 'FS_STALE_VERSION') return t('save.stale')
      if (code === 'too_large') return t('save.tooLarge')
      if (code === 'invalid_payload') return t('save.failed')
      return code || t('save.failed')
    }

    function buildMessage(filePath, items, t) {
      const sections = items.map((annotation, index) => {
        const lines = lineRange(annotation.startLine, annotation.endLine, t)
        const quote = truncate(annotation.quote, MAX_QUOTE_CHARS)
        const truncated = annotation.quote.length > MAX_QUOTE_CHARS
        let section = t('msg.item', { index: index + 1, lines })
        section += `\n${t('msg.quote')}\n${fence(quote)}`
        if (truncated) section += `\n${t('msg.truncatedQuote')}`
        section += `\n${t('msg.note')}\n${annotation.note}`
        if (typeof annotation.suggestion === 'string' && annotation.suggestion !== '') {
          section += `\n${t('msg.suggestion')}\n${fence(annotation.suggestion)}`
        }
        return section
      })
      return `${t('msg.title', { file: filePath })}\n\n${sections.join('\n\n')}\n\n${t('msg.instruction', { file: filePath })}`
    }

    function fence(text) {
      const runs = String(text).match(/`+/g)
      const longest = runs === null ? 0 : Math.max(...runs.map((run) => run.length))
      const marker = '`'.repeat(Math.max(3, longest + 1))
      return `${marker}\n${text}\n${marker}`
    }

    function storage() {
      try {
        return window.localStorage
      } catch {
        return null
      }
    }


    function deletedAnnotationsKey(sessionId) {
      return `${ANNOTATION_DELETED_PREFIX}${sessionId || 'global'}`
    }

    function loadDeletedAnnotations(sessionId) {
      try {
        const raw = window.localStorage.getItem(deletedAnnotationsKey(sessionId))
        if (raw === null) return new Set()
        const parsed = JSON.parse(raw)
        return new Set(Array.isArray(parsed) ? parsed.filter((value) => typeof value === 'string') : [])
      } catch {
        return new Set()
      }
    }

    function saveDeletedAnnotations(sessionId, deleted) {
      try {
        window.localStorage.setItem(deletedAnnotationsKey(sessionId), JSON.stringify([...deleted]))
      } catch {
        // Deletions stay in memory when storage is unavailable.
      }
    }

    function markAnnotationDeleted(sessionId, address, id) {
      if (typeof sessionId !== 'string' || sessionId === '') return
      const deleted = loadDeletedAnnotations(sessionId)
      deleted.add(`${address}::${id}`)
      saveDeletedAnnotations(sessionId, deleted)
      notifyAnnotationsChanged()
    }

    function loadAnnotations(address) {
      const store = storage()
      if (store === null || typeof address !== 'string') return []
      const addressParts = parseFileAddress(address)
      const deleted =
        addressParts === null ? new Set() : loadDeletedAnnotations(addressParts.sessionId)
      try {
        const raw = store.getItem(STORAGE_PREFIX + address)
        if (raw === null) return []
        const parsed = JSON.parse(raw)
        if (!Array.isArray(parsed)) return []
        return parsed
          .filter(
            (item) =>
              item !== null &&
              typeof item === 'object' &&
              typeof item.quote === 'string' &&
              typeof item.note === 'string' &&
              Number.isFinite(item.start) &&
              Number.isFinite(item.end) &&
              !(typeof item.id === 'string' && deleted.has(`${address}::${item.id}`)),
          )
          .map((item) => {
            const startLine = Number.isFinite(item.startLine) ? item.startLine : 1
            return {
              id:
                typeof item.id === 'string'
                  ? item.id
                  : `a${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
              start: item.start,
              end: item.end,
              startLine,
              endLine: Number.isFinite(item.endLine) ? item.endLine : startLine,
              quote: item.quote,
              note: item.note,
              suggestion: typeof item.suggestion === 'string' ? item.suggestion : '',
              sent: item.sent === true,
              stale: item.stale === true,
              createdAt: Number.isFinite(item.createdAt) ? item.createdAt : Date.now(),
            }
          })
      } catch {
        return []
      }
    }

    function persistAnnotations(address, annotations) {
      const store = storage()
      if (store === null || typeof address !== 'string') return
      const addressParts = parseFileAddress(address)
      const deleted =
        addressParts === null ? new Set() : loadDeletedAnnotations(addressParts.sessionId)
      const kept = annotations.filter(
        (item) => !(typeof item.id === 'string' && deleted.has(`${address}::${item.id}`)),
      )
      try {
        if (kept.length === 0) store.removeItem(STORAGE_PREFIX + address)
        else store.setItem(STORAGE_PREFIX + address, JSON.stringify(kept))
        notifyAnnotationsChanged()
      } catch {
        // Quota or privacy-mode failures leave annotations in memory only.
      }
    }

    return { inject: ['slots', 'locale', 'sidebarRight', 'sidebarRightTabs', 'remote', 'remote.workspaceFiles', 'remote.commands', 'sessions'], apply }
  },
})
