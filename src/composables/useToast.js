import { reactive } from 'vue'

// Module-level singleton store. Every call site that imports `useToast` shares
// this same queue, so a single <ToastHost /> mounted at the app root renders
// toasts triggered from anywhere in the tree.
const state = reactive({ toasts: [] })

let seq = 0

const DEFAULT_DURATION = 4500
// Errors linger a little longer — they carry information the user may need to
// read and act on, unlike a quick success confirmation.
const ERROR_DURATION = 6000

function dismiss(id) {
  const index = state.toasts.findIndex((t) => t.id === id)
  if (index !== -1) state.toasts.splice(index, 1)
}

function clear() {
  state.toasts.splice(0)
}

function push(message, { tone = 'info', title = '', duration } = {}) {
  // Guard against empty toasts — a blank card is never useful.
  if (!message) return null

  const id = ++seq
  const resolvedDuration =
    duration ?? (tone === 'error' ? ERROR_DURATION : DEFAULT_DURATION)

  state.toasts.push({ id, message, tone, title })

  if (resolvedDuration > 0) {
    setTimeout(() => dismiss(id), resolvedDuration)
  }

  return id
}

/**
 * Toast queue API. Mount a single <ToastHost /> once at the app root, then call
 * these from anywhere:
 *
 *   const toast = useToast()
 *   toast.success('Export ready — downloading now')
 *   toast.error('Failed to update visibility')
 */
export function useToast() {
  return {
    toasts: state.toasts,
    push,
    dismiss,
    clear,
    success: (message, options) => push(message, { ...options, tone: 'success' }),
    error: (message, options) => push(message, { ...options, tone: 'error' }),
    info: (message, options) => push(message, { ...options, tone: 'info' }),
    warning: (message, options) => push(message, { ...options, tone: 'warning' }),
  }
}
