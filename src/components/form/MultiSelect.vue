<template>
  <div
    ref="rootRef"
    class="gd-multiselect"
    :class="{ 'gd-multiselect--open': open, 'gd-multiselect--disabled': disabled }"
  >
    <div
      class="gd-multiselect__control"
      role="combobox"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @mousedown="onControlMousedown"
    >
      <i
        class="fas fa-magnifying-glass gd-multiselect__search-icon"
        aria-hidden="true"
      />
      <input
        ref="inputRef"
        v-model="query"
        class="gd-multiselect__input"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-label="ariaLabel || placeholder"
        @focus="openDropdown"
        @input="onInput"
        @keydown="onInputKeydown"
      />
      <i class="fas fa-chevron-down gd-multiselect__chevron" aria-hidden="true" />
    </div>

    <div class="gd-multiselect__chips">
      <span
        v-for="opt in selectedOptions"
        :key="opt.valueKey"
        class="gd-multiselect__tag"
      >
        {{ opt.label }}
        <button
          type="button"
          class="gd-multiselect__tag-remove"
          :aria-label="'Remove ' + opt.label"
          :disabled="disabled"
          @mousedown.prevent.stop="removeValue(opt.value)"
        >
          <i class="fas fa-xmark" />
        </button>
      </span>
    </div>

    <Teleport to="body">
      <div
        v-show="open"
        ref="menuRef"
        class="gd-multiselect__menu gd-multiselect__menu--floating"
        role="listbox"
        aria-multiselectable="true"
        :style="menuStyle"
        @mousedown.prevent
      >
        <div v-if="!filteredOptions.length" class="gd-multiselect__empty">
          {{ emptyMessage }}
        </div>
        <div
          v-for="(opt, i) in filteredOptions"
          :key="opt.valueKey"
          class="gd-multiselect__option"
          :class="{
            'gd-multiselect__option--selected': isSelected(opt.value),
            'gd-multiselect__option--active': i === activeIdx,
          }"
          role="option"
          :aria-selected="isSelected(opt.value)"
          @mousedown.prevent="toggleValue(opt.value)"
        >
          <span class="gd-multiselect__check">
            <i class="fas fa-check" />
          </span>
          <span class="gd-multiselect__option-label">{{ opt.label }}</span>
          <span v-if="opt.meta" class="gd-multiselect__option-meta">{{ opt.meta }}</span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

const MENU_MARGIN = 6
const MENU_Z_INDEX = 10050

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Select…' },
  emptyMessage: { type: String, default: 'No matches' },
  disabled: { type: Boolean, default: false },
  /** @deprecated Menu height is fixed in design tokens; prop is ignored. */
  size: { type: Number, default: null },
  ariaLabel: { type: String, default: null },
})

const emit = defineEmits(['update:modelValue'])

const rootRef = ref(null)
const menuRef = ref(null)
const inputRef = ref(null)
const open = ref(false)
const query = ref('')
const activeIdx = ref(-1)
const menuStyle = ref({})

const normalizedOptions = computed(() =>
  props.options.map((opt) => ({
    value: normalizeValue(opt.value),
    valueKey: String(normalizeValue(opt.value)),
    label: opt.label ?? String(opt.value),
    meta: opt.meta ?? opt.description ?? '',
  })),
)

function normalizeValue(value) {
  const n = Number(value)
  return Number.isFinite(n) && String(value).trim() !== '' ? n : value
}

const selectedSet = computed(() => new Set(props.modelValue.map(normalizeValue)))

const selectedOptions = computed(() =>
  normalizedOptions.value.filter((opt) => selectedSet.value.has(opt.value)),
)

const filteredOptions = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return normalizedOptions.value
  return normalizedOptions.value.filter((opt) =>
    opt.label.toLowerCase().includes(q),
  )
})

function isSelected(value) {
  return selectedSet.value.has(normalizeValue(value))
}

function openDropdown() {
  if (props.disabled) return
  open.value = true
  activeIdx.value = -1
}

function closeDropdown() {
  open.value = false
  query.value = ''
  activeIdx.value = -1
}

function setOpen(next) {
  if (props.disabled) return
  if (next) openDropdown()
  else closeDropdown()
}

function onControlMousedown(e) {
  if (props.disabled || e.target === inputRef.value) return
  e.preventDefault()
  setOpen(!open.value)
  inputRef.value?.focus()
}

function onInput() {
  activeIdx.value = -1
  if (!open.value) openDropdown()
}

function emitValues(next) {
  emit('update:modelValue', next)
}

function toggleValue(value) {
  const id = normalizeValue(value)
  const next = new Set(selectedSet.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  emitValues([...next])
  query.value = ''
  activeIdx.value = -1
  inputRef.value?.focus()
}

function removeValue(value) {
  const id = normalizeValue(value)
  emitValues(props.modelValue.map(normalizeValue).filter((v) => v !== id))
  inputRef.value?.focus()
}

function onInputKeydown(e) {
  const list = filteredOptions.value

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    openDropdown()
    activeIdx.value = Math.min(activeIdx.value + 1, list.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIdx.value = Math.max(activeIdx.value - 1, 0)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (activeIdx.value >= 0 && list[activeIdx.value]) {
      toggleValue(list[activeIdx.value].value)
    }
  } else if (e.key === 'Backspace' && !query.value && props.modelValue.length) {
    emitValues(props.modelValue.slice(0, -1))
  } else if (e.key === 'Escape') {
    closeDropdown()
    inputRef.value?.blur()
  }
}

function computeMenuStyle() {
  const rect = rootRef.value?.getBoundingClientRect()
  if (!rect) {
    menuStyle.value = {}
    return
  }

  menuStyle.value = {
    position: 'fixed',
    zIndex: MENU_Z_INDEX,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    top: `${rect.bottom + MENU_MARGIN}px`,
    display: 'flex',
  }
}

function onDocumentMousedown(e) {
  const target = e.target
  if (
    rootRef.value?.contains(target) ||
    menuRef.value?.contains(target)
  ) {
    return
  }
  closeDropdown()
}

function onViewportChange() {
  if (open.value) computeMenuStyle()
}

watch(open, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    computeMenuStyle()
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('scroll', onViewportChange, true)
  } else {
    window.removeEventListener('resize', onViewportChange)
    window.removeEventListener('scroll', onViewportChange, true)
    menuStyle.value = {}
  }
})

onMounted(() => {
  document.addEventListener('mousedown', onDocumentMousedown)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentMousedown)
  window.removeEventListener('resize', onViewportChange)
  window.removeEventListener('scroll', onViewportChange, true)
})
</script>

<style scoped>
.gd-multiselect {
  position: relative;
  width: 100%;
  font-family: var(--font-sans);
}
.gd-multiselect__control {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 38px;
  box-sizing: border-box;
  padding: var(--space-1) var(--space-2);
  background: var(--glass-soft);
  border: 1px solid var(--glass-border-soft);
  border-radius: var(--radius-sm);
  cursor: text;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}
.gd-multiselect__control:hover {
  border-color: var(--glass-border);
}
.gd-multiselect--open .gd-multiselect__control {
  border-color: var(--color-interactive-light);
  box-shadow: 0 0 0 2px var(--color-interactive-bg);
}
.gd-multiselect--disabled {
  opacity: 0.5;
  pointer-events: none;
}
.gd-multiselect__search-icon {
  flex-shrink: 0;
  color: var(--fg-4);
  font-size: var(--text-xs);
  padding-left: var(--space-1);
}
.gd-multiselect__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}
.gd-multiselect__chips:empty {
  display: none;
}
.gd-multiselect__tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 3px var(--space-1) 3px var(--space-2);
  border-radius: var(--radius-full);
  background: var(--badge-indigo-bg);
  color: var(--badge-indigo-fg);
  font-size: var(--text-xs);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}
.gd-multiselect__tag-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  border: none;
  border-radius: var(--radius-full);
  background: transparent;
  color: inherit;
  cursor: pointer;
  padding: 0;
  font-size: var(--text-eyebrow);
  opacity: 0.65;
  transition:
    background var(--transition-fast),
    opacity var(--transition-fast);
}
.gd-multiselect__tag-remove:hover {
  opacity: 1;
  background: var(--color-interactive-bg);
}
.gd-multiselect__input {
  flex: 1;
  min-width: 60px;
  border: none;
  background: transparent;
  outline: none;
  color: var(--fg-1);
  font-family: inherit;
  font-size: var(--text-sm);
  line-height: 1.5;
  padding: 3px var(--space-1);
}
.gd-multiselect__input::placeholder {
  color: var(--fg-5);
}
.gd-multiselect__chevron {
  flex-shrink: 0;
  color: var(--fg-4);
  font-size: var(--text-xs);
  padding-right: var(--space-1);
  transition: transform var(--transition-base) var(--ease-out-soft);
}
.gd-multiselect--open .gd-multiselect__chevron {
  transform: rotate(180deg);
}
.gd-multiselect__menu {
  position: absolute;
  top: calc(100% + var(--space-2));
  left: 0;
  right: 0;
  z-index: 50;
  background: var(--popover-bg);
  border: 1px solid var(--glass-border-soft);
  box-shadow: var(--glass-shadow-hover);
  backdrop-filter: blur(var(--glass-blur-lg));
  -webkit-backdrop-filter: blur(var(--glass-blur-lg));
  border-radius: var(--radius-md);
  padding: var(--space-1);
  max-height: 248px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
  animation: gd-fade-in var(--transition-fast);
}
.gd-multiselect__menu--floating {
  position: fixed;
  top: auto;
  left: auto;
  right: auto;
}
.gd-multiselect__control .gd-multiselect__input {
  width: auto;
  min-width: 60px;
  border: none;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  padding: 3px var(--space-1);
}
.gd-multiselect__option {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.45rem 0.6rem;
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  color: var(--fg-2);
  cursor: pointer;
  user-select: none;
  transition:
    background var(--transition-fast),
    color var(--transition-fast);
}
.gd-multiselect__option:hover,
.gd-multiselect__option--active {
  background: var(--glass-default);
  color: var(--fg-1);
}
.gd-multiselect__option--selected {
  color: var(--fg-1);
}
.gd-multiselect__check {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: var(--radius-xs);
  border: 1.5px solid var(--glass-border);
  background: var(--glass-thin);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-eyebrow);
  color: transparent;
  transition:
    background var(--transition-fast),
    border-color var(--transition-fast);
}
.gd-multiselect__option--selected .gd-multiselect__check {
  background: var(--color-interactive-fill);
  border-color: var(--color-interactive-fill-border);
  color: var(--checkbox-check);
}
.gd-multiselect__option-label {
  flex: 1;
  min-width: 0;
}
.gd-multiselect__option-meta {
  font-size: var(--text-xs);
  color: var(--fg-4);
}
.gd-multiselect__empty {
  padding: 0.5rem 0.6rem;
  font-size: var(--text-2xs);
  color: var(--fg-4);
}
@keyframes gd-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
