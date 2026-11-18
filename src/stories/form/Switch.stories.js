import { ref } from 'vue'
import Switch from '../../components/form/Switch.vue'

export default {
  title: 'Form/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Enable reminders',
    disabled: false,
  },
}

const render = (initial) => (args) => ({
  components: { Switch },
  setup() {
    const on = ref(initial)
    return { args, on }
  },
  template: '<Switch v-model="on" :label="args.label" :disabled="args.disabled" />',
})

export const Playground = { render: render(false) }

export const On = { render: render(true) }

export const Off = { render: render(false) }

export const Disabled = {
  args: { disabled: true },
  render: render(true),
}
