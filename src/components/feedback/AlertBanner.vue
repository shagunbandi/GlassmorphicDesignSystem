<template>
  <div :class="['gd-alert', `gd-alert--${tone}`]" role="alert">
    <i :class="[resolvedIcon, 'gd-alert__icon']" aria-hidden="true" />
    <div class="gd-alert__body">
      <p v-if="title" class="gd-alert__title">{{ title }}</p>
      <p v-if="message" class="gd-alert__message">{{ message }}</p>
      <slot />
    </div>
    <button
      v-if="dismissible"
      class="gd-alert__dismiss"
      type="button"
      aria-label="Dismiss"
      @click="$emit('dismiss')"
    >
      <i class="fas fa-times" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tone: {
    type: String,
    default: 'info',
    validator: (v) => ['error', 'success', 'info', 'warning'].includes(v),
  },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  icon: { type: String, default: '' },
  dismissible: { type: Boolean, default: false },
})

defineEmits(['dismiss'])

const DEFAULT_ICONS = {
  error: 'fa-solid fa-exclamation-circle',
  success: 'fa-solid fa-check-circle',
  info: 'fas fa-lightbulb',
  warning: 'fa-solid fa-triangle-exclamation',
}

const resolvedIcon = computed(() => props.icon || DEFAULT_ICONS[props.tone])
</script>

<style scoped>
.gd-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border-width: 1px;
  border-style: solid;
  font-family: var(--font-sans);
}

.gd-alert__icon {
  flex-shrink: 0;
  margin-top: 1px;
  font-size: var(--text-base);
}

.gd-alert__body {
  flex: 1;
  min-width: 0;
}

.gd-alert__title {
  font-weight: 600;
  font-size: var(--text-sm);
  margin: 0 0 var(--space-1) 0;
  line-height: 1.4;
}

.gd-alert__message {
  font-size: var(--text-sm);
  margin: 0;
  line-height: 1.5;
  opacity: 0.9;
}

.gd-alert__dismiss {
  flex-shrink: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: var(--radius-sm);
  line-height: 1;
  opacity: 0.6;
  transition: opacity var(--transition-fast);
}

.gd-alert__dismiss:hover {
  opacity: 1;
}

/* ── Tone: error ── */
.gd-alert--error {
  background: var(--color-danger-bg);
  border-color: rgba(220, 38, 38, 0.35);
  color: var(--fg-1);
}
.gd-alert--error .gd-alert__icon {
  color: var(--color-danger-light);
}
.gd-alert--error .gd-alert__title {
  color: #fca5a5;
}
.gd-alert--error .gd-alert__message {
  color: #fecaca;
}
.gd-alert--error .gd-alert__dismiss {
  color: var(--color-danger-light);
}

/* ── Tone: success ── */
.gd-alert--success {
  background: var(--color-success-bg);
  border-color: rgba(52, 211, 153, 0.35);
  color: var(--fg-1);
}
.gd-alert--success .gd-alert__icon {
  color: var(--color-success-light);
}
.gd-alert--success .gd-alert__title {
  color: #6ee7b7;
}
.gd-alert--success .gd-alert__message {
  color: #a7f3d0;
}
.gd-alert--success .gd-alert__dismiss {
  color: var(--color-success-light);
}

/* ── Tone: info ── */
.gd-alert--info {
  background: var(--badge-sky-bg);
  border-color: rgba(56, 189, 248, 0.25);
  color: var(--fg-1);
}
.gd-alert--info .gd-alert__icon {
  color: var(--brand-sky);
}
.gd-alert--info .gd-alert__title {
  color: var(--fg-1);
}
.gd-alert--info .gd-alert__message {
  color: var(--fg-2);
}
.gd-alert--info .gd-alert__dismiss {
  color: var(--brand-sky);
}

/* ── Tone: warning ── */
.gd-alert--warning {
  background: var(--color-warning-bg);
  border-color: rgba(217, 119, 6, 0.35);
  color: var(--fg-1);
}
.gd-alert--warning .gd-alert__icon {
  color: var(--color-warning-light);
}
.gd-alert--warning .gd-alert__title {
  color: #fcd34d;
}
.gd-alert--warning .gd-alert__message {
  color: #fde68a;
}
.gd-alert--warning .gd-alert__dismiss {
  color: var(--color-warning-light);
}
</style>
