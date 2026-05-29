<template>
  <Teleport to="body">
    <div
      class="gd-modal-backdrop"
      :class="{ 'gd-modal-backdrop--visible': visible }"
      @mousedown.self="onBackdropClick"
    >
      <div
        role="dialog"
        aria-modal="true"
        :class="['gd-modal-panel', `gd-modal-panel--${size}`, { 'gd-modal-panel--visible': visible }]"
      >
        <!-- Hero slot: full-bleed top region (photo, gradient) -->
        <div v-if="$slots.hero" class="gd-modal-hero">
          <slot name="hero" />
        </div>

        <!-- Danger accent rule (only when no hero) -->
        <div v-if="variant === 'danger' && !$slots.hero" class="gd-modal-danger-rule" />

        <!-- Close button -->
        <button
          v-if="dismissable"
          class="gd-modal-close"
          :class="{ 'gd-modal-close--over-hero': $slots.hero }"
          aria-label="Close"
          @click="startClose"
        >
          <i class="fas fa-xmark" />
        </button>

        <!-- Header -->
        <div v-if="$slots.header || title || eyebrow" class="gd-modal-header">
          <slot name="header">
            <div v-if="eyebrow" class="gd-modal-eyebrow">{{ eyebrow }}</div>
            <h2 v-if="title" class="gd-modal-title">
              <i v-if="icon" :class="['gd-modal-title-icon', icon]" />
              {{ title }}
            </h2>
            <p v-if="subtitle" class="gd-modal-subtitle">{{ subtitle }}</p>
          </slot>
        </div>

        <!-- Body -->
        <div :class="['gd-modal-body', { 'gd-modal-body--scroll': scrollBody }]">
          <slot name="body" />
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" :class="['gd-modal-footer', `gd-modal-footer--${footerAlign}`]">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, provide } from 'vue'

provide('buttonTone', 'inverted')

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(v),
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'danger'].includes(v),
  },
  dismissable: {
    type: Boolean,
    default: true,
  },
  footerAlign: {
    type: String,
    default: 'end',
    validator: (v) => ['start', 'end', 'between'].includes(v),
  },
  eyebrow: { type: String, default: null },
  title: { type: String, default: null },
  subtitle: { type: String, default: null },
  icon: { type: String, default: null },
  scrollBody: { type: Boolean, default: false },
})

const emit = defineEmits(['close', 'click:outside'])

const visible = ref(false)
const closing = ref(false)

onMounted(async () => {
  await nextTick()
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      visible.value = true
    }),
  )
  document.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyDown)
})

async function startClose() {
  if (closing.value) return
  closing.value = true
  visible.value = false
  await new Promise((resolve) => setTimeout(resolve, 240))
  emit('close')
}

function onBackdropClick() {
  if (props.dismissable) {
    emit('click:outside')
    startClose()
  }
}

function onKeyDown(e) {
  if (e.key === 'Escape' && props.dismissable) startClose()
}
</script>

<style scoped>
/* ── Backdrop ─────────────────────────────────────────────────────────────── */
.gd-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background: rgba(8, 14, 26, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.gd-modal-backdrop--visible {
  opacity: 1;
}

/* ── Panel ────────────────────────────────────────────────────────────────── */
.gd-modal-panel {
  position: relative;
  width: 100%;
  max-height: calc(100vh - var(--space-12));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--glass-strong);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-3xl);
  box-shadow: var(--modal-shadow);
  color: var(--fg-1);
  transform: translateY(var(--space-2)) scale(0.97);
  opacity: 0;
  transition:
    transform 280ms var(--ease-out-soft),
    opacity var(--transition-base);
}

.gd-modal-panel--visible {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.gd-modal-panel--sm  { max-width: 380px; }
.gd-modal-panel--md  { max-width: 520px; }
.gd-modal-panel--lg  { max-width: 720px; }
.gd-modal-panel--xl  { max-width: 900px; }
.gd-modal-panel--2xl { max-width: 1080px; }
.gd-modal-panel--3xl { max-width: 1280px; }

/* ── Hero slot ────────────────────────────────────────────────────────────── */
.gd-modal-hero {
  position: relative;
  flex-shrink: 0;
}

/* ── Danger rule ──────────────────────────────────────────────────────────── */
.gd-modal-danger-rule {
  height: 2px;
  flex-shrink: 0;
  background: linear-gradient(
    90deg,
    rgba(220, 38, 38, 0) 0%,
    rgba(220, 38, 38, 0.55) 50%,
    rgba(220, 38, 38, 0) 100%
  );
}

/* ── Close button ─────────────────────────────────────────────────────────── */
.gd-modal-close {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  background: var(--glass-soft);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border-soft);
  color: var(--fg-1);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xs);
  z-index: 2;
  transition: background var(--transition-base);
}

.gd-modal-close:hover {
  background: var(--glass-default);
}

.gd-modal-close--over-hero {
  background: rgba(8, 14, 26, 0.55);
}

.gd-modal-close--over-hero:hover {
  background: rgba(8, 14, 26, 0.75);
}

/* ── Header ───────────────────────────────────────────────────────────────── */
.gd-modal-header {
  padding: var(--space-5) var(--space-6) var(--space-3);
  flex-shrink: 0;
}

/* Header slot helpers — use these inside #header for consistent typography */
:deep(.gd-modal-title) {
  margin: 0;
  font-size: var(--text-xl);
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
  color: var(--fg-1);
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
}
:deep(.gd-modal-title-icon) {
  color: var(--brand-sky);
  font-size: var(--text-base);
}
:deep(.gd-modal-subtitle) {
  margin: var(--space-2) 0 0;
  font-size: var(--text-2xs);
  line-height: 1.55;
  color: var(--fg-3);
}
:deep(.gd-modal-eyebrow) {
  font-size: var(--text-eyebrow);
  font-weight: 700;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--brand-sky);
  margin-bottom: var(--space-2);
}

/* ── Body ─────────────────────────────────────────────────────────────────── */
.gd-modal-body {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  color: var(--fg-2);
  font-size: var(--text-sm);
  line-height: 1.55;
}

.gd-modal-body--scroll {
  overflow-y: auto;
  overflow-x: hidden;
}

/* ── Footer ───────────────────────────────────────────────────────────────── */
.gd-modal-footer {
  flex-shrink: 0;
  padding: var(--space-4) var(--space-5) var(--space-5);
  border-top: 1px solid var(--glass-border-hairline);
  background: var(--glass-thin);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.gd-modal-footer--end     { justify-content: flex-end; }
.gd-modal-footer--start   { justify-content: flex-start; }
.gd-modal-footer--between { justify-content: space-between; }

/* ── Layout helpers for consumer footer content ───────────────────────────── */
:deep(.gd-modal-actions),
:deep(.voyager-modal-actions) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-3);
  width: 100%;
}

:deep(.gd-modal-actions--footer-row),
:deep(.voyager-modal-actions--footer-row) {
  justify-content: space-between;
}

:deep(.gd-modal-actions__trailing),
:deep(.voyager-modal-actions__trailing) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  margin-left: auto;
}

/* ── Form controls inside modal body ─────────────────────────────────────── */
:deep(.gd-modal-body input:not([type='checkbox']):not([type='radio'])),
:deep(.gd-modal-body textarea),
:deep(.gd-modal-body select) {
  width: 100%;
  box-sizing: border-box;
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border-soft);
  background: var(--glass-thin);
  color: var(--fg-1);
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  outline: none;
  transition:
    border-color var(--transition-base),
    background var(--transition-base);
}

:deep(.gd-modal-body input:not([type='checkbox']):not([type='radio']):focus),
:deep(.gd-modal-body textarea:focus),
:deep(.gd-modal-body select:focus) {
  border-color: var(--focus-ring-color);
  background: var(--glass-soft);
  box-shadow: 0 0 0 3px var(--focus-ring-shadow);
}

:deep(.gd-modal-body input::placeholder),
:deep(.gd-modal-body textarea::placeholder) {
  color: var(--fg-5);
}

:deep(.gd-modal-body textarea) {
  resize: vertical;
}

:deep(.gd-modal-body input[type='date']) {
  color-scheme: dark;
}


:deep(.gd-modal-body .gd-input) {
  border-color: var(--glass-border-soft);
  background: var(--glass-thin);
  color: var(--fg-1);
}

:deep(.gd-modal-body .gd-input:focus) {
  border-color: rgba(155, 203, 255, 0.65);
  box-shadow: 0 0 0 3px rgba(155, 203, 255, 0.15);
}

:deep(.gd-modal-body .gd-input--error) {
  border-color: #f87171 !important;
}

:deep(.gd-modal-body .gd-input--error:focus) {
  box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.2) !important;
}

:deep(.gd-modal-body .gd-input-error) {
  color: #fecaca;
}
</style>

<style>
/* ── Light mode overrides ── */
:root.light .gd-modal-backdrop {
  background: rgba(15, 23, 42, 0.18);
}

:root.light .gd-modal-body input[type='date'] { color-scheme: light; }

:root.light .gd-modal-body .gd-input--error { border-color: #dc2626 !important; }
:root.light .gd-modal-body .gd-input--error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15) !important;
}
:root.light .gd-modal-body .gd-input-error { color: #b91c1c; }
</style>
