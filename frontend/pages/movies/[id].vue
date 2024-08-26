<script setup lang="ts">
import { useRoute, useRuntimeConfig } from "nuxt/app";
import { onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import useMovie from "~/composables/useMovie";
import DeleteModal from "~/components/Modals/DeleteModal.vue";
import PatchModal from "~/components/Modals/PatchModal.vue";

const route = useRoute()
const movieId = Number(route.params.id)

const {
  movie,
  actors,
  categories,
  fetchMovieById,
  isEditOpen,
  isDeleteOpen
} = useMovie();

onMounted(async () => {
  await fetchMovieById(movieId)
})

const config = useRuntimeConfig();
const url = config.public.apiBase
</script>

<template>
  <section class="p-24">
    <div id="grid" class="mb-6">
        <div id="grid-1" class="">
          <img v-if="movie.mediaObject" :src="url + movie.mediaObject.contentUrl" alt="image" class="h-64">
        </div>
        <div id="grid-2" class="flex justify-between">
          <div class="w-fit">
            <h1 class="text-5xl">{{ movie.title }}</h1>
            <div class="w-fit px-2 py-0.5 bg-gray-100 dark:bg-gray-800 !bg-opacity-60 border-white">
              <h3 class="text-3xl">{{ movie.score }}</h3>
            </div>
          </div>
          <div v-if="useAuthStore().isAuthenticated && useAuthStore().user.isAdministrator || useAuthStore().user.isSuperAdministrator" class="w-fit">
            <UButton color="gray" variant="ghost" icon="i-heroicons-pencil-20-solid" class="-my-1" @click="isEditOpen = true" />
            <UButton color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" class="-my-1" @click="isDeleteOpen = true" />
          </div>
        </div>
        <div id="grid-3" class="">
          <div>
            <p>Ma note</p>
            <div>
              <img src="" alt="">
              <img src="" alt="">
              <img src="" alt="">
              <img src="" alt="">
              <img src="" alt="">
            </div>
          </div>
          <div>
            <img src="" alt="">
            <p>Ecrire une critique</p>
          </div>
          <div>
            <img src="" alt="">
            <p>Coup de coeur</p>
          </div>
          <div>
            <img src="" alt="">
            <p>Envie de le voir</p>
          </div>
        </div>
        <div id="grid-4" class="">
          <p>film de {{ movie.director }} - {{ movie.duration }} - {{ movie.releaseDate }}</p>
          <p>Nombre d'entrée {{ movie.entry }}</p>
          <h2>Synopsis</h2>
          <p>{{ movie.synopsis }}</p>
          <div class="mt-4">
            <h2>Catégories</h2>
            <ul class="flex">
              <li v-for="category in categories" :key="category.id" class="mr-4">{{ category.name }}</li>
            </ul>
          </div>
        </div>
        <div id="grid-5" class="">
          <div>
            <h2>VOIR LE FILM</h2>
            <div>
              <img src="" alt="">
              <p>Netflix</p>
            </div>
            <div>
              <img src="" alt="">
              <p>Prime Video</p>
            </div>
            <div>
              <img src="" alt="">
              <p>Disney+</p>
            </div>
          </div>
        </div>
        <div id="grid-6" class="">
          <h2>casting</h2>
          <UDivider class="mb-4" />
          <div class="flex gap-4">
            <div v-for="actor in actors" :key="actor.id">
              <img v-if="actor.mediaObject" :src="url + actor.mediaObject.contentUrl" alt="image" class="h-64">
              <p>{{ actor.firstname }} {{ actor.lastname }}</p>
            </div>
          </div>
        </div>
    </div>
  </section>

  <!--  edit modal  -->
  <PatchModal
      v-if="isEditOpen"
      :type="'movie'"
      :title="'Update movie'"
      :itemToPatch="movie"
      :isOpen="isEditOpen"
      @close="isEditOpen = false"
  />

  <!--  delete modal  -->
  <DeleteModal
      v-if="isDeleteOpen"
      :type="'movie'"
      :itemToDelete="movie"
      :isOpen="isDeleteOpen"
      @close="isDeleteOpen = false"
  />

  <UNotifications /> <!--  notifications  -->
</template>

<style scoped>
#grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 300px 300px 1fr;
  gap: 0 0;
}
</style>
