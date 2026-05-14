import { ref } from 'vue'
import CheckList from '../../components/form/CheckList.vue'

const PACKING_LIST = JSON.stringify([
  { key: 'Passport', value: true },
  { key: 'Travel adapter', value: false },
  { key: 'Camera', value: true },
  { key: 'Walking shoes', value: false },
  { key: 'Travel insurance docs', value: false },
])

export default {
  title: 'Form/CheckList',
  component: CheckList,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    canEdit: { control: 'boolean' },
    nested: { control: 'boolean' },
  },
  args: {
    value: PACKING_LIST,
    canEdit: true,
    nested: false,
  },
}

export const Playground = {
  render: (args) => ({
    components: { CheckList },
    setup() {
      const value = ref(args.value)
      return { args, value }
    },
    template: '<CheckList :value="value" :can-edit="args.canEdit" :nested="args.nested" @change="v => value = v" />',
  }),
}

export const EditablePackingList = {
  render: () => ({
    components: { CheckList },
    setup() {
      const value = ref(PACKING_LIST)
      return { value }
    },
    template: `
      <div style="max-width:400px">
        <CheckList :value="value" :can-edit="true" @change="v => value = v" />
      </div>
    `,
  }),
}

export const ReadOnly = {
  render: () => ({
    components: { CheckList },
    setup() {
      const value = JSON.stringify([
        { key: 'Visit Fushimi Inari', value: true },
        { key: 'Tea ceremony', value: true },
        { key: 'Arashiyama bamboo grove', value: false },
        { key: 'Nijo Castle', value: false },
      ])
      return { value }
    },
    template: `
      <div style="max-width:400px">
        <CheckList :value="value" :can-edit="false" />
      </div>
    `,
  }),
}

export const EmptyList = {
  render: () => ({
    components: { CheckList },
    setup() {
      const value = ref(JSON.stringify([]))
      return { value }
    },
    template: `
      <div style="max-width:400px">
        <CheckList :value="value" :can-edit="true" @change="v => value = v" />
      </div>
    `,
  }),
}
