import type { Ref } from "vue";

const goToPage = (newPage: number, totalPages: number, page: Ref<number>, fetchData: () => Promise<void>) => {
    if (newPage >= 1 && newPage <= totalPages) {
        page.value = newPage;
        fetchData();
    }
};

export default goToPage;
