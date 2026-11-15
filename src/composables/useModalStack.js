import { onMounted, onBeforeUnmount, onUnmounted } from 'vue'

const FOCUSABLE =
  'a[href], button, input, select, textarea, summary, [contenteditable]:not([contenteditable="false"]), [tabindex]'

// Open modals, oldest first. Only the last entry is interactive.
const stack = []
let inertedByUs = []
let savedOverflow = null

function isFocusable(el) {
  if (el.disabled || el.hidden || el.closest('[hidden]')) return false
  if (el.getAttribute('tabindex') === '-1') return false
  if (el.tagName === 'INPUT' && el.type === 'hidden') return false
  return el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden'
}

function getFocusable(panel) {
  return Array.from(panel.querySelectorAll(FOCUSABLE)).filter(isFocusable)
}

function applyInert() {
  for (const el of inertedByUs) el.removeAttribute('inert')
  inertedByUs = []
  const top = stack[stack.length - 1]
  if (!top) return
  for (const child of document.body.children) {
    if (child === top.backdrop.value || child.hasAttribute('inert')) continue
    child.setAttribute('inert', '')
    inertedByUs.push(child)
  }
}

function push(entry) {
  if (stack.length === 0) {
    savedOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  stack.push(entry)
  applyInert()
}

function remove(entry) {
  const i = stack.indexOf(entry)
  if (i === -1) return
  stack.splice(i, 1)
  applyInert()
  if (stack.length === 0) {
    document.body.style.overflow = savedOverflow ?? ''
    savedOverflow = null
  }
}

/**
 * Registers a modal in the global stack: scroll lock, `inert` on everything
 * behind the top modal, Escape / Tab handling for the top modal only, initial
 * focus and focus restore on unmount.
 */
export function useModalStack({ backdrop, panel, onEscape }) {
  const entry = { backdrop, panel }
  let opener = null

  function onKeyDown(e) {
    if (stack[stack.length - 1] !== entry) return
    if (e.key === 'Escape') {
      onEscape()
    } else if (e.key === 'Tab') {
      trapTab(e)
    }
  }

  function trapTab(e) {
    const panelEl = panel.value
    const items = getFocusable(panelEl)
    if (items.length === 0) {
      e.preventDefault()
      panelEl.focus()
      return
    }
    const first = items[0]
    const last = items[items.length - 1]
    const active = document.activeElement
    if (!panelEl.contains(active) || active === panelEl) {
      e.preventDefault()
      ;(e.shiftKey ? last : first).focus()
    } else if (e.shiftKey && active === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  onMounted(() => {
    opener = document.activeElement
    push(entry)
    document.addEventListener('keydown', onKeyDown)
    const [first] = getFocusable(panel.value)
    ;(first || panel.value).focus()
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeyDown)
    remove(entry)
  })

  onUnmounted(() => {
    if (opener && opener !== document.body && document.contains(opener)) {
      opener.focus()
    }
  })
}
