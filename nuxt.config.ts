// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/main.css', 'vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css',],
  ssr: true,
  devtools: { enabled: true },
  pinia: {
    autoImports: [
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  runtimeConfig: {
    public: {
      backendBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
  modules: [
    '@pinia/nuxt',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['vuetify'],
  },
})
