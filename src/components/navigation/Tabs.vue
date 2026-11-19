<template>
  <div class="gd-tabs">
    <div
      class="gd-tabs__scroll"
      role="tablist"
      :aria-label="ariaLabel || undefined"
      @keydown="onKeydown"
    >
      <Button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :ref="(el) => setTabRef(el, index)"
        role="tab"
        intent="neutral"
        surface="ghost"
        size="sm"
        tone="inverted"
        :selected="active === tab.id"
        :aria-selected="active === tab.id ? 'true' : 'false'"
        :aria-label="tab.name"
        :tabindex="active === tab.id ? 0 : -1"
        type="button"
        @click="$emit('update:active', tab.id)"
      >
        <i
          v-if="tab.icon"
          :class="[
            tab.icon,
            'gd-tabs__icon',
            active === tab.id ? 'gd-tabs__icon--active' : '',
          ]"
          aria-hidden="true"
        />
        <span class="gd-tabs__label">{{ tab.name }}</span>
        <span v-if="tab.count > 0" class="gd-tabs__count">{{ tab.count }}</span>
      </Button>
    </div>
  </div>
</template>

<script setup>
import Button from '../primitives/Button.vue'

const props = defineProps({
  /** Array of { id, name, icon?, count? } */
  tabs: { type: Array, required: true },
  active: { type: String, required: true },
  /** Accessible name for the tablist */
  ariaLabel: { type: String, default: '' },
})

const emit = defineEmits(['update:active'])

const tabEls = []

function setTabRef(el, index) {
  tabEls[index] = el?.$el ?? null
}

// Arrow keys wrap, Home/End jump; each moves focus and selects the tab.
function onKeydown(event) {
  const last = props.tabs.length - 1
  const current = props.tabs.findIndex((tab) => tab.id === props.active)
  const targets = {
    ArrowRight: current >= last ? 0 : current + 1,
    ArrowLeft: current <= 0 ? last : current - 1,
    Home: 0,
    End: last,
  }
  const next = targets[event.key]
  if (next === undefined || last < 0) return
  event.preventDefault()
  emit('update:active', props.tabs[next].id)
  tabEls[next]?.focus()
}
</script>

<style scoped>
.gd-tabs {
  padding: var(--space-3) var(--space-4);
}

.gd-tabs__scroll {
  display: flex;
  overflow-x: auto;
  gap: var(--space-1);
  scrollbar-width: none;
}

.gd-tabs__scroll::-webkit-scrollbar {
  display: none;
}

.gd-tabs__icon {
  color: var(--fg-4);
  transition: color var(--transition-fast);
}

.gd-tabs__icon--active {
  color: var(--brand-sky);
}

.gd-tabs__label {
  display: none;
}

@media (min-width: 480px) {
  .gd-tabs__label {
    display: inline;
  }
}

.gd-tabs__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  padding: 1px 6px;
  font-size: var(--text-xs);
  border-radius: var(--radius-full);
  background: var(--badge-sky-bg);
  color: var(--badge-sky-fg);
  border: 1px solid rgba(155, 203, 255, 0.4);
  line-height: 1.4;
}
</style>
