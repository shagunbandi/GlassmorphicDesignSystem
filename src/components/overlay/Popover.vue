<template>
  <teleport to="body">
    <template v-if="show">
      <div
        v-if="backdrop"
        class="gd-popover-backdrop"
        @click="$emit('close')"
      />
      <div
        class="gd-popover"
        :class="{ 'gd-popover--match-width': matchAnchorWidth }"
        :style="menuStyle"
        @click.stop
      >
        <slot />
      </div>
    </template>
  </teleport>
</template>

<script setup>
import { computed, onUnmounted, watch } from 'vue'

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
})

const emit = defineEmits(['close'])

const ESTIMATED_WIDTH = 180

const menuStyle = computed(() => {
  if (!props.rect) return {}
  const { left, right, bottom, width } = props.rect
  const top = bottom + 6
  const anchorW = width != null && width > 0 ? width : ESTIMATED_WIDTH

  const withWidth = (base) => {
    if (props.matchAnchorWidth && width != null && width > 0) {
      return {
        ...base,
        width: `${width}px`,
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
      }
    }
    return base
  }

  if (props.anchor === 'center') {
    const cx = left + (width ?? 0) / 2
    return withWidth({
      top: `${top}px`,
      left: `${cx}px`,
      transform: 'translateX(-50%)',
    })
  }

  const openRight = left + anchorW > window.innerWidth
  if (openRight) {
    return withWidth({
      top: `${top}px`,
      right: `${window.innerWidth - right}px`,
    })
  }
  return withWidth({ top: `${top}px`, left: `${left}px` })
})

function onScrollClose() {
  if (props.show && props.closeOnScroll) emit('close')
}
function onResizeClose() {
  if (props.show && props.closeOnResize) emit('close')
}

watch(
  () => props.show,
  (val) => {
    if (val) {
      if (props.closeOnScroll)
        window.addEventListener('scroll', onScrollClose, {
          passive: true,
          capture: true,
        })
      if (props.closeOnResize) window.addEventListener('resize', onResizeClose)
    } else {
      window.removeEventListener('scroll', onScrollClose, { capture: true })
      window.removeEventListener('resize', onResizeClose)
    }
  },
)

onUnmounted(() => {
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
  background: rgba(20, 30, 48, 0.88);
  border: 1px solid var(--glass-border-soft);
  box-shadow: var(--glass-shadow-hover);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
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

/* ─── Generic row styles for slotted menu items ─────────────────────────── */
/* Consumers can use these class names to get consistent row styling. */
.gd-popover :deep(.gd-popover-item) {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--fg-2);
  cursor: pointer;
  transition:
    background var(--transition-fast),
    color var(--transition-fast);
  user-select: none;
}

.gd-popover :deep(.gd-popover-item:hover) {
  background: var(--glass-default);
  color: var(--fg-1);
}

.gd-popover :deep(.gd-popover-item--active) {
  background: var(--color-interactive-bg);
  color: #e0e7ff;
}

.gd-popover :deep(.gd-popover-item--danger:hover) {
  background: var(--color-danger-bg);
  color: var(--color-danger-light);
}

.gd-popover :deep(.gd-popover-divider) {
  height: 1px;
  background: var(--glass-border-hairline);
  margin: var(--space-1) 0;
}
</style>
