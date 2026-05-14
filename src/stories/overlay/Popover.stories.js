import { ref } from 'vue'
import Button from '../../components/primitives/Button.vue'
import Popover from '../../components/overlay/Popover.vue'
import PopoverItem from '../../components/overlay/PopoverItem.vue'
import PopoverDivider from '../../components/overlay/PopoverDivider.vue'
import PopoverRow from '../../components/overlay/PopoverRow.vue'

const STATIC_RECT = { left: 100, top: 200, right: 260, bottom: 240, width: 160, height: 40 }

export default {
  title: 'Overlay/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    show: { control: 'boolean' },
    anchor: { control: 'select', options: ['leading', 'center'] },
    backdrop: { control: 'boolean' },
    matchAnchorWidth: { control: 'boolean' },
  },
  args: {
    show: true,
    anchor: 'leading',
    backdrop: false,
    matchAnchorWidth: false,
    rect: STATIC_RECT,
  },
}

export const Playground = {
  render: (args) => ({
    components: { Popover, PopoverItem },
    setup() {
      const show = ref(args.show)
      return { args, show }
    },
    template: `
      <div style="padding:40px">
        <button @click="show = !show" style="color:var(--fg-1);padding:8px 16px">Toggle Popover</button>
        <Popover :show="show" :rect="args.rect" :anchor="args.anchor" :backdrop="args.backdrop" @close="show = false">
          <PopoverItem>View Trip</PopoverItem>
          <PopoverItem>Edit Details</PopoverItem>
          <PopoverItem :danger="true">Delete</PopoverItem>
        </Popover>
      </div>
    `,
  }),
}

export const TripActions = {
  render: () => ({
    components: { Popover, PopoverItem, PopoverDivider },
    setup() {
      const show = ref(false)
      const rect = ref(null)
      function openAt(e) {
        rect.value = e.currentTarget.getBoundingClientRect()
        show.value = true
      }
      return { show, rect, openAt }
    },
    template: `
      <div style="padding:40px">
        <button
          @click="openAt"
          style="color:var(--fg-1);background:rgba(155,203,255,0.1);border:1px solid rgba(155,203,255,0.2);border-radius:8px;padding:8px 16px;cursor:pointer"
        >
          Tokyo Spring ... (click for actions)
        </button>
        <Popover :show="show" :rect="rect" :backdrop="true" @close="show = false">
          <PopoverItem><i class="fas fa-edit" style="margin-right:8px" />Edit Trip</PopoverItem>
          <PopoverItem><i class="fas fa-share-alt" style="margin-right:8px" />Share</PopoverItem>
          <PopoverItem><i class="fas fa-copy" style="margin-right:8px" />Duplicate</PopoverItem>
          <PopoverDivider />
          <PopoverItem :danger="true"><i class="fas fa-trash" style="margin-right:8px" />Delete</PopoverItem>
        </Popover>
      </div>
    `,
  }),
}

export const StaticPreview = {
  render: () => ({
    components: { Popover, PopoverItem, PopoverRow, PopoverDivider },
    setup() {
      const rect = { left: 120, top: 60, right: 280, bottom: 100, width: 160, height: 40 }
      return { rect }
    },
    template: `
      <div style="height:320px;position:relative">
        <Popover :show="true" :rect="rect" :backdrop="false" @close="() => {}">
          <PopoverRow label="Destination" value="Kyoto, Japan" icon="fas fa-map-marker-alt" />
          <PopoverRow label="Duration" value="7 nights" icon="fas fa-moon" />
          <PopoverDivider />
          <PopoverItem>Open Trip</PopoverItem>
        </Popover>
      </div>
    `,
  }),
}
