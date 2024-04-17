<script setup lang="ts">
import useMovie from '~/composables/useMovie';
import { Card } from "#components";
import CardSkeleton from "~/components/Skeletons/CardSkeleton.vue";

const { isLoading, movies, movieItemsPerPage, fetchMovies } = useMovie();;

const categories = ref([
  {
    name: 'films',
    items: movies,
    type: 'movie'
  },
]);

onMounted(() => {
  fetchMovies('DESC', true, 10);
});
</script>

<template>
  <section class="p-6">
    <h1 class="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
      À L'AFFICHE SUR VISIONCINE
    </h1>
    <div v-for="(category, index) in categories" :key="index">
      <div class="grid grid-cols-5 grid-flow-row gap-8 w-full mb-6">
        <!-- Affiche les squelettes lorsque isLoading est vrai -->
        <CardSkeleton v-if="isLoading" v-for="i in movieItemsPerPage" :key="`skeleton-${category.name}-${i}`" />
        <!-- Affiche les vraies cartes lorsque isLoading est faux -->
        <Card v-else v-for="item in category.items" :key="item._id" :type="category.type" :info="item" :id="item._id" />
      </div>
    </div>
  </section>
</template>


<style scoped>
</style>
