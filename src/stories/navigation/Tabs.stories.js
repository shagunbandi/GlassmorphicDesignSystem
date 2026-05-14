import { ref } from 'vue'
import Tabs from '../../components/navigation/Tabs.vue'

const TRIP_TABS = [
  { id: 'overview', name: 'Overview', icon: 'fas fa-map' },
  { id: 'itinerary', name: 'Itinerary', icon: 'fas fa-list-ul', count: 5 },
  { id: 'flights', name: 'Flights', icon: 'fas fa-plane' },
  { id: 'budget', name: 'Budget', icon: 'fas fa-wallet' },
]

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    tabs: { control: 'object' },
    active: { control: 'text' },
  },
  args: {
    tabs: TRIP_TABS,
    active: 'overview',
  },
}

export const Playground = {
  render: (args) => ({
    components: { Tabs },
    setup() {
      const active = ref(args.active)
      return { args, active }
    },
    template: '<Tabs :tabs="args.tabs" v-model:active="active" />',
  }),
}

export const Interactive = {
  render: () => ({
    components: { Tabs },
    setup() {
      const active = ref('itinerary')
      return { active }
    },
    template: `
      <div>
        <Tabs
          :tabs="[
            { id: 'overview', name: 'Overview', icon: 'fas fa-map' },
            { id: 'itinerary', name: 'Itinerary', icon: 'fas fa-list-ul', count: 7 },
            { id: 'photos', name: 'Photos', icon: 'fas fa-camera' },
            { id: 'notes', name: 'Notes', icon: 'fas fa-sticky-note' },
          ]"
          v-model:active="active"
        />
        <div style="padding:16px;color:var(--fg-3);font-size:13px">Active tab: {{ active }}</div>
      </div>
    `,
  }),
}

export const WithCounts = {
  render: () => ({
    components: { Tabs },
    setup() {
      const active = ref('flights')
      return { active }
    },
    template: `
      <Tabs
        :tabs="[
          { id: 'flights', name: 'Flights', icon: 'fas fa-plane', count: 2 },
          { id: 'hotels', name: 'Hotels', icon: 'fas fa-bed', count: 3 },
          { id: 'activities', name: 'Activities', icon: 'fas fa-ticket-alt', count: 8 },
        ]"
        v-model:active="active"
      />
    `,
  }),
}
