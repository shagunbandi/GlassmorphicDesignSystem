<template>
  <div
    ref="rootRef"
    class="gd-multiselect"
    :class="{ 'gd-multiselect--open': open, 'gd-multiselect--disabled': disabled }"
  >
    <div
      ref="controlRef"
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
const controlRef = ref(null)
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
