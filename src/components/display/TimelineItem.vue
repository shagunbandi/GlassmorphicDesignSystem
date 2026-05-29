<template>
  <div v-if="buttons?.length || transit" class="gd-timeline-item">
    <div class="gd-timeline-item__line" />
    <div class="gd-timeline-item__inner">
      <!-- Transit pill -->
      <div v-if="transit" class="gd-timeline-item__transit">
        <i :class="transit.icon || 'fas fa-car'" aria-hidden="true" />
        <span>{{ transitDistance }}</span>
        <span class="gd-timeline-item__transit-sep">·</span>
        <span class="gd-timeline-item__transit-time">{{ transitTime }}</span>
      </div>

      <div class="gd-timeline-item__spacer" />

      <!-- Inline action buttons -->
      <div v-if="buttons?.length" class="gd-timeline-item__actions">
        <button
          v-for="(btn, i) in buttons"
          :key="i"
          type="button"
          class="gd-timeline-item__action-btn"
          @click.stop="btn.clickHandler?.()"
        >
          <i :class="btn.icon ?? btn.ficon" aria-hidden="true" />
          <span v-if="btn.label">{{ btn.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Array of { label, icon?, ficon?, clickHandler() } */
  buttons: Array,
  /** { icon?, distance: string | { text }, duration: string | { text } } */
  transit: Object,
  /** Kept for backwards compat; no longer affects style. */
  variant: {
    type: String,
    default: 'light',
    validator: (v) => ['light', 'dark'].includes(v),
  },
})

const transitDistance = computed(
  () => props.transit?.distance?.text ?? props.transit?.distance ?? '',
)
const transitTime = computed(
  () => props.transit?.duration?.text ?? props.transit?.time ?? '',
)
</script>

<style scoped>
.gd-timeline-item {
  display: flex;
  align-items: stretch;
  gap: 0;
  padding-left: 30px;
  position: relative;
}

.gd-timeline-item__line {
  position: absolute;
  left: 22px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    180deg,
    rgba(155, 203, 255, 0) 0%,
    rgba(155, 203, 255, 0.25) 20%,
    rgba(155, 203, 255, 0.25) 80%,
    rgba(155, 203, 255, 0) 100%
  );
}

.gd-timeline-item__inner {
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px 14px 8px 0;
}

/* Transit pill */
.gd-timeline-item__transit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(155, 203, 255, 0.08);
  border: 1px solid rgba(155, 203, 255, 0.22);
  color: var(--brand-sky);
  padding: 6px 12px;
  border-radius: 9999px;
  font: 600 11.5px/1 var(--font-sans);
}

.gd-timeline-item__transit i {
  font-size: 11px;
}

.gd-timeline-item__transit-sep {
  color: var(--fg-5);
}
.gd-timeline-item__transit-time {
  color: var(--fg-2);
}

.gd-timeline-item__spacer {
  flex: 1;
}

/* Action buttons pill */
.gd-timeline-item__actions {
  display: inline-flex;
  gap: 4px;
  padding: 3px;
  background: var(--glass-thin);
  border: 1px solid var(--glass-border-hairline);
  border-radius: 9999px;
}

.gd-timeline-item__action-btn {
  appearance: none;
  cursor: pointer;
  border: 0;
  background: transparent;
  color: var(--fg-3);
  font: 600 11.5px/1 var(--font-sans);
  padding: 6px 10px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition:
    background 150ms,
    color 150ms;
}

.gd-timeline-item__action-btn i {
  font-size: 10px;
}

.gd-timeline-item__action-btn:hover {
  background: rgba(155, 203, 255, 0.12);
  color: var(--brand-sky);
}
</style>
