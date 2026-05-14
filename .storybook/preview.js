import '../src/tokens/tokens.css'
import { createRouter, createWebHashHistory } from 'vue-router'

const mockRouter = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div/>' } }],
})

// Install vue-router on the Storybook Vue app instance (covers TopNavbar, BottomNavigation)
export const setup = (app) => {
  app.use(mockRouter)
}

const withGlassBackground = (story) => ({
  components: { story },
  template: `
    <div style="min-height:100vh;padding:2rem;background:radial-gradient(circle at top right,#243b55,#141e30);box-sizing:border-box;font-family:'Inter',-apple-system,sans-serif">
      <story />
    </div>
  `,
})

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    backgrounds: { disable: true },
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withGlassBackground],
}

export default preview
