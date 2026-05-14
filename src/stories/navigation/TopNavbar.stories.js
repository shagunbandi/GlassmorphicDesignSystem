import TopNavbar from '../../components/navigation/TopNavbar.vue'

const NAV_ITEMS = [
  { path: '/trips', name: 'Trips', icon: 'fas fa-map-marked-alt' },
  { path: '/explore', name: 'Explore', icon: 'fas fa-compass' },
  { path: '/profile', name: 'Profile', icon: 'fas fa-user' },
]

export default {
  title: 'Navigation/TopNavbar',
  component: TopNavbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    brandTitle: { control: 'text' },
    brandTagline: { control: 'text' },
    desktopLayout: { control: 'select', options: ['pill', 'inline'] },
    showUserAvatar: { control: 'boolean' },
    showMobileMenuToggle: { control: 'boolean' },
  },
  args: {
    brandTitle: 'Voyager',
    brandTagline: 'Your travel companion',
    desktopLayout: 'pill',
    items: NAV_ITEMS,
    showUserAvatar: false,
    showMobileMenuToggle: false,
  },
}

export const Playground = {
  render: (args) => ({
    components: { TopNavbar },
    setup() { return { args } },
    template: '<TopNavbar v-bind="args" />',
  }),
}

export const WithPillLayout = {
  render: () => ({
    components: { TopNavbar },
    template: `
      <TopNavbar
        brand-title="Voyager"
        brand-tagline="Travel smarter"
        desktop-layout="pill"
        :items="[
          { path: '/trips', name: 'Trips' },
          { path: '/explore', name: 'Explore' },
          { path: '/plan', name: 'Plan' },
        ]"
      />
    `,
  }),
}

export const WithInlineLinks = {
  render: () => ({
    components: { TopNavbar },
    template: `
      <TopNavbar
        brand-title="Voyager"
        desktop-layout="inline"
        :items="[
          { path: '/trips', name: 'Trips', icon: 'fas fa-map-marked-alt' },
          { path: '/explore', name: 'Explore', icon: 'fas fa-compass' },
          { path: '/profile', name: 'Profile', icon: 'fas fa-user' },
        ]"
      />
    `,
  }),
}

export const WithAvatar = {
  render: () => ({
    components: { TopNavbar },
    template: `
      <TopNavbar
        brand-title="Voyager"
        desktop-layout="pill"
        :show-user-avatar="true"
        :current-user="{ username: 'Alex Chen' }"
        :items="[
          { path: '/trips', name: 'Trips' },
          { path: '/explore', name: 'Explore' },
        ]"
      />
    `,
  }),
}
