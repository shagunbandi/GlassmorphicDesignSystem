import Grid from '../../components/layout/Grid.vue'

const Box = {
  template: '<div style="background:rgba(155,203,255,0.12);border:1px solid rgba(155,203,255,0.25);border-radius:8px;padding:16px;color:var(--fg-2);font-size:13px;text-align:center"><slot/></div>',
}

export default {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'select', options: ['1', '2', '3', '4'] },
    gap: { control: 'select', options: ['0', '2', '4', '6', '8'] },
  },
  args: {
    columns: '3',
    gap: '4',
  },
}

export const Playground = {
  render: (args) => ({
    components: { Grid, Box },
    setup() { return { args } },
    template: `
      <Grid v-bind="args">
        <Box>Tokyo</Box>
        <Box>Kyoto</Box>
        <Box>Osaka</Box>
        <Box>Nara</Box>
        <Box>Hiroshima</Box>
        <Box>Hakone</Box>
      </Grid>
    `,
  }),
}

export const TwoColumns = {
  render: () => ({
    components: { Grid, Box },
    template: `
      <Grid columns="2" gap="4">
        <Box>Outbound flight</Box>
        <Box>Return flight</Box>
        <Box>Hotel check-in</Box>
        <Box>Hotel check-out</Box>
      </Grid>
    `,
  }),
}

export const Responsive = {
  render: () => ({
    components: { Grid, Box },
    template: `
      <Grid columns="1" columns-sm="2" columns-lg="4" gap="4">
        <Box>Day 1 – Arrival</Box>
        <Box>Day 2 – Temples</Box>
        <Box>Day 3 – Markets</Box>
        <Box>Day 4 – Departure</Box>
      </Grid>
    `,
  }),
}

export const DenseGap = {
  render: () => ({
    components: { Grid, Box },
    template: `
      <Grid columns="4" gap="2">
        <Box>MON</Box>
        <Box>TUE</Box>
        <Box>WED</Box>
        <Box>THU</Box>
      </Grid>
    `,
  }),
}
