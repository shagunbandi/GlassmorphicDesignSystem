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
        <div v-if="$slots.hero" class="gd-modal-hero">
          <slot name="hero" />
        </div>

        <div v-if="variant === 'danger' && !$slots.hero" class="gd-modal-danger-rule" />

        <button
          v-if="dismissable"
          class="gd-modal-close"
          :class="{ 'gd-modal-close--over-hero': $slots.hero }"
          aria-label="Close"
          @click="startClose"
        >
          <i class="fas fa-xmark" />
        </button>

        <div v-if="$slots.header || eyebrow || title || subtitle" class="gd-modal-header">
          <slot name="header">
            <div v-if="eyebrow" class="gd-modal-eyebrow">{{ eyebrow }}</div>
            <div v-if="title || subtitle || icon" class="gd-modal-heading">
              <div v-if="icon" class="gd-modal-icon-tile" aria-hidden="true">
                <i :class="icon" />
              </div>
              <div class="gd-modal-heading-text">
                <h2 v-if="title" class="gd-modal-title">{{ title }}</h2>
                <p v-if="subtitle" class="gd-modal-subtitle">{{ subtitle }}</p>
              </div>
            </div>
          </slot>
        </div>

        <div :class="['gd-modal-body', { 'gd-modal-body--scroll': scrollBody }]">
          <slot name="body" />
        </div>

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

.gd-modal-hero {
  position: relative;
  flex-shrink: 0;
}

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

.gd-modal-header {
  padding: var(--space-5) var(--space-6) var(--space-3);
  flex-shrink: 0;
}

.gd-modal-eyebrow {
  font-size: var(--text-eyebrow);
  font-weight: 700;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--brand-sky);
  margin-bottom: var(--space-2);
}

.gd-modal-heading {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.gd-modal-icon-tile {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: rgba(155, 203, 255, 0.16);
  border: 1px solid rgba(155, 203, 255, 0.3);
  color: var(--brand-sky);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-base);
}

.gd-modal-heading-text {
  min-width: 0;
}

.gd-modal-title {
  margin: 0;
  font-size: var(--text-xl);
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
  color: var(--fg-1);
}

.gd-modal-subtitle {
  margin: var(--space-2) 0 0;
  font-size: var(--text-2xs);
  line-height: 1.55;
  color: var(--fg-3);
}

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
</style>

<style>
:root.light .gd-modal-backdrop {
  background: rgba(15, 23, 42, 0.18);
}
</style>
