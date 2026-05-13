<template>
  <nav class="gd-bottom-nav" aria-label="Mobile navigation">
    <component
      :is="item.path ? 'router-link' : 'button'"
      v-for="item in items"
      :key="item.path ?? item.label"
      :to="item.path ?? undefined"
      :class="[
        'gd-bottom-nav__item',
        isActive(item) ? 'gd-bottom-nav__item--active' : '',
      ]"
      :aria-label="item.label"
      :type="item.path ? undefined : 'button'"
      @click="item.path ? undefined : $emit('item-click', item)"
    >
      <i :class="[item.icon, 'gd-bottom-nav__icon']" aria-hidden="true" />
      <span class="gd-bottom-nav__label">{{ item.label }}</span>
    </component>
  </nav>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue'

const props = defineProps({
  /**
   * Array of nav items: { label, icon, path?, exact? }
   * - path: vue-router `to` value (omit to use button + item-click emit)
   * - exact: match route exactly (default false)
   */
  items: { type: Array, required: true },
})

defineEmits(['item-click'])

const instance = getCurrentInstance()
const route = computed(
  () => instance?.appContext.config.globalProperties.$route ?? null,
)

function isActive(item) {
  const r = route.value
  if (!r || !item.path) return false
  if (item.exact) return r.path === item.path
  return r.path === item.path || r.path.startsWith(item.path + '/')
}
</script>

<style scoped>
.gd-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;
  display: flex;
  justify-content: center;
  background: rgba(20, 30, 48, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid var(--glass-border-hairline);
  padding-bottom: env(safe-area-inset-bottom);
}

@media (min-width: 768px) {
  .gd-bottom-nav {
    display: none;
  }
}

.gd-bottom-nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 72px;
  padding: 12px 8px 10px;
  color: var(--fg-4);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--transition-fast);
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  font-family: var(--font-sans);
}

.gd-bottom-nav__item:active {
  opacity: 0.7;
}

.gd-bottom-nav__item--active {
  color: var(--brand-sky);
}

.gd-bottom-nav__icon {
  font-size: 20px;
  line-height: 1;
}
.gd-bottom-nav__label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1;
}
</style>
