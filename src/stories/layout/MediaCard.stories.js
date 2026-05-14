import Badge from '../../components/primitives/Badge.vue'
import MediaCard from '../../components/layout/MediaCard.vue'

export default {
  title: 'Layout/MediaCard',
  component: MediaCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    imageUrl: { control: 'text' },
  },
  args: {
    title: 'Kyoto in Spring',
    description: 'Cherry blossoms, temples, and tranquil gardens.',
    imageUrl: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=640&q=80',
  },
}

export const Playground = {
  render: (args) => ({
    components: { MediaCard, Badge },
    setup() { return { args } },
    template: `
      <div style="max-width:320px">
        <MediaCard v-bind="args">
          <template #pills>
            <div style="position:absolute;top:10px;left:10px">
              <Badge tone="sky" variant="soft">Upcoming</Badge>
            </div>
          </template>
        </MediaCard>
      </div>
    `,
  }),
}

export const WithImage = {
  render: () => ({
    components: { MediaCard, Badge },
    template: `
      <div style="max-width:320px">
        <MediaCard
          title="Santorini Escape"
          description="Whitewashed villages, volcanic beaches, and sunsets from Oia."
          image-url="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=640&q=80"
        >
          <template #pills>
            <div style="position:absolute;top:10px;left:10px">
              <Badge tone="emerald" variant="soft">Active</Badge>
            </div>
          </template>
          <template #footer>
            <span style="color:var(--fg-3);font-size:12px">Jun 12 – Jun 19, 2026</span>
          </template>
        </MediaCard>
      </div>
    `,
  }),
}

export const NoImage = {
  render: () => ({
    components: { MediaCard },
    template: `
      <div style="max-width:320px">
        <MediaCard title="New York Weekend" description="Broadway, Central Park, and the best bagels." />
      </div>
    `,
  }),
}

export const Grid = {
  render: () => ({
    components: { MediaCard, Badge },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px">
        <MediaCard title="Tokyo Spring" description="Shibuya crossing and sakura season."
          image-url="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=640&q=80">
          <template #pills><div style="position:absolute;top:10px;left:10px"><Badge tone="indigo">Memory</Badge></div></template>
        </MediaCard>
        <MediaCard title="Bali Retreat" description="Rice terraces, surf, and yoga in Ubud."
          image-url="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=640&q=80">
          <template #pills><div style="position:absolute;top:10px;left:10px"><Badge tone="sky">Upcoming</Badge></div></template>
        </MediaCard>
        <MediaCard title="Patagonia Trek" description="Torres del Paine and glaciers.">
          <template #pills><div style="position:absolute;top:10px;left:10px"><Badge tone="amber">Planning</Badge></div></template>
        </MediaCard>
      </div>
    `,
  }),
}
