<template>
  <header class="gd-page-head">
    <div class="gd-page-head__content">
      <span v-if="eyebrow" class="gd-eyebrow">{{ eyebrow }}</span>
      <slot v-else name="eyebrow" />
      <Title level="1" as="h1" class="gd-page-head__title">
        <slot name="title">{{ title }}</slot>
      </Title>
      <Text
        v-if="subtitle || $slots.subtitle"
        as="p"
        size="sm"
        color="muted"
        class="gd-page-head__subtitle"
      >
        <slot name="subtitle">{{ subtitle }}</slot>
      </Text>
    </div>
    <div v-if="$slots.actions" class="gd-page-head__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup>
import Text from '../typography/Text.vue'
import Title from '../typography/Title.vue'

defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
})
</script>
