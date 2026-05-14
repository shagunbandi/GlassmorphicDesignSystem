import { ref } from 'vue'
import TabBar from '../../components/navigation/TabBar.vue'

export default {
  title: 'Navigation/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    active: { control: 'text' },
  },
  args: {
    size: 'md',
    active: 'map',
    tabs: [
      { id: 'map', name: 'Map', icon: 'fas fa-map' },
      { id: 'list', name: 'List', icon: 'fas fa-list' },
    ],
  },
}

export const Playground = {
  render: (args) => ({
    components: { TabBar },
    setup() {
      const active = ref(args.active)
      return { args, active }
    },
    template: '<TabBar :tabs="args.tabs" :size="args.size" v-model:active="active" />',
  }),
}

export const TwoOptions = {
  render: () => ({
    components: { TabBar },
    setup() {
      const active = ref('map')
      return { active }
    },
    template: `
      <TabBar
        :tabs="[
          { id: 'map', name: 'Map', icon: 'fas fa-map' },
          { id: 'list', name: 'List', icon: 'fas fa-list' },
        ]"
        v-model:active="active"
      />
    `,
  }),
}

export const ThreeOptions = {
  render: () => ({
    components: { TabBar },
    setup() {
      const active = ref('day')
      return { active }
    },
    template: `
      <TabBar
        :tabs="[
          { id: 'day', name: 'Day' },
          { id: 'week', name: 'Week' },
          { id: 'trip', name: 'Trip' },
        ]"
        v-model:active="active"
      />
    `,
  }),
}

export const Sizes = {
  render: () => ({
    components: { TabBar },
    setup() {
      const active = ref('all')
      return { active }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <TabBar size="xs" :tabs="[{id:'all',name:'All'},{id:'active',name:'Active'}]" v-model:active="active" />
        <TabBar size="sm" :tabs="[{id:'all',name:'All'},{id:'active',name:'Active'}]" v-model:active="active" />
        <TabBar size="md" :tabs="[{id:'all',name:'All'},{id:'active',name:'Active'}]" v-model:active="active" />
        <TabBar size="lg" :tabs="[{id:'all',name:'All'},{id:'active',name:'Active'}]" v-model:active="active" />
      </div>
    `,
  }),
}
