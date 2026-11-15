<template>
  <button
    type="button"
    :role="inMenu ? 'menuitem' : undefined"
    :tabindex="inMenu ? -1 : undefined"
    :data-selected="selected ? '' : undefined"
    :class="[
      'gd-popover-item',
      danger ? 'gd-popover-item--danger' : '',
      selected ? 'gd-popover-item--active' : '',
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="$slots.leading" class="gd-popover-item__leading" aria-hidden="true">
      <slot name="leading" />
    </span>
    <slot />
  </button>
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  danger: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  /** Marks the current choice: highlighted, and focused first when the menu opens. */
  selected: { type: Boolean, default: false },
})

const inMenu = inject('gdPopoverMenu', false)

defineEmits(['click'])
</script>

<style scoped>
.gd-popover-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.4rem 0.6rem;
  width: 100%;
  border-radius: var(--radius-sm);
  background: transparent;
  border: none;
  text-align: left;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--fg-2);
  cursor: pointer;
  user-select: none;
  transition:
    background var(--transition-fast),
    color var(--transition-fast);
}

.gd-popover-item:hover {
  background: var(--glass-default);
  color: var(--fg-1);
}

.gd-popover-item:focus-visible {
  background: var(--glass-default);
  color: var(--fg-1);
  outline: 2px solid var(--brand-sky);
  outline-offset: -2px;
}

.gd-popover-item--active {
  background: var(--color-interactive-bg);
  color: var(--badge-indigo-fg);
}

.gd-popover-item--danger:hover {
  background: var(--color-danger-bg);
  color: var(--color-danger-light);
}

.gd-popover-item:disabled {
  opacity: 0.45;
  cursor: default;
  pointer-events: none;
}

.gd-popover-item__leading {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}
</style>
