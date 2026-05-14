import { ref } from 'vue'
import Button from '../../components/primitives/Button.vue'
import LoadingOverlay from '../../components/feedback/LoadingOverlay.vue'

export default {
  title: 'Feedback/LoadingOverlay',
  component: LoadingOverlay,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    visible: { control: 'boolean' },
    message: { control: 'text' },
  },
  args: {
    visible: true,
    message: 'Loading your itinerary...',
  },
}

export const Playground = {
  parameters: { layout: 'fullscreen' },
  render: (args) => ({
    components: { LoadingOverlay },
    setup() { return { args } },
    template: `
      <div style="height:400px;position:relative">
        <LoadingOverlay v-bind="args" />
        <p style="padding:40px;color:var(--fg-2)">Content behind the overlay</p>
      </div>
    `,
  }),
}

export const Visible = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { LoadingOverlay },
    template: `
      <div style="height:400px;position:relative">
        <LoadingOverlay :visible="true" message="Loading your itinerary..." />
        <p style="padding:40px;color:var(--fg-2)">Trip content here</p>
      </div>
    `,
  }),
}

export const GeneratingAI = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { LoadingOverlay },
    template: `
      <div style="height:400px;position:relative">
        <LoadingOverlay :visible="true" message="Generating your AI itinerary..." />
      </div>
    `,
  }),
}

export const Toggled = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { LoadingOverlay, Button },
    setup() {
      const visible = ref(false)
      function trigger() {
        visible.value = true
        setTimeout(() => { visible.value = false }, 2500)
      }
      return { visible, trigger }
    },
    template: `
      <div style="padding:40px;height:400px;position:relative">
        <Button intent="primary" surface="solid" @click="trigger">Simulate Loading</Button>
        <LoadingOverlay :visible="visible" message="Syncing with Google Maps..." />
      </div>
    `,
  }),
}
