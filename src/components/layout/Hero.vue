<template>
  <div class="gd-hero" :style="heroStyle">
    <div class="gd-hero__bg" aria-hidden="true" />

    <div class="gd-hero__content">
      <div class="gd-hero__text">
        <span v-if="tagline" class="gd-hero__tagline gd-eyebrow">{{
          tagline
        }}</span>

        <slot name="title">
          <h1 class="gd-hero__title gd-h1">{{ title }}</h1>
        </slot>

        <slot name="subtitle">
          <p v-if="subtitle" class="gd-hero__subtitle gd-body">
            {{ subtitle }}
          </p>
        </slot>
      </div>

      <div v-if="showAction" class="gd-hero__action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  tagline: { type: String, default: '' },
  /** URL for a cover/background image. Falls back to the app gradient. */
  backgroundImage: { type: String, default: '' },
  showAction: { type: Boolean, default: true },
  /** Inner padding, accepts any CSS value. */
  padding: { type: String, default: '1.5rem 2rem' },
})

defineEmits(['action-click'])

const heroStyle = computed(() => {
  const styles = { padding: props.padding }
  if (props.backgroundImage) {
    styles.backgroundImage = `url(${props.backgroundImage})`
    styles.backgroundSize = 'cover'
    styles.backgroundPosition = 'center'
  }
  return styles
})
</script>

<style scoped>
.gd-hero {
  position: relative;
  overflow: hidden;
  background: var(--color-app-bg);
  color: var(--fg-1);
  box-sizing: border-box;
}

/* Decorative blurred orb overlay for depth */
.gd-hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.18;
}

.gd-hero__bg::before {
  content: '';
  position: absolute;
  right: -40px;
  top: -80px;
  width: 260px;
  height: 260px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-full);
}

.gd-hero__bg::after {
  content: '';
  position: absolute;
  right: 80px;
  top: 40px;
  width: 130px;
  height: 130px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
}

.gd-hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
}

.gd-hero__text {
  flex: 1;
  min-width: 0;
}

.gd-hero__tagline {
  display: inline-block;
  margin-bottom: var(--space-3);
}

.gd-hero__title {
  margin: 0 0 var(--space-3) 0;
}

.gd-hero__subtitle {
  max-width: 40rem;
  margin: 0;
  font-size: var(--text-base);
  color: var(--fg-2);
}

.gd-hero__action {
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .gd-hero__action {
    width: 100%;
  }
}
</style>
