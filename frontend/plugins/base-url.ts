import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app"

export default defineNuxtPlugin((nuxtApp: any) => {
    const config = useRuntimeConfig()
    nuxtApp.provide('baseUrl', config.public.apiBase)
})