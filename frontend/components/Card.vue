<script setup lang="ts">
import { navigateTo, useRuntimeConfig } from "nuxt/app";
import CardSkeleton from "~/components/Skeletons/CardSkeleton.vue";

defineProps({
  type: {
    type: String,
    required: true
  },
  info: {
    type: Object,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})

const goToDetails = (type: string, id: number) => {
  return navigateTo(`/${type}/${id}`)
}

const config = useRuntimeConfig();
const url = config.public.urlBase
</script>

<template>
  <!--  component MovieCard  -->
  <div v-if="type === 'movie'" class="flex flex-col w-full p-2 cursor-pointer" @click="goToDetails('movies', id)">
    <div class="relative">
      <img v-if="info.mediaObject" :src="url + info.mediaObject.contentUrl" alt="image" class="object-contain">
      <CardSkeleton v-else />
      <div class="absolute top-2 right-2 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 !bg-opacity-60 border-white">
        <h3>{{ info.score }}</h3>
      </div>
    </div>
    <h2>{{ info.title }}</h2>
  </div>
  <!-- component ActorCard  -->
  <div v-else-if="type === 'actor'" class="flex flex-col w-full p-2 cursor-pointer" @click="goToDetails('actors', id)">
    <img v-if="info.mediaObject" :src="url + info.mediaObject.contentUrl" alt="image" class="object-contain">
    <CardSkeleton v-else />
    <h3>{{ info.firstname }} - {{ info.lastname }}</h3>
  </div>
  <!--  component CategorieCard  -->
  <div v-else-if="type === 'category'" class="flex flex-col w-full p-2 cursor-pointer" @click="goToDetails('categories', id)">
    <img v-if="info.mediaObject" :src="url + info.mediaObject.contentUrl" alt="image" class="object-contain">
    <CardSkeleton v-else />
    <h3>{{ info.name }}</h3>
  </div>
  <!-- component ErrorCard  -->
  <div v-else>
    <h2>error</h2>
  </div>
</template>

<style scoped>

</style>