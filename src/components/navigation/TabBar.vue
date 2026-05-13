<template>
  <div class="gd-tab-bar" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      role="tab"
      type="button"
      :aria-selected="active === tab.id"
      :class="['gd-tab-bar__tab', { 'gd-tab-bar__tab--active': active === tab.id }]"
      @click="$emit('update:active', tab.id)"
    >
      <i v-if="tab.icon" :class="[tab.icon, 'gd-tab-bar__icon']" aria-hidden="true" />
      <span>{{ tab.name }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  /** Array of { id, name, icon? } */
  tabs:   { type: Array, required: true },
  active: { type: String, required: true },
})

defineEmits(['update:active'])
</script>

<style scoped>
.gd-tab-bar {
  display: flex;
  gap: 0.25rem;
  background: var(--glass-soft);
  border: 1px solid var(--glass-border-soft);
  border-radius: 9999px;
  padding: 0.3rem;
  width: fit-content;
}

.gd-tab-bar__tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.1rem;
  border-radius: 9999px;
  border: none;
  background: transparent;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--fg-3);
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.gd-tab-bar__tab:hover {
  color: var(--fg-1);
}

.gd-tab-bar__tab--active {
  background: rgba(155, 203, 255, 0.12);
  color: var(--brand-sky);
  font-weight: 600;
}

.gd-tab-bar__icon {
  font-size: 0.875em;
}
</style>
