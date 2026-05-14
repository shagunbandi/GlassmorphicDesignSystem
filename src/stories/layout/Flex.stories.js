import Flex from '../../components/layout/Flex.vue'

const Chip = {
  template: '<div style="background:rgba(155,203,255,0.12);border:1px solid rgba(155,203,255,0.25);border-radius:6px;padding:8px 14px;color:var(--fg-2);font-size:13px;white-space:nowrap"><slot/></div>',
}

export default {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['row', 'row-reverse', 'col', 'col-reverse'] },
    justify: { control: 'select', options: ['start', 'end', 'center', 'between', 'around', 'evenly'] },
    align: { control: 'select', options: ['start', 'end', 'center', 'baseline', 'stretch'] },
    wrap: { control: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
    gap: { control: 'text' },
  },
  args: {
    direction: 'row',
    justify: 'start',
    align: 'center',
    wrap: 'wrap',
    gap: '3',
  },
}

export const Playground = {
  render: (args) => ({
    components: { Flex, Chip },
    setup() { return { args } },
    template: `
      <Flex v-bind="args">
        <Chip>Tokyo</Chip>
        <Chip>Kyoto</Chip>
        <Chip>Osaka</Chip>
      </Flex>
    `,
  }),
}

export const SpaceBetween = {
  render: () => ({
    components: { Flex, Chip },
    template: `
      <Flex direction="row" justify="between" align="center" gap="3">
        <Chip>Itinerary</Chip>
        <Chip>Map</Chip>
        <Chip>Budget</Chip>
      </Flex>
    `,
  }),
}

export const Column = {
  render: () => ({
    components: { Flex, Chip },
    template: `
      <Flex direction="col" gap="2" style="max-width:200px">
        <Chip>Day 1 — Arrival</Chip>
        <Chip>Day 2 — Temples</Chip>
        <Chip>Day 3 — Market</Chip>
      </Flex>
    `,
  }),
}

export const Centered = {
  render: () => ({
    components: { Flex, Chip },
    template: `
      <Flex direction="row" justify="center" align="center" gap="4">
        <Chip>Flights</Chip>
        <Chip>Hotels</Chip>
        <Chip>Activities</Chip>
      </Flex>
    `,
  }),
}
