<template>
  <div :class="['gd-stat-card', `gd-stat-card--${size}`]">
    <div :class="['gd-stat-card__icon-wrap', `gd-stat-card__icon-wrap--${variant}`]" aria-hidden="true">
      <i :class="icon" class="gd-stat-card__icon" />
    </div>
    <div class="gd-stat-card__body">
      <p class="gd-stat-card__label">{{ label }}</p>
      <p class="gd-stat-card__value">{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  /** Font Awesome class string, e.g. "fas fa-map-marker-alt" */
  icon: {
    type: String,
    required: true,
  },
  /** Short descriptive label rendered below the value */
  label: {
    type: String,
    required: true,
  },
  /** Formatted value string or number to display prominently */
  value: {
    type: [String, Number],
    default: '—',
  },
  /** Accent color variant — drives icon and icon-bg tint */
  variant: {
    type: String,
    default: 'sky',
    validator: (v) =>
      ['sky', 'mint', 'coral', 'warning', 'success', 'danger', 'indigo'].includes(v),
  },
  /** Controls overall padding and type scale */
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md'].includes(v),
  },
})
</script>

<style scoped>
/* ── Container ── */
.gd-stat-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: var(--glass-thin);
  border: 1px dashed var(--glass-border);
  border-radius: var(--radius-xl);
}

.gd-stat-card--md {
  padding: var(--space-3);
}

.gd-stat-card--sm {
  padding: var(--space-2) var(--space-3);
}

/* ── Icon wrapper ── */
.gd-stat-card__icon-wrap {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
}

.gd-stat-card--md .gd-stat-card__icon-wrap {
  width: 36px;
  height: 36px;
}

.gd-stat-card--sm .gd-stat-card__icon-wrap {
  width: 28px;
  height: 28px;
}

/* ── Variant tints ── */
.gd-stat-card__icon-wrap--sky   { background: rgba(155, 203, 255, 0.15); }
.gd-stat-card__icon-wrap--mint  { background: rgba(85, 221, 176, 0.15); }
.gd-stat-card__icon-wrap--coral { background: rgba(255, 126, 95, 0.15); }
.gd-stat-card__icon-wrap--warning { background: var(--color-warning-bg); }
.gd-stat-card__icon-wrap--success { background: var(--color-success-bg); }
.gd-stat-card__icon-wrap--danger  { background: var(--color-danger-bg); }
.gd-stat-card__icon-wrap--indigo  { background: var(--color-interactive-bg); }

/* ── Icon color ── */
.gd-stat-card__icon-wrap--sky   .gd-stat-card__icon { color: var(--brand-sky); }
.gd-stat-card__icon-wrap--mint  .gd-stat-card__icon { color: var(--brand-mint); }
.gd-stat-card__icon-wrap--coral .gd-stat-card__icon { color: var(--brand-coral); }
.gd-stat-card__icon-wrap--warning .gd-stat-card__icon { color: var(--color-warning-light); }
.gd-stat-card__icon-wrap--success .gd-stat-card__icon { color: var(--color-success-light); }
.gd-stat-card__icon-wrap--danger  .gd-stat-card__icon { color: var(--color-danger-light); }
.gd-stat-card__icon-wrap--indigo  .gd-stat-card__icon { color: var(--color-interactive-light); }

.gd-stat-card--md .gd-stat-card__icon { font-size: 14px; }
.gd-stat-card--sm .gd-stat-card__icon { font-size: 12px; }

/* ── Body ── */
.gd-stat-card__label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  color: var(--fg-3);
  margin: 0;
  line-height: 1.2;
}

.gd-stat-card__value {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 600;
  color: var(--fg-1);
  margin: 0;
  line-height: 1.2;
}

.gd-stat-card--sm .gd-stat-card__value {
  font-size: var(--text-sm);
}
</style>
