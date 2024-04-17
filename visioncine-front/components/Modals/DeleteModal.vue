<script setup lang="ts">
const { deleteMovie } = useMovie();
const { deleteActor } = useActor();
const { deleteCategory } = useCategory();

// Define the props
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  itemToDelete: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const isDeleteOpen = ref(props.isOpen);

const data = reactive({
  itemToDelete: props.itemToDelete,
});

const onSubmit = async () => {
  switch (props.type) {
    case 'movie':
      await deleteMovie(props.itemToDelete.id);
      break;
    case 'actor':
      await deleteActor(props.itemToDelete.id);
      break;
    case 'category':
      await deleteCategory(props.itemToDelete.id);
      break;
    default:
      console.error('Type non reconnu');
  }
};
</script>


<template>
  <UModal v-model="isDeleteOpen" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Delete {{ type }}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isDeleteOpen = false" />
        </div>
      </template>

      <!-- Dynamic form -->
      <UForm :state="data" @submit="onSubmit" class="mb-6">
        <div class="h-24 flex justify-center items-center">
          <h1>Do you really want to delete
            <span style="color: red">
              "{{
                data.itemToDelete.name ||
                data.itemToDelete.title ||
                (data.itemToDelete.firstname && data.itemToDelete.lastname ? data.itemToDelete.firstname + ' ' + data.itemToDelete.lastname : '')
              }}"
            </span>?
          </h1>

        </div>
        <UButton type="submit" color="primary" :label="`Delete ${type}`" />
      </UForm>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>