import Button from '../../components/primitives/Button.vue'

export default {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    intent: { control: 'select', options: ['neutral', 'primary', 'success', 'warning', 'danger'] },
    surface: { control: 'select', options: ['solid', 'soft', 'outline', 'ghost', 'link', 'elevated'] },
    size: { control: 'select', options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', 'icon', 'icon-sm'] },
    accentHue: { control: 'select', options: [null, 'indigo', 'violet', 'amber', 'emerald', 'rose', 'sky', 'coral'] },
    radius: { control: 'select', options: [null, 'none', 'sm', 'md', 'lg', 'full'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    intent: 'primary',
    surface: 'solid',
    size: 'md',
    loading: false,
    disabled: false,
    selected: false,
    fullWidth: false,
  },
}

export const Playground = {
  render: (args) => ({
    components: { Button },
    setup() { return { args } },
    template: '<Button v-bind="args">Book Trip</Button>',
  }),
}

export const Intents = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <Button intent="neutral" surface="solid">Neutral</Button>
        <Button intent="primary" surface="solid">Primary</Button>
        <Button intent="success" surface="solid">Success</Button>
        <Button intent="warning" surface="solid">Warning</Button>
        <Button intent="danger" surface="solid">Danger</Button>
      </div>
    `,
  }),
}

export const Surfaces = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <Button intent="primary" surface="solid">Solid</Button>
        <Button intent="primary" surface="soft">Soft</Button>
        <Button intent="primary" surface="outline">Outline</Button>
        <Button intent="primary" surface="ghost">Ghost</Button>
        <Button intent="primary" surface="elevated">Elevated</Button>
        <Button intent="primary" surface="link">Link</Button>
      </div>
    `,
  }),
}

export const Sizes = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <Button intent="primary" size="2xs">2xs</Button>
        <Button intent="primary" size="xs">xs</Button>
        <Button intent="primary" size="sm">Small</Button>
        <Button intent="primary" size="md">Medium</Button>
        <Button intent="primary" size="lg">Large</Button>
        <Button intent="primary" size="xl">X-Large</Button>
      </div>
    `,
  }),
}

export const States = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <Button intent="primary" surface="solid">Default</Button>
        <Button intent="primary" surface="solid" :loading="true">Loading</Button>
        <Button intent="primary" surface="solid" :disabled="true">Disabled</Button>
        <Button intent="primary" surface="solid" :selected="true">Selected</Button>
      </div>
    `,
  }),
}
