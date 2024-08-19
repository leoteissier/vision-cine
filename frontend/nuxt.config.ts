export default defineNuxtConfig({
  modules: [
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      '@nuxt/ui',
  ],

  app: {
    head: {
      title: 'codenamesDuo',
      meta: [
        {charset: 'utf-8'},
        {name: 'lang', content: 'fr'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: 'le jeu de société codenamesDuo'},
        {name: 'icon', content: 'URL_de_votre_icône'},// Remplacez 'URL_de_votre_image' par le lien vers votre image.
        {name: 'og:title', content: 'Titre pour les prévisualisations de liens sur les réseaux sociaux'},
        {name: 'og:description', content: 'Description pour les prévisualisations de liens sur les réseaux sociaux'},
        {name: 'og:image', content: 'URL_de_votre_image'}, // Remplacez 'URL_de_votre_image' par le lien vers votre image.
        {name: 'og:url', content: 'URL_canonique_de_votre_page'}, // Remplacez 'URL_canonique_de_votre_page' par l'URL de votre page.
        {name: 'twitter:title', content: 'Titre pour les cartes Twitter'},
        {name: 'twitter:description', content: 'Description pour les cartes Twitter'},
        {name: 'twitter:image', content: 'URL_de_votre_image_twitter'}, // Remplacez 'URL_de_votre_image_twitter' par le lien vers votre image Twitter.
        {name: 'twitter:card', content: 'summary_large_image'}, // Remplacez par le type de carte Twitter souhaité.
      ],
      link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
    },
  },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/main.css'
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {
      darkMode: 'class',
    },
    injectPosition: 'first',
    viewer: true,
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },

  runtimeConfig: {
    // The public key which is available within client-side
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    }
  },

  compatibilityDate: '2024-08-14',
})