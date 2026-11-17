<template>
  <article :class="['gd-media-card', { 'gd-media-card--interactive': to || clickable }]">
    <div class="gd-media-card__cover">
      <div
        v-if="imageUrl"
        class="gd-media-card__cover-img"
        :style="{ backgroundImage: `url(${imageUrl})` }"
      />
      <div v-else class="gd-media-card__cover-placeholder">
        <i class="fas fa-image gd-media-card__placeholder-icon" />
      </div>
      <slot name="pills" />
    </div>

    <div class="gd-media-card__body">
      <h3 class="gd-media-card__title">
        <router-link v-if="to" :to="to" class="gd-media-card__action">{{ title }}</router-link>
        <button
          v-else-if="clickable"
          type="button"
          class="gd-media-card__action"
          @click="$emit('click')"
        >
          {{ title }}
        </button>
        <template v-else>{{ title }}</template>
      </h3>
      <p
        v-if="description !== undefined"
        class="gd-media-card__desc"
        :class="{ 'gd-media-card__desc--empty': !description }"
      >
        {{ description }}
      </p>

      <div v-if="$slots.chips" class="gd-media-card__chips">
        <slot name="chips" />
      </div>

      <div v-if="$slots.footer" class="gd-media-card__footer">
        <slot name="footer" />
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  imageUrl: String,
  title: { type: String, required: true },
  description: String,
  /** Route location; renders the title as a router-link covering the whole card. */
  to: [String, Object],
  /** Renders the title as a button that emits `click`, covering the whole card. */
  clickable: Boolean,
})

defineEmits(['click'])
</script>

<style scoped>
.gd-media-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  overflow: hidden;
  background: var(--glass-soft);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border-soft);
  box-shadow: var(--glass-shadow);
  transition:
    background var(--transition-base),
    box-shadow var(--transition-base),
    transform 220ms ease;
}
.gd-media-card:hover {
  background: var(--glass-default);
  box-shadow: var(--glass-shadow-hover);
  transform: translateY(-4px);
}

.gd-media-card--interactive {
  cursor: pointer;
}

/* Title action: stretched overlay makes the whole card the hit area */
.gd-media-card__action {
  appearance: none;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  text-align: inherit;
  text-decoration: none;
  cursor: pointer;
}
.gd-media-card__action:focus {
  outline: none;
}
.gd-media-card__action::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: 18px;
}
.gd-media-card__action:focus-visible::after {
  outline: 2px solid var(--brand-sky);
  outline-offset: -2px;
}

/* Cover */
.gd-media-card__cover {
  position: relative;
  height: 160px;
  overflow: hidden;
  flex-shrink: 0;
}

.gd-media-card__cover-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.78);
  transition: transform var(--transition-slow);
}
.gd-media-card:hover .gd-media-card__cover-img {
  transform: scale(1.05);
}

.gd-media-card__cover-placeholder {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--glass-soft), var(--glass-thin));
  display: flex;
  align-items: center;
  justify-content: center;
}
.gd-media-card__placeholder-icon {
  font-size: 32px;
  color: var(--fg-5);
}
</style>

<style>
/* Light mode: glass-soft is near-transparent on light bg — use stronger surface */
:root.light .gd-media-card {
  background: rgba(255, 255, 255, 0.65);
  border-color: rgba(15, 23, 42, 0.08);
}
:root.light .gd-media-card:hover {
  background: rgba(255, 255, 255, 0.85);
}

/* Interactive children stay above the overlay. Global on purpose: slot content
   can be a wrapper whose nested buttons :slotted() cannot reach. */
.gd-media-card__cover a,
.gd-media-card__cover button,
.gd-media-card__cover [tabindex],
.gd-media-card__footer a,
.gd-media-card__footer button,
.gd-media-card__footer [tabindex] {
  position: relative;
  z-index: 2;
}

/* Body */
.gd-media-card__body {
  padding: 16px 18px 18px;
}

.gd-media-card__title {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--fg-1);
  transition: color var(--transition-fast);
}
.gd-media-card:hover .gd-media-card__title {
  color: var(--brand-sky);
}

.gd-media-card__desc {
  margin: 0 0 14px;
  font-size: 13px;
  line-height: 1.45;
  color: var(--fg-3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.gd-media-card__desc--empty {
  color: var(--fg-5);
  font-style: italic;
}

/* Chips grid wrapper */
.gd-media-card__chips {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 14px;
}

/* Footer */
.gd-media-card__footer {
  border-top: 1px solid var(--glass-border-hairline);
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
