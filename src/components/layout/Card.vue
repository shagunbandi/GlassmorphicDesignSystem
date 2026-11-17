<template>
  <div
    :class="['gd-card', glass ? 'gd-card--glass' : '', clickable ? 'gd-card--clickable' : '']"
    :style="paddingStyle"
  >
    <button
      v-if="clickable"
      type="button"
      class="gd-card__action"
      :aria-label="label || title"
      @click="$emit('click')"
    />
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
  /** Renders a stretched button covering the card; emits `click`. */
  clickable: { type: Boolean, default: false },
  /** Accessible name of the clickable button; falls back to `title`. */
  label: String,
})

defineEmits(['click'])

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

.gd-card--clickable {
  position: relative;
}

.gd-card__action {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  appearance: none;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  border-radius: inherit;
  cursor: pointer;
}
.gd-card__action:focus {
  outline: none;
}
.gd-card__action:focus-visible {
  outline: 2px solid var(--brand-sky);
  outline-offset: -2px;
}

.gd-card--clickable :slotted(a),
.gd-card--clickable :slotted(button),
.gd-card--clickable :slotted([tabindex]) {
  position: relative;
  z-index: 2;
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
