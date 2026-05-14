import Button from '../../components/primitives/Button.vue'
import Hero from '../../components/layout/Hero.vue'

export default {
  title: 'Layout/Hero',
  component: Hero,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    tagline: { control: 'text' },
    backgroundImage: { control: 'text' },
    showAction: { control: 'boolean' },
    padding: { control: 'text' },
  },
  args: {
    title: 'Your Next Adventure Awaits',
    subtitle: 'Plan, explore, and relive your travels with Voyager.',
    tagline: 'Travel smarter',
    showAction: true,
    padding: '1.5rem 2rem',
  },
}

export const Playground = {
  render: (args) => ({
    components: { Hero, Button },
    setup() { return { args } },
    template: `
      <Hero v-bind="args">
        <template #action>
          <Button intent="primary" surface="elevated" size="lg" radius="full">Plan a Trip</Button>
        </template>
      </Hero>
    `,
  }),
}

export const WithBackground = {
  render: () => ({
    components: { Hero, Button },
    template: `
      <Hero
        title="Kyoto in Spring"
        subtitle="Experience cherry blossom season like never before."
        tagline="Featured destination"
        background-image="https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1280&q=80"
      >
        <template #action>
          <Button intent="primary" surface="elevated" size="lg" radius="full">Explore Itinerary</Button>
        </template>
      </Hero>
    `,
  }),
}

export const NoTagline = {
  render: () => ({
    components: { Hero, Button },
    template: `
      <Hero title="Welcome back, Alex" subtitle="You have 3 trips coming up this summer.">
        <template #action>
          <Button intent="primary" surface="solid" size="md">View Trips</Button>
        </template>
      </Hero>
    `,
  }),
}

export const NoAction = {
  render: () => ({
    components: { Hero },
    template: `
      <Hero
        title="Bali Retreat"
        subtitle="10 days in Ubud and Seminyak."
        tagline="Active trip"
        :show-action="false"
      />
    `,
  }),
}
