import ChatBubble from '../../components/display/ChatBubble.vue'

export default {
  title: 'Display/ChatBubble',
  component: ChatBubble,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'select', options: ['incoming', 'outgoing'] },
    timestamp: { control: 'text' },
  },
  args: {
    side: 'incoming',
    timestamp: '10:24 AM',
  },
}

export const Playground = {
  render: (args) => ({
    components: { ChatBubble },
    setup() { return { args } },
    template: `
      <div style="display:flex;flex-direction:column;width:100%">
        <ChatBubble v-bind="args">
          Here's a suggested 5-day itinerary for Kyoto focusing on temples and nature.
        </ChatBubble>
      </div>
    `,
  }),
}

export const Conversation = {
  render: () => ({
    components: { ChatBubble },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:600px">
        <ChatBubble side="outgoing" timestamp="10:22 AM">
          Plan me a 5-day trip to Kyoto focused on temples and local food.
        </ChatBubble>
        <ChatBubble side="incoming" timestamp="10:22 AM">
          Here's a suggested 5-day Kyoto itinerary! Day 1 starts with Fushimi Inari early morning, followed by the Gion district in the evening.
        </ChatBubble>
        <ChatBubble side="outgoing" timestamp="10:23 AM">
          Can you add a day trip to Nara?
        </ChatBubble>
        <ChatBubble side="incoming" timestamp="10:23 AM">
          Absolutely! I've updated Day 3 to include a morning trip to Nara Park to see the deer and Todai-ji Temple, with a return by early afternoon.
        </ChatBubble>
      </div>
    `,
  }),
}

export const Incoming = {
  render: () => ({
    components: { ChatBubble },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:500px">
        <ChatBubble side="incoming" timestamp="9:15 AM">
          I found 3 flights from JFK to Tokyo for your dates in April. The best option is AA 204 departing at 11:30 PM with a 14-hour direct flight.
        </ChatBubble>
      </div>
    `,
  }),
}

export const Outgoing = {
  render: () => ({
    components: { ChatBubble },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:500px;align-items:flex-end">
        <ChatBubble side="outgoing" timestamp="9:14 AM">
          Find me flights to Tokyo in April under $1200.
        </ChatBubble>
      </div>
    `,
  }),
}
