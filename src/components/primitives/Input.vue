<template>
  <!-- Bordered field (forms / modals) -->
  <div v-if="variant === 'field'" class="gd-input-wrap">
    <div class="gd-input-inner" :class="{ 'gd-input-inner--has-prefix': prefix, 'gd-input-inner--has-suffix': suffix }">
      <i v-if="prefix" :class="[prefix, 'gd-input-prefix-icon']" aria-hidden="true" />
      <textarea
        v-if="fieldIsTextarea"
        ref="fieldTextareaRef"
        :value="fieldDisplayValue"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :rows="textareaRows"
        class="gd-input"
        :class="{ 'gd-input--error': hasError, 'gd-input--prefixed': prefix, 'gd-input--suffixed': suffix }"
        v-bind="nativeAttrs"
        @input="onFieldTextareaInput"
      />
      <input
        v-else
        ref="fieldInputRef"
        :type="resolvedFieldType"
        :value="fieldDisplayValue"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :maxlength="maxlengthNum"
        :min="minAttr"
        :max="maxAttr"
        :step="stepAttr"
        class="gd-input"
        :class="{ 'gd-input--error': hasError, 'gd-input--prefixed': prefix, 'gd-input--suffixed': suffix }"
        v-bind="nativeAttrs"
        @input="onFieldInput"
      />
      <i v-if="suffix" :class="[suffix, 'gd-input-suffix-icon']" aria-hidden="true" />
    </div>
    <p v-if="errorMessage" class="gd-input-error">{{ errorMessage }}</p>
  </div>

  <!-- Inline plaintext (agenda titles, etc.) -->
  <input
    v-else-if="isInlineNativeInput"
    ref="inlineInputRef"
    v-model="editedInput"
    :disabled="disabled"
    :readonly="readonly"
    :class="[
      'gd-inline-input',
      transparent ? 'gd-inline-input--transparent' : '',
      fullWidth ? 'gd-inline-input--full' : '',
    ]"
    :type="inlineHtmlType"
    :placeholder="placeholder"
    v-bind="nativeAttrs"
    @change="saveInlineChanges"
  />

  <textarea
    v-else-if="inputType === 'textarea'"
    ref="inlineTextareaRef"
    v-model="editedInput"
    class="gd-inline-input"
    :placeholder="placeholder"
    v-bind="nativeAttrs"
    @change="saveInlineChanges"
  />
</template>

<script setup>
import { computed, ref, useAttrs, watch } from 'vue'

const FIELD_TYPES = new Set([
  'text',
  'url',
  'tel',
  'email',
  'number',
  'date',
  'time',
  'datetime-local',
  'search',
  'password',
])

const props = defineProps({
  /** `inline` = borderless, inherits parent style; `field` = glass form control */
  variant: {
    type: String,
    default: 'inline',
    validator: (v) => ['inline', 'field'].includes(v),
  },
  modelValue: [String, Number, null],
  value: [String, Number],
  inputType: String,
  nativeType: { type: String, default: 'text' },
  placeholder: String,
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  transparent: { type: Boolean, default: false },
  fullWidth: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  maxlength: [String, Number],
  min: [String, Number],
  max: [String, Number],
  step: [String, Number],
  textareaRows: { type: Number, default: 6 },
})

const emit = defineEmits(['update:modelValue', 'onSave'])
defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const nativeAttrs = computed(() => {
  const { class: _c, style: _s, ...rest } = attrs
  void _c
  void _s
  return rest
})

const fieldInputRef = ref(null)
const fieldTextareaRef = ref(null)
const inlineInputRef = ref(null)
const inlineTextareaRef = ref(null)

defineExpose({
  focus() {
    fieldInputRef.value?.focus?.()
    fieldTextareaRef.value?.focus?.()
    inlineInputRef.value?.focus?.()
    inlineTextareaRef.value?.focus?.()
  },
})

const hasError = computed(() => Boolean(props.errorMessage))
const isFieldVariant = computed(() => props.variant === 'field')
const fieldIsTextarea = computed(
  () => isFieldVariant.value && props.inputType === 'textarea',
)

const resolvedFieldType = computed(() => {
  const t = (props.nativeType || 'text').toLowerCase()
  return FIELD_TYPES.has(t) ? t : 'text'
})

const isInlineNativeInput = computed(
  () =>
    props.variant === 'inline' &&
    ['input', 'link', 'number', 'date'].includes(props.inputType),
)

const inlineHtmlType = computed(() =>
  ['number', 'date'].includes(props.inputType) ? props.inputType : 'text',
)

const maxlengthNum = computed(() => {
  if (props.maxlength == null || props.maxlength === '') return undefined
  const n = Number(props.maxlength)
  return Number.isFinite(n) ? n : undefined
})

const minAttr = computed(() =>
  props.min != null && props.min !== '' ? props.min : undefined,
)
const maxAttr = computed(() =>
  props.max != null && props.max !== '' ? props.max : undefined,
)
const stepAttr = computed(() =>
  props.step != null && props.step !== '' ? props.step : undefined,
)

function toFieldString(v) {
  return v == null || v === '' ? '' : String(v)
}

const fieldDisplayValue = ref('')
watch(
  () => props.modelValue,
  (v) => {
    if (isFieldVariant.value) fieldDisplayValue.value = toFieldString(v)
  },
  { immediate: true },
)

function emitFieldModel(raw) {
  if (resolvedFieldType.value === 'number') {
    if (raw === '' || raw == null) {
      emit('update:modelValue', null)
      return
    }
    const n = Number(raw)
    emit('update:modelValue', Number.isNaN(n) ? null : n)
    return
  }
  emit('update:modelValue', raw)
}

function onFieldInput(e) {
  const raw = e.target.value
  fieldDisplayValue.value = raw
  emitFieldModel(raw)
}

function onFieldTextareaInput(e) {
  const raw = e.target.value
  fieldDisplayValue.value = raw
  emit('update:modelValue', raw)
}

const editedInput = ref(
  props.value != null
    ? String(props.value)
    : props.modelValue != null
      ? String(props.modelValue)
      : '',
)

watch(
  () => props.value,
  (val) => {
    if (props.variant !== 'inline') return
    editedInput.value = val != null ? String(val) : ''
  },
)

function saveInlineChanges() {
  const cur = editedInput.value
  const prev = props.value != null ? String(props.value) : ''
  if (cur !== prev) emit('onSave', cur)
}
</script>

<style scoped>
/* ─── Field variant ─────────────────────────────────────────────────────── */
.gd-input-wrap {
  width: 100%;
}

.gd-input-inner {
  position: relative;
  width: 100%;
}

.gd-input-prefix-icon,
.gd-input-suffix-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--fg-4);
  font-size: var(--text-sm);
  pointer-events: none;
  line-height: 1;
}

.gd-input-prefix-icon {
  left: var(--space-3);
}

.gd-input-suffix-icon {
  right: var(--space-3);
}

.gd-input--prefixed {
  padding-left: 2.25rem;
}

.gd-input--suffixed {
  padding-right: 2.25rem;
}

textarea.gd-input {
  min-height: 7.5rem;
  resize: vertical;
}

.gd-input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--fg-1);
  background: var(--glass-soft);
  border: 1px solid var(--glass-border-soft);
  border-radius: var(--radius-sm);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
  outline: none;
}

.gd-input::placeholder {
  color: var(--fg-5);
}

.gd-input:focus {
  border-color: var(--color-interactive-light);
  box-shadow: 0 0 0 2px var(--color-interactive-bg);
}

.gd-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gd-input--error {
  border-color: var(--color-danger-light) !important;
}
.gd-input--error:focus {
  box-shadow: 0 0 0 2px var(--color-danger-bg) !important;
}

.gd-input-error {
  font-size: 0.7rem;
  color: var(--color-danger-light);
  margin-top: 0.2rem;
}

/* ─── Inline variant ────────────────────────────────────────────────────── */
.gd-inline-input {
  margin: 0;
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  line-height: inherit;
  color: inherit;
  background: transparent;
  border: none;
  outline: none;
}

.gd-inline-input:focus {
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
}

.gd-inline-input--transparent {
  background: transparent;
}
.gd-inline-input--full {
  width: 100%;
}
</style>
