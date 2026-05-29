<template>
  <Modal :size="size" @close="closeModal">
    <template v-if="showHeader" #header>
      <div class="gd-inline-input-modal__title-wrap">
        <h2 class="gd-modal-title">{{ title }}</h2>
        <div class="gd-inline-input-modal__title-rule" aria-hidden="true" />
      </div>
    </template>

    <template #body>
      <div class="gd-inline-input-modal__scroll">
        <div class="gd-inline-input-modal__content">
          <slot v-if="inputType === 'slot'" />

          <div
            v-else-if="inputType === 'file'"
            class="gd-inline-input-modal__row"
          >
            <!-- FileUpload slotted — import it in your app and pass via slot, or use inputType="slot" -->
            <slot name="file-upload" />
          </div>

          <div
            v-else-if="inputType === 'textarea'"
            class="gd-inline-input-modal__row"
          >
            <Input
              ref="inputField"
              variant="field"
              input-type="textarea"
              v-model="inputValue"
              placeholder="One per line"
            />
          </div>

          <div
            v-else-if="inputType === 'flightRoute'"
            class="gd-inline-input-modal__row gd-inline-input-modal__row--spaced"
          >
            <div>
              <label class="gd-field-label">Departure Airport</label>
              <Input
                variant="field"
                v-model="inputValue[0]"
                placeholder="e.g. JFK or New York JFK"
                @keyup.enter="submitForm"
              />
            </div>
            <div>
              <label class="gd-field-label">Arrival Airport</label>
              <Input
                variant="field"
                v-model="inputValue[1]"
                placeholder="e.g. CDG or Paris CDG"
                @keyup.enter="submitForm"
              />
            </div>
          </div>

          <div
            v-else-if="inputType === 'timeRange'"
            class="gd-inline-input-modal__row gd-inline-input-modal__row--spaced"
          >
            <div>
              <label class="gd-field-label" for="gd-start-time"
                >Start Time</label
              >
              <Input
                id="gd-start-time"
                variant="field"
                native-type="time"
                v-model="inputValue[0]"
                @keyup.enter="submitForm"
              />
            </div>
            <div>
              <label class="gd-field-label" for="gd-end-time">End Time</label>
              <Input
                id="gd-end-time"
                variant="field"
                native-type="time"
                v-model="inputValue[1]"
                @keyup.enter="submitForm"
              />
            </div>
          </div>

          <div v-else class="gd-inline-input-modal__row">
            <Input
              ref="inputField"
              variant="field"
              :native-type="inputType"
              v-model="inputValue"
              placeholder="Enter your input"
              @keyup.enter="submitForm"
            />
          </div>
        </div>
      </div>
    </template>

    <template
      v-if="$slots.footer || showDefaultActionFooter || showSlotConfirmFooter"
      #footer
    >
      <slot v-if="$slots.footer" name="footer" />
      <template v-else>
        <div
          v-if="showSlotConfirmFooter"
          class="gd-modal-actions gd-modal-actions--confirm-end"
        >
          <div class="gd-modal-actions__trailing">
            <Button
              type="button"
              intent="neutral"
              surface="ghost"
              size="md"
              @click="onCancelSlotConfirm"
            >
              {{ cancelLabel }}
            </Button>
            <Button
              type="button"
              intent="success"
              surface="solid"
              size="md"
              @click="onConfirmSlot"
            >
              {{ confirmLabel }}
            </Button>
          </div>
        </div>
        <div
          v-else-if="showDefaultActionFooter"
          class="gd-modal-actions gd-modal-actions--footer-row"
        >
          <Button
            type="button"
            intent="danger"
            surface="solid"
            size="md"
            @click="removeValues"
          >
            <template #leading
              ><i class="fas fa-trash-alt" aria-hidden="true"
            /></template>
            Delete
          </Button>
          <div class="gd-modal-actions__trailing">
            <Button
              type="button"
              intent="neutral"
              surface="ghost"
              size="md"
              @click="closeModal"
            >
              Cancel
            </Button>
            <Button
              type="button"
              intent="success"
              surface="solid"
              size="md"
              @click="submitForm"
            >
              <template #leading
                ><i class="fas fa-check" aria-hidden="true"
              /></template>
              Submit
            </Button>
          </div>
        </div>
      </template>
    </template>
  </Modal>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import Modal from './Modal.vue'
import Input from '../primitives/Input.vue'
import Button from '../primitives/Button.vue'

const props = defineProps({
  title: String,
  value: [Object, String, Number, Array],
  inputType: String,
  size: { type: String, default: '5xl' },
  showHeader: { type: Boolean, default: true },
  showFooter: { type: Boolean, default: true },
  confirmLabel: String,
  cancelLabel: { type: String, default: 'Cancel' },
})

const emit = defineEmits(['close', 'submit', 'confirm', 'cancel'])

const inputField = ref(null)
const inputValue = ref(props.value)

watch(
  () => props.value,
  (v) => {
    inputValue.value = v
  },
)

const showDefaultActionFooter = computed(
  () => props.showFooter && props.inputType !== 'slot',
)
const showSlotConfirmFooter = computed(
  () => props.showFooter && props.inputType === 'slot' && !!props.confirmLabel,
)

function closeModal() {
  emit('close')
}

function submitForm() {
  emit('submit', inputValue.value)
  emit('close')
}

function removeValues() {
  inputValue.value = Array.isArray(inputValue.value)
    ? new Array(inputValue.value.length).fill(null)
    : null
  submitForm()
}

function onCancelSlotConfirm() {
  emit('cancel')
  closeModal()
}
function onConfirmSlot() {
  emit('confirm')
}

nextTick(() => inputField.value?.focus?.())
</script>

<style scoped>
.gd-inline-input-modal__title-wrap {
  width: 100%;
  text-align: center;
}

.gd-modal-title {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--fg-1);
  margin: 0;
}

.gd-inline-input-modal__title-rule {
  height: 2px;
  max-width: 20rem;
  margin: 0.75rem auto 0;
  border-radius: var(--radius-full);
  background: linear-gradient(
    to right,
    transparent,
    rgba(85, 221, 176, 0.45),
    transparent
  );
}

.gd-inline-input-modal__scroll {
  max-height: calc(85vh - 10rem);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.5rem;
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) transparent;
  box-sizing: border-box;
}

.gd-inline-input-modal__scroll::-webkit-scrollbar {
  width: 6px;
}
.gd-inline-input-modal__scroll::-webkit-scrollbar-track {
  background: transparent;
}
.gd-inline-input-modal__scroll::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
  border-radius: 20px;
}

.gd-inline-input-modal__content {
  width: 100%;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  box-sizing: border-box;
}

.gd-inline-input-modal__row {
  margin: 0.5rem 0;
}

.gd-inline-input-modal__row--spaced {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1rem 0;
}

.gd-field-label {
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--fg-3);
  margin-bottom: 0.35rem;
  display: block;
}

@media (min-width: 1024px) {
  .gd-inline-input-modal__scroll {
    max-height: calc(90vh - 10rem);
  }
}
@media (max-width: 640px) {
  .gd-inline-input-modal__scroll {
    max-height: calc(90vh - 8rem);
    padding: 1rem;
  }
}
</style>
