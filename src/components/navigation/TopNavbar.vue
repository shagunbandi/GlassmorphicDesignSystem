<template>
  <div
    v-if="!isHiddenRoute"
    class="gd-top-navbar"
    :class="{ 'gd-top-navbar--hide-mobile': showBottomNav }"
  >
    <div class="gd-top-navbar__bar gd-glass">
      <div class="gd-top-navbar__max">
        <div class="gd-top-navbar__row">
          <div class="gd-top-navbar__brand-wrap">
            <slot
              name="brand"
              :brand-to="brandTo"
              :title="brandTitle"
              :tagline="brandTagline"
              :logo-src="logoSrc"
            >
              <router-link :to="brandTo" class="gd-top-navbar__brand">
                <div v-if="logoSrc" class="gd-top-navbar__logo">
                  <img
                    :src="logoSrc"
                    :alt="logoAlt || brandTitle || 'Logo'"
                    class="gd-top-navbar__logo-img"
                  />
                </div>
                <div>
                  <span v-if="brandTitle" class="gd-top-navbar__title">{{
                    brandTitle
                  }}</span>
                  <span v-if="brandTagline" class="gd-top-navbar__tagline">{{
                    brandTagline
                  }}</span>
                </div>
              </router-link>
            </slot>
          </div>

          <div class="gd-top-navbar__desktop">
            <template
              v-if="desktopLayout === 'inline' && itemsResolved.length > 0"
            >
              <router-link
                v-for="(item, idx) in itemsResolved"
                :key="`inline-${item.path}-${idx}`"
                :to="item.path"
                class="gd-top-navbar__link"
                :class="{ 'gd-top-navbar__link--active': isItemActive(item) }"
              >
                <i
                  v-if="item.icon"
                  :class="item.icon"
                  class="gd-top-navbar__link-icon"
                  aria-hidden="true"
                ></i>
                {{ itemLabel(item) }}
              </router-link>
            </template>

            <div
              v-else-if="
                desktopLayout === 'pill' &&
                itemsResolved.length > 0 &&
                !hasDesktopAfterSlot
              "
              class="gd-top-navbar__switch"
              role="group"
              :aria-label="navAriaLabel"
            >
              <router-link
                v-for="(item, idx) in itemsResolved"
                :key="`pill-${item.path}-${idx}`"
                :to="item.path"
                class="gd-top-navbar__switch-btn"
                :class="{
                  'gd-top-navbar__switch-btn--active': isItemActive(item),
                  'gd-top-navbar__switch-btn--cta': item.variant === 'cta',
                }"
              >
                <i v-if="item.icon" :class="item.icon" aria-hidden="true"></i>
                {{ itemLabel(item) }}
              </router-link>
            </div>

            <template v-if="hasDesktopAfterSlot">
              <slot
                name="desktop-after-links"
                :items="itemsResolved"
                :current-user="currentUser"
                :profile-path="profilePath"
                :close-menu="closeMobileMenu"
              />
            </template>
            <template v-else-if="showUserAvatar">
              <router-link :to="profilePath" class="gd-top-navbar__avatar-link">
                <slot
                  name="avatar"
                  :user="currentUser"
                  :profile-path="profilePath"
                  size="md"
                >
                  <div class="gd-top-navbar__avatar">
                    <img
                      v-if="currentUser?.avatar_url"
                      :src="currentUser.avatar_url"
                      :alt="avatarAlt"
                      class="gd-top-navbar__avatar-img"
                    />
                    <div v-else class="gd-top-navbar__avatar-fallback">
                      {{ avatarInitial }}
                    </div>
                  </div>
                </slot>
              </router-link>
            </template>
          </div>

          <div v-if="showMobileMenuToggle" class="gd-top-navbar__mobile-toggle">
            <Button
              intent="neutral"
              surface="ghost"
              size="icon"
              tone="inverted"
              :aria-label="mobileMenuLabel"
              @click="toggleMobileMenu"
            >
              <i
                v-if="!mobileMenuOpen"
                class="fas fa-bars gd-top-navbar__menu-icon"
                aria-hidden="true"
              ></i>
              <i
                v-else
                class="fas fa-xmark gd-top-navbar__menu-icon"
                aria-hidden="true"
              ></i>
            </Button>
          </div>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="gd-top-navbar__sheet-enter-active"
      enter-from-class="gd-top-navbar__sheet-enter-from"
      enter-to-class="gd-top-navbar__sheet-enter-to"
      leave-active-class="gd-top-navbar__sheet-leave-active"
      leave-from-class="gd-top-navbar__sheet-leave-from"
      leave-to-class="gd-top-navbar__sheet-leave-to"
    >
      <div v-if="mobileMenuOpen" class="gd-top-navbar__sheet">
        <div class="gd-top-navbar__sheet-inner">
          <router-link
            v-for="(item, idx) in itemsResolved"
            :key="`sheet-${item.path}-${idx}`"
            :to="item.path"
            class="gd-top-navbar__sheet-link"
            :class="{ 'gd-top-navbar__sheet-link--active': isItemActive(item) }"
            @click="closeMobileMenu"
          >
            <div class="gd-top-navbar__sheet-row">
              <i
                v-if="item.icon"
                :class="item.icon"
                class="gd-top-navbar__sheet-icon"
                aria-hidden="true"
              ></i>
              <span class="gd-top-navbar__sheet-label">{{
                sheetItemLabel(item)
              }}</span>
              <i
                v-if="isItemActive(item)"
                class="fas fa-chevron-right gd-top-navbar__sheet-chevron"
                aria-hidden="true"
              ></i>
            </div>
          </router-link>

          <slot
            v-if="hasMobileSheetSlot"
            name="mobile-sheet-footer"
            :items="itemsResolved"
            :current-user="currentUser"
            :profile-path="profilePath"
            :profile-label="profileLabel"
            :close-menu="closeMobileMenu"
            :on-logout="onLogoutClick"
          />

          <template v-else-if="showMobileAuthFooter">
            <router-link
              v-if="showUserAvatar"
              :to="profilePath"
              class="gd-top-navbar__sheet-link gd-top-navbar__sheet-link--profile"
              @click="closeMobileMenu"
            >
              <div
                class="gd-top-navbar__sheet-row gd-top-navbar__sheet-row--gap"
              >
                <slot
                  name="avatar"
                  :user="currentUser"
                  :profile-path="profilePath"
                  size="sm"
                >
                  <div class="gd-top-navbar__avatar gd-top-navbar__avatar--sm">
                    <img
                      v-if="currentUser?.avatar_url"
                      :src="currentUser.avatar_url"
                      class="gd-top-navbar__avatar-img"
                    />
                    <div
                      v-else
                      class="gd-top-navbar__avatar-fallback gd-top-navbar__avatar-fallback--sm"
                    >
                      {{ avatarInitial }}
                    </div>
                  </div>
                </slot>
                <span>{{ profileLabel }}</span>
              </div>
            </router-link>
            <Button
              v-if="showLogoutInMobileMenu"
              intent="danger"
              surface="ghost"
              size="sm"
              tone="inverted"
              full-width
              align="start"
              @click="onLogoutClick"
            >
              <div class="gd-top-navbar__logout-row">
                <span>{{ logoutLabel }}</span>
                <i
                  class="fas fa-right-from-bracket gd-top-navbar__logout-icon"
                  aria-hidden="true"
                ></i>
              </div>
            </Button>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, useSlots, watch } from 'vue'
import { useRoute } from 'vue-router'
import Button from '../primitives/Button.vue'

/**
 * Nav entry — caller-defined. Use `name` for labels; legacy `label` is accepted.
 * `{ name?, label?, path, icon?, exact?, variant?: 'cta', mobileLabel? }`
 */
const props = defineProps({
  /** Right-side nav entries (desktop + mobile sheet). Caller switches array by auth, route, etc. */
  items: { type: Array, default: () => [] },
  /** How desktop renders `items`: pill (default) or inline links. */
  desktopLayout: {
    type: String,
    default: 'pill',
    validator: (v) => v === 'pill' || v === 'inline',
  },
  /** `aria-label` for the desktop pill (`role="group"`). */
  navAriaLabel: { type: String, default: 'Navigation' },
  showBottomNav: { type: Boolean, default: false },
  logoSrc: { type: String, default: '' },
  logoAlt: { type: String, default: '' },
  brandTo: { type: String, default: '/' },
  brandTitle: { type: String, default: '' },
  brandTagline: { type: String, default: '' },
  profilePath: { type: String, default: '/profile' },
  profileLabel: { type: String, default: 'Profile' },
  hideOnRoutes: { type: Array, default: () => [] },
  /** Show profile avatar (desktop + mobile footer when used). Caller sets from auth + online, etc. */
  showUserAvatar: { type: Boolean, default: false },
  currentUser: { type: Object, default: null },
  /** Show hamburger and mobile sheet. Caller decides (e.g. signed-out only). */
  showMobileMenuToggle: { type: Boolean, default: false },
  /** After sheet items: profile + logout block. Caller sets (e.g. signed-in). */
  showMobileAuthFooter: { type: Boolean, default: false },
  showLogoutInMobileMenu: { type: Boolean, default: true },
  logoutLabel: { type: String, default: 'Logout' },
  mobileMenuLabel: { type: String, default: 'Menu' },
})

const emit = defineEmits(['logout'])

const slots = useSlots()
const route = useRoute()
const mobileMenuOpen = ref(false)

const itemsResolved = computed(() => props.items ?? [])

const hasDesktopAfterSlot = computed(() => !!slots['desktop-after-links'])
const hasMobileSheetSlot = computed(() => !!slots['mobile-sheet-footer'])

const isHiddenRoute = computed(() => {
  const paths = props.hideOnRoutes ?? []
  return paths.includes(route.path)
})

const avatarAlt = computed(
  () => props.currentUser?.username ?? props.profileLabel,
)
const avatarInitial = computed(
  () => props.currentUser?.username?.[0]?.toUpperCase() ?? '?',
)

function itemLabel(item) {
  return item.name ?? item.label ?? ''
}

function sheetItemLabel(item) {
  return item.mobileLabel ?? item.name ?? item.label ?? ''
}

function isItemActive(item) {
  if (item.variant === 'cta') return false
  if (item.exact) return route.path === item.path
  return route.path === item.path || route.path.startsWith(`${item.path}/`)
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function onLogoutClick() {
  closeMobileMenu()
  emit('logout')
}

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
  },
)
</script>

<style scoped>
.gd-top-navbar {
  position: fixed;
  top: var(--space-3);
  left: var(--space-4);
  right: var(--space-4);
  z-index: 50;
}

.gd-top-navbar--hide-mobile {
  display: none;
}

@media (min-width: 768px) {
  .gd-top-navbar--hide-mobile {
    display: block;
  }
}

.gd-top-navbar__bar {
  border-radius: var(--radius-lg);
}

.gd-top-navbar__max {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 640px) {
  .gd-top-navbar__max {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

.gd-top-navbar__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: var(--space-3);
  padding-bottom: var(--space-3);
}

@media (min-width: 768px) {
  .gd-top-navbar__row {
    padding-top: var(--space-4);
    padding-bottom: var(--space-4);
  }
}

.gd-top-navbar__brand-wrap {
  display: flex;
  align-items: center;
}

.gd-top-navbar__brand {
  display: flex;
  align-items: center;
  margin-left: var(--space-4);
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.gd-top-navbar__brand:hover {
  opacity: 0.95;
}

.gd-top-navbar__logo {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  margin-right: var(--space-3);
  flex-shrink: 0;
  transition:
    transform var(--transition-slow) var(--ease-out-soft),
    border-color var(--transition-base);
}

.gd-top-navbar__brand:hover .gd-top-navbar__logo {
  transform: scale(1.08);
  border-color: color-mix(in srgb, var(--brand-sky) 55%, transparent);
}

.gd-top-navbar__logo-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.gd-top-navbar__title {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--fg-1);
  display: block;
  line-height: 1.2;
  letter-spacing: var(--tracking-tight);
}

.gd-top-navbar__tagline {
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
  color: var(--fg-4);
  display: block;
  line-height: 1;
}

.gd-top-navbar__desktop {
  display: none;
  align-items: center;
  gap: var(--space-6);
  margin-right: var(--space-4);
}

@media (min-width: 768px) {
  .gd-top-navbar__desktop {
    display: flex;
  }
}

.gd-top-navbar__link {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding-bottom: 2px;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--fg-4);
  text-decoration: none;
  transition: color var(--transition-base);
}

.gd-top-navbar__link:hover {
  color: var(--fg-1);
}

.gd-top-navbar__link--active {
  color: var(--brand-sky);
  font-weight: 600;
  border-bottom: 2px solid var(--brand-sky);
}

.gd-top-navbar__link-icon {
  font-size: var(--text-xs);
}

.gd-top-navbar__avatar-link {
  margin-left: var(--space-2);
  flex-shrink: 0;
}

.gd-top-navbar__avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 2px solid color-mix(in srgb, var(--brand-sky) 45%, transparent);
  transition: border-color var(--transition-fast);
}

.gd-top-navbar__avatar:hover {
  border-color: var(--brand-sky);
}

.gd-top-navbar__avatar--sm {
  width: 28px;
  height: 28px;
  border-width: 1px;
  border-color: var(--glass-border);
}

.gd-top-navbar__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gd-top-navbar__avatar-fallback {
  width: 100%;
  height: 100%;
  background: var(--color-interactive);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--fg-1);
  font-size: var(--text-sm);
  font-weight: 600;
}

.gd-top-navbar__avatar-fallback--sm {
  font-size: var(--text-xs);
}

.gd-top-navbar__switch {
  display: inline-flex;
  gap: var(--space-1);
  padding: var(--space-1);
  background: var(--glass-soft);
  border: 1px solid var(--glass-border-soft);
  border-radius: var(--radius-full);
}

.gd-top-navbar__switch-btn {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--fg-3);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 12px;
  line-height: 1;
  padding: 7px 14px;
  border-radius: var(--radius-full);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition:
    background var(--transition-fast),
    color var(--transition-fast);
}

.gd-top-navbar__switch-btn:hover {
  color: var(--fg-2);
}

.gd-top-navbar__switch-btn--active {
  background: color-mix(in srgb, var(--brand-sky) 18%, transparent);
  color: var(--brand-sky);
}

.gd-top-navbar__switch-btn--cta {
  background: color-mix(in srgb, var(--brand-sky) 12%, transparent);
  color: var(--fg-2);
}

.gd-top-navbar__switch-btn--cta:hover {
  background: color-mix(in srgb, var(--brand-sky) 22%, transparent);
  color: var(--brand-sky);
}

.gd-top-navbar__mobile-toggle {
  display: flex;
  align-items: center;
  margin-right: var(--space-4);
}

@media (min-width: 768px) {
  .gd-top-navbar__mobile-toggle {
    display: none;
  }
}

.gd-top-navbar__menu-icon {
  font-size: var(--text-lg);
  line-height: 1;
}

.gd-top-navbar__sheet {
  position: absolute;
  left: 0;
  width: 100%;
  margin-top: var(--space-1);
  z-index: 20;
  background: var(--glass-default);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border-hairline);
  border-radius: var(--radius-lg);
  box-shadow: var(--glass-shadow);
}

@media (min-width: 768px) {
  .gd-top-navbar__sheet {
    display: none;
  }
}

.gd-top-navbar__sheet-inner {
  padding: var(--space-3) var(--space-4);
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
}

.gd-top-navbar__sheet-link {
  display: block;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  color: var(--fg-3);
  text-decoration: none;
  transition:
    background var(--transition-slow),
    color var(--transition-slow);
}

.gd-top-navbar__sheet-link:hover {
  background: var(--glass-soft);
  color: var(--fg-1);
}

.gd-top-navbar__sheet-link--active {
  color: var(--brand-sky);
  font-weight: 600;
  background: var(--glass-thin);
}

.gd-top-navbar__sheet-link--profile {
  margin-top: var(--space-2);
  border-top: 1px solid var(--glass-border-hairline);
  padding-top: var(--space-3);
}

.gd-top-navbar__sheet-row {
  display: flex;
  align-items: center;
}

.gd-top-navbar__sheet-row--gap {
  gap: var(--space-3);
}

.gd-top-navbar__sheet-icon {
  width: 1.25rem;
  text-align: center;
  margin-right: var(--space-3);
  font-size: var(--text-sm);
}

.gd-top-navbar__sheet-icon-fa {
  width: 1.25rem;
  text-align: center;
  font-size: var(--text-sm);
}

.gd-top-navbar__sheet-label {
  margin-right: var(--space-3);
}

.gd-top-navbar__sheet-chevron {
  margin-left: auto;
  font-size: var(--text-sm);
  color: var(--brand-sky);
}

.gd-top-navbar__sheet-divider {
  border-top: 1px solid var(--glass-border-hairline);
  margin-top: var(--space-2);
  padding-top: var(--space-1);
}

.gd-top-navbar__logout-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.gd-top-navbar__logout-icon {
  margin-left: auto;
  font-size: var(--text-sm);
}

.gd-top-navbar__sheet-enter-active,
.gd-top-navbar__sheet-leave-active {
  transition:
    opacity var(--transition-slow) var(--ease-out-soft),
    transform var(--transition-slow) var(--ease-out-soft);
}

.gd-top-navbar__sheet-leave-active {
  transition-duration: 200ms;
}

.gd-top-navbar__sheet-enter-from,
.gd-top-navbar__sheet-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.gd-top-navbar__sheet-enter-to,
.gd-top-navbar__sheet-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
