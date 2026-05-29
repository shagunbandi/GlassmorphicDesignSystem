<template>
  <component :is="resolvedTag" :class="['gd-title', `gd-title--${level}`]">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  level: {
    type: [String, Number],
    default: 2,
    validator: (v) => [1, 2, 3, 4, '1', '2', '3', '4'].includes(v),
  },
  as: { type: String, default: null },
})

const resolvedTag = computed(() => props.as ?? `h${props.level}`)
</script>

<style scoped>
.gd-title {
  font-family: var(--font-sans);
  margin: 0;
  letter-spacing: var(--tracking-tight);
  color: var(--fg-1);
}

.gd-title--1 {
  font-size: clamp(1.75rem, 2.4vw, 2.25rem);
  font-weight: 700;
  line-height: 1.15;
}

.gd-title--2 {
  font-size: var(--text-2xl);
  font-weight: 700;
  line-height: 1.2;
}

.gd-title--3 {
  font-size: var(--text-xl);
  font-weight: 600;
  line-height: 1.25;
}

.gd-title--4 {
  font-size: var(--text-lg);
  font-weight: 600;
  line-height: 1.3;
  color: var(--fg-2);
}
</style>
