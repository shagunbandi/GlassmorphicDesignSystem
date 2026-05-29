<template>
  <component
    :is="as"
    :class="['gd-text', `gd-text--${color}`, size ? `gd-text--${size}` : '']"
  >
    <slot />
  </component>
</template>

<script setup>
defineProps({
  /**
   * Semantic color level.
   *   primary     → var(--fg-1)  95% — strong labels, active states
   *   body        → var(--fg-2)  80% — default body copy  [default]
   *   muted       → var(--fg-3)  60% — secondary, meta, captions
   *   subtle      → var(--fg-4)  40% — hints, disabled
   *   placeholder → var(--fg-5)  25% — placeholders, decorative
   */
  color: {
    type: String,
    default: 'body',
    validator: (v) =>
      ['primary', 'body', 'muted', 'subtle', 'placeholder'].includes(v),
  },
  /** Type size — omit to inherit parent font-size. */
  size: {
    type: String,
    default: null,
    validator: (v) =>
      v == null || ['eyebrow', 'xs', 'sm', 'base', 'lg', 'xl'].includes(v),
  },
  /** HTML element to render. */
  as: {
    type: String,
    default: 'p',
  },
})
</script>

<style scoped>
.gd-text {
  font-family: var(--font-sans);
  margin: 0;
  line-height: 1.55;
}

/* ── Color levels ── */
.gd-text--primary     { color: var(--fg-1); }
.gd-text--body        { color: var(--fg-2); }
.gd-text--muted       { color: var(--fg-3); }
.gd-text--subtle      { color: var(--fg-4); }
.gd-text--placeholder { color: var(--fg-5); }

/* ── Sizes ── */
.gd-text--eyebrow {
  font-size: var(--text-eyebrow);
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
  font-weight: 700;
}
.gd-text--xs   { font-size: var(--text-xs); }
.gd-text--sm   { font-size: var(--text-sm); }
.gd-text--base { font-size: var(--text-base); }
.gd-text--lg   { font-size: var(--text-lg); }
.gd-text--xl   { font-size: var(--text-xl); }
</style>
