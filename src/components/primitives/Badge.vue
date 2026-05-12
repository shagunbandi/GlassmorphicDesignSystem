<template>
  <span
    :class="[
      'gd-badge',
      `gd-badge--${tone}`,
      allCaps ? 'gd-badge--caps' : '',
    ]"
  >
    <slot />
  </span>
</template>

<script setup>
defineProps({
  tone: {
    type: String,
    default: 'amber',
    validator: (v) => ['sky', 'emerald', 'amber', 'slate'].includes(v),
  },
  allCaps: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped>
.gd-badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  border-radius: var(--radius-full);
  padding: 4px 10px;
  white-space: nowrap;
  line-height: 1;
}

.gd-badge--caps { text-transform: uppercase; }

.gd-badge--sky     { background: var(--badge-sky-bg);     color: var(--badge-sky-fg); }
.gd-badge--emerald { background: var(--badge-emerald-bg); color: var(--badge-emerald-fg); }
.gd-badge--amber   { background: var(--badge-amber-bg);   color: var(--badge-amber-fg); }
.gd-badge--slate   { background: var(--badge-slate-bg);   color: var(--badge-slate-fg); }
</style>
