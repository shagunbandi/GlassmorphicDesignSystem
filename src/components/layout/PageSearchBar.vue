<template>
  <div class="gd-page-search" :class="{ 'gd-page-search--wide': wide }">
    <i class="fas fa-magnifying-glass gd-page-search__icon" aria-hidden="true" />
    <div class="gd-page-search__input">
      <Input
        variant="field"
        :model-value="modelValue"
        :placeholder="placeholder"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </div>
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
