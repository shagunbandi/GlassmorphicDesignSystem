import { ref } from 'vue'
import Button from '../../components/primitives/Button.vue'
import InlineInput from '../../components/overlay/InlineInput.vue'

export default {
  title: 'Overlay/InlineInput',
  component: InlineInput,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    title: { control: 'text' },
    inputType: { control: 'select', options: ['text', 'textarea', 'flightRoute', 'timeRange'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] },
    showHeader: { control: 'boolean' },
    showFooter: { control: 'boolean' },
  },
  args: {
    title: 'Edit Destination',
    inputType: 'text',
    size: 'md',
    showHeader: true,
    showFooter: true,
  },
}

export const Playground = {
  parameters: { layout: 'fullscreen' },
  render: (args) => ({
    components: { InlineInput, Button },
    setup() {
      const open = ref(false)
      const val = ref('Tokyo, Japan')
      return { args, open, val }
    },
    template: `
      <div style="padding:40px">
        <Button intent="primary" surface="solid" @click="open = true">Edit Destination</Button>
        <InlineInput
          v-if="open"
          v-bind="args"
          :value="val"
          @submit="v => { val = v; open = false }"
          @close="open = false"
        />
      </div>
    `,
  }),
}

export const TextInput = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { InlineInput, Button },
    setup() {
      const open = ref(false)
      const name = ref('Tokyo Spring Adventure')
      return { open, name }
    },
    template: `
      <div style="padding:40px">
        <Button intent="primary" surface="outline" @click="open = true">Rename Trip</Button>
        <p style="margin-top:12px;color:var(--fg-2)">Current: {{ name }}</p>
        <InlineInput
          v-if="open"
          title="Rename Trip"
          input-type="text"
          :value="name"
          confirm-label="Save"
          @submit="v => { name = v; open = false }"
          @close="open = false"
        />
      </div>
    `,
  }),
}

export const FlightRoute = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { InlineInput, Button },
    setup() {
      const open = ref(false)
      const route = ref(['JFK', 'NRT'])
      return { open, route }
    },
    template: `
      <div style="padding:40px">
        <Button intent="primary" surface="soft" @click="open = true">Edit Flight Route</Button>
        <InlineInput
          v-if="open"
          title="Flight Route"
          input-type="flightRoute"
          :value="route"
          @submit="v => { route = v; open = false }"
          @close="open = false"
        />
      </div>
    `,
  }),
}

export const TimeRange = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { InlineInput, Button },
    setup() {
      const open = ref(false)
      const times = ref(['09:00', '11:30'])
      return { open, times }
    },
    template: `
      <div style="padding:40px">
        <Button intent="neutral" surface="soft" @click="open = true">Set Time Range</Button>
        <InlineInput
          v-if="open"
          title="Activity Times"
          input-type="timeRange"
          :value="times"
          @submit="v => { times = v; open = false }"
          @close="open = false"
        />
      </div>
    `,
  }),
}
