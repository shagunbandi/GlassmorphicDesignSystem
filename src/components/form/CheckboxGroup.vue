<template>
  <fieldset class="gd-checkbox-group" v-bind="attrs" :disabled="disabled">
    <legend v-if="label" class="gd-checkbox-group__legend">{{ label }}</legend>
    <label
      v-for="(item, index) in items"
      :key="item.value"
      class="gd-checkbox-group__row"
      :class="{ 'gd-checkbox-group__row--off': disabled || item.disabled }"
    >
      <input
        v-model="model"
        type="checkbox"
        class="gd-checkbox-group__input"
        :value="item.value"
        :disabled="item.disabled"
        :aria-labelledby="`${uid}-label-${index}`"
        :aria-describedby="item.hint ? `${uid}-hint-${index}` : undefined"
      />
      <span :id="`${uid}-label-${index}`" class="gd-checkbox-group__text">{{ item.label }}</span>
      <span v-if="item.hint" :id="`${uid}-hint-${index}`" class="gd-checkbox-group__hint">
        {{ item.hint }}
      </span>
    </label>
  </fieldset>
</template>

<script>
let nextId = 0
</script>

<script setup>
import { onMounted, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  items: { type: Array, required: true },
  label: { type: String, default: '' },
  disabled: Boolean,
})
const model = defineModel({ type: Array, default: () => [] })

const uid = `gd-checkbox-group-${nextId++}`
const attrs = useAttrs()

onMounted(() => {
  if (
    process.env.NODE_ENV !== 'production' &&
    !props.label &&
    !attrs['aria-label'] &&
    !attrs['aria-labelledby']
  ) {
    console.warn(
      '[GdCheckboxGroup] A checkbox group needs an accessible name: pass `label`, `aria-label` or `aria-labelledby`.',
    )
  }
})
</script>

<style scoped>
.gd-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
}

.gd-checkbox-group__legend {
  padding: 0;
  margin-bottom: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--fg-2);
}

.gd-checkbox-group__row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  background: var(--glass-soft);
  border: 1px solid var(--glass-border-soft);
  border-radius: var(--radius-md);
  cursor: pointer;
}

.gd-checkbox-group__row--off {
  cursor: default;
  opacity: 0.6;
}

.gd-checkbox-group__input {
  appearance: none;
  position: relative;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  margin: 0;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  background: var(--glass-default);
  cursor: inherit;
  transition: background var(--transition-fast);
}

.gd-checkbox-group__input:checked {
  background: var(--color-interactive-fill);
  border-color: var(--color-interactive-fill-border);
}

.gd-checkbox-group__input:checked::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 5px;
  width: 4px;
  height: 8px;
  border: solid var(--checkbox-check);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.gd-checkbox-group__input:focus-visible {
  outline: 2px solid var(--brand-sky);
  outline-offset: 2px;
}

.gd-checkbox-group__text {
  flex: 1;
  min-width: 0;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--fg-1);
}

.gd-checkbox-group__hint {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  color: var(--fg-4);
}
</style>
