<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import CardSkeleton from "~/components/Skeletons/CardSkeleton.vue";
import PostModal from "~/components/Modals/PostModal.vue";

const {
  isLoading,
  categories,
  category,
  categoryPage,
  categoryItemsPerPage,
  categoryTotalPages,
  name,
  fetchCategories,
  isAddOpen,
} = useCategory();

// Gestion de la recherche
const onSearchCategory = (searchValue: string) => {
  handleSearch(searchValue, name, () => onChangePageCategory(1));
};

// Gestion de la pagination
const onChangePageCategory = async (newPage: number) => {
  goToPage(newPage, categoryTotalPages.value, categoryPage, fetchCategories);
};

onMounted(fetchCategories)
</script>


<template>
  <section class="py-8">
    <UContainer class="flex justify-between mb-6">
      <SearchBar :type="'categories'" @search="onSearchCategory" class="w-full pr-4" />
      <UButton v-if="useAuthStore().isAuthenticated" @click=" isAddOpen = true" class="w-min-2/12">Add Category</UButton>
    </UContainer>

    <!--  cards  -->
    <UContainer class="grid grid-cols-5 grid-flow-row gap-8 w-full h-fit">
      <CardSkeleton v-if="isLoading" v-for="i in categoryItemsPerPage" :key="i" />
      <Card v-else v-for="category in categories" :key="category._id" :type="'category'" :info="category" :id="category._id" />
    </UContainer>

    <!-- Pagination Controls -->
    <Pagination :currentPage="categoryPage" :totalPages="categoryTotalPages" @pageChanged="onChangePageCategory" />
  </section>

  <!--  post modal  -->
  <PostModal
      v-if="isAddOpen"
      :type="'category'"
      :title="'Add Category'"
      :isOpen="isAddOpen"
      @close="isAddOpen = false"
  />

  <UNotifications />
</template>

<style scoped>

</style>