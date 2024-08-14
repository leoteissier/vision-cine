import { defineStore } from 'pinia';

export const useProfilModalStore = defineStore('profileModal', {
    state: () => ({
        isModalOpen: false,
    }),
    actions: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
    },
});
