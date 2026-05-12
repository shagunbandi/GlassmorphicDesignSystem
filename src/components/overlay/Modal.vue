<template>
  <div class="gd-modal-root">
    <div class="gd-modal-backdrop" aria-hidden="true" />
    <div
      ref="modalRef"
      class="gd-modal-scroll"
      tabindex="0"
      role="dialog"
      aria-modal="true"
      @click.self="onClickOutside"
      @keyup.esc="onEsc"
    >
      <div :class="['gd-modal-sizer', `gd-modal-sizer--${size}`, `gd-modal-pos--${position}`]">
        <div class="gd-modal-panel">
          <div
            v-if="!omitHeader"
            :class="['gd-modal-header', $slots.header ? 'gd-modal-header--divided' : '']"
          >
            <div class="gd-modal-header__content">
              <slot name="header" />
            </div>
            <div v-if="!persistent" class="gd-modal-header__close">
              <Button
                intent="neutral"
                surface="soft"
                size="icon"
                radius="md"
                aria-label="Close"
                @click="closeModal"
              >
                <slot name="close-icon">
                  <svg class="gd-modal-close-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path clip-rule="evenodd" fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    />
                  </svg>
                </slot>
              </Button>
            </div>
          </div>

          <div v-else-if="!persistent" class="gd-modal-float-close">
            <Button
              intent="neutral"
              surface="soft"
              size="icon"
              radius="md"
              aria-label="Close"
              @click="closeModal"
            >
              <slot name="close-icon">
                <svg class="gd-modal-close-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path clip-rule="evenodd" fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  />
                </svg>
              </slot>
            </Button>
          </div>

          <div
            :class="[
              'gd-modal-body',
              !omitHeader && !$slots.header ? 'gd-modal-body--no-header' : '',
              omitHeader && flushBody ? 'gd-modal-body--flush' : omitHeader ? 'gd-modal-body--omit-header' : '',
            ]"
          >
            <slot name="body" />
          </div>

          <div v-if="$slots.footer" class="gd-modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, provide, ref } from 'vue'
import Button from '../primitives/Button.vue'

provide('buttonTone', 'inverted')

const props = defineProps({
  omitHeader:   { type: Boolean, default: false },
  flushBody:    { type: Boolean, default: false },
  notEscapable: { type: Boolean, default: false },
  persistent:   { type: Boolean, default: false },
  size: {
    type: String,
    default: '2xl',
    validator: (v) => ['xs','sm','md','lg','xl','2xl','3xl','4xl','5xl','6xl','7xl'].includes(v),
  },
  position: {
    type: String,
    default: 'center',
    validator: (v) => [
      'top-start','top-center','top-end',
      'center-start','center','center-end',
      'bottom-start','bottom-center','bottom-end',
    ].includes(v),
  },
})

const emit = defineEmits(['close', 'click:outside'])
const modalRef = ref(null)

function closeModal() { emit('close') }

function onClickOutside() {
  if (!props.persistent) {
    emit('click:outside')
    closeModal()
  }
}

function onEsc() {
  if (!props.notEscapable && !props.persistent) closeModal()
}

onMounted(() => modalRef.value?.focus())
</script>

<style scoped>
.gd-modal-root {
  --gd-modal-glass-bg:    rgba(255, 255, 255, 0.10);
  --gd-modal-glass-border:rgba(255, 255, 255, 0.20);
  --gd-modal-text:        rgba(255, 255, 255, 0.92);
  --gd-modal-text-muted:  rgba(255, 255, 255, 0.65);
  --gd-modal-primary-fill:#9bcbff;
  --gd-modal-primary-text:#003256;
}

.gd-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(10, 18, 32, 0.55);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.gd-modal-scroll {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  overflow-y: auto;
  overflow-x: hidden;
}

.gd-modal-scroll:focus { outline: none; }

/* ─── Sizer (size + position) ──────────────────────────────────────────────── */
.gd-modal-sizer {
  position: relative;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
}

/* Sizes */
.gd-modal-sizer--xs   { max-width: 20rem;  }
.gd-modal-sizer--sm   { max-width: 24rem;  }
.gd-modal-sizer--md   { max-width: 28rem;  }
.gd-modal-sizer--lg   { max-width: 32rem;  }
.gd-modal-sizer--xl   { max-width: 36rem;  }
.gd-modal-sizer--2xl  { max-width: 42rem;  }
.gd-modal-sizer--3xl  { max-width: 48rem;  }
.gd-modal-sizer--4xl  { max-width: 56rem;  }
.gd-modal-sizer--5xl  { max-width: 64rem;  }
.gd-modal-sizer--6xl  { max-width: 72rem;  }
.gd-modal-sizer--7xl  { max-width: 80rem;  }

/* Positions */
.gd-modal-pos--top-start     { align-self: start; justify-self: start; }
.gd-modal-pos--top-center    { align-self: start; justify-self: center; }
.gd-modal-pos--top-end       { align-self: start; justify-self: end; }
.gd-modal-pos--center-start  { align-self: center; justify-self: start; }
.gd-modal-pos--center        { align-self: center; justify-self: center; }
.gd-modal-pos--center-end    { align-self: center; justify-self: end; }
.gd-modal-pos--bottom-start  { align-self: end; justify-self: start; }
.gd-modal-pos--bottom-center { align-self: end; justify-self: center; }
.gd-modal-pos--bottom-end    { align-self: end; justify-self: end; }

/* ─── Panel ────────────────────────────────────────────────────────────────── */
.gd-modal-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: min(90vh, 920px);
  min-height: 0;
  overflow: hidden;
  border-radius: var(--radius-2xl);
  background: var(--gd-modal-glass-bg);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 24px 80px rgba(0, 0, 0, 0.45);
}

/* ─── Header ───────────────────────────────────────────────────────────────── */
.gd-modal-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  flex-shrink: 0;
}

.gd-modal-header__content {
  flex: 1;
  min-width: 0;
}

.gd-modal-header :deep(h1),
.gd-modal-header :deep(h2),
.gd-modal-header :deep(h3),
.gd-modal-header :deep(h4),
.gd-modal-header :deep(.gd-modal-title) {
  color: var(--gd-modal-text);
  font-weight: 700;
}

.gd-modal-float-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 10;
}

.gd-modal-close-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* ─── Body ─────────────────────────────────────────────────────────────────── */
.gd-modal-body {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  padding: 0;
  color: var(--gd-modal-text);
}

.gd-modal-body--no-header     { padding-top: 0.5rem; }
.gd-modal-body--omit-header   { padding: 0.75rem; padding-top: 0.5rem; }
.gd-modal-body--flush         { padding: 0; }

/* ─── Footer ───────────────────────────────────────────────────────────────── */
.gd-modal-footer {
  flex-shrink: 0;
  padding: 1rem 1.25rem 1.25rem;
}

@media (max-width: 640px) {
  .gd-modal-footer { padding: 0.875rem 1rem 1rem; }
}

/* ─── Form controls inside modal body ─────────────────────────────────────── */
.gd-modal-root :deep(.gd-modal-body) label,
.gd-modal-root :deep(.gd-modal-body) .gd-field-label {
  font-weight: 500;
  font-size: var(--text-sm);
  color: var(--gd-modal-text-muted);
  margin-bottom: 0.35rem;
  display: block;
}

.gd-modal-root :deep(.gd-modal-body) input:not([type='checkbox']):not([type='radio']),
.gd-modal-root :deep(.gd-modal-body) textarea,
.gd-modal-root :deep(.gd-modal-body) select {
  width: 100%;
  box-sizing: border-box;
  border-radius: var(--radius-lg);
  border: 1px solid var(--gd-modal-glass-border);
  background: rgba(255, 255, 255, 0.08);
  color: var(--gd-modal-text);
  padding: 0.65rem 0.95rem;
  font-size: 0.9375rem;
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.gd-modal-root :deep(.gd-modal-body) input[type='date'] { color-scheme: dark; }

.gd-modal-root :deep(.gd-modal-body) input:not([type='checkbox']):not([type='radio']):focus,
.gd-modal-root :deep(.gd-modal-body) textarea:focus,
.gd-modal-root :deep(.gd-modal-body) select:focus {
  outline: none;
  border-color: rgba(155, 203, 255, 0.65);
  box-shadow: 0 0 0 3px rgba(155, 203, 255, 0.15);
}

.gd-modal-root :deep(.gd-modal-body) textarea { resize: vertical; }

/* gd-input (our Input.vue field variant) inside modals gets glass overrides */
.gd-modal-root :deep(.gd-input) {
  border-radius: var(--radius-lg);
  border-color: var(--gd-modal-glass-border);
  background: rgba(255, 255, 255, 0.08);
  color: var(--gd-modal-text);
  font-size: 0.9375rem;
}

.gd-modal-root :deep(.gd-input:focus) {
  border-color: rgba(155, 203, 255, 0.65);
  box-shadow: 0 0 0 3px rgba(155, 203, 255, 0.15);
}

.gd-modal-root :deep(.gd-input--error)       { border-color: #f87171 !important; }
.gd-modal-root :deep(.gd-input--error:focus) { box-shadow: 0 0 0 3px rgba(248,113,113,0.2) !important; }
.gd-modal-root :deep(.gd-input-error)        { color: #fecaca; }

/* ─── Action helper classes (opt-in on consumer markup) ────────────────────── */
.gd-modal-root :deep(.gd-modal-actions) {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
}

.gd-modal-root :deep(.gd-modal-actions--footer-row) {
  justify-content: space-between;
}

.gd-modal-root :deep(.gd-modal-actions__trailing) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3);
  margin-left: auto;
}

.gd-modal-root :deep(.gd-modal-actions--confirm-end) {
  justify-content: flex-end;
}
</style>
