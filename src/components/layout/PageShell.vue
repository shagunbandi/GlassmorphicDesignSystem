<template>
  <div class="gd-page-shell">
    <div
      class="gd-page-shell__inner"
      :class="{
        'gd-page-shell__inner--narrow': size === 'narrow',
        'gd-page-shell__inner--full': size === 'full',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  /** `wide` (1080px) · `narrow` (profile/settings) · `full` (edge-to-edge in shell padding) */
  size: {
    type: String,
    default: 'wide',
    validator: (v) => ['wide', 'narrow', 'full'].includes(v),
  },
})
</script>
