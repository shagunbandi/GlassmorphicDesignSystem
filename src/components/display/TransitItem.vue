<template>
  <div v-if="transit" class="gd-transit-item">
    <span class="gd-transit-item__stat">
      <i class="fa-solid fa-car gd-transit-item__icon" aria-hidden="true" />
      <span class="gd-transit-item__val">{{ transit.distance.text }}</span>
    </span>
    <span class="gd-transit-item__sep">•</span>
    <span class="gd-transit-item__stat">
      <i class="fa-regular fa-clock gd-transit-item__icon" aria-hidden="true" />
      <span class="gd-transit-item__val">{{ transit.duration.text }}</span>
    </span>
  </div>
</template>

<script setup>
defineProps({
  /** { distance: { text: string }, duration: { text: string } } */
  transit: Object,
})
</script>

<style scoped>
.gd-transit-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin: var(--space-2) auto;
  padding: 6px 16px;
  border-radius: var(--radius-full);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  width: fit-content;
}

.gd-transit-item__stat {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.gd-transit-item__icon { color: #9ca3af; }
.gd-transit-item__val  { font-weight: 500; }
.gd-transit-item__sep  { color: #d1d5db; }
</style>
