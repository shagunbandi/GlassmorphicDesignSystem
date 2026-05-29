<template>
  <div class="gd-file-upload">
    <a
      v-if="value"
      :href="value"
      target="_blank"
      rel="noopener noreferrer"
      class="gd-file-upload__current"
    >
      <i
        class="fa-solid fa-file gd-file-upload__file-icon"
        aria-hidden="true"
      />
      <span class="gd-file-upload__filename">{{ filename }}</span>
    </a>

    <label
      class="gd-file-upload__drop-zone"
      :class="{ 'gd-file-upload__drop-zone--dragover': isDragging }"
    >
      <input
        type="file"
        class="gd-file-upload__native"
        @change="onFileChange"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="onDrop"
      />
      <i
        class="fa-solid fa-cloud-arrow-up gd-file-upload__upload-icon"
        aria-hidden="true"
      />
      <span class="gd-file-upload__hint">
        {{ isDragging ? 'Drop to upload' : 'Click or drag a file here' }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  value: String,
  itemKey: String,
})

const emit = defineEmits(['selectFile'])

const isDragging = ref(false)

const filename = computed(() => {
  if (!props.value) return ''
  return props.value.split('/').pop()?.split('?')[0] ?? ''
})

function onFileChange(e) {
  const file = e.target.files?.[0]
  if (file) emit('selectFile', file)
}

function onDrop(e) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) emit('selectFile', file)
}
</script>

<style scoped>
.gd-file-upload {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.gd-file-upload__current {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--brand-sky);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  background: var(--glass-thin);
  border: 1px solid var(--glass-border-hairline);
  transition: background var(--transition-fast);
}

.gd-file-upload__current:hover {
  background: var(--glass-soft);
}

.gd-file-upload__file-icon {
  color: var(--fg-4);
}
.gd-file-upload__filename {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 24rem;
}

.gd-file-upload__drop-zone {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-6) var(--space-4);
  border: 1.5px dashed var(--glass-border-soft);
  border-radius: var(--radius-md);
  background: var(--glass-thin);
  cursor: pointer;
  transition:
    border-color var(--transition-fast),
    background var(--transition-fast);
  text-align: center;
}

.gd-file-upload__drop-zone:hover,
.gd-file-upload__drop-zone--dragover {
  border-color: var(--brand-sky);
  background: var(--glass-soft);
}

.gd-file-upload__native {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.gd-file-upload__upload-icon {
  font-size: 1.5rem;
  color: var(--fg-4);
}

.gd-file-upload__hint {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--fg-4);
}
</style>
