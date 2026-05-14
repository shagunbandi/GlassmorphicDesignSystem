import CollapsibleSection from '../../components/layout/CollapsibleSection.vue'

export default {
  title: 'Layout/CollapsibleSection',
  component: CollapsibleSection,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    icon: { control: 'text' },
    defaultOpen: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    title: 'Day 1 — Tokyo Arrival',
    icon: 'fas fa-plane-arrival',
    defaultOpen: true,
    disabled: false,
  },
}

export const Playground = {
  render: (args) => ({
    components: { CollapsibleSection },
    setup() { return { args } },
    template: `
      <CollapsibleSection v-bind="args">
        <p style="color:var(--fg-2);font-size:14px;padding:8px 0">
          Land at Narita, check in to hotel near Shinjuku, dinner at Ichiran ramen.
        </p>
      </CollapsibleSection>
    `,
  }),
}

export const OpenByDefault = {
  render: () => ({
    components: { CollapsibleSection },
    template: `
      <div style="max-width:480px">
        <CollapsibleSection title="Flights" icon="fas fa-plane" :default-open="true">
          <p style="color:var(--fg-2);font-size:14px;padding:8px 0">
            AA 204 · JFK → NRT · Departs 11:30 PM · 14h 5m
          </p>
        </CollapsibleSection>
      </div>
    `,
  }),
}

export const ClosedByDefault = {
  render: () => ({
    components: { CollapsibleSection },
    template: `
      <div style="max-width:480px">
        <CollapsibleSection title="Accommodation" icon="fas fa-bed" :default-open="false">
          <p style="color:var(--fg-2);font-size:14px;padding:8px 0">
            Shinjuku Granbell Hotel · ¥18,000 / night · 5 nights
          </p>
        </CollapsibleSection>
      </div>
    `,
  }),
}

export const MultipleSections = {
  render: () => ({
    components: { CollapsibleSection },
    template: `
      <div style="max-width:480px">
        <CollapsibleSection title="Day 1 — Arrival" icon="fas fa-plane-arrival" :default-open="true">
          <p style="color:var(--fg-2);font-size:14px;padding:8px 0">Airport pickup, hotel check-in, Shinjuku stroll.</p>
        </CollapsibleSection>
        <CollapsibleSection title="Day 2 — Temples" icon="fas fa-torii-gate">
          <p style="color:var(--fg-2);font-size:14px;padding:8px 0">Meiji Shrine, Asakusa, Senso-ji temple walk.</p>
        </CollapsibleSection>
        <CollapsibleSection title="Day 3 — Day Trip" icon="fas fa-train">
          <p style="color:var(--fg-2);font-size:14px;padding:8px 0">Bullet train to Nikko, waterfalls and shrines.</p>
        </CollapsibleSection>
      </div>
    `,
  }),
}
