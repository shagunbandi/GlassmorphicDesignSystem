<template>
  <div
    :class="[
      'gd-chat-bubble-row',
      `gd-chat-bubble-row--${side}`,
    ]"
  >
    <div v-if="side === 'incoming'" class="gd-chat-bubble__avatar">
      <slot name="avatar">
        <i class="fas fa-robot gd-chat-bubble__avatar-icon" aria-hidden="true" />
      </slot>
    </div>

    <div class="gd-chat-bubble__content">
      <div
        :class="[
          'gd-chat-bubble',
          `gd-chat-bubble--${side}`,
        ]"
      >
        <slot />
      </div>
      <time
        v-if="timestamp"
        class="gd-chat-bubble__time"
        :datetime="timestamp"
      >{{ timestamp }}</time>
    </div>
  </div>
</template>

<script setup>
defineProps({
  side: {
    type: String,
    default: 'incoming',
    validator: (v) => ['incoming', 'outgoing'].includes(v),
  },
  timestamp: { type: String, default: '' },
})
</script>

<style scoped>
.gd-chat-bubble-row {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  max-width: 85%;
}

.gd-chat-bubble-row--incoming {
  align-self: flex-start;
}

.gd-chat-bubble-row--outgoing {
  align-self: flex-end;
  flex-direction: row-reverse;
}

/* ── Avatar ── */
.gd-chat-bubble__avatar {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-full);
  background: var(--glass-soft);
  border: 1px solid var(--glass-border-hairline);
  display: flex;
  align-items: center;
  justify-content: center;
}

.gd-chat-bubble__avatar-icon {
  font-size: var(--text-sm);
  color: var(--brand-sky);
}

/* ── Content wrapper ── */
.gd-chat-bubble__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
}

.gd-chat-bubble-row--outgoing .gd-chat-bubble__content {
  align-items: flex-end;
}

/* ── Bubble ── */
.gd-chat-bubble {
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  line-height: 1.55;
  word-break: break-word;
}

.gd-chat-bubble--incoming {
  background: var(--glass-soft);
  border: 1px solid var(--glass-border-hairline);
  border-radius: var(--radius-2xl);
  border-top-left-radius: var(--radius-xs);
  color: var(--fg-2);
}

.gd-chat-bubble--outgoing {
  background: var(--badge-indigo-solid-bg);
  border-radius: var(--radius-2xl);
  border-top-right-radius: var(--radius-xs);
  color: rgba(255, 255, 255, 0.95);
}

/* ── Timestamp ── */
.gd-chat-bubble__time {
  font-size: var(--text-eyebrow);
  color: var(--fg-4);
  font-family: var(--font-sans);
}
</style>

<style>
:root.light .gd-chat-bubble--incoming {
  background: rgba(15, 23, 42, 0.07);
  border-color: rgba(15, 23, 42, 0.1);
}
</style>
