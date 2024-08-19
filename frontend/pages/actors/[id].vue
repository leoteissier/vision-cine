<script setup lang="ts">
import { useRoute, useRuntimeConfig } from "nuxt/app";
import { onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import DeleteModal from "~/components/Modals/DeleteModal.vue";
import PatchModal from "~/components/Modals/PatchModal.vue";
import useActor from "~/composables/useActor";

const route = useRoute();
const actorId = Number(route.params.id);

const {
  actor,
  movies,
  fetchActorById,
  isEditOpen,
  isDeleteOpen,
} = useActor();


onMounted(async () => {
  await fetchActorById(actorId);
});

const config = useRuntimeConfig();
const url = config.public.apiBase
</script>

<template>
  <section class="p-24">
    <div id="grid" class="mb-6">
      <div id="grid-1" class="">
        <img v-if="actor.mediaObject" :src="url + actor.mediaObject.contentUrl" alt="image" class="h-64">
      </div>
      <div id="grid-2" class="flex justify-between">
        <div class="w-fit">
          <h2>{{ actor.firstname }} - {{ actor.lastname }}</h2>
        </div>
        <div v-if="useAuthStore().isAuthenticated && useAuthStore().user.isAdministrator || useAuthStore().user.isSuperAdministrator" class="w-fit">
          <UButton color="gray" variant="ghost" icon="i-heroicons-pencil-20-solid" class="-my-1" @click="isEditOpen = true" />
          <UButton color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" class="-my-1" @click="isDeleteOpen = true" />
        </div>
      </div>
    </div>
  </section>

  <!--  edit modal  -->
  <PatchModal
    v-if="isEditOpen"
    :type="'actor'"
    :title="'Update actor'"
    :itemToPatch="movie"
    :isOpen="isEditOpen"
    @close="isEditOpen = false"
  />

  <!--  delete modal  -->
  <DeleteModal
    v-if="isDeleteOpen"
    :type="'actor'"
    :itemToDelete="actor"
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
