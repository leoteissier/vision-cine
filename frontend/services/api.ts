import { useAuthStore } from '~/stores/auth';
import type ApiParams from "~/interfaces/api";
import { navigateTo, useRuntimeConfig } from 'nuxt/app';


export default async function api(url: string, params: ApiParams = {}) {
    const config = useRuntimeConfig();
    const BASE_URL = config.public.apiBase;

    const authStore = useAuthStore();

    // Set default headers
    let headers = new Headers(authStore.token ? { Authorization: `Bearer ${authStore.token}` } : {});

// Set Content-Type header if body is not FormData
    if (!(params.body instanceof FormData)) {
        headers.append('Content-Type', 'application/json');
    }

    // Default parameters
    let defaultParams: ApiParams = {
        mode: 'cors',
        cache: 'no-cache',
        headers
    };

    // Merge default and provided parameters
    const mergedParams = { ...defaultParams, ...params };
    // Merge headers separately to avoid overriding
    if (params.headers) {
        mergedParams.headers = { ...defaultParams.headers, ...params.headers };
    }

    let response = await fetch(BASE_URL + url, mergedParams)
    let json = await response.json() || {}
    if (!response.ok) {
        let errorMessage = json.error || response.status
        if (response.status === 401) {
            authStore.logout();
            navigateTo('/login');
        } else if (response.status === 403) {
            navigateTo('/error/403');
        } else if (response.status === 404) {
            navigateTo('/error/404');
        }
        throw new Error(errorMessage);
    }
    return json;
}
