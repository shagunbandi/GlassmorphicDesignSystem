<template>
  <div
    class="gd-carousel"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="gd-carousel__stage" :style="{ aspectRatio }">
      <div
        class="gd-carousel__track"
        :style="{ transform: `translateX(-${index * 100}%)` }"
      >
        <div v-if="photos.length === 0" class="gd-slide">
          <div class="gd-slide__ph"><i class="fas fa-image" /></div>
        </div>
        <div v-for="(photo, k) in photos" :key="k" class="gd-slide">
          <img
            v-if="!failed[k]"
            :src="photo"
            alt=""
            @error="failed = { ...failed, [k]: true }"
          />
          <div v-else class="gd-slide__ph"><i class="fas fa-image" /></div>
        </div>
      </div>
      <div class="gd-carousel__scrim" />
      <div v-if="$slots.overlay" class="gd-carousel__overlay">
        <slot name="overlay" :index="index" />
      </div>
      <span v-if="photos.length > 1" class="gd-carousel__count">
        {{ index + 1 }} / {{ photos.length }}
      </span>
      <template v-if="photos.length > 1">
        <button
          class="gd-arrow gd-arrow--prev"
          :class="{ 'gd-arrow--visible': hovered }"
          @click.stop="prev"
          aria-label="Previous"
        >
          <i class="fas fa-chevron-left" />
        </button>
        <button
          class="gd-arrow gd-arrow--next"
          :class="{ 'gd-arrow--visible': hovered }"
          @click.stop="next"
          aria-label="Next"
        >
          <i class="fas fa-chevron-right" />
        </button>
        <div class="gd-dots">
          <button
            v-for="(_, k) in photos"
            :key="k"
            :class="['gd-dot', { 'gd-dot--active': k === index }]"
            @click.stop="index = k"
            :aria-label="`Photo ${k + 1}`"
          />
        </div>
      </template>
    </div>
    <div v-if="showThumbs && photos.length > 1" class="gd-thumbs">
      <button
        v-for="(photo, k) in photos"
        :key="k"
        :class="['gd-thumb', { 'gd-thumb--active': k === index }]"
        @click="index = k"
      >
        <img v-if="!failed[k]" :src="photo" alt="" />
        <div v-else class="gd-thumb__ph"><i class="fas fa-image" /></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  photos: { type: Array, default: () => [] },
  aspectRatio: { type: String, default: '4 / 3' },
  showThumbs: { type: Boolean, default: true },
})

const index = ref(0)
const failed = ref({})
const hovered = ref(false)

watch(
  () => props.photos,
  () => {
    index.value = 0
    failed.value = {}
  },
)

function prev() {
  index.value = (index.value - 1 + props.photos.length) % props.photos.length
}

function next() {
  index.value = (index.value + 1) % props.photos.length
}
</script>

<style scoped>
.gd-carousel {
  position: relative;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  border: 1px solid var(--glass-border-soft);
  box-shadow: var(--glass-shadow);
  background: var(--glass-soft);
}

.gd-carousel__stage {
  position: relative;
  overflow: hidden;
}

.gd-carousel__track {
  position: absolute;
  inset: 0;
  display: flex;
  transition: transform 400ms var(--ease-out-soft, cubic-bezier(0.22, 0.61, 0.36, 1));
}

.gd-slide {
  position: relative;
  min-width: 100%;
  height: 100%;
}

.gd-slide img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9);
}

.gd-slide__ph {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3250, #141e30);
  color: var(--fg-5);
  font-size: 36px;
}

.gd-carousel__scrim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(8, 14, 26, 0.32) 0%,
    rgba(8, 14, 26, 0) 26% 72%,
    rgba(8, 14, 26, 0.42) 100%
  );
}

.gd-carousel__overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

.gd-carousel__overlay > * {
  pointer-events: auto;
}

.gd-carousel__count {
  position: absolute;
  top: 13px;
  right: 14px;
  z-index: 3;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  background: rgba(8, 14, 26, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.gd-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(8, 14, 26, 0.46);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 200ms ease, background 150ms ease;
}

.gd-arrow--visible { opacity: 1; }
.gd-arrow:hover { background: rgba(8, 14, 26, 0.72); }
.gd-arrow--prev { left: 12px; }
.gd-arrow--next { right: 12px; }

.gd-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  gap: 6px;
}

.gd-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  border: none;
  padding: 0;
  transition: background 150ms ease, width 200ms ease;
}

.gd-dot--active {
  background: #fff;
  width: 20px;
  border-radius: var(--radius-full);
}

.gd-thumbs {
  display: flex;
  gap: 8px;
  padding: 10px;
  overflow-x: auto;
  scrollbar-width: thin;
}

.gd-thumb {
  position: relative;
  flex: 0 0 auto;
  width: 72px;
  height: 52px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  padding: 0;
  background: var(--glass-thin);
  transition: border-color 150ms ease;
}

.gd-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
}

.gd-thumb__ph {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3250, #141e30);
  color: var(--fg-5);
  font-size: 14px;
}

.gd-thumb--active { border-color: var(--brand-sky); }
</style>
