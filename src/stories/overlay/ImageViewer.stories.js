import ImageViewer from '../../components/overlay/ImageViewer.vue'

const KYOTO_IMG = 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=640&q=80'
const TOKYO_IMG = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=640&q=80'

export default {
  title: 'Overlay/ImageViewer',
  component: ImageViewer,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    canEdit: { control: 'boolean' },
  },
  args: {
    src: KYOTO_IMG,
    alt: 'Kyoto cherry blossoms',
    canEdit: false,
  },
}

export const Playground = {
  render: (args) => ({
    components: { ImageViewer },
    setup() { return { args } },
    template: `
      <div style="max-width:480px">
        <p style="color:var(--fg-3);font-size:12px;margin-bottom:8px">Click image to open lightbox</p>
        <ImageViewer v-bind="args" />
      </div>
    `,
  }),
}

export const ViewOnly = {
  render: () => ({
    components: { ImageViewer },
    template: `
      <div style="max-width:480px">
        <ImageViewer
          src="${KYOTO_IMG}"
          alt="Cherry blossoms in Kyoto"
          :can-edit="false"
        />
      </div>
    `,
  }),
}

export const Editable = {
  render: () => ({
    components: { ImageViewer },
    template: `
      <div style="max-width:480px">
        <p style="color:var(--fg-3);font-size:12px;margin-bottom:8px">Edit mode — click the pencil overlay</p>
        <ImageViewer
          src="${TOKYO_IMG}"
          alt="Tokyo skyline at night"
          :can-edit="true"
          @edit="() => alert('Edit triggered')"
        />
      </div>
    `,
  }),
}

export const TripCoverPhoto = {
  render: () => ({
    components: { ImageViewer },
    template: `
      <div style="max-width:600px">
        <ImageViewer
          src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=640&q=80"
          alt="Santorini sunset"
          :can-edit="true"
        />
      </div>
    `,
  }),
}
