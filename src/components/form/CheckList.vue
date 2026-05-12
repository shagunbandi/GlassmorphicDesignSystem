<template>
  <div class="gd-checklist">
    <ul class="gd-checklist__list">
      <li
        v-for="(item, key) in checkedItems"
        :key="key"
        class="gd-checklist__item"
      >
        <div class="gd-checklist__row">
          <input
            type="checkbox"
            :checked="item.value"
            :disabled="!canEdit"
            class="gd-checklist__checkbox"
            @click="handleCheckboxClicked(key)"
          />
          <input
            type="text"
            class="gd-checklist__text"
            placeholder="Enter item name..."
            :value="item.key"
            :disabled="!canEdit"
            :readonly="!canEdit"
            @change="(e) => onTextChangeHandler(key, e.target.value)"
          />
          <div v-if="canEdit" class="gd-checklist__actions">
            <Button
              v-if="key > 0"
              intent="neutral" surface="ghost" size="icon-sm"
              :nested="nested"
              :tone="nested ? null : 'inverted'"
              type="button" title="Move up"
              @click="handleUpClicked(key)"
            >
              <i class="fa-solid fa-arrow-up gd-checklist__action-icon" aria-hidden="true" />
            </Button>
            <Button
              v-if="key < checkedItems.length - 1"
              intent="neutral" surface="ghost" size="icon-sm"
              :nested="nested"
              :tone="nested ? null : 'inverted'"
              type="button" title="Move down"
              @click="handleDownClicked(key)"
            >
              <i class="fa-solid fa-arrow-down gd-checklist__action-icon" aria-hidden="true" />
            </Button>
            <Button
              intent="danger" surface="soft" size="icon-sm"
              :nested="nested"
              :tone="nested ? null : 'inverted'"
              type="button" title="Remove item"
              @click="handleRemovedClicked(key)"
            >
              <i class="fa-solid fa-xmark gd-checklist__action-icon" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </li>

      <li v-if="canEdit" class="gd-checklist__add" @click="addItem">
        <div class="gd-checklist__add-content">
          <i class="fa-solid fa-plus" aria-hidden="true" />
          <span>Add another item</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '../primitives/Button.vue'

const props = defineProps({
  /** JSON string of [{ key: string, value: boolean }] */
  value:   { type: String, required: true },
  canEdit: { type: Boolean, default: true },
  nested:  { type: Boolean, default: false },
})

const emit = defineEmits(['change'])

function parse(v) {
  try { const d = JSON.parse(v); return Array.isArray(d) ? d : [] }
  catch { return [] }
}

const checkedItems = ref(parse(props.value))

function persist() { emit('change', JSON.stringify(checkedItems.value)) }

function addItem()                        { checkedItems.value.push({ key: '', value: false }); persist() }
function handleCheckboxClicked(i)         { checkedItems.value[i].value = !checkedItems.value[i].value; persist() }
function onTextChangeHandler(i, val)      { checkedItems.value[i].key = val; persist() }
function handleRemovedClicked(i)          { checkedItems.value.splice(i, 1); persist() }

function handleUpClicked(i) {
  if (i > 0) {
    const [item] = checkedItems.value.splice(i, 1)
    checkedItems.value.splice(i - 1, 0, item)
    persist()
  }
}

function handleDownClicked(i) {
  if (i < checkedItems.value.length - 1) {
    const [item] = checkedItems.value.splice(i, 1)
    checkedItems.value.splice(i + 1, 0, item)
    persist()
  }
}
</script>

<style scoped>
.gd-checklist { width: 100%; }

.gd-checklist__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.gd-checklist__item {
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}

.gd-checklist__item:hover { background: var(--glass-thin); }

.gd-checklist__row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 12px;
}

/* Custom checkbox */
.gd-checklist__checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 1.5px solid var(--glass-border-soft);
  background: var(--glass-thin);
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: border-color var(--transition-fast), background var(--transition-fast);
}

.gd-checklist__checkbox:checked {
  background: rgba(99,102,241,0.65);
  border-color: rgba(129,140,248,0.85);
}

.gd-checklist__checkbox:checked::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 6px;
  height: 10px;
  border: 2px solid rgba(255,255,255,0.95);
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
}

.gd-checklist__checkbox:disabled { cursor: default; }

/* Text input */
.gd-checklist__text {
  flex: 1;
  border: none;
  background: transparent;
  padding: 2px 0;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--fg-2);
  min-width: 0;
  outline: none;
}

.gd-checklist__text::placeholder { color: var(--fg-5); }
.gd-checklist__text:disabled     { color: var(--fg-3); cursor: default; }

/* Actions — revealed on hover */
.gd-checklist__actions {
  display: flex;
  gap: 2px;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.gd-checklist__item:hover .gd-checklist__actions { opacity: 1; }

.gd-checklist__action-icon {
  font-size: 0.6875rem;
  line-height: 1;
  display: block;
}

/* Add row */
.gd-checklist__add { margin-top: 6px; cursor: pointer; }

.gd-checklist__add-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  color: var(--fg-5);
  border: 1.5px dashed var(--glass-border-hairline);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 13px;
  transition: color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
}

.gd-checklist__add-content:hover {
  color: var(--fg-3);
  border-color: var(--glass-border-soft);
  background: var(--glass-thin);
}
</style>
