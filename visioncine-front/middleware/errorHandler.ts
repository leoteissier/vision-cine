export default function ({ error, redirect }: any) {
    if (error.statusCode === 404) {
        return navigateTo('/error/404');
    } else if (error.statusCode === 403) {
        return navigateTo('/error/403');
    } else if (error.statusCode === 500) {
        return navigateTo('/error/500');
    } else if (error.statusCode === 401) {
        return navigateTo('/login');
    }
}
