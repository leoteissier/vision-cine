<script setup lang="ts">
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['pageChanged'])

const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= props.totalPages) {
    emit('pageChanged', newPage)
  }
}
</script>

<template>
  <div class="flex justify-center items-center gap-2 my-4">
    <UButton v-if="currentPage > 1" @click="changePage(currentPage - 1)">Previous</UButton>

    <!-- Pagination numbers -->
    <template v-for="pageNum in totalPages">
      <UButton
          v-if="pageNum >= currentPage - 2 && pageNum <= currentPage + 2"
          :key="pageNum"
          :class="{ 'font-bold !text-white': pageNum === currentPage }"
          @click="changePage(pageNum)"
      >
        {{ pageNum }}
      </UButton>
    </template>

    <UButton v-if="currentPage < totalPages" @click="changePage(currentPage + 1)">Next</UButton>
  </div>
</template>

<style scoped>

</style>
