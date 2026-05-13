<template>
  <div class="gd-section-header">
    <div
      v-if="icon"
      :class="[
        'gd-section-header__icon-wrap',
        `gd-section-header__icon-wrap--${tone}`,
      ]"
    >
      <i :class="[icon, 'gd-section-header__icon']" aria-hidden="true" />
    </div>
    <div class="gd-section-header__text">
      <span
        v-if="tagline"
        :class="[
          'gd-section-header__tagline',
          `gd-section-header__tagline--${tone}`,
        ]"
      >
        {{ tagline }}
      </span>
      <h2 class="gd-section-header__title">
        {{ title }}
        <span
          v-if="emoji"
          class="gd-section-header__emoji"
          aria-hidden="true"
          >{{ emoji }}</span
        >
      </h2>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  tagline: { type: String, default: '' },
  icon: { type: String, default: '' },
  emoji: { type: String, default: '' },
  /** Visual accent applied to icon bg and tagline. */
  tone: {
    type: String,
    default: 'sky',
    validator: (v) => ['sky', 'mint', 'coral', 'amber', 'slate'].includes(v),
  },
})
</script>

<style scoped>
.gd-section-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

/* Icon circle */
.gd-section-header__icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.gd-section-header__icon-wrap--sky {
  background: rgba(56, 189, 248, 0.25);
}
.gd-section-header__icon-wrap--mint {
  background: rgba(85, 221, 176, 0.22);
}
.gd-section-header__icon-wrap--coral {
  background: rgba(255, 126, 95, 0.22);
}
.gd-section-header__icon-wrap--amber {
  background: rgba(251, 191, 36, 0.22);
}
.gd-section-header__icon-wrap--slate {
  background: rgba(148, 163, 184, 0.22);
}

.gd-section-header__icon {
  color: white;
  font-size: 1rem;
}

/* Tagline badge */
.gd-section-header__tagline {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 500;
  border-radius: var(--radius-full);
  padding: 2px 10px;
  display: inline-block;
  margin-bottom: var(--space-1);
}

.gd-section-header__tagline--sky {
  background: var(--badge-sky-bg);
  color: var(--badge-sky-fg);
}
.gd-section-header__tagline--mint {
  background: var(--badge-emerald-bg);
  color: var(--badge-emerald-fg);
}
.gd-section-header__tagline--coral {
  background: rgba(255, 126, 95, 0.18);
  color: rgba(255, 210, 200, 0.95);
}
.gd-section-header__tagline--amber {
  background: var(--badge-amber-bg);
  color: var(--badge-amber-fg);
}
.gd-section-header__tagline--slate {
  background: var(--badge-slate-bg);
  color: var(--badge-slate-fg);
}

/* Title */
.gd-section-header__title {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--fg-1);
  margin: 0;
  line-height: 1.2;
}

@media (min-width: 640px) {
  .gd-section-header__title {
    font-size: var(--text-3xl);
  }
}

.gd-section-header__emoji {
  display: inline;
  margin-left: var(--space-1);
}
</style>
