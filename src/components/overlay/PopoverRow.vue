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
.gd-popover-row__icon {
  display: inline-flex;
  align-items: center;
  width: 1rem;
  flex-shrink: 0;
  margin-right: var(--space-2);
}
</style>
