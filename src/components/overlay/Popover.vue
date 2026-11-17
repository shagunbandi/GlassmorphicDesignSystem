<template>
  <teleport to="body">
    <template v-if="show">
      <div
        v-if="backdrop"
        class="gd-popover-backdrop"
        data-gd-layer
        @click="$emit('close')"
      />
      <div
        ref="popoverRef"
        class="gd-popover"
        data-gd-layer
        :role="menu ? 'menu' : undefined"
        :class="{ 'gd-popover--match-width': matchAnchorWidth }"
        :style="menuStyle"
        @click.stop
        @keydown="onKeydown"
      >
        <slot />
      </div>
    </template>
  </teleport>
</template>

<script setup>
import { ref, computed, provide, onUnmounted, watch, nextTick } from 'vue'

// Popovers currently open, most recent last. Only the top one handles Escape.
const openStack = []

const props = defineProps({
  show: { type: Boolean, required: true },
  /** DOMRect from getBoundingClientRect() on the anchor element. */
  rect: { type: Object, default: null },
  /** `leading` — align left edge to anchor left. `center` — center under anchor. */
  anchor: {
    type: String,
    default: 'leading',
    validator: (v) => ['leading', 'center'].includes(v),
  },
  backdrop: { type: Boolean, default: true },
  matchAnchorWidth: { type: Boolean, default: false },
  closeOnScroll: { type: Boolean, default: true },
  closeOnResize: { type: Boolean, default: true },
  /** Menu semantics: role="menu", focus moves in, arrow-key navigation. Set false for form/detail content. */
  menu: { type: Boolean, default: true },
})

const emit = defineEmits(['close'])

const popoverRef = ref(null)
const menuStyle = ref({})
let opener = null

provide('gdPopoverMenu', computed(() => props.menu))

const MARGIN = 6
const ESTIMATED_HEIGHT = 200
const ESTIMATED_WIDTH = 180

function computeStyle() {
  if (!props.rect) {
    menuStyle.value = {}
    return
  }

  const { left, right, top: anchorTop, bottom, width } = props.rect
  const vw = window.innerWidth
  const vh = window.innerHeight

  const el = popoverRef.value
  const popoverH = el ? el.offsetHeight : ESTIMATED_HEIGHT
  const popoverW = el ? el.offsetWidth : ESTIMATED_WIDTH
  const anchorW = width != null && width > 0 ? width : ESTIMATED_WIDTH

  // Vertical: open below unless more space above
  const spaceBelow = vh - bottom - MARGIN
  const spaceAbove = anchorTop - MARGIN
  let topVal
  if (popoverH <= spaceBelow || spaceBelow >= spaceAbove) {
    topVal = bottom + MARGIN
  } else {
    topVal = Math.max(MARGIN, anchorTop - MARGIN - popoverH)
  }

  const widthStyle =
    props.matchAnchorWidth && width != null && width > 0
      ? { width: `${width}px`, minWidth: `${width}px`, maxWidth: `${width}px` }
      : {}

  if (props.anchor === 'center') {
    const cx = left + (width ?? 0) / 2
    const leftEdge = cx - popoverW / 2
    const rightEdge = cx + popoverW / 2
    if (leftEdge < MARGIN) {
      menuStyle.value = {
        top: `${topVal}px`,
        left: `${MARGIN}px`,
        ...widthStyle,
      }
    } else if (rightEdge > vw - MARGIN) {
      menuStyle.value = {
        top: `${topVal}px`,
        right: `${MARGIN}px`,
        ...widthStyle,
      }
    } else {
      menuStyle.value = {
        top: `${topVal}px`,
        left: `${cx}px`,
        transform: 'translateX(-50%)',
        ...widthStyle,
      }
    }
    return
  }

  // Leading: left-align unless it overflows right, then right-align
  if (left + popoverW > vw - MARGIN) {
    menuStyle.value = {
      top: `${topVal}px`,
      right: `${vw - right}px`,
      ...widthStyle,
    }
  } else {
    menuStyle.value = { top: `${topVal}px`, left: `${left}px`, ...widthStyle }
  }
}

function onScrollClose(event) {
  if (!props.show || !props.closeOnScroll) return
  // Scrolling inside the popover's own content (e.g. a long list) must not
  // close it — only scrolling of the page/ancestors behind it should.
  if (popoverRef.value && popoverRef.value.contains(event.target)) return
  emit('close')
}
function onResizeClose() {
  if (props.show && props.closeOnResize) emit('close')
}

function enabledItems() {
  const el = popoverRef.value
  if (!el) return []
  return Array.from(el.querySelectorAll('[role="menuitem"]')).filter((n) => !n.disabled)
}

function focusEntry() {
  const el = popoverRef.value
  if (!el) return
  const target = el.querySelector('[data-selected]:not(:disabled)') || enabledItems()[0]
  if (target) target.focus()
}

function onKeydown(event) {
  if (!props.menu) return
  if (event.key === 'Tab') {
    event.preventDefault()
    event.stopPropagation()
    if (opener && opener.isConnected) opener.focus()
    emit('close')
    return
  }
  const items = enabledItems()
  if (!items.length) return
  const idx = items.indexOf(document.activeElement)
  let next
  if (event.key === 'ArrowDown') next = items[(idx + 1) % items.length]
  else if (event.key === 'ArrowUp') next = items[(idx - 1 + items.length) % items.length]
  else if (event.key === 'Home') next = items[0]
  else if (event.key === 'End') next = items[items.length - 1]
  else return
  event.preventDefault()
  next.focus()
}

function onEscape(event) {
  if (event.key !== 'Escape' || openStack[openStack.length - 1] !== onEscape) return
  event.stopPropagation()
  emit('close')
}

function restoreFocus() {
  const active = document.activeElement
  const inside = popoverRef.value && popoverRef.value.contains(active)
  if (opener && opener.isConnected && (inside || (props.menu && active === document.body))) {
    opener.focus()
  }
  opener = null
}

function removeFromStack() {
  const i = openStack.indexOf(onEscape)
  if (i !== -1) openStack.splice(i, 1)
  document.removeEventListener('keydown', onEscape, true)
}

watch(
  () => props.show,
  async (val) => {
    if (val) {
      opener = document.activeElement
      openStack.push(onEscape)
      document.addEventListener('keydown', onEscape, true)
      computeStyle()
      await nextTick()
      computeStyle()
      if (props.menu) focusEntry()
      if (props.closeOnScroll)
        window.addEventListener('scroll', onScrollClose, {
          passive: true,
          capture: true,
        })
      if (props.closeOnResize) window.addEventListener('resize', onResizeClose)
    } else {
      restoreFocus()
      removeFromStack()
      menuStyle.value = {}
      window.removeEventListener('scroll', onScrollClose, { capture: true })
      window.removeEventListener('resize', onResizeClose)
    }
  },
  { flush: 'pre' },
)

watch(
  () => props.rect,
  () => {
    if (props.show) computeStyle()
  },
  { deep: true },
)

onUnmounted(() => {
  removeFromStack()
  window.removeEventListener('scroll', onScrollClose, { capture: true })
  window.removeEventListener('resize', onResizeClose)
})
</script>

<style scoped>
.gd-popover-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
}

.gd-popover {
  position: fixed;
  z-index: 9999;
  background: var(--popover-bg);
  border: 1px solid var(--glass-border-soft);
  box-shadow: var(--glass-shadow-hover);
  backdrop-filter: blur(var(--glass-blur-lg));
  -webkit-backdrop-filter: blur(var(--glass-blur-lg));
  border-radius: var(--radius-md);
  padding: var(--space-1);
  min-width: 150px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.gd-popover--match-width {
  min-width: 0;
}
</style>
