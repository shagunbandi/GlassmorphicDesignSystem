<template>
  <span
    :class="['gd-badge', `gd-badge--${tone}`, allCaps ? 'gd-badge--caps' : '']"
    :data-variant="variant"
    :data-size="size"
  >
    <slot />
  </span>
</template>

<script setup>
defineProps({
  tone: {
    type: String,
    default: 'amber',
    validator: (v) => ['sky', 'emerald', 'amber', 'indigo', 'coral', 'slate'].includes(v),
  },
  variant: {
    type: String,
    default: 'soft',
    validator: (v) => ['solid', 'soft', 'outline'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v),
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
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1;
}

.gd-badge--caps { text-transform: uppercase; }

/* ── Sizes ──────────────────────────────────────────────────────────────── */
.gd-badge[data-size="xs"] { font-size: 9px;  padding: 1px 5px;  gap: 3px; }
.gd-badge[data-size="sm"] { font-size: 10px; padding: 2px 7px;  gap: 4px; }
.gd-badge[data-size="md"] { font-size: 11px; padding: 4px 10px; gap: 4px; }
.gd-badge[data-size="lg"] { font-size: 12px; padding: 5px 12px; gap: 5px; }
.gd-badge[data-size="xl"] { font-size: 14px; padding: 6px 16px; gap: 6px; letter-spacing: var(--tracking-normal); }

/* ── Soft (default) — translucent tinted ───────────────────────────────── */
.gd-badge--sky[data-variant="soft"]     { background: var(--badge-sky-bg);     color: var(--badge-sky-fg); }
.gd-badge--emerald[data-variant="soft"] { background: var(--badge-emerald-bg); color: var(--badge-emerald-fg); }
.gd-badge--amber[data-variant="soft"]   { background: var(--badge-amber-bg);   color: var(--badge-amber-fg); }
.gd-badge--indigo[data-variant="soft"]  { background: var(--badge-indigo-bg);  color: var(--badge-indigo-fg); }
.gd-badge--coral[data-variant="soft"]   { background: var(--badge-coral-bg);   color: var(--badge-coral-fg); }
.gd-badge--slate[data-variant="soft"]   { background: var(--badge-slate-bg);   color: var(--badge-slate-fg); }

/* ── Solid — opaque, higher emphasis ───────────────────────────────────── */
/* Darker shades chosen so white text clears WCAG AA at small sizes */
.gd-badge--sky[data-variant="solid"]     { background: var(--badge-sky-solid-bg);     color: var(--badge-sky-solid-fg); }
.gd-badge--emerald[data-variant="solid"] { background: var(--badge-emerald-solid-bg); color: var(--badge-emerald-solid-fg); }
.gd-badge--amber[data-variant="solid"]   { background: var(--badge-amber-solid-bg);   color: var(--badge-amber-solid-fg); }
.gd-badge--indigo[data-variant="solid"]  { background: var(--badge-indigo-solid-bg);  color: var(--badge-indigo-solid-fg); }
.gd-badge--coral[data-variant="solid"]   { background: var(--badge-coral-solid-bg);   color: var(--badge-coral-solid-fg); }
.gd-badge--slate[data-variant="solid"]   { background: var(--badge-slate-solid-bg);   color: var(--badge-slate-solid-fg); }

/* ── Outline — border + tinted text, transparent bg ───────────────────── */
.gd-badge--sky[data-variant="outline"]     { background: transparent; color: var(--badge-sky-fg);     border-color: rgba(56,  189, 248, 0.55); }
.gd-badge--emerald[data-variant="outline"] { background: transparent; color: var(--badge-emerald-fg); border-color: rgba(52,  211, 153, 0.55); }
.gd-badge--amber[data-variant="outline"]   { background: transparent; color: var(--badge-amber-fg);   border-color: rgba(251, 191, 36,  0.55); }
.gd-badge--indigo[data-variant="outline"]  { background: transparent; color: var(--badge-indigo-fg);  border-color: rgba(99,  102, 241, 0.55); }
.gd-badge--coral[data-variant="outline"]   { background: transparent; color: var(--badge-coral-fg);   border-color: rgba(255, 126, 95,  0.55); }
.gd-badge--slate[data-variant="outline"]   { background: transparent; color: var(--badge-slate-fg);   border-color: rgba(148, 163, 184, 0.40); }
</style>
