/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ['../src/stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config
