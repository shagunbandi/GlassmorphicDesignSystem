<template>
  <div class="gd-difference">
    <div class="gd-difference__panel gd-difference__panel--before">
      <div class="gd-difference__label">{{ beforeLabel }}</div>
      <div class="gd-difference__content">
        <slot name="before" />
      </div>
    </div>
    <div class="gd-difference__divider" aria-hidden="true">
      <i class="fas fa-arrow-right" />
    </div>
    <div class="gd-difference__panel gd-difference__panel--after">
      <div class="gd-difference__label gd-difference__label--proposed">{{ afterLabel }}</div>
      <div class="gd-difference__content">
        <slot name="after" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  beforeLabel: { type: String, default: 'Current' },
  afterLabel: { type: String, default: 'Proposed' },
})
</script>

<style scoped>
.gd-difference {
  display: flex;
  align-items: stretch;
  min-height: 160px;
}

.gd-difference__panel {
  flex: 1;
  padding: var(--space-4);
  min-width: 0;
}

.gd-difference__panel--before {
  border-right: 1px solid var(--glass-border-hairline);
}

.gd-difference__divider {
  display: flex;
  align-items: center;
  padding: 0 var(--space-2);
  flex-shrink: 0;
  font-size: var(--text-xs);
  color: var(--fg-5);
}

.gd-difference__label {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--fg-4);
  margin-bottom: var(--space-2);
}

.gd-difference__label--proposed {
  color: var(--color-interactive-light);
}

.gd-difference__content {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  line-height: 1.55;
  color: var(--fg-2);
}
</style>
