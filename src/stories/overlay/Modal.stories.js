import { ref } from 'vue'
import Button from '../../components/primitives/Button.vue'
import Modal from '../../components/overlay/Modal.vue'

export default {
  title: 'Overlay/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'] },
    position: { control: 'select', options: ['top-start', 'top-center', 'top-end', 'center-start', 'center', 'center-end', 'bottom-start', 'bottom-center', 'bottom-end'] },
    omitHeader: { control: 'boolean' },
    persistent: { control: 'boolean' },
  },
  args: {
    size: '2xl',
    position: 'center',
    omitHeader: false,
    persistent: false,
  },
}

export const Playground = {
  parameters: { layout: 'fullscreen' },
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div style="padding:40px">
        <Button intent="primary" surface="solid" @click="open = true">Open Modal</Button>
        <Modal v-if="open" v-bind="args" @close="open = false">
          <template #header>
            <span style="font-weight:700;color:var(--fg-1)">Add a Destination</span>
          </template>
          <template #body>
            <div style="padding:24px;color:var(--fg-2)">
              <p>Choose where you want to travel next.</p>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const Default = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="padding:40px">
        <Button intent="primary" surface="solid" @click="open = true">Open Trip Modal</Button>
        <Modal v-if="open" size="2xl" @close="open = false">
          <template #header>
            <span style="font-weight:700;color:var(--fg-1)">Tokyo Spring Adventure</span>
          </template>
          <template #body>
            <div style="padding:24px;color:var(--fg-2)">
              <p>Apr 1 – Apr 10, 2026</p>
              <p style="margin-top:12px">Edit trip details, collaborators, and privacy settings here.</p>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const Small = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="padding:40px">
        <Button intent="danger" surface="soft" @click="open = true">Delete Trip</Button>
        <Modal v-if="open" size="sm" @close="open = false">
          <template #header>
            <span style="font-weight:700;color:var(--fg-1)">Confirm Deletion</span>
          </template>
          <template #body>
            <div style="padding:24px">
              <p style="color:var(--fg-2);margin-bottom:16px">This will permanently delete "Tokyo Spring Adventure". This action cannot be undone.</p>
              <div style="display:flex;gap:8px;justify-content:flex-end">
                <Button intent="neutral" surface="ghost" @click="open = false">Cancel</Button>
                <Button intent="danger" surface="solid">Delete</Button>
              </div>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const BottomSheet = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="padding:40px">
        <Button intent="primary" surface="outline" @click="open = true">Open Bottom Sheet</Button>
        <Modal v-if="open" size="xl" position="bottom-center" @close="open = false">
          <template #header>
            <span style="font-weight:700;color:var(--fg-1)">Choose Transport</span>
          </template>
          <template #body>
            <div style="padding:24px;color:var(--fg-2)">
              <p>Select how you'll travel between destinations on Day 2.</p>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
}
