<template>
  <div class="gd-collapsible" :class="{ 'gd-collapsible--open': isOpen }">
    <button
      type="button"
      class="gd-collapsible__trigger"
      :aria-expanded="isOpen"
      :disabled="disabled"
      @click="toggle"
    >
      <i
        v-if="icon"
        :class="[icon, 'gd-collapsible__icon']"
        aria-hidden="true"
      />
      <span class="gd-collapsible__title">{{ title }}</span>
      <slot name="meta" />
      <i
        class="fas fa-chevron-down gd-collapsible__chevron"
        aria-hidden="true"
      />
    </button>

    <Transition name="gd-collapsible-expand">
      <div v-if="isOpen" class="gd-collapsible__body">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: '' },
  defaultOpen: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:open'])

const isOpen = ref(props.defaultOpen)

function toggle() {
  isOpen.value = !isOpen.value
  emit('update:open', isOpen.value)
}
</script>

<style scoped>
.gd-collapsible {
  font-family: var(--font-sans);
}

.gd-collapsible__trigger {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: var(--space-3) 0;
  color: var(--fg-2);
  font-family: inherit;
  font-size: var(--text-sm);
  font-weight: 500;
  text-align: left;
  transition: color var(--transition-fast);
  user-select: none;
}

.gd-collapsible__trigger:hover:not(:disabled) {
  color: var(--fg-1);
}

.gd-collapsible__trigger:disabled {
  cursor: default;
  opacity: 0.5;
}

.gd-collapsible__icon {
  font-size: var(--text-xs);
  flex-shrink: 0;
}

.gd-collapsible__title {
  flex: 1;
}

.gd-collapsible__chevron {
  font-size: var(--text-xs);
  flex-shrink: 0;
  transition: transform var(--transition-base) var(--ease-out-soft);
}

.gd-collapsible--open .gd-collapsible__chevron {
  transform: rotate(180deg);
}

.gd-collapsible__body {
  overflow: hidden;
}

/* ── Expand / collapse transition ── */
.gd-collapsible-expand-enter-active,
.gd-collapsible-expand-leave-active {
  transition:
    opacity var(--transition-base),
    max-height var(--transition-slow) var(--ease-out-soft);
  max-height: 2000px;
  overflow: hidden;
}

.gd-collapsible-expand-enter-from,
.gd-collapsible-expand-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
