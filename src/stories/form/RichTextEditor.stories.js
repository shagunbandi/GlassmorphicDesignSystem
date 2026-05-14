import { ref } from 'vue'
import RichTextEditor from '../../components/form/RichTextEditor.vue'

const SAMPLE_HTML = '<p>Start your day at <strong>Fushimi Inari-taisha</strong> for the iconic torii gate hike.</p><ul><li>Arrive early to beat the crowds</li><li>Bring water and snacks</li><li>Allow 2–3 hours for the full hike</li></ul>'

export default {
  title: 'Form/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
  argTypes: {
    editorType: { control: 'select', options: ['hover', 'small', 'full'] },
    canEdit: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    editorType: 'small',
    canEdit: true,
    placeholder: 'Add notes about this day...',
    value: '',
  },
}

export const Playground = {
  render: (args) => ({
    components: { RichTextEditor },
    setup() {
      const value = ref(args.value)
      return { args, value }
    },
    template: '<RichTextEditor v-bind="args" :value="value" @change="v => value = v" />',
  }),
}

export const WithContent = {
  render: () => ({
    components: { RichTextEditor },
    setup() {
      const value = ref(SAMPLE_HTML)
      return { value }
    },
    template: `
      <div style="max-width:600px">
        <RichTextEditor
          editor-type="small"
          :value="value"
          :can-edit="true"
          @change="v => value = v"
        />
      </div>
    `,
  }),
}

export const ReadOnly = {
  render: () => ({
    components: { RichTextEditor },
    template: `
      <div style="max-width:600px">
        <RichTextEditor
          editor-type="small"
          :value="'<p>This itinerary note is read-only. <em>Hover to see.</em></p>'"
          :can-edit="false"
        />
      </div>
    `,
  }),
}

export const FullEditor = {
  render: () => ({
    components: { RichTextEditor },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="max-width:700px">
        <RichTextEditor
          editor-type="full"
          placeholder="Write your trip notes here..."
          :value="value"
          :can-edit="true"
          @change="v => value = v"
        />
      </div>
    `,
  }),
}
