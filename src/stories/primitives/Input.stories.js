import { ref } from 'vue'
import Input from '../../components/primitives/Input.vue'

export default {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['inline', 'field'] },
    inputType: { control: 'select', options: [undefined, 'textarea'] },
    nativeType: { control: 'select', options: ['text', 'email', 'password', 'number', 'date', 'time', 'search'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    transparent: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    placeholder: { control: 'text' },
    errorMessage: { control: 'text' },
  },
  args: {
    variant: 'field',
    placeholder: 'e.g. Tokyo Spring Adventure',
    disabled: false,
    readonly: false,
    transparent: false,
    fullWidth: false,
    errorMessage: '',
  },
}

export const Playground = {
  render: (args) => ({
    components: { Input },
    setup() {
      const val = ref('')
      return { args, val }
    },
    template: '<Input v-bind="args" v-model="val" />',
  }),
}

export const FieldVariants = {
  render: () => ({
    components: { Input },
    setup() {
      const vals = ref({ name: '', email: '', date: '', notes: '' })
      return { vals }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <Input variant="field" placeholder="Trip name" v-model="vals.name" />
        <Input variant="field" native-type="email" placeholder="your@email.com" v-model="vals.email" />
        <Input variant="field" native-type="date" v-model="vals.date" />
        <Input variant="field" input-type="textarea" placeholder="Describe your trip..." v-model="vals.notes" />
      </div>
    `,
  }),
}

export const WithError = {
  render: () => ({
    components: { Input },
    setup() {
      const val = ref('')
      return { val }
    },
    template: `
      <div style="max-width:400px">
        <Input
          variant="field"
          placeholder="Destination"
          v-model="val"
          error-message="Please enter a valid destination"
        />
      </div>
    `,
  }),
}

export const InlineVariant = {
  render: () => ({
    components: { Input },
    setup() {
      const title = ref('Kyoto Day Trip')
      return { title }
    },
    template: `
      <div style="max-width:400px">
        <p style="color:var(--fg-3);font-size:12px;margin-bottom:8px">Inline edit (click to type)</p>
        <Input variant="inline" v-model="title" :full-width="true" />
      </div>
    `,
  }),
}
