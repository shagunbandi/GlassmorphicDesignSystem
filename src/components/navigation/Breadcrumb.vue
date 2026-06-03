<template>
  <nav class="gd-breadcrumb" :data-size="size" aria-label="Breadcrumb">
    <ol class="gd-breadcrumb__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="gd-breadcrumb__item"
      >
        <span
          v-if="index > 0"
          class="gd-breadcrumb__sep"
          aria-hidden="true"
        >
          <i class="fas fa-chevron-right" />
        </span>

        <component
          :is="isLast(index) ? 'span' : item.href ? 'a' : 'button'"
          :href="!isLast(index) && item.href ? item.href : undefined"
          :type="!isLast(index) && !item.href ? 'button' : undefined"
          :aria-current="isLast(index) ? 'page' : undefined"
          :class="[
            'gd-breadcrumb__link',
            isLast(index) ? 'gd-breadcrumb__link--current' : '',
          ]"
          @click="!isLast(index) ? $emit('navigate', item, index) : undefined"
        >
          <i v-if="item.icon" :class="[item.icon, 'gd-breadcrumb__icon']" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </component>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const props = defineProps({
  /** Array of { label, href?, icon? }. Last item is the current page. */
  items: { type: Array, required: true },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md'].includes(v),
  },
})

defineEmits(['navigate'])

const isLast = (index) => index === props.items.length - 1
</script>

<style scoped>
.gd-breadcrumb__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0;
}

.gd-breadcrumb__item {
  display: flex;
  align-items: center;
}

.gd-breadcrumb__sep {
  display: flex;
  align-items: center;
  padding: 0 var(--space-1);
  color: var(--fg-4);
  font-size: 0.6em;
}

.gd-breadcrumb__link {
  display: inline-flex;
  align-items: center;
  gap: 0.375em;
  font-family: var(--font-sans);
  font-weight: 500;
  color: var(--fg-3);
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast);
  outline-offset: 2px;
}

.gd-breadcrumb__link:not(.gd-breadcrumb__link--current):hover {
  color: var(--fg-1);
}

.gd-breadcrumb__link:focus-visible {
  outline: 2px solid var(--focus-ring-color);
}

.gd-breadcrumb__link--current {
  color: var(--fg-1);
  font-weight: 600;
  cursor: default;
  pointer-events: none;
}

.gd-breadcrumb__icon {
  font-size: 0.85em;
}

/* ─── Size variants ──────────────────────────────────────────────────────── */
.gd-breadcrumb[data-size='sm'] .gd-breadcrumb__link {
  font-size: var(--text-xs);
}

.gd-breadcrumb[data-size='md'] .gd-breadcrumb__link {
  font-size: var(--text-sm);
}
</style>
