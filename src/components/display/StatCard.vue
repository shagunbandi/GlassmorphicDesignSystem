<template>
  <div class="gd-stat-card">
    <h3 v-if="title" class="gd-stat-card__title">{{ title }}</h3>
    <div
      class="gd-stat-card__grid"
      :style="{ '--gd-stat-cols': columns }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  /** Optional heading rendered above the grid */
  title: {
    type: String,
    default: '',
  },
  /** Number of columns in the stat grid */
  columns: {
    type: Number,
    default: 2,
  },
})
</script>

<style scoped>
.gd-stat-card {
  background: var(--glass-soft);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border-soft);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
}

.gd-stat-card__title {
  font-family: var(--font-sans);
  font-size: 18px;
  font-weight: 600;
  color: var(--fg-1);
  margin: 0 0 var(--space-4) 0;
}

.gd-stat-card__grid {
  display: grid;
  grid-template-columns: repeat(var(--gd-stat-cols), 1fr);
  gap: var(--space-3);
}
</style>
