import EmptyState from '../../components/feedback/EmptyState.vue'

export default {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'text' },
    actionText: { control: 'text' },
    tone: { control: 'select', options: ['sky', 'mint', 'coral', 'amber', 'slate'] },
    showAddBadge: { control: 'boolean' },
    large: { control: 'boolean' },
  },
  args: {
    title: 'No trips yet',
    description: 'Start planning your first adventure with Voyager.',
    icon: 'fas fa-map-marked-alt',
    actionText: 'Plan a Trip',
    tone: 'sky',
    showAddBadge: true,
    large: false,
  },
}

export const Playground = {
  render: (args) => ({
    components: { EmptyState },
    setup() { return { args } },
    template: '<EmptyState v-bind="args" />',
  }),
}

export const Tones = {
  render: () => ({
    components: { EmptyState },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px">
        <EmptyState title="No trips" description="Plan your next getaway." icon="fas fa-suitcase" action-text="Add Trip" tone="sky" />
        <EmptyState title="No activities" description="Add things to do on your trip." icon="fas fa-ticket-alt" action-text="Add Activity" tone="mint" />
        <EmptyState title="No flights" description="Link a flight to your itinerary." icon="fas fa-plane" action-text="Add Flight" tone="coral" />
        <EmptyState title="No budget" description="Track your travel spending." icon="fas fa-wallet" action-text="Set Budget" tone="amber" />
      </div>
    `,
  }),
}

export const Large = {
  render: () => ({
    components: { EmptyState },
    template: `
      <EmptyState
        title="Your travel memories await"
        description="Complete a trip to start building your travel story."
        icon="fas fa-globe"
        action-text="Plan a Trip"
        tone="sky"
        :large="true"
      />
    `,
  }),
}

export const NoAction = {
  render: () => ({
    components: { EmptyState },
    template: `
      <EmptyState
        title="All caught up"
        description="No pending items in your itinerary."
        icon="fas fa-check-circle"
        tone="mint"
        :show-add-badge="false"
      />
    `,
  }),
}
