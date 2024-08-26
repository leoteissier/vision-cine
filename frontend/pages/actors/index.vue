<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import CardSkeleton from "~/components/Skeletons/CardSkeleton.vue";
import PostModal from "~/components/Modals/PostModal.vue";
import useActor from "~/composables/useActor";
import goToPage from "~/utils/goToPage";

const {
  isLoading,
  actors,
  actor,
  actorPage,
  actorItemsPerPage,
  actorTotalPages,
  firstname,
  lastname,
  isAddOpen,
  fetchActors,
} = useActor()

// Gestion de la recherche
const onSearchActor = (searchFirstname: string, searchLastname: string) => {
  firstname.value = searchFirstname;
  lastname.value = searchLastname;
  onChangePageActor(1)
};

// Gestion de la pagination
const onChangePageActor = async (newPage: number) => {
  goToPage(newPage, actorTotalPages.value, actorPage, fetchActors);
}

onMounted(fetchActors)
</script>

<template>
  <section class="py-8">
    <!-- header  -->
    <UContainer class="flex justify-between mb-6">
      <SearchBar :type="'actors'" @search="onSearchActor" class="w-full pr-4" />
      <UButton v-if="useAuthStore().isAuthenticated" @click="isAddOpen = true" class="w-min-2/12">Add Actor</UButton>
    </UContainer>

    <!--  cards  -->
    <UContainer class="grid grid-cols-5 grid-flow-row gap-8 w-full h-fit">
      <CardSkeleton v-if="isLoading" v-for="i in actorItemsPerPage" :key="i" />
      <Card v-else v-for="actor in actors" :key="actor._id" :type="'actor'" :info="actor" :id="actor._id" />
    </UContainer>

    <!-- Pagination Controls -->
    <Pagination :currentPage="actorPage" :totalPages="actorTotalPages" @pageChanged="onChangePageActor" />
  </section>

  <!--  post modal  -->
  <PostModal
      v-if="isAddOpen"
      :type="'actor'"
      :title="'Add Actor'"
      :isOpen="isAddOpen"
      @close="isAddOpen = false"
  />

  <UNotifications />
</template>

<style scoped>

</style>