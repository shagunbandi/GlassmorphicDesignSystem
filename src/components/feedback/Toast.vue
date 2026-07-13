<template>
  <div :class="['gd-toast', `gd-toast--${tone}`]" role="status">
    <i :class="[resolvedIcon, 'gd-toast__icon']" aria-hidden="true" />
    <div class="gd-toast__body">
      <p v-if="title" class="gd-toast__title">{{ title }}</p>
      <p v-if="message" class="gd-toast__message">{{ message }}</p>
      <slot />
    </div>
    <button
      class="gd-toast__dismiss"
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
})

defineEmits(['dismiss'])

const DEFAULT_ICONS = {
  error: 'fa-solid fa-exclamation-circle',
  success: 'fa-solid fa-check-circle',
  info: 'fas fa-circle-info',
  warning: 'fa-solid fa-triangle-exclamation',
}

const resolvedIcon = computed(() => props.icon || DEFAULT_ICONS[props.tone])
</script>

<style scoped>
.gd-toast {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-xl);
  border: 1px solid var(--glass-border);
  background: var(--glass-strong);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--glass-shadow);
  font-family: var(--font-sans);
  /* Tone accent runs down the leading edge. */
  border-left-width: 3px;
  pointer-events: auto;
}

.gd-toast__icon {
  flex-shrink: 0;
  margin-top: 2px;
  font-size: var(--text-base);
}

.gd-toast__body {
  flex: 1;
  min-width: 0;
}

.gd-toast__title {
  font-weight: 600;
  font-size: var(--text-sm);
  margin: 0 0 var(--space-1) 0;
  line-height: 1.4;
  color: var(--fg-1);
}

.gd-toast__message {
  font-size: var(--text-sm);
  margin: 0;
  line-height: 1.5;
  color: var(--fg-2);
}

.gd-toast__dismiss {
  flex-shrink: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px 4px;
  margin: -2px -2px 0 0;
  border-radius: var(--radius-sm);
  line-height: 1;
  font-size: var(--text-xs);
  color: var(--fg-4);
  opacity: 0.7;
  transition: opacity var(--transition-fast);
}

.gd-toast__dismiss:hover {
  opacity: 1;
}

/* ── Tone: error ── */
.gd-toast--error {
  border-left-color: var(--color-danger-light);
}
.gd-toast--error .gd-toast__icon {
  color: var(--color-danger-light);
}

/* ── Tone: success ── */
.gd-toast--success {
  border-left-color: var(--color-success-light);
}
.gd-toast--success .gd-toast__icon {
  color: var(--color-success-light);
}

/* ── Tone: info ── */
.gd-toast--info {
  border-left-color: var(--brand-sky);
}
.gd-toast--info .gd-toast__icon {
  color: var(--brand-sky);
}

/* ── Tone: warning ── */
.gd-toast--warning {
  border-left-color: var(--color-warning-light);
}
.gd-toast--warning .gd-toast__icon {
  color: var(--color-warning-light);
}
</style>
