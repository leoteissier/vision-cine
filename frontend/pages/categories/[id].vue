<script setup lang="ts">
import { useRoute } from "nuxt/app";
import { useAuthStore } from "~/stores/auth";
import { onMounted } from "vue";
import useCategory from "~/composables/useCategory";
import DeleteModal from "~/components/Modals/DeleteModal.vue";
import PatchModal from "~/components/Modals/PatchModal.vue";
import handleSearch from "~/utils/handleSearch";
import goToPage from "~/utils/goToPage";

const route = useRoute();
const categoryId = Number(route.params.id);

const {
  isLoading,
  category,
  movies,
  categoryPage,
  categoryTotalPages,
  title,
  fetchCategoryById,
  isEditOpen,
  isDeleteOpen,
} = useCategory();

const onSearchMovieByCategorie = async (searchValue: string) => {
  handleSearch(searchValue, title, () => onChangePageMovieByCategoryId(1));
};

const onChangePageMovieByCategoryId = async (newPage: number) => {
  goToPage(newPage, categoryTotalPages.value, categoryPage, () => fetchCategoryById(categoryId));
};

onMounted(async () => {
  await fetchCategoryById(categoryId);
});
</script>

<template>
  <section class="py-8">

    <UContainer class="mb-6">
      <h2 class="text-3xl mb-6">{{ category.name }}</h2>
      <div class="flex justify-between">
        <SearchBar :type="'movies'" @search="onSearchMovieByCategorie" class="w-full pr-4" />
        <div v-if="useAuthStore().isAuthenticated && useAuthStore().user.isAdministrator || useAuthStore().user.isSuperAdministrator" class="flex">
          <UButton color="gray" variant="ghost" icon="i-heroicons-pencil-20-solid" class="-my-1" @click="isEditOpen = true" />
          <UButton color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" class="-my-1" @click="isDeleteOpen = true" />
        </div>
      </div>
    </UContainer>

    <UContainer class="grid grid-cols-5 grid-flow-row gap-8 w-full mb-6">
      <Card v-for="movie in movies" :key="movie._id" :type="'movie'" :info="movie" :id="movie._id" />
    </UContainer>

    <Pagination :currentPage="categoryPage" :totalPages="categoryTotalPages" @pageChanged="onChangePageMovieByCategoryId" />

  </section>

  <!--  edit modal  -->
  <PatchModal
      v-if="isEditOpen"
      :title="'Update category'"
      :type="'category'"
      :itemToPatch="category"
      :isOpen="isEditOpen"
      @close="isEditOpen = false"
  />

  <!--  delete modal  -->
  <DeleteModal
      v-if="isDeleteOpen"
      :type="'category'"
      :itemToDelete="category"
      :isOpen="isDeleteOpen"
      @close="isDeleteOpen = false"
  />

  <UNotifications /> <!--  notifications  -->
</template>

<style scoped>

</style>