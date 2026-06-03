import Breadcrumb from '../../components/navigation/Breadcrumb.vue'

export default {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    size: 'md',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Trips', href: '/trips' },
      { label: 'Paris 2025' },
    ],
  },
}

export const Playground = {
  render: (args) => ({
    components: { Breadcrumb },
    setup() {
      return { args }
    },
    template: '<Breadcrumb v-bind="args" @navigate="(item) => console.log(\'navigate\', item)" />',
  }),
}

export const WithIcons = {
  render: () => ({
    components: { Breadcrumb },
    template: `
      <Breadcrumb
        :items="[
          { label: 'Home', href: '/', icon: 'fas fa-home' },
          { label: 'Library', href: '/library', icon: 'fas fa-book' },
          { label: 'Japan Trip', icon: 'fas fa-map' },
        ]"
      />
    `,
  }),
}

export const TwoLevels = {
  render: () => ({
    components: { Breadcrumb },
    template: `
      <Breadcrumb
        :items="[
          { label: 'Places', href: '/places' },
          { label: 'Shinjuku' },
        ]"
      />
    `,
  }),
}

export const Sizes = {
  render: () => ({
    components: { Breadcrumb },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <Breadcrumb
          size="sm"
          :items="[{ label: 'Home', href: '/' }, { label: 'Trips', href: '/trips' }, { label: 'Kyoto 2025' }]"
        />
        <Breadcrumb
          size="md"
          :items="[{ label: 'Home', href: '/' }, { label: 'Trips', href: '/trips' }, { label: 'Kyoto 2025' }]"
        />
      </div>
    `,
  }),
}
