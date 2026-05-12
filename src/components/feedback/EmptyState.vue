<template>
  <div :class="['gd-empty-state', large ? 'gd-empty-state--large' : '']">
    <div class="gd-empty-state__icon-group">
      <div :class="['gd-empty-state__icon-wrap', `gd-empty-state__icon-wrap--${tone}`]">
        <i :class="[icon, 'gd-empty-state__icon']" aria-hidden="true" />
      </div>
      <div v-if="showAddBadge" class="gd-empty-state__badge" aria-hidden="true">
        <i class="fas fa-plus gd-empty-state__badge-icon" />
      </div>
    </div>

    <h3 class="gd-empty-state__title">{{ title }}</h3>
    <p class="gd-empty-state__description">{{ description }}</p>

    <slot name="action">
      <Button
        v-if="actionText"
        type="button"
        intent="primary"
        surface="elevated"
        :size="large ? 'xl' : 'md'"
        radius="full"
        @click="$emit('action-click')"
      >
        {{ actionText }}
      </Button>
    </slot>
  </div>
</template>

<script setup>
import Button from '../primitives/Button.vue'

defineProps({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  icon:        { type: String, required: true },
  actionText:  { type: String, default: '' },
  showAddBadge:{ type: Boolean, default: true },
  large:       { type: Boolean, default: false },
  tone:        {
    type: String,
    default: 'sky',
    validator: (v) => ['sky', 'mint', 'coral', 'amber', 'slate'].includes(v),
  },
})

defineEmits(['action-click'])
</script>

<style scoped>
.gd-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border-hairline);
  background: var(--glass-thin);
}

@media (min-width: 640px) {
  .gd-empty-state { padding: var(--space-8); }
}

.gd-empty-state--large {
  padding: 2.5rem var(--space-4);
}

@media (min-width: 640px) {
  .gd-empty-state--large { padding: 4rem var(--space-8); }
}

/* Icon group */
.gd-empty-state__icon-group {
  position: relative;
  margin-bottom: var(--space-5);
}

.gd-empty-state__icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 640px) {
  .gd-empty-state__icon-wrap { width: 80px; height: 80px; }
}

.gd-empty-state__icon-wrap--sky   { background: var(--badge-sky-bg); }
.gd-empty-state__icon-wrap--mint  { background: var(--badge-emerald-bg); }
.gd-empty-state__icon-wrap--coral { background: rgba(255,126,95,0.18); }
.gd-empty-state__icon-wrap--amber { background: var(--badge-amber-bg); }
.gd-empty-state__icon-wrap--slate { background: var(--badge-slate-bg); }

.gd-empty-state__icon {
  font-size: 1.5rem;
  color: var(--fg-2);
}

@media (min-width: 640px) {
  .gd-empty-state__icon { font-size: 1.875rem; }
}

.gd-empty-state__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  background: var(--badge-amber-bg);
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 640px) {
  .gd-empty-state__badge { width: 24px; height: 24px; }
}

.gd-empty-state__badge-icon {
  font-size: 0.6rem;
  color: var(--badge-amber-fg);
}

/* Text */
.gd-empty-state__title {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: 500;
  color: var(--fg-1);
  margin: 0 0 var(--space-2) 0;
}

@media (min-width: 640px) {
  .gd-empty-state__title { font-size: var(--text-xl); }
}

.gd-empty-state__description {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--fg-3);
  margin: 0 0 var(--space-5) 0;
  max-width: 28rem;
  padding: 0 var(--space-2);
}

@media (min-width: 640px) {
  .gd-empty-state__description { margin-bottom: var(--space-6); }
}
</style>
