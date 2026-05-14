import StatCard from '../../components/display/StatCard.vue'
import StatItem from '../../components/display/StatItem.vue'

export default {
  title: 'Display/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    columns: { control: 'number' },
  },
  args: {
    title: 'Trip Stats',
    columns: 2,
  },
}

export const Playground = {
  render: (args) => ({
    components: { StatCard, StatItem },
    setup() { return { args } },
    template: `
      <div style="max-width:480px">
        <StatCard v-bind="args">
          <StatItem icon="fas fa-map-marker-alt" label="Destinations" value="8" variant="sky" />
          <StatItem icon="fas fa-plane" label="Flights" value="6" variant="mint" />
          <StatItem icon="fas fa-bed" label="Nights" value="22" variant="coral" />
          <StatItem icon="fas fa-wallet" label="Budget" value="$3,400" variant="warning" />
        </StatCard>
      </div>
    `,
  }),
}

export const TwoColumn = {
  render: () => ({
    components: { StatCard, StatItem },
    template: `
      <div style="max-width:480px">
        <StatCard title="Tokyo Spring — Overview" :columns="2">
          <StatItem icon="fas fa-calendar" label="Duration" value="9 nights" variant="sky" />
          <StatItem icon="fas fa-plane" label="Flights" value="2" variant="mint" />
          <StatItem icon="fas fa-bed" label="Hotels" value="2" variant="coral" />
          <StatItem icon="fas fa-ticket-alt" label="Activities" value="12" variant="indigo" />
        </StatCard>
      </div>
    `,
  }),
}

export const ThreeColumn = {
  render: () => ({
    components: { StatCard, StatItem },
    template: `
      <div style="max-width:600px">
        <StatCard title="All-time Travel Stats" :columns="3">
          <StatItem icon="fas fa-globe" label="Countries" value="23" variant="sky" />
          <StatItem icon="fas fa-map-pin" label="Cities" value="48" variant="mint" />
          <StatItem icon="fas fa-plane" label="Flights" value="62" variant="coral" />
        </StatCard>
      </div>
    `,
  }),
}

export const NoTitle = {
  render: () => ({
    components: { StatCard, StatItem },
    template: `
      <div style="max-width:360px">
        <StatCard :columns="2">
          <StatItem icon="fas fa-star" label="Saved Places" value="34" variant="warning" />
          <StatItem icon="fas fa-heart" label="Favorites" value="9" variant="indigo" />
        </StatCard>
      </div>
    `,
  }),
}
