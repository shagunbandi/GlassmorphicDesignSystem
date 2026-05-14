import PopoverItem from '../../components/overlay/PopoverItem.vue'
import PopoverRow from '../../components/overlay/PopoverRow.vue'
import PopoverDivider from '../../components/overlay/PopoverDivider.vue'

export default {
  title: 'Overlay/PopoverItem',
  component: PopoverItem,
  tags: ['autodocs'],
  argTypes: {
    danger: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    danger: false,
    disabled: false,
  },
}

export const Playground = {
  render: (args) => ({
    components: { PopoverItem },
    setup() { return { args } },
    template: `
      <div class="gd-popover" style="position:relative;display:inline-block;min-width:200px">
        <PopoverItem v-bind="args">Edit Trip</PopoverItem>
      </div>
    `,
  }),
}

export const ActionList = {
  render: () => ({
    components: { PopoverItem, PopoverDivider },
    template: `
      <div class="gd-popover" style="position:relative;display:inline-block;min-width:220px">
        <PopoverItem>
          <template #leading><i class="fas fa-edit" /></template>
          Edit Details
        </PopoverItem>
        <PopoverItem>
          <template #leading><i class="fas fa-share-alt" /></template>
          Share Trip
        </PopoverItem>
        <PopoverItem>
          <template #leading><i class="fas fa-copy" /></template>
          Duplicate
        </PopoverItem>
        <PopoverDivider />
        <PopoverItem :danger="true">
          <template #leading><i class="fas fa-trash" /></template>
          Delete Trip
        </PopoverItem>
      </div>
    `,
  }),
}

export const WithDisabled = {
  render: () => ({
    components: { PopoverItem, PopoverDivider },
    template: `
      <div class="gd-popover" style="position:relative;display:inline-block;min-width:220px">
        <PopoverItem>View Map</PopoverItem>
        <PopoverItem :disabled="true">Export PDF (unavailable)</PopoverItem>
        <PopoverDivider />
        <PopoverItem :danger="true">Remove</PopoverItem>
      </div>
    `,
  }),
}

export const RowAndDivider = {
  render: () => ({
    components: { PopoverRow, PopoverDivider, PopoverItem },
    template: `
      <div class="gd-popover" style="position:relative;display:inline-block;min-width:240px">
        <PopoverRow label="Destination" value="Kyoto, Japan" icon="fas fa-map-marker-alt" />
        <PopoverRow label="Dates" value="Apr 1 – Apr 10" icon="fas fa-calendar" />
        <PopoverRow label="Duration" value="9 nights" icon="fas fa-moon" />
        <PopoverDivider />
        <PopoverItem>Open Trip</PopoverItem>
      </div>
    `,
  }),
}
