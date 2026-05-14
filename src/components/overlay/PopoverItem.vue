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
  width: 100%;
  background: transparent;
  border: none;
  text-align: left;
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
