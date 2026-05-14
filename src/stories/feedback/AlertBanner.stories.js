import { ref } from 'vue'
import AlertBanner from '../../components/feedback/AlertBanner.vue'

export default {
  title: 'Feedback/AlertBanner',
  component: AlertBanner,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['error', 'success', 'info', 'warning'] },
    title: { control: 'text' },
    message: { control: 'text' },
    dismissible: { control: 'boolean' },
    icon: { control: 'text' },
  },
  args: {
    tone: 'info',
    title: 'Heads up',
    message: 'Your trip to Kyoto starts in 3 days. Check your itinerary.',
    dismissible: false,
  },
}

export const Playground = {
  render: (args) => ({
    components: { AlertBanner },
    setup() { return { args } },
    template: '<AlertBanner v-bind="args" />',
  }),
}

export const AllTones = {
  render: () => ({
    components: { AlertBanner },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <AlertBanner tone="info" title="Tip" message="You can import your Google Maps saved places into Voyager." />
        <AlertBanner tone="success" title="Booking confirmed" message="Your flight AA 204 to Tokyo has been saved." />
        <AlertBanner tone="warning" title="Passport expiry" message="Your passport expires within 6 months of your travel date." />
        <AlertBanner tone="error" title="Sync failed" message="Could not fetch hotel availability. Please try again." />
      </div>
    `,
  }),
}

export const Dismissible = {
  render: () => ({
    components: { AlertBanner },
    setup() {
      const visible = ref(true)
      return { visible }
    },
    template: `
      <div>
        <AlertBanner
          v-if="visible"
          tone="warning"
          title="Visa required"
          message="Japanese e-visa must be applied for at least 2 weeks before departure."
          :dismissible="true"
          @dismiss="visible = false"
        />
        <p v-else style="color:var(--fg-3);font-size:13px">Alert dismissed.</p>
      </div>
    `,
  }),
}

export const TitleOnly = {
  render: () => ({
    components: { AlertBanner },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <AlertBanner tone="success" title="Itinerary saved successfully" />
        <AlertBanner tone="error" title="Failed to export PDF. Please try again." />
      </div>
    `,
  }),
}
