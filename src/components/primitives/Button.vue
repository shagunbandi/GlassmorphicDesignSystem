<template>
  <component
    :is="tag"
    v-bind="polymorphicAttrs"
    :type="resolvedType"
    :data-intent="intent"
    :data-surface="surface"
    :data-size="size"
    :data-tone="resolvedTone"
    :data-selected="selected || null"
    :data-nested="nested || null"
    :data-accent="accentHue || null"
    :data-radius="radius || null"
    :data-elevation="elevation || null"
    :class="[
      'gd-btn',
      fullWidth ? 'gd-btn--full' : '',
      align === 'start' ? 'gd-btn--align-start' : '',
    ]"
    :disabled="disabledAttr"
    :aria-pressed="ariaPressedValue"
    :aria-disabled="isDisabled || undefined"
    :tabindex="tabIndexAttr"
    @click="handleClick"
  >
    <span v-if="loading" class="gd-btn__spinner" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity:0.25" />
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" style="opacity:0.75" />
      </svg>
    </span>
    <span v-else-if="$slots.leading" class="gd-btn__leading">
      <slot name="leading" />
    </span>
    <span v-if="$slots.default" class="gd-btn__label">
      <slot />
    </span>
    <span v-if="!loading && ($slots.trailing || external)" class="gd-btn__trailing">
      <slot name="trailing">
        <i v-if="external" class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
      </slot>
    </span>
  </component>
</template>

<script setup>
import { computed, inject, resolveComponent } from 'vue'

const props = defineProps({
  intent: {
    type: String,
    default: 'neutral',
    validator: (v) => ['neutral', 'primary', 'success', 'warning', 'danger'].includes(v),
  },
  surface: {
    type: String,
    default: 'solid',
    validator: (v) => ['solid', 'soft', 'outline', 'ghost', 'link', 'elevated'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', 'icon', 'icon-sm'].includes(v),
  },
  tone: {
    type: String,
    default: null,
    validator: (v) => v == null || ['default', 'inverted'].includes(v),
  },
  radius: {
    type: String,
    default: null,
    validator: (v) => v == null || ['none', 'sm', 'md', 'lg', 'full'].includes(v),
  },
  elevation: {
    type: String,
    default: null,
    validator: (v) => v == null || ['none', 'sm', 'md'].includes(v),
  },
  fullWidth:  { type: Boolean, default: false },
  align:      { type: String, default: 'center', validator: (v) => ['center', 'start'].includes(v) },
  loading:    { type: Boolean, default: false },
  disabled:   { type: Boolean, default: false },
  selected:   { type: Boolean, default: false },
  nested:     { type: Boolean, default: false },
  accentHue: {
    type: String,
    default: null,
    validator: (v) => v == null || ['indigo', 'violet', 'amber', 'emerald', 'rose', 'sky', 'coral'].includes(v),
  },
  type: { type: String, default: 'button' },
  to:   { type: [String, Object], default: null },
  href: { type: String, default: null },
  external: { type: Boolean, default: false },
})

// Tone inheritance — glass containers provide('buttonTone', 'inverted')
const inheritedTone = inject('buttonTone', 'default')
const resolvedTone = computed(() => props.tone ?? inheritedTone)

// Polymorphic rendering — resolve RouterLink so :is works reliably in library builds
// (string 'router-link' can fail to resolve when the component is compiled in a package).
let resolvedRouterLink = null
const tag = computed(() => {
  if (props.to) {
    if (resolvedRouterLink == null) resolvedRouterLink = resolveComponent('RouterLink')
    return resolvedRouterLink
  }
  if (props.href) return 'a'
  return 'button'
})

const resolvedType = computed(() => (props.to || props.href ? undefined : props.type))
const isNativeButton = computed(() => !props.to && !props.href)

const polymorphicAttrs = computed(() => {
  if (props.to) return { to: props.to }
  if (tag.value === 'a') {
    const attrs = { href: props.href }
    if (props.external) {
      attrs.target = '_blank'
      attrs.rel = 'noopener noreferrer'
    }
    return attrs
  }
  return {}
})

const isDisabled = computed(() => props.disabled || props.loading)
const disabledAttr = computed(() => (isNativeButton.value ? isDisabled.value : undefined))
const tabIndexAttr = computed(() => (!isNativeButton.value && isDisabled.value ? -1 : undefined))
const ariaPressedValue = computed(() => (props.selected ? 'true' : undefined))

function handleClick(event) {
  if (!isDisabled.value || isNativeButton.value) return

  event.preventDefault()
  event.stopImmediatePropagation?.()
}
</script>

<style scoped>
/* ─── Base ────────────────────────────────────────────────────────────────── */
.gd-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-weight: 600;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid transparent;
  box-sizing: border-box;
  transition: background-color var(--transition-fast),
              color var(--transition-fast),
              border-color var(--transition-fast),
              box-shadow var(--transition-fast),
              opacity var(--transition-fast);
}

.gd-btn:focus { outline: none; }
.gd-btn:focus-visible {
  outline: 2px solid rgba(99, 102, 241, 0.5);
  outline-offset: 2px;
}
.gd-btn[data-tone="inverted"]:focus-visible {
  outline-color: rgba(255, 255, 255, 0.35);
}
.gd-btn:disabled,
.gd-btn[disabled],
.gd-btn[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.gd-btn--full        { width: 100%; }
.gd-btn--align-start { justify-content: flex-start; text-align: left; }

/* ─── Sub-elements ────────────────────────────────────────────────────────── */
.gd-btn__spinner,
.gd-btn__leading,
.gd-btn__trailing {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.gd-btn__spinner svg {
  width: 1em;
  height: 1em;
  animation: gd-spin 0.75s linear infinite;
}

@keyframes gd-spin {
  to { transform: rotate(360deg); }
}

.gd-btn__label {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}

/* ─── Sizes ───────────────────────────────────────────────────────────────── */
.gd-btn[data-size="2xs"]    { font-size: 10px;                    padding: 2px 6px;   gap: 4px;  line-height: 1;    border-radius: var(--radius-xs); }
.gd-btn[data-size="xs"]     { font-size: var(--text-xs);          padding: 4px 10px;  gap: 6px;  line-height: 1.25; border-radius: var(--radius-sm); }
.gd-btn[data-size="sm"]     { font-size: var(--text-sm);          padding: 6px 12px;  gap: 6px;                     border-radius: var(--radius-sm); }
.gd-btn[data-size="md"]     { font-size: var(--text-sm);          padding: 8px 16px;  gap: 8px;                     border-radius: var(--radius-sm); }
.gd-btn[data-size="lg"]     { font-size: var(--text-base);        padding: 10px 20px; gap: 8px;                     border-radius: var(--radius-md); }
.gd-btn[data-size="xl"]     { font-size: var(--text-base);        padding: 12px 24px; gap: 10px;                    border-radius: var(--radius-md); }
.gd-btn[data-size="icon"]   { font-size: var(--text-sm);          width: 36px; height: 36px; padding: 0;            border-radius: var(--radius-sm); }
.gd-btn[data-size="icon-sm"]{ font-size: var(--text-xs);          width: 28px; height: 28px; padding: 0;            border-radius: var(--radius-xs); }

/* Link surface removes padding */
.gd-btn[data-surface="link"][data-size="2xs"]     { padding: 0; gap: 4px;  }
.gd-btn[data-surface="link"][data-size="xs"]      { padding: 0; gap: 4px;  }
.gd-btn[data-surface="link"][data-size="sm"]      { padding: 0; gap: 6px;  }
.gd-btn[data-surface="link"][data-size="md"]      { padding: 0; gap: 8px;  }
.gd-btn[data-surface="link"][data-size="lg"]      { padding: 0; gap: 8px;  }
.gd-btn[data-surface="link"][data-size="xl"]      { padding: 0; gap: 10px; }
.gd-btn[data-surface="link"][data-size="icon"]    { padding: 0; }
.gd-btn[data-surface="link"][data-size="icon-sm"] { padding: 0; }
.gd-btn[data-surface="link"]                      { border-color: transparent !important; }

/* Radius overrides */
.gd-btn[data-radius="none"] { border-radius: 0 !important; }
.gd-btn[data-radius="sm"]   { border-radius: var(--radius-xs) !important; }
.gd-btn[data-radius="md"]   { border-radius: var(--radius-sm) !important; }
.gd-btn[data-radius="lg"]   { border-radius: var(--radius-md) !important; }
.gd-btn[data-radius="full"] { border-radius: var(--radius-full) !important; }

/* Elevation */
.gd-btn[data-elevation="sm"] { box-shadow: 0 1px 4px rgba(0,0,0,0.12); }
.gd-btn[data-elevation="md"] { box-shadow: var(--glass-shadow); }

/* ─── Default tone — neutral ──────────────────────────────────────────────── */
.gd-btn[data-tone="default"][data-intent="neutral"][data-surface="solid"] {
  background: #292524; color: #fff; border-color: transparent;
}
.gd-btn[data-tone="default"][data-intent="neutral"][data-surface="solid"]:not(:disabled):hover { background: #1c1917; }

.gd-btn[data-tone="default"][data-intent="neutral"][data-surface="soft"] {
  background: #f5f5f4; color: #44403c; border-color: #e7e5e4;
}
.gd-btn[data-tone="default"][data-intent="neutral"][data-surface="soft"]:not(:disabled):hover { background: #e7e5e4; }

.gd-btn[data-tone="default"][data-intent="neutral"][data-surface="outline"] {
  background: #fff; color: #44403c; border-color: #d6d3d1;
}
.gd-btn[data-tone="default"][data-intent="neutral"][data-surface="outline"]:not(:disabled):hover { background: #f5f5f4; }

.gd-btn[data-tone="default"][data-intent="neutral"][data-surface="ghost"] {
  background: transparent; color: #44403c; border-color: transparent;
}
.gd-btn[data-tone="default"][data-intent="neutral"][data-surface="ghost"]:not(:disabled):hover { background: #f5f5f4; }

.gd-btn[data-tone="default"][data-intent="neutral"][data-surface="link"] {
  background: transparent; color: #78716c;
}
.gd-btn[data-tone="default"][data-intent="neutral"][data-surface="link"]:not(:disabled):hover {
  color: #44403c; text-decoration: underline; text-underline-offset: 2px;
}

.gd-btn[data-tone="default"][data-intent="neutral"][data-surface="elevated"] {
  background: #fff; color: #44403c; border-color: #e7e5e4;
  box-shadow: 0 1px 4px rgba(0,0,0,0.10);
}
.gd-btn[data-tone="default"][data-intent="neutral"][data-surface="elevated"]:not(:disabled):hover { background: #f5f5f4; }

/* ─── Default tone — primary ─────────────────────────────────────────────── */
.gd-btn[data-tone="default"][data-intent="primary"][data-surface="solid"] {
  background: var(--color-interactive); color: #fff; border-color: transparent;
}
.gd-btn[data-tone="default"][data-intent="primary"][data-surface="solid"]:not(:disabled):hover { background: var(--color-interactive-hover); }

.gd-btn[data-tone="default"][data-intent="primary"][data-surface="soft"] {
  background: rgba(79,70,229,0.08); color: #4f46e5; border-color: rgba(79,70,229,0.25);
}
.gd-btn[data-tone="default"][data-intent="primary"][data-surface="soft"]:not(:disabled):hover { background: rgba(79,70,229,0.14); }

.gd-btn[data-tone="default"][data-intent="primary"][data-surface="outline"] {
  background: transparent; color: #4f46e5; border-color: #4f46e5;
}
.gd-btn[data-tone="default"][data-intent="primary"][data-surface="outline"]:not(:disabled):hover { background: rgba(79,70,229,0.06); }

.gd-btn[data-tone="default"][data-intent="primary"][data-surface="ghost"] {
  background: transparent; color: #4f46e5; border-color: transparent;
}
.gd-btn[data-tone="default"][data-intent="primary"][data-surface="ghost"]:not(:disabled):hover { background: rgba(79,70,229,0.06); }

.gd-btn[data-tone="default"][data-intent="primary"][data-surface="link"] {
  background: transparent; color: var(--color-interactive);
}
.gd-btn[data-tone="default"][data-intent="primary"][data-surface="link"]:not(:disabled):hover {
  color: var(--color-interactive-hover); text-decoration: underline; text-underline-offset: 2px;
}

.gd-btn[data-tone="default"][data-intent="primary"][data-surface="elevated"] {
  background: var(--color-interactive); color: #fff; border-color: transparent;
  box-shadow: var(--glass-shadow);
}
.gd-btn[data-tone="default"][data-intent="primary"][data-surface="elevated"]:not(:disabled):hover { background: var(--color-interactive-hover); }

/* ─── Default tone — success ─────────────────────────────────────────────── */
.gd-btn[data-tone="default"][data-intent="success"][data-surface="solid"] {
  background: var(--color-success); color: #fff; border-color: transparent;
}
.gd-btn[data-tone="default"][data-intent="success"][data-surface="solid"]:not(:disabled):hover { background: #047857; }

.gd-btn[data-tone="default"][data-intent="success"][data-surface="soft"] {
  background: rgba(5,150,105,0.08); color: #059669; border-color: rgba(5,150,105,0.25);
}
.gd-btn[data-tone="default"][data-intent="success"][data-surface="soft"]:not(:disabled):hover { background: rgba(5,150,105,0.14); }

.gd-btn[data-tone="default"][data-intent="success"][data-surface="outline"] {
  background: transparent; color: #059669; border-color: #059669;
}
.gd-btn[data-tone="default"][data-intent="success"][data-surface="outline"]:not(:disabled):hover { background: rgba(5,150,105,0.06); }

.gd-btn[data-tone="default"][data-intent="success"][data-surface="ghost"] {
  background: transparent; color: #059669; border-color: transparent;
}
.gd-btn[data-tone="default"][data-intent="success"][data-surface="ghost"]:not(:disabled):hover { background: rgba(5,150,105,0.06); }

.gd-btn[data-tone="default"][data-intent="success"][data-surface="link"] {
  background: transparent; color: var(--color-success);
}
.gd-btn[data-tone="default"][data-intent="success"][data-surface="link"]:not(:disabled):hover {
  color: #047857; text-decoration: underline; text-underline-offset: 2px;
}

.gd-btn[data-tone="default"][data-intent="success"][data-surface="elevated"] {
  background: var(--color-success); color: #fff; border-color: transparent;
  box-shadow: var(--glass-shadow);
}
.gd-btn[data-tone="default"][data-intent="success"][data-surface="elevated"]:not(:disabled):hover { background: #047857; }

/* ─── Default tone — warning ─────────────────────────────────────────────── */
.gd-btn[data-tone="default"][data-intent="warning"][data-surface="solid"] {
  background: var(--color-warning-light); color: #fff; border-color: transparent;
}
.gd-btn[data-tone="default"][data-intent="warning"][data-surface="solid"]:not(:disabled):hover { background: var(--color-warning); }

.gd-btn[data-tone="default"][data-intent="warning"][data-surface="soft"] {
  background: rgba(245,158,11,0.10); color: #92400e; border-color: rgba(245,158,11,0.30);
}
.gd-btn[data-tone="default"][data-intent="warning"][data-surface="soft"]:not(:disabled):hover { background: rgba(245,158,11,0.16); }

.gd-btn[data-tone="default"][data-intent="warning"][data-surface="outline"] {
  background: transparent; color: #92400e; border-color: var(--color-warning-light);
}
.gd-btn[data-tone="default"][data-intent="warning"][data-surface="outline"]:not(:disabled):hover { background: rgba(245,158,11,0.06); }

.gd-btn[data-tone="default"][data-intent="warning"][data-surface="ghost"] {
  background: transparent; color: #b45309; border-color: transparent;
}
.gd-btn[data-tone="default"][data-intent="warning"][data-surface="ghost"]:not(:disabled):hover { background: rgba(245,158,11,0.06); }

.gd-btn[data-tone="default"][data-intent="warning"][data-surface="link"] {
  background: transparent; color: #b45309;
}
.gd-btn[data-tone="default"][data-intent="warning"][data-surface="link"]:not(:disabled):hover {
  color: #92400e; text-decoration: underline; text-underline-offset: 2px;
}

.gd-btn[data-tone="default"][data-intent="warning"][data-surface="elevated"] {
  background: var(--color-warning-light); color: #fff; border-color: transparent;
  box-shadow: var(--glass-shadow);
}
.gd-btn[data-tone="default"][data-intent="warning"][data-surface="elevated"]:not(:disabled):hover { background: var(--color-warning); }

/* ─── Default tone — danger ──────────────────────────────────────────────── */
.gd-btn[data-tone="default"][data-intent="danger"][data-surface="solid"] {
  background: var(--color-danger); color: #fff; border-color: transparent;
}
.gd-btn[data-tone="default"][data-intent="danger"][data-surface="solid"]:not(:disabled):hover { background: #b91c1c; }

.gd-btn[data-tone="default"][data-intent="danger"][data-surface="soft"] {
  background: rgba(220,38,38,0.08); color: #dc2626; border-color: rgba(220,38,38,0.25);
}
.gd-btn[data-tone="default"][data-intent="danger"][data-surface="soft"]:not(:disabled):hover { background: rgba(220,38,38,0.14); }

.gd-btn[data-tone="default"][data-intent="danger"][data-surface="outline"] {
  background: transparent; color: #dc2626; border-color: #dc2626;
}
.gd-btn[data-tone="default"][data-intent="danger"][data-surface="outline"]:not(:disabled):hover { background: rgba(220,38,38,0.06); }

.gd-btn[data-tone="default"][data-intent="danger"][data-surface="ghost"] {
  background: transparent; color: #dc2626; border-color: transparent;
}
.gd-btn[data-tone="default"][data-intent="danger"][data-surface="ghost"]:not(:disabled):hover { background: rgba(220,38,38,0.06); }

.gd-btn[data-tone="default"][data-intent="danger"][data-surface="link"] {
  background: transparent; color: var(--color-danger);
}
.gd-btn[data-tone="default"][data-intent="danger"][data-surface="link"]:not(:disabled):hover {
  color: #b91c1c; text-decoration: underline; text-underline-offset: 2px;
}

.gd-btn[data-tone="default"][data-intent="danger"][data-surface="elevated"] {
  background: var(--color-danger); color: #fff; border-color: transparent;
  box-shadow: var(--glass-shadow);
}
.gd-btn[data-tone="default"][data-intent="danger"][data-surface="elevated"]:not(:disabled):hover { background: #b91c1c; }

/* ─── Inverted tone — neutral ────────────────────────────────────────────── */
.gd-btn[data-tone="inverted"][data-intent="neutral"][data-surface="solid"] {
  background: rgba(255,255,255,0.90); color: #1c1917; border-color: transparent;
}
.gd-btn[data-tone="inverted"][data-intent="neutral"][data-surface="solid"]:not(:disabled):hover { background: #fff; }

.gd-btn[data-tone="inverted"][data-intent="neutral"][data-surface="soft"] {
  background: var(--glass-soft); color: var(--fg-1); border-color: var(--glass-border-soft);
}
.gd-btn[data-tone="inverted"][data-intent="neutral"][data-surface="soft"]:not(:disabled):hover {
  background: var(--glass-default); border-color: var(--glass-border);
}

.gd-btn[data-tone="inverted"][data-intent="neutral"][data-surface="outline"] {
  background: transparent; color: var(--fg-2); border-color: var(--glass-border-soft);
}
.gd-btn[data-tone="inverted"][data-intent="neutral"][data-surface="outline"]:not(:disabled):hover {
  background: var(--glass-soft); border-color: var(--glass-border);
}

.gd-btn[data-tone="inverted"][data-intent="neutral"][data-surface="ghost"] {
  background: transparent; color: var(--fg-3); border-color: transparent;
}
.gd-btn[data-tone="inverted"][data-intent="neutral"][data-surface="ghost"]:not(:disabled):hover {
  background: var(--glass-soft); color: var(--fg-1);
}

.gd-btn[data-tone="inverted"][data-intent="neutral"][data-surface="link"] {
  background: transparent; color: var(--fg-3);
}
.gd-btn[data-tone="inverted"][data-intent="neutral"][data-surface="link"]:not(:disabled):hover {
  color: var(--fg-1); text-decoration: underline; text-underline-offset: 2px;
}

.gd-btn[data-tone="inverted"][data-intent="neutral"][data-surface="elevated"] {
  background: rgba(16,22,34,0.72); color: var(--fg-2);
  border-color: rgba(255,255,255,0.15);
  box-shadow: 0 4px 16px rgba(0,0,0,0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.gd-btn[data-tone="inverted"][data-intent="neutral"][data-surface="elevated"]:not(:disabled):hover {
  background: rgba(26,36,52,0.88); color: var(--fg-1);
}

/* ─── Inverted tone — primary ────────────────────────────────────────────── */
.gd-btn[data-tone="inverted"][data-intent="primary"][data-surface="solid"] {
  background: var(--brand-sky); color: var(--brand-sky-deep); border-color: transparent;
}
.gd-btn[data-tone="inverted"][data-intent="primary"][data-surface="solid"]:not(:disabled):hover { filter: brightness(1.08); }

.gd-btn[data-tone="inverted"][data-intent="primary"][data-surface="soft"] {
  background: rgba(99,102,241,0.20); color: #c7d2fe; border-color: rgba(99,102,241,0.40);
}
.gd-btn[data-tone="inverted"][data-intent="primary"][data-surface="soft"]:not(:disabled):hover { background: rgba(99,102,241,0.30); }

.gd-btn[data-tone="inverted"][data-intent="primary"][data-surface="outline"] {
  background: transparent; color: #c7d2fe; border-color: rgba(99,102,241,0.50);
}
.gd-btn[data-tone="inverted"][data-intent="primary"][data-surface="outline"]:not(:disabled):hover { background: rgba(99,102,241,0.15); }

.gd-btn[data-tone="inverted"][data-intent="primary"][data-surface="ghost"] {
  background: transparent; color: #c7d2fe; border-color: transparent;
}
.gd-btn[data-tone="inverted"][data-intent="primary"][data-surface="ghost"]:not(:disabled):hover {
  background: rgba(99,102,241,0.15); color: var(--fg-1);
}

.gd-btn[data-tone="inverted"][data-intent="primary"][data-surface="link"] {
  background: transparent; color: #c7d2fe;
}
.gd-btn[data-tone="inverted"][data-intent="primary"][data-surface="link"]:not(:disabled):hover {
  color: var(--fg-1); text-decoration: underline; text-underline-offset: 2px;
}

.gd-btn[data-tone="inverted"][data-intent="primary"][data-surface="elevated"] {
  background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; border-color: transparent;
  box-shadow: 0 8px 24px rgba(99,102,241,0.45);
}
.gd-btn[data-tone="inverted"][data-intent="primary"][data-surface="elevated"]:not(:disabled):hover {
  box-shadow: 0 12px 30px rgba(99,102,241,0.55);
}

/* ─── Inverted tone — success ────────────────────────────────────────────── */
.gd-btn[data-tone="inverted"][data-intent="success"][data-surface="solid"] {
  background: rgba(5,150,105,0.95); color: #fff; border-color: transparent;
}
.gd-btn[data-tone="inverted"][data-intent="success"][data-surface="solid"]:not(:disabled):hover { background: #047857; }

.gd-btn[data-tone="inverted"][data-intent="success"][data-surface="soft"] {
  background: rgba(52,211,153,0.15); color: #a7f3d0; border-color: rgba(52,211,153,0.40);
}
.gd-btn[data-tone="inverted"][data-intent="success"][data-surface="soft"]:not(:disabled):hover { background: rgba(52,211,153,0.25); }

.gd-btn[data-tone="inverted"][data-intent="success"][data-surface="outline"] {
  background: transparent; color: #a7f3d0; border-color: rgba(52,211,153,0.50);
}
.gd-btn[data-tone="inverted"][data-intent="success"][data-surface="outline"]:not(:disabled):hover { background: rgba(52,211,153,0.15); }

.gd-btn[data-tone="inverted"][data-intent="success"][data-surface="ghost"] {
  background: transparent; color: #a7f3d0; border-color: transparent;
}
.gd-btn[data-tone="inverted"][data-intent="success"][data-surface="ghost"]:not(:disabled):hover {
  background: rgba(52,211,153,0.15); color: var(--fg-1);
}

.gd-btn[data-tone="inverted"][data-intent="success"][data-surface="link"] {
  background: transparent; color: #a7f3d0;
}
.gd-btn[data-tone="inverted"][data-intent="success"][data-surface="link"]:not(:disabled):hover {
  color: #d1fae5; text-decoration: underline; text-underline-offset: 2px;
}

.gd-btn[data-tone="inverted"][data-intent="success"][data-surface="elevated"] {
  background: var(--color-success-light); color: #fff; border-color: transparent;
  box-shadow: var(--glass-shadow);
}
.gd-btn[data-tone="inverted"][data-intent="success"][data-surface="elevated"]:not(:disabled):hover { background: var(--color-success); }

/* ─── Inverted tone — warning ────────────────────────────────────────────── */
.gd-btn[data-tone="inverted"][data-intent="warning"][data-surface="solid"] {
  background: rgba(245,158,11,0.95); color: #fff; border-color: transparent;
}
.gd-btn[data-tone="inverted"][data-intent="warning"][data-surface="solid"]:not(:disabled):hover { background: var(--color-warning); }

.gd-btn[data-tone="inverted"][data-intent="warning"][data-surface="soft"] {
  background: rgba(251,191,36,0.20); color: #fde68a; border-color: rgba(251,191,36,0.40);
}
.gd-btn[data-tone="inverted"][data-intent="warning"][data-surface="soft"]:not(:disabled):hover { background: rgba(251,191,36,0.30); }

.gd-btn[data-tone="inverted"][data-intent="warning"][data-surface="outline"] {
  background: transparent; color: #fde68a; border-color: rgba(251,191,36,0.50);
}
.gd-btn[data-tone="inverted"][data-intent="warning"][data-surface="outline"]:not(:disabled):hover { background: rgba(251,191,36,0.15); }

.gd-btn[data-tone="inverted"][data-intent="warning"][data-surface="ghost"] {
  background: transparent; color: #fbbf24; border-color: transparent;
}
.gd-btn[data-tone="inverted"][data-intent="warning"][data-surface="ghost"]:not(:disabled):hover {
  background: rgba(251,191,36,0.15); color: var(--fg-1);
}

.gd-btn[data-tone="inverted"][data-intent="warning"][data-surface="link"] {
  background: transparent; color: #fcd34d;
}
.gd-btn[data-tone="inverted"][data-intent="warning"][data-surface="link"]:not(:disabled):hover {
  color: #fde68a; text-decoration: underline; text-underline-offset: 2px;
}

.gd-btn[data-tone="inverted"][data-intent="warning"][data-surface="elevated"] {
  background: var(--color-warning-light); color: #fff; border-color: transparent;
  box-shadow: var(--glass-shadow);
}
.gd-btn[data-tone="inverted"][data-intent="warning"][data-surface="elevated"]:not(:disabled):hover { background: var(--color-warning); }

/* ─── Inverted tone — danger ─────────────────────────────────────────────── */
.gd-btn[data-tone="inverted"][data-intent="danger"][data-surface="solid"] {
  background: rgba(220,38,38,0.90); color: #fff; border-color: transparent;
}
.gd-btn[data-tone="inverted"][data-intent="danger"][data-surface="solid"]:not(:disabled):hover { background: #b91c1c; }

.gd-btn[data-tone="inverted"][data-intent="danger"][data-surface="soft"] {
  background: rgba(239,68,68,0.20); color: #fca5a5; border-color: rgba(239,68,68,0.40);
}
.gd-btn[data-tone="inverted"][data-intent="danger"][data-surface="soft"]:not(:disabled):hover { background: rgba(239,68,68,0.30); }

.gd-btn[data-tone="inverted"][data-intent="danger"][data-surface="outline"] {
  background: transparent; color: #fca5a5; border-color: rgba(239,68,68,0.50);
}
.gd-btn[data-tone="inverted"][data-intent="danger"][data-surface="outline"]:not(:disabled):hover { background: rgba(239,68,68,0.15); }

.gd-btn[data-tone="inverted"][data-intent="danger"][data-surface="ghost"] {
  background: transparent; color: #fca5a5; border-color: transparent;
}
.gd-btn[data-tone="inverted"][data-intent="danger"][data-surface="ghost"]:not(:disabled):hover {
  background: rgba(239,68,68,0.15); color: var(--fg-1);
}

.gd-btn[data-tone="inverted"][data-intent="danger"][data-surface="link"] {
  background: transparent; color: #fca5a5;
}
.gd-btn[data-tone="inverted"][data-intent="danger"][data-surface="link"]:not(:disabled):hover {
  color: #fecaca; text-decoration: underline; text-underline-offset: 2px;
}

.gd-btn[data-tone="inverted"][data-intent="danger"][data-surface="elevated"] {
  background: var(--color-danger); color: #fff; border-color: transparent;
  box-shadow: var(--glass-shadow);
}
.gd-btn[data-tone="inverted"][data-intent="danger"][data-surface="elevated"]:not(:disabled):hover { background: #b91c1c; }

/* ─── Selected states ────────────────────────────────────────────────────── */
.gd-btn[data-selected="true"][data-tone="default"][data-intent="neutral"][data-surface="soft"]    { background: #e7e5e4; color: #1c1917; }
.gd-btn[data-selected="true"][data-tone="default"][data-intent="neutral"][data-surface="ghost"]   { background: #f5f5f4; color: #1c1917; }
.gd-btn[data-selected="true"][data-tone="default"][data-intent="neutral"][data-surface="outline"] { border-color: #78716c; background: #f5f5f4; }
.gd-btn[data-selected="true"][data-tone="default"][data-intent="primary"][data-surface="soft"]    { background: rgba(79,70,229,0.15); color: #312e81; }
.gd-btn[data-selected="true"][data-tone="default"][data-intent="primary"][data-surface="outline"] { background: var(--color-interactive); color: #fff; border-color: var(--color-interactive); }
.gd-btn[data-selected="true"][data-tone="default"][data-intent="success"][data-surface="soft"]    { background: rgba(5,150,105,0.15); color: #065f46; }

.gd-btn[data-selected="true"][data-tone="inverted"][data-intent="neutral"][data-surface="soft"]    { background: var(--glass-default); color: var(--fg-1); border-color: var(--glass-border); }
.gd-btn[data-selected="true"][data-tone="inverted"][data-intent="neutral"][data-surface="ghost"]   { background: var(--glass-soft); color: var(--fg-1); }
.gd-btn[data-selected="true"][data-tone="inverted"][data-intent="neutral"][data-surface="outline"] { background: var(--glass-soft); border-color: var(--glass-border); }
.gd-btn[data-selected="true"][data-tone="inverted"][data-intent="neutral"][data-surface="elevated"] {
  outline: 1px solid rgba(56,189,248,0.45); color: #bae6fd;
  background: rgba(30,58,138,0.25); border-color: rgba(56,189,248,0.40);
}
.gd-btn[data-selected="true"][data-tone="inverted"][data-intent="primary"][data-surface="soft"]    { background: rgba(99,102,241,0.35); color: #fff; border-color: rgba(99,102,241,0.60); }
.gd-btn[data-selected="true"][data-tone="inverted"][data-intent="success"][data-surface="soft"]    { background: rgba(52,211,153,0.30); color: #fff; border-color: rgba(52,211,153,0.55); }

/* ─── Nested overlay (icon buttons inside dark place cards) ──────────────── */
.gd-btn[data-nested="true"][data-intent="neutral"][data-surface="soft"] {
  background: rgba(255,255,255,0.05); color: rgba(203,213,225,0.60); border-color: rgba(255,255,255,0.14);
}
.gd-btn[data-nested="true"][data-intent="neutral"][data-surface="soft"]:not(:disabled):hover {
  background: rgba(255,255,255,0.10); color: #f8fafc; border-color: rgba(255,255,255,0.22);
}
.gd-btn[data-nested="true"][data-intent="neutral"][data-surface="ghost"] {
  background: transparent; color: rgba(255,255,255,0.60);
}
.gd-btn[data-nested="true"][data-intent="neutral"][data-surface="ghost"]:not(:disabled):hover {
  background: rgba(255,255,255,0.10); color: var(--fg-1);
}
.gd-btn[data-nested="true"][data-intent="danger"][data-surface="soft"] {
  background: transparent; color: rgba(252,165,165,0.90); border-color: rgba(252,165,165,0.35);
}
.gd-btn[data-nested="true"][data-intent="danger"][data-surface="soft"]:not(:disabled):hover {
  background: rgba(239,68,68,0.10);
}
.gd-btn[data-nested="true"][data-intent="warning"][data-surface="outline"] {
  border-color: rgba(253,230,138,0.50); color: #fde68a;
}
.gd-btn[data-nested="true"][data-intent="warning"][data-surface="outline"]:not(:disabled):hover {
  background: rgba(251,191,36,0.10);
}

/* ─── Accent hue chips (soft surface with accentHue prop) ────────────────── */
.gd-btn[data-accent="indigo"][data-surface="soft"][data-tone="default"]   { background: rgba(79,70,229,0.08);   color: #4f46e5; border-color: rgba(79,70,229,0.25); }
.gd-btn[data-accent="violet"][data-surface="soft"][data-tone="default"]   { background: rgba(124,58,237,0.08);  color: #7c3aed; border-color: rgba(124,58,237,0.25); }
.gd-btn[data-accent="amber"][data-surface="soft"][data-tone="default"]    { background: rgba(245,158,11,0.10);  color: #b45309; border-color: rgba(245,158,11,0.30); }
.gd-btn[data-accent="emerald"][data-surface="soft"][data-tone="default"]  { background: rgba(5,150,105,0.08);   color: #059669; border-color: rgba(5,150,105,0.25); }
.gd-btn[data-accent="rose"][data-surface="soft"][data-tone="default"]     { background: rgba(225,29,72,0.08);   color: #e11d48; border-color: rgba(225,29,72,0.25); }
.gd-btn[data-accent="sky"][data-surface="soft"][data-tone="default"]      { background: rgba(14,165,233,0.08);  color: #0284c7; border-color: rgba(14,165,233,0.25); }
.gd-btn[data-accent="coral"][data-surface="soft"][data-tone="default"]    { background: rgba(255,126,95,0.08);  color: #ff7e5f; border-color: rgba(255,126,95,0.25); }

.gd-btn[data-accent="indigo"][data-surface="soft"][data-tone="inverted"]  { background: rgba(99,102,241,0.20); color: #c7d2fe; border-color: rgba(99,102,241,0.40); }
.gd-btn[data-accent="violet"][data-surface="soft"][data-tone="inverted"]  { background: rgba(139,92,246,0.20); color: #ddd6fe; border-color: rgba(139,92,246,0.40); }
.gd-btn[data-accent="amber"][data-surface="soft"][data-tone="inverted"]   { background: rgba(251,191,36,0.18); color: #fde68a; border-color: rgba(251,191,36,0.35); }
.gd-btn[data-accent="emerald"][data-surface="soft"][data-tone="inverted"] { background: rgba(52,211,153,0.22); color: #a7f3d0; border-color: rgba(52,211,153,0.45); }
.gd-btn[data-accent="rose"][data-surface="soft"][data-tone="inverted"]    { background: rgba(251,113,133,0.20); color: #fecdd3; border-color: rgba(251,113,133,0.40); }
.gd-btn[data-accent="sky"][data-surface="soft"][data-tone="inverted"]     { background: rgba(56,189,248,0.22); color: #bae6fd; border-color: rgba(56,189,248,0.45); }
.gd-btn[data-accent="coral"][data-surface="soft"][data-tone="inverted"]   { background: rgba(255,126,95,0.15); color: #ffb39f; border-color: rgba(255,126,95,0.32); }

.gd-btn[data-accent]:not(:disabled):hover { filter: brightness(1.08); }
</style>
