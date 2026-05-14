import StatItem from '../../components/display/StatItem.vue'

export default {
  title: 'Display/StatItem',
  component: StatItem,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
    variant: { control: 'select', options: ['sky', 'mint', 'coral', 'warning', 'success', 'danger', 'indigo'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    icon: 'fas fa-map-marker-alt',
    label: 'Destinations',
    value: '8',
    variant: 'sky',
    size: 'md',
  },
}

export const Playground = {
  render: (args) => ({
    components: { StatItem },
    setup() { return { args } },
    template: '<div style="max-width:200px"><StatItem v-bind="args" /></div>',
  }),
}

export const AllVariants = {
  render: () => ({
    components: { StatItem },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">
        <StatItem icon="fas fa-plane" label="Flights" value="6" variant="sky" />
        <StatItem icon="fas fa-bed" label="Nights" value="22" variant="mint" />
        <StatItem icon="fas fa-map-pin" label="Cities" value="8" variant="coral" />
        <StatItem icon="fas fa-wallet" label="Budget" value="$3,200" variant="warning" />
        <StatItem icon="fas fa-check-circle" label="Done" value="14" variant="success" />
        <StatItem icon="fas fa-exclamation" label="Issues" value="2" variant="danger" />
        <StatItem icon="fas fa-ticket-alt" label="Activities" value="11" variant="indigo" />
      </div>
    `,
  }),
}

export const SmallSize = {
  render: () => ({
    components: { StatItem },
    template: `
      <div style="display:flex;flex-direction:column;gap:6px;max-width:220px">
        <StatItem icon="fas fa-plane" label="Flights" value="2" variant="sky" size="sm" />
        <StatItem icon="fas fa-bed" label="Hotels" value="1" variant="mint" size="sm" />
        <StatItem icon="fas fa-calendar" label="Nights" value="7" variant="indigo" size="sm" />
      </div>
    `,
  }),
}

export const TripSummary = {
  render: () => ({
    components: { StatItem },
    template: `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:380px">
        <StatItem icon="fas fa-calendar" label="Duration" value="9 days" variant="sky" />
        <StatItem icon="fas fa-plane" label="Flights" value="2" variant="mint" />
        <StatItem icon="fas fa-bed" label="Accommodation" value="2 hotels" variant="coral" />
        <StatItem icon="fas fa-dollar-sign" label="Total cost" value="$4,150" variant="warning" />
      </div>
    `,
  }),
}
