<template>
  <button
    type="button"
    role="switch"
    class="gd-switch"
    :class="{ 'gd-switch--on': model }"
    :aria-checked="model"
    :aria-label="label || undefined"
    :disabled="disabled"
    @click="model = !model"
  />
</template>

<script setup>
import { onMounted, useAttrs } from 'vue'

const props = defineProps({
  label: { type: String, default: '' },
  disabled: Boolean,
})
const model = defineModel({ type: Boolean, default: false })

const attrs = useAttrs()

onMounted(() => {
  if (
    process.env.NODE_ENV !== 'production' &&
    !props.label &&
    !attrs['aria-label'] &&
    !attrs['aria-labelledby']
  ) {
    console.warn('[GdSwitch] A switch needs an accessible name: pass `label` or `aria-labelledby`.')
  }
})
</script>

<style scoped>
.gd-switch {
  position: relative;
  flex-shrink: 0;
  width: 38px;
  height: 22px;
  border-radius: var(--radius-full);
  background: var(--glass-default);
  border: 1px solid var(--glass-border-soft);
  cursor: pointer;
  transition: background var(--transition-base);
}

.gd-switch:disabled {
  cursor: default;
  opacity: 0.5;
}

.gd-switch:focus-visible {
  outline: 2px solid var(--brand-sky);
  outline-offset: 2px;
}

.gd-switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  background: var(--fg-1);
  transition: transform var(--transition-base);
}

.gd-switch--on {
  background: var(--brand-mint);
  border-color: transparent;
}

.gd-switch--on::after {
  transform: translateX(16px);
}

@media (pointer: coarse) {
  /* Grow the touch target to 44px without changing the visual size. */
  .gd-switch::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: max(100%, 44px);
    height: 44px;
    transform: translate(-50%, -50%);
  }
}
</style>
