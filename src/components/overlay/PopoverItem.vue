<template>
  <button
    type="button"
    :class="['gd-popover-item', danger ? 'gd-popover-item--danger' : '']"
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
defineProps({
  danger: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

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
