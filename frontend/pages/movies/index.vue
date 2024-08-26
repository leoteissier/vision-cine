<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import PostModal from "~/components/Modals/PostModal.vue";
import CardSkeleton from "~/components/Skeletons/CardSkeleton.vue";
import useMovie from "~/composables/useMovie";
import handleSearch from "~/utils/handleSearch";
import goToPage from "~/utils/goToPage";

const {
  isLoading,
  movies,
  movie,
  moviePage,
  movieItemsPerPage,
  movieTotalPages,
  title,
  isAddOpen,
  fetchMovies,
} = useMovie()

// Gestion de la recherche
const onSearchMovie = (searchValue: string) => {
  handleSearch(searchValue, title, () => onChangePageMovie(1));
};

// Gestion de la pagination
const onChangePageMovie = async (newPage: number) => {
  goToPage(newPage, movieTotalPages.value, moviePage, fetchMovies);
};

onMounted(fetchMovies)
</script>


<template>
  <section class="py-8">
    <!-- header  -->
    <UContainer class="flex justify-between mb-6">
      <SearchBar :type="'movies'" @search="onSearchMovie" class="w-full pr-4" />
      <UButton v-if="useAuthStore().isAuthenticated" @click="isAddOpen = true" class="w-min-2/12">Add Movie</UButton>
    </UContainer>

    <!--  cards  -->
    <UContainer class="grid grid-cols-5 grid-flow-row gap-8 w-full h-fit">
      <CardSkeleton v-if="isLoading" v-for="i in movieItemsPerPage" :key="i" />
      <Card v-else v-for="movie in movies" :key="movie._id" :type="'movie'" :info="movie" :id="movie._id" />
    </UContainer>

    <!-- Pagination Controls -->
    <Pagination :currentPage="moviePage" :totalPages="movieTotalPages" @pageChanged="onChangePageMovie" />
  </section>

  <!--  post modal  -->
  <PostModal
    v-if="isAddOpen"
    :type="'movie'"
    :title="'Add Movie'"
    :isOpen="isAddOpen"
    @close="isAddOpen = false"
  />

  <UNotifications />
</template>

<style scoped>

</style>
