import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'GlassUI',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'vue-router', '@vueup/vue-quill', /^@vueup\/vue-quill\//],
      output: {
        globals: { vue: 'Vue', 'vue-router': 'VueRouter', '@vueup/vue-quill': 'VueQuill' },
        assetFileNames: 'style.css',
        exports: 'named',
      },
    },
  },
})
