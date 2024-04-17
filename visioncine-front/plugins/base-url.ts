export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    nuxtApp.provide('baseUrl', config.public.apiBase)
})