<template>
  <span class="gd-star-rating">
    <span class="gd-star-rating__num">{{ Number(rating).toFixed(1) }}</span>
    <span class="gd-star-rating__stars">
      <i v-for="n in 5" :key="n" :class="starClass(n)" />
    </span>
    <span v-if="count" class="gd-star-rating__count">({{ formatCount(count) }})</span>
  </span>
</template>

<script setup>
const props = defineProps({
  rating: { type: Number, required: true },
  count: { type: Number, default: 0 },
})

function starClass(n) {
  if (props.rating >= n) return 'fas fa-star gd-star'
  if (props.rating >= n - 0.5) return 'fas fa-star-half-stroke gd-star'
  return 'fas fa-star gd-star gd-star--empty'
}

function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
</script>

<style scoped>
.gd-star-rating {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.gd-star-rating__num {
  font-weight: 800;
  color: var(--fg-1);
  font-size: 15px;
  letter-spacing: -0.01em;
}

.gd-star-rating__stars {
  display: inline-flex;
  gap: 2px;
  color: #f5a623;
  font-size: 12px;
}

.gd-star--empty { color: var(--fg-5); }

.gd-star-rating__count {
  color: var(--fg-4);
  font-size: 13px;
}
</style>
