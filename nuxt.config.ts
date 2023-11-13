// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      api: {
        secret: '',
        basePath: ''
      }
    }
  },
  devtools: { enabled: false },
  modules: ['nuxt-primevue'],
  primevue: {
    /* Options */
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities'
  },
  css: ['primevue/resources/themes/lara-light-purple/theme.css', 'primeicons/primeicons.css'],
});
