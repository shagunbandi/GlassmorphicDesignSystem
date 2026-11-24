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

// A toast with an action needs time to be read and clicked.
const ACTION_DURATION = 6000

// Per-toast timer state: { handle, remaining, start }. `handle` is null while paused.
const timers = new Map()

function dismiss(id) {
  const timer = timers.get(id)
  if (timer) clearTimeout(timer.handle)
  timers.delete(id)
  const index = state.toasts.findIndex((t) => t.id === id)
  if (index !== -1) state.toasts.splice(index, 1)
}

function clear() {
  timers.forEach((timer) => clearTimeout(timer.handle))
  timers.clear()
  state.toasts.splice(0)
}

function startTimer(id, timer) {
  timer.start = Date.now()
  timer.handle = setTimeout(() => dismiss(id), timer.remaining)
}

function pause(id) {
  const timer = timers.get(id)
  if (!timer || timer.handle === null) return
  clearTimeout(timer.handle)
  timer.handle = null
  timer.remaining = Math.max(0, timer.remaining - (Date.now() - timer.start))
}

function resume(id) {
  const timer = timers.get(id)
  if (!timer || timer.handle !== null) return
  startTimer(id, timer)
}

function push(message, { tone = 'info', title = '', duration, action = null } = {}) {
  // Guard against empty toasts — a blank card is never useful.
  if (!message) return null

  const id = ++seq
  const defaultDuration = action
    ? ACTION_DURATION
    : tone === 'error'
      ? ERROR_DURATION
      : DEFAULT_DURATION
  const resolvedDuration = duration ?? defaultDuration

  state.toasts.push({ id, message, tone, title, action })

  if (resolvedDuration > 0) {
    const timer = { handle: null, remaining: resolvedDuration, start: 0 }
    timers.set(id, timer)
    startTimer(id, timer)
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
 *   toast.info('Place removed', { action: { label: 'Undo', onClick } })
 *
 * An `action.onClick` may return a promise: the button shows a spinner until it
 * settles, then the toast dismisses. Toasts pause their timer on hover/focus.
 */
export function useToast() {
  return {
    toasts: state.toasts,
    push,
    dismiss,
    clear,
    pause,
    resume,
    success: (message, options) => push(message, { ...options, tone: 'success' }),
    error: (message, options) => push(message, { ...options, tone: 'error' }),
    info: (message, options) => push(message, { ...options, tone: 'info' }),
    warning: (message, options) => push(message, { ...options, tone: 'warning' }),
  }
}
