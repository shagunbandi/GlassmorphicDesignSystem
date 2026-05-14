import TransitItem from '../../components/display/TransitItem.vue'

export default {
  title: 'Display/TransitItem',
  component: TransitItem,
  tags: ['autodocs'],
  argTypes: {
    transit: { control: 'object' },
  },
  args: {
    transit: {
      distance: { text: '4.2 km' },
      duration: { text: '12 min' },
    },
  },
}

export const Playground = {
  render: (args) => ({
    components: { TransitItem },
    setup() { return { args } },
    template: '<TransitItem v-bind="args" />',
  }),
}

export const ShortTrip = {
  render: () => ({
    components: { TransitItem },
    template: `
      <TransitItem :transit="{ distance: { text: '0.8 km' }, duration: { text: '3 min' } }" />
    `,
  }),
}

export const LongDrive = {
  render: () => ({
    components: { TransitItem },
    template: `
      <TransitItem :transit="{ distance: { text: '42 km' }, duration: { text: '55 min' } }" />
    `,
  }),
}

export const InItinerary = {
  render: () => ({
    components: { TransitItem },
    template: `
      <div style="max-width:480px;display:flex;flex-direction:column;align-items:stretch;gap:0">
        <div style="padding:16px;background:rgba(255,255,255,0.06);border-radius:12px 12px 0 0;color:var(--fg-1);font-size:14px">
          <strong>Arashiyama Bamboo Grove</strong><br/>
          <span style="color:var(--fg-3);font-size:12px">9:00 AM · 2 hours</span>
        </div>
        <div style="display:flex;justify-content:center;padding:4px 0">
          <TransitItem :transit="{ distance: { text: '7.3 km' }, duration: { text: '18 min' } }" />
        </div>
        <div style="padding:16px;background:rgba(255,255,255,0.06);border-radius:0 0 12px 12px;color:var(--fg-1);font-size:14px">
          <strong>Kinkaku-ji (Golden Pavilion)</strong><br/>
          <span style="color:var(--fg-3);font-size:12px">11:30 AM · 1.5 hours</span>
        </div>
      </div>
    `,
  }),
}
