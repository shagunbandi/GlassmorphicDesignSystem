import Card from '../../components/layout/Card.vue'

export default {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    divider: { control: 'boolean' },
    glass: { control: 'boolean' },
    padding: { control: 'select', options: ['0', '2', '4', '6', '8'] },
  },
  args: {
    title: 'Tokyo Highlights',
    description: 'A curated 5-day itinerary through the best of Tokyo.',
    divider: true,
    glass: true,
    padding: '6',
  },
}

export const Playground = {
  render: (args) => ({
    components: { Card },
    setup() { return { args } },
    template: `
      <Card v-bind="args">
        <p style="color:var(--fg-2);font-size:14px">Your itinerary content goes here.</p>
      </Card>
    `,
  }),
}

export const GlassCard = {
  render: () => ({
    components: { Card },
    template: `
      <div style="max-width:480px">
        <Card title="Osaka Food Tour" description="Explore Dotonbori and the best street food spots." :glass="true">
          <ul style="color:var(--fg-2);font-size:14px;padding-left:16px;margin:0">
            <li>Takoyaki at Wanaka</li>
            <li>Ramen at Ichiran</li>
            <li>Okonomiyaki at Mizuno</li>
          </ul>
        </Card>
      </div>
    `,
  }),
}

export const PlainCard = {
  render: () => ({
    components: { Card },
    template: `
      <div style="max-width:480px">
        <Card title="Packing List" :glass="false" :divider="false">
          <p style="color:var(--fg-2);font-size:14px">Passport, adapters, camera, walking shoes.</p>
        </Card>
      </div>
    `,
  }),
}

export const NoPadding = {
  render: () => ({
    components: { Card },
    template: `
      <div style="max-width:480px">
        <Card title="Flight Details" padding="0" :glass="true">
          <div style="padding:16px;color:var(--fg-2);font-size:14px">Flush content with no extra padding.</div>
        </Card>
      </div>
    `,
  }),
}
