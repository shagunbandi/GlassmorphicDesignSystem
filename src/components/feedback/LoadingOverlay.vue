<template>
  <Transition name="gd-fade">
    <div v-if="visible" class="gd-loading-overlay">
      <div class="gd-loading-overlay__inner">
        <div class="gd-loading-overlay__spinner-wrap">
          <div class="gd-loading-overlay__ring" />
          <div class="gd-loading-overlay__ring gd-loading-overlay__ring--spin" />
        </div>
        <p class="gd-loading-overlay__message">{{ message }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false },
  message: { type: String, default: 'Loading...' },
})
</script>

<style scoped>
.gd-loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 18, 32, 0.72);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.gd-loading-overlay__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.gd-loading-overlay__spinner-wrap {
  position: relative;
  width: 64px;
  height: 64px;
}

.gd-loading-overlay__ring {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-full);
  border: 4px solid var(--color-interactive-bg);
}

.gd-loading-overlay__ring--spin {
  border-color: var(--color-interactive-light);
  border-top-color: transparent;
  animation: gd-spin 0.9s linear infinite;
}

.gd-loading-overlay__message {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--fg-3);
  margin: 0;
  animation: gd-pulse 2s ease-in-out infinite;
}

/* Transitions */
.gd-fade-enter-active { transition: opacity var(--transition-base); }
.gd-fade-leave-active { transition: opacity 200ms ease; }
.gd-fade-enter-from,
.gd-fade-leave-to     { opacity: 0; }

@keyframes gd-spin  { to { transform: rotate(360deg); } }

@keyframes gd-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.45; }
}
</style>
