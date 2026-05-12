<template>
  <div
    :class="[
      'gd-rte',
      `gd-rte--${editorType}`,
      hasLargeContent ? 'gd-rte--large-content' : '',
    ]"
    ref="containerRef"
    @mouseleave="handleChange"
  >
    <QuillEditor
      v-model:content="content"
      contentType="html"
      :options="quillOptions"
      :placeholder="placeholder"
      @blur="handleChange"
      @update:content="checkSize"
      ref="editorRef"
    />
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps({
  value:      [String, Number],
  placeholder:String,
  editorType: {
    type: String,
    default: 'small',
    validator: (v) => ['hover', 'small', 'full'].includes(v),
  },
  canEdit: { type: Boolean, default: true },
})

const emit = defineEmits(['change'])

const containerRef = ref(null)
const editorRef    = ref(null)
const content      = ref(props.value)
const contentBefore = ref(props.value)
const hasLargeContent = ref(false)

const quillOptions = {
  modules: {},
  theme: 'snow',
  readOnly: !props.canEdit,
}

watch(() => props.value, (v) => {
  if (v !== content.value) {
    content.value = v
    nextTick(() => { contentBefore.value = content.value; checkSize() })
  }
}, { immediate: true })

function handleChange() {
  if (content.value !== contentBefore.value) {
    contentBefore.value = content.value
    emit('change', content.value)
    nextTick(checkSize)
  }
}

function checkSize() {
  nextTick(() => {
    hasLargeContent.value = (content.value?.length ?? 0) > 200
  })
}
</script>

<style>
/* Non-scoped: Quill renders outside component scope */
.gd-rte { position: relative; margin-top: 5px; }

.gd-rte .ql-toolbar {
  height: 0;
  overflow: hidden;
  padding: 0;
  border: none;
  transition: all 0.4s ease;
}

.gd-rte--hover:hover .ql-toolbar,
.gd-rte--full .ql-toolbar {
  pointer-events: auto;
  height: auto;
  overflow: visible;
  z-index: 1;
  padding: 10px;
  border: 1px solid var(--glass-border-soft);
}

.gd-rte .ql-editor {
  padding: 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--fg-2);
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  overflow: visible !important;
  max-width: 100%;
  min-height: 20px;
  max-height: none !important;
}

.gd-rte .ql-container {
  border: none;
  padding: 0;
  transition: all 0.4s ease;
  margin-bottom: 10px;
  width: 100%;
  overflow: visible !important;
  max-height: none !important;
}

.gd-rte--hover:hover .ql-container,
.gd-rte--full .ql-container {
  padding: 20px;
  border: 1px solid var(--glass-border-soft);
  background: var(--glass-thin);
  border-radius: var(--radius-sm);
}

.gd-rte .ql-editor.ql-blank::before { left: 0; color: var(--fg-5); }
</style>
