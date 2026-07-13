import Toast from '../../components/feedback/Toast.vue'
import ToastHost from '../../components/feedback/ToastHost.vue'
import { useToast } from '../../composables/useToast.js'

export default {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['error', 'success', 'info', 'warning'] },
    title: { control: 'text' },
    message: { control: 'text' },
    icon: { control: 'text' },
  },
  args: {
    tone: 'success',
    title: '',
    message: 'Export ready — downloading now',
  },
}

// The static card, useful for eyeballing tones without the queue.
export const Playground = {
  render: (args) => ({
    components: { Toast },
    setup() {
      return { args }
    },
    template: '<div style="max-width:360px"><Toast v-bind="args" /></div>',
  }),
}

export const AllTones = {
  render: () => ({
    components: { Toast },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;max-width:360px">
        <Toast tone="success" message="Album \\"Kyoto 2025\\" created" />
        <Toast tone="error" message="Failed to update visibility" />
        <Toast tone="info" message="Your itinerary is syncing in the background." />
        <Toast tone="warning" message="You're offline — this action is unavailable." />
      </div>
    `,
  }),
}

// End-to-end: fire real toasts through the queue into a mounted <ToastHost />.
export const LiveQueue = {
  render: () => ({
    components: { ToastHost },
    setup() {
      const toast = useToast()
      return { toast }
    },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button @click="toast.success('Export ready — downloading now')">Success</button>
        <button @click="toast.error('Failed to invite user. Please try again.')">Error</button>
        <button @click="toast.info('Your itinerary is syncing.')">Info</button>
        <button @click="toast.warning('You are offline.')">Warning</button>
        <ToastHost />
      </div>
    `,
  }),
}
