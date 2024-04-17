import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    // Enabling persistence of the stores
    persist: true,
    // State definition
    state: () => ({
        token: null as string | null,
        user: {
            id: null as number | null,
            username: null as string | null,
            email: null as string | null,
            roles: [] as string[],
            isAdministrator: false,
            isSuperAdministrator: false,
        },
        isAuthenticated: false,
    }),

    // Actions for updating the state
    actions: {
        login: function (token: string, user: {
            id: number,
            username: string,
            email: string,
            roles: string[],
            isAdministrator: boolean,
            isSuperAdministrator: boolean
        }) {
            this.token = token;
            this.user = user;
            if (user.roles.includes("ROLE_ADMIN")) {
                this.user.isAdministrator = true;
            } else if (user.roles.includes("ROLE_SUPER_ADMIN")) {
                this.user.isAdministrator = true;
                this.user.isSuperAdministrator = true;
            } else {
                this.user.isAdministrator = false;
                this.user.isSuperAdministrator = false;
            }
            this.isAuthenticated = true;
        },
        logout() {
            this.token = null;
            this.user = {
                id: null,
                username: null,
                email: null,
                roles: [],
                isAdministrator: false,
                isSuperAdministrator: false,
            };
            this.isAuthenticated = false;
        },
        updateUser(userInfo: object) {
            this.user = { ...this.user, ...userInfo };
        },
    }
});
