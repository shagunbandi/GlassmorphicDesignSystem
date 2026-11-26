import { ref } from 'vue'
import CheckboxGroup from '../../components/form/CheckboxGroup.vue'

export default {
  title: 'Form/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Recipients',
    disabled: false,
    items: [
      { value: 1, label: 'You' },
      { value: 2, label: 'Sam' },
      { value: 3, label: 'Alex' },
    ],
  },
}

const render = (initial) => (args) => ({
  components: { CheckboxGroup },
  setup() {
    const selected = ref(initial)
    return { args, selected }
  },
  template:
    '<CheckboxGroup v-model="selected" :items="args.items" :label="args.label" :disabled="args.disabled" />',
})

export const Playground = { render: render([1]) }

export const WithHints = {
  args: {
    items: [
      { value: 1, label: 'You' },
      { value: 2, label: 'Sam', disabled: true, hint: 'Not on Telegram' },
    ],
  },
  render: render([1]),
}

export const Disabled = {
  args: { disabled: true },
  render: render([1]),
}
