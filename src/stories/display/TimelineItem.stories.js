import TimelineItem from '../../components/display/TimelineItem.vue'

export default {
  title: 'Display/TimelineItem',
  component: TimelineItem,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['light', 'dark'] },
  },
  args: {
    transit: { icon: 'fas fa-car', distance: '4.2 km', duration: { text: '12 min' } },
    buttons: [],
  },
}

export const Playground = {
  render: (args) => ({
    components: { TimelineItem },
    setup() { return { args } },
    template: '<TimelineItem v-bind="args" />',
  }),
}

export const WithTransit = {
  render: () => ({
    components: { TimelineItem },
    template: `
      <div style="max-width:480px">
        <TimelineItem
          :transit="{ icon: 'fas fa-car', distance: '3.8 km', duration: { text: '15 min' } }"
        />
      </div>
    `,
  }),
}

export const WithButtons = {
  render: () => ({
    components: { TimelineItem },
    template: `
      <div style="max-width:480px">
        <TimelineItem
          :buttons="[
            { label: 'Add activity', icon: 'fas fa-plus', clickHandler: () => console.log('add') },
            { label: 'Add note', icon: 'fas fa-sticky-note', clickHandler: () => console.log('note') },
          ]"
        />
      </div>
    `,
  }),
}

export const TransitAndButtons = {
  render: () => ({
    components: { TimelineItem },
    template: `
      <div style="max-width:480px;display:flex;flex-direction:column;gap:0">
        <div style="padding:16px;background:rgba(255,255,255,0.05);border-radius:12px 12px 0 0;color:var(--fg-1)">
          Fushimi Inari-taisha
        </div>
        <TimelineItem
          :transit="{ icon: 'fas fa-subway', distance: '6.1 km', duration: { text: '22 min' } }"
          :buttons="[{ label: 'Add stop', icon: 'fas fa-plus', clickHandler: () => {} }]"
        />
        <div style="padding:16px;background:rgba(255,255,255,0.05);border-radius:0 0 12px 12px;color:var(--fg-1)">
          Nishiki Market
        </div>
      </div>
    `,
  }),
}
