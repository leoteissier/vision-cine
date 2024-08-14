import { defineNuxtRouteMiddleware } from "nuxt/app"
import { useAuthStore } from "~/stores/auth"

// Fonction pour décoder le jeton
// function jwtDecode(token: string) {
//     const base64Url = token.split('.')[1]
//     const base64 = base64Url.replace('-', '+').replace('_', '/')
//     return JSON.parse(window.atob(base64))
// }

export default defineNuxtRouteMiddleware((to) => {
    const { name } = to // Obtenez le nom de la page actuelle
    const authStore = useAuthStore() // Accédez au magasin d'authentification

})