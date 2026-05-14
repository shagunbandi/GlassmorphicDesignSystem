import FileUpload from '../../components/form/FileUpload.vue'

export default {
  title: 'Form/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    itemKey: { control: 'text' },
  },
  args: {
    value: '',
    itemKey: 'trip-document',
  },
}

export const Playground = {
  render: (args) => ({
    components: { FileUpload },
    setup() { return { args } },
    template: `
      <div style="max-width:420px">
        <FileUpload v-bind="args" @select-file="f => console.log('file selected:', f.name)" />
      </div>
    `,
  }),
}

export const Empty = {
  render: () => ({
    components: { FileUpload },
    template: `
      <div style="max-width:420px">
        <FileUpload item-key="boarding-pass" @select-file="f => console.log(f.name)" />
      </div>
    `,
  }),
}

export const WithExistingFile = {
  render: () => ({
    components: { FileUpload },
    template: `
      <div style="max-width:420px">
        <FileUpload
          value="https://cdn.example.com/uploads/tokyo-itinerary.pdf?v=1234"
          item-key="itinerary-pdf"
        />
      </div>
    `,
  }),
}

export const VisaDocument = {
  render: () => ({
    components: { FileUpload },
    template: `
      <div style="max-width:420px">
        <p style="color:var(--fg-3);font-size:13px;margin-bottom:12px">Upload your visa approval letter</p>
        <FileUpload item-key="visa-doc" @select-file="f => console.log('Visa doc:', f.name)" />
      </div>
    `,
  }),
}
