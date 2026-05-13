<template>
  <div
    :class="['gd-card', glass ? 'gd-card--glass' : '']"
    :style="paddingStyle"
  >
    <h5 v-if="title" class="gd-card__title">{{ title }}</h5>
    <div v-if="divider && title" class="gd-card__divider" aria-hidden="true" />
    <p v-if="description" class="gd-card__description">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  divider: { type: Boolean, default: true },
  /** Spacing unit — multiplied by 4px (e.g. padding="6" → 24px). */
  padding: { type: [String, Number], default: '6' },
  /** Applies glassmorphic surface styling. */
  glass: { type: Boolean, default: false },
})

const PADDING_PX = { 0: '0', 2: '8px', 4: '16px', 6: '24px', 8: '32px' }

const paddingStyle = computed(() => {
  const p = PADDING_PX[String(props.padding)] ?? '24px'
  return { padding: p }
})
</script>

<style scoped>
.gd-card {
  box-sizing: border-box;
  width: 100%;
}

.gd-card--glass {
  background: var(--glass-default);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--glass-shadow);
}

.gd-card__title {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
  color: var(--fg-1);
  margin: 0 0 var(--space-2) 0;
}

.gd-card__divider {
  width: 25%;
  height: 1px;
  background: var(--glass-border-soft);
  margin-bottom: var(--space-3);
}

.gd-card__description {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--fg-2);
  margin: 0 0 var(--space-3) 0;
}
</style>
