import Badge from '../../components/primitives/Badge.vue'

export default {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['sky', 'emerald', 'amber', 'indigo', 'coral', 'slate'] },
    variant: { control: 'select', options: ['solid', 'soft', 'outline'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    allCaps: { control: 'boolean' },
  },
  args: {
    tone: 'sky',
    variant: 'soft',
    size: 'md',
    allCaps: true,
  },
}

export const Playground = {
  render: (args) => ({
    components: { Badge },
    setup() { return { args } },
    template: '<Badge v-bind="args">Planning</Badge>',
  }),
}

export const Tones = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
        <Badge tone="sky">Upcoming</Badge>
        <Badge tone="emerald">Active</Badge>
        <Badge tone="amber">Planning</Badge>
        <Badge tone="indigo">Memory</Badge>
        <Badge tone="coral">Cancelled</Badge>
        <Badge tone="slate">Draft</Badge>
      </div>
    `,
  }),
}

export const Variants = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
        <Badge tone="sky" variant="solid">Solid</Badge>
        <Badge tone="sky" variant="soft">Soft</Badge>
        <Badge tone="sky" variant="outline">Outline</Badge>
      </div>
    `,
  }),
}

export const Sizes = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
        <Badge tone="emerald" size="xs">xs</Badge>
        <Badge tone="emerald" size="sm">sm</Badge>
        <Badge tone="emerald" size="md">md</Badge>
        <Badge tone="emerald" size="lg">lg</Badge>
        <Badge tone="emerald" size="xl">xl</Badge>
      </div>
    `,
  }),
}

export const TripStatusLabels = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <Badge tone="amber" variant="soft">Planning</Badge>
        <Badge tone="sky" variant="soft">Upcoming</Badge>
        <Badge tone="emerald" variant="soft">Active</Badge>
        <Badge tone="indigo" variant="soft">Memory</Badge>
      </div>
    `,
  }),
}
