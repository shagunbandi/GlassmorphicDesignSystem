<template>
  <div class="gd-profile-hero">
    <div class="gd-profile-hero__orb-a" aria-hidden="true" />
    <div class="gd-profile-hero__orb-b" aria-hidden="true" />

    <div class="gd-profile-hero__inner">
      <!-- Avatar -->
      <div
        class="gd-profile-hero__avatar-wrap"
        :class="{
          'gd-profile-hero__avatar-wrap--clickable': allowAvatarChange,
        }"
        @click="allowAvatarChange && $emit('avatar-click')"
      >
        <div class="gd-profile-hero__avatar">
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            :alt="name"
            class="gd-profile-hero__avatar-img"
          />
          <span v-else class="gd-profile-hero__initials">{{ initials }}</span>
        </div>
        <div
          v-if="allowAvatarChange"
          class="gd-profile-hero__avatar-overlay"
          aria-hidden="true"
        >
          <i class="fas fa-camera" />
        </div>
      </div>

      <!-- Identity -->
      <div class="gd-profile-hero__identity">
        <div v-if="memberSince || eyebrow" class="gd-profile-hero__eyebrow">
          {{ eyebrow || ('Member · since ' + memberSince) }}
        </div>
        <h1 class="gd-profile-hero__name">{{ name }}</h1>
        <div v-if="handle || location" class="gd-profile-hero__meta">
          <span v-if="handle">@{{ handle }}</span>
          <span v-if="handle && location" aria-hidden="true">·</span>
          <span v-if="location">{{ location }}</span>
        </div>
        <p v-if="bio" class="gd-profile-hero__bio">{{ bio }}</p>
        <div v-if="$slots.default" class="gd-profile-hero__chips">
          <slot />
        </div>
      </div>

      <!-- Actions -->
      <div v-if="$slots.actions" class="gd-profile-hero__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  avatarUrl: { type: String, default: '' },
  initials: { type: String, default: '?' },
  name: { type: String, default: '' },
  handle: { type: String, default: '' },
  location: { type: String, default: '' },
  bio: { type: String, default: '' },
  memberSince: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  allowAvatarChange: { type: Boolean, default: false },
})
defineEmits(['avatar-click'])
</script>

<style scoped>
.gd-profile-hero {
  position: relative;
  background: var(--glass-soft);
  border: 1px solid var(--glass-border-soft);
  border-radius: 1.75rem;
  padding: 2.25rem;
  overflow: hidden;
}

/* Decorative glow orbs */
.gd-profile-hero__orb-a {
  position: absolute;
  top: -120px;
  right: -120px;
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, rgba(79, 70, 229, 0.35), transparent 60%);
  pointer-events: none;
}
.gd-profile-hero__orb-b {
  position: absolute;
  bottom: -160px;
  left: -100px;
  width: 360px;
  height: 360px;
  background: radial-gradient(
    circle,
    rgba(85, 221, 176, 0.25),
    transparent 60%
  );
  pointer-events: none;
}

.gd-profile-hero__inner {
  position: relative;
  display: flex;
  gap: 1.75rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

/* Avatar */
.gd-profile-hero__avatar-wrap {
  position: relative;
  flex-shrink: 0;
}
.gd-profile-hero__avatar-wrap--clickable {
  cursor: pointer;
}

.gd-profile-hero__avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #55ddb0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--glass-border-soft);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}
.gd-profile-hero__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gd-profile-hero__initials {
  color: white;
  font-size: 2.75rem;
  font-weight: 700;
  font-family: var(--font-sans);
  line-height: 1;
}

.gd-profile-hero__avatar-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.gd-profile-hero__avatar-wrap--clickable:hover
  .gd-profile-hero__avatar-overlay {
  opacity: 1;
}

/* Identity */
.gd-profile-hero__identity {
  flex: 1;
  min-width: 260px;
}

.gd-profile-hero__eyebrow {
  display: block;
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--brand-mint);
  margin-bottom: 0.5rem;
}

.gd-profile-hero__name {
  font-family: var(--font-sans);
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--fg-1);
  margin: 0 0 0.5rem;
}

.gd-profile-hero__meta {
  display: flex;
  gap: 0.5rem;
  color: var(--fg-3);
  font-size: 0.875rem;
  margin-bottom: 0.875rem;
  font-family: var(--font-sans);
  flex-wrap: wrap;
}

.gd-profile-hero__bio {
  color: var(--fg-2);
  font-size: 0.9375rem;
  line-height: 1.55;
  max-width: 540px;
  margin: 0 0 1rem;
  font-family: var(--font-sans);
}

.gd-profile-hero__chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Actions */
.gd-profile-hero__actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-self: flex-start;
}

/* Light mode: softer avatar shadow */
:root.light .gd-profile-hero__avatar {
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.18);
}

@media (max-width: 640px) {
  .gd-profile-hero__inner {
    flex-direction: column;
  }
  .gd-profile-hero__name {
    font-size: 1.75rem;
  }
  .gd-profile-hero__avatar {
    width: 88px;
    height: 88px;
  }
  .gd-profile-hero__initials {
    font-size: 2rem;
  }
}
</style>
