<template>
  <Teleport to="body">
    <div class="gd-toast-host" aria-live="polite" aria-atomic="false">
      <TransitionGroup name="gd-toast-anim">
        <Toast
          v-for="toast in toasts"
          :key="toast.id"
          :tone="toast.tone"
          :title="toast.title"
          :message="toast.message"
          @dismiss="dismiss(toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import Toast from './Toast.vue'
import { useToast } from '../../composables/useToast.js'

const { toasts, dismiss } = useToast()
</script>

<style scoped>
/* Anchored top-right on desktop. Sits above modals (z-index 200) so error
   toasts stay visible while a dialog is open. Bottom is intentionally avoided —
   the app's BottomNavigation lives there on mobile. */
.gd-toast-host {
  position: fixed;
  top: calc(var(--space-4) + env(safe-area-inset-top, 0px));
  right: calc(var(--space-4) + env(safe-area-inset-right, 0px));
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: min(360px, calc(100vw - var(--space-6)));
  pointer-events: none;
}

@media (max-width: 640px) {
  .gd-toast-host {
    left: calc(var(--space-4) + env(safe-area-inset-left, 0px));
    right: calc(var(--space-4) + env(safe-area-inset-right, 0px));
    width: auto;
  }
}

/* Enter/leave + reflow animations for the TransitionGroup. */
.gd-toast-anim-enter-active,
.gd-toast-anim-leave-active {
  transition:
    opacity var(--transition-base),
    transform var(--transition-base);
}

.gd-toast-anim-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.gd-toast-anim-leave-to {
  opacity: 0;
  transform: translateX(12px) scale(0.98);
}

.gd-toast-anim-leave-active {
  position: absolute;
  right: 0;
  width: 100%;
}

.gd-toast-anim-move {
  transition: transform var(--transition-base);
}
</style>
