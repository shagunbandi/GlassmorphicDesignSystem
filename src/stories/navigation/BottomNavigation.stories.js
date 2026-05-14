import BottomNavigation from '../../components/navigation/BottomNavigation.vue'

const DEFAULT_ITEMS = [
  { label: 'Home', icon: 'fas fa-home', path: '/' },
  { label: 'Trips', icon: 'fas fa-map-marked-alt', path: '/trips' },
  { label: 'Explore', icon: 'fas fa-compass', path: '/explore' },
  { label: 'Profile', icon: 'fas fa-user', path: '/profile' },
]

export default {
  title: 'Navigation/BottomNavigation',
  component: BottomNavigation,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    items: { control: 'object' },
  },
  args: {
    items: DEFAULT_ITEMS,
  },
}

export const Playground = {
  render: (args) => ({
    components: { BottomNavigation },
    setup() { return { args } },
    template: `
      <div style="height:200px;position:relative">
        <BottomNavigation v-bind="args" />
      </div>
    `,
  }),
}

export const FourItems = {
  render: () => ({
    components: { BottomNavigation },
    template: `
      <div style="height:200px;position:relative">
        <BottomNavigation :items="[
          { label: 'Home', icon: 'fas fa-home', path: '/' },
          { label: 'Trips', icon: 'fas fa-suitcase', path: '/trips' },
          { label: 'Explore', icon: 'fas fa-compass', path: '/explore' },
          { label: 'Profile', icon: 'fas fa-user', path: '/profile' },
        ]" />
      </div>
    `,
  }),
}

export const ThreeItems = {
  render: () => ({
    components: { BottomNavigation },
    template: `
      <div style="height:200px;position:relative">
        <BottomNavigation :items="[
          { label: 'Trips', icon: 'fas fa-map-marked-alt', path: '/trips' },
          { label: 'Plan', icon: 'fas fa-calendar-alt', path: '/plan' },
          { label: 'Me', icon: 'fas fa-user-circle', path: '/profile' },
        ]" />
      </div>
    `,
  }),
}
