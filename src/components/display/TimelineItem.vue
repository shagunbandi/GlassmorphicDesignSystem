<template>
  <div
    v-if="buttons?.length || transit"
    :class="[
      'gd-timeline-item',
      isOpen ? 'gd-timeline-item--open' : '',
      variant === 'dark' ? 'gd-timeline-item--dark' : '',
    ]"
  >
    <Button
      v-if="buttons?.length"
      ref="triggerRef"
      intent="neutral"
      surface="soft"
      size="icon"
      radius="full"
      :tone="variant === 'dark' ? 'inverted' : 'default'"
      :selected="isOpen"
      @click.stop="toggleMenu"
    >
      <i :class="isOpen ? 'fas fa-times' : 'fas fa-plus'" />
    </Button>

    <!-- Transit info pill -->
    <div
      v-if="transit"
      :class="['gd-timeline-item__transit', variant === 'dark' ? 'gd-timeline-item__transit--dark' : '']"
    >
      <span class="gd-timeline-item__transit-stat">
        <i class="fa-solid fa-car gd-timeline-item__transit-icon" aria-hidden="true" />
        <span class="gd-timeline-item__transit-val">{{ transit.distance.text }}</span>
      </span>
      <span class="gd-timeline-item__transit-sep">•</span>
      <span class="gd-timeline-item__transit-stat">
        <i class="fa-regular fa-clock gd-timeline-item__transit-icon" aria-hidden="true" />
        <span class="gd-timeline-item__transit-val">{{ transit.duration.text }}</span>
      </span>
    </div>

    <Popover
      anchor="center"
      :show="isOpen && !!buttons?.length"
      :rect="menuRect"
      @close="closeMenu"
    >
      <Button
        v-for="(btn, i) in buttons"
        :key="i"
        intent="neutral"
        surface="ghost"
        size="sm"
        full-width
        align="start"
        tone="inverted"
        @click.stop="handleClick(btn)"
      >
        <i v-if="btn.icon" :class="[btn.icon, 'gd-timeline-item__btn-icon']" aria-hidden="true" />
        <span>{{ btn.label }}</span>
      </Button>
    </Popover>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import Button from '../primitives/Button.vue'
import Popover from '../overlay/Popover.vue'

defineProps({
  /** Array of { label, icon?, clickHandler() } */
  buttons: Array,
  /** { distance: { text }, duration: { text } } */
  transit: Object,
  variant: {
    type: String,
    default: 'light',
    validator: (v) => ['light', 'dark'].includes(v),
  },
})

const isOpen    = ref(false)
const triggerRef = ref(null)
const menuRect  = ref(null)

function triggerEl() {
  const r = triggerRef.value
  if (!r) return null
  const el = r instanceof Element ? r : r.$el
  return el instanceof Element ? el : null
}

function closeMenu()  { isOpen.value = false; menuRect.value = null }

function toggleMenu() {
  if (isOpen.value) { closeMenu(); return }
  const el = triggerEl()
  if (!el) return
  menuRect.value = el.getBoundingClientRect()
  isOpen.value = true
}

function handleClick(btn) { btn.clickHandler?.(); closeMenu() }

onUnmounted(closeMenu)
</script>

<style scoped>
.gd-timeline-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  margin: 6px 0 8px;
  opacity: 0.4;
  transition: opacity var(--transition-base);
}

@media (min-width: 768px) {
  .gd-timeline-item:hover,
  .gd-timeline-item--open,
  .gd-timeline-item--dark {
    opacity: 1;
  }
}

/* Transit pill */
.gd-timeline-item__transit {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: 4px 12px 4px 16px;
  border-radius: var(--radius-full);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  color: #4b5563;
}

.gd-timeline-item__transit--dark {
  background: var(--glass-soft);
  border-color: var(--glass-border-hairline);
  color: var(--fg-3);
}

.gd-timeline-item__transit-stat {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.gd-timeline-item__transit-icon { color: #9ca3af; }
.gd-timeline-item__transit--dark .gd-timeline-item__transit-icon { color: var(--fg-4); }

.gd-timeline-item__transit-val  { font-weight: 500; }
.gd-timeline-item__transit-sep  { color: #d1d5db; }
.gd-timeline-item__transit--dark .gd-timeline-item__transit-sep { color: var(--fg-5); }

.gd-timeline-item__btn-icon { font-size: var(--text-base); width: 1.25rem; }
</style>
