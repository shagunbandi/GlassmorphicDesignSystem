<template>
  <div class="gd-image-viewer">
    <div class="gd-image-viewer__wrapper">
      <div class="gd-image-viewer__group">
        <img
          :src="src"
          :alt="alt"
          class="gd-image-viewer__img"
          @click="canEdit ? $emit('edit') : (showLightbox = true)"
        />
        <div
          v-if="canEdit"
          class="gd-image-viewer__overlay gd-image-viewer__overlay--edit"
          aria-hidden="true"
        >
          <i class="fa-solid fa-pen gd-image-viewer__edit-icon" />
        </div>
        <div v-else class="gd-image-viewer__overlay" aria-hidden="true" />
      </div>
    </div>

    <teleport to="body">
      <Transition name="gd-fade">
        <Modal
          v-if="showLightbox"
          omit-header
          flush-body
          size="5xl"
          @close="showLightbox = false"
        >
          <template #body>
            <div class="gd-image-viewer__lightbox" @click.stop>
              <img
                :src="src"
                :alt="alt"
                class="gd-image-viewer__lightbox-img"
              />
            </div>
          </template>
        </Modal>
      </Transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  canEdit: { type: Boolean, default: false },
})

defineEmits(['edit'])

const showLightbox = ref(false)
</script>

<style scoped>
.gd-image-viewer {
  height: 100%;
}
.gd-image-viewer__wrapper {
  overflow: hidden;
  height: 100%;
}

.gd-image-viewer__group {
  position: relative;
  height: 100%;
}

.gd-image-viewer__group:hover .gd-image-viewer__overlay {
  opacity: 1;
}

.gd-image-viewer__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform var(--transition-slow);
}

.gd-image-viewer__group:hover .gd-image-viewer__img {
  transform: scale(1.02);
}

.gd-image-viewer__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  transition: background var(--transition-slow);
  pointer-events: none;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gd-image-viewer__group:hover .gd-image-viewer__overlay {
  background: rgba(0, 0, 0, 0.3);
  opacity: 1;
}

.gd-image-viewer__overlay--edit {
  pointer-events: none;
}

.gd-image-viewer__edit-icon {
  color: white;
  font-size: 1.25rem;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.gd-image-viewer__group:hover .gd-image-viewer__edit-icon {
  opacity: 1;
}

.gd-image-viewer__lightbox {
  position: relative;
}

.gd-image-viewer__lightbox-img {
  display: block;
  margin: 0 auto;
  max-height: min(85vh, 920px);
  width: 100%;
  object-fit: contain;
}

/* Transition */
.gd-fade-enter-active,
.gd-fade-leave-active {
  transition: opacity var(--transition-base);
}
.gd-fade-enter-from,
.gd-fade-leave-to {
  opacity: 0;
}
</style>
