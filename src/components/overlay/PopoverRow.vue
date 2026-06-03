<template>
  <div class="gd-popover-item gd-popover-item--detail">
    <span v-if="icon" class="gd-popover-row__icon" aria-hidden="true">
      <i :class="icon" />
    </span>
    <span class="gd-popover-item__label">{{ label }}</span>
    <span class="gd-popover-item__value">
      <slot>{{ value }}</slot>
    </span>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: String, default: '' },
  icon: { type: String, default: '' },
})
</script>

<style scoped>
.gd-popover-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--fg-2);
  user-select: none;
}

.gd-popover-item--detail {
  cursor: default;
  text-transform: capitalize;
}

.gd-popover-item--detail:hover {
  background: transparent;
  color: var(--fg-2);
}

.gd-popover-item__label {
  font-size: var(--text-2xs);
  font-weight: 500;
  color: var(--fg-3);
  min-width: 4rem;
  flex-shrink: 0;
}

.gd-popover-item__value {
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--fg-2);
}

.gd-popover-row__icon {
  display: inline-flex;
  align-items: center;
  width: 1rem;
  flex-shrink: 0;
  margin-right: var(--space-2);
}
</style>
