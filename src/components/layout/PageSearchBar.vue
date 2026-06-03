<template>
  <div class="gd-page-search" :class="{ 'gd-page-search--wide': wide }">
    <Input
      variant="field"
      prefix="fas fa-magnifying-glass"
      :model-value="modelValue"
      :placeholder="placeholder"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup>
import Input from '../primitives/Input.vue'

defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Search…' },
  /** When true, search grows to fill a toolbar row */
  wide: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.gd-page-search {
  display: inline-block;
}

.gd-page-search--wide {
  width: 100%;
}
</style>
