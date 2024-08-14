<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['search'])
const searchTerm = ref('')
let timer: number | null = null;

// Emit search
const emitSearch = () => {
  if (props.type === 'actors') {
    const match = searchTerm.value.match(/^(\S+)(?:\s+(\S+))?/) // match firstname and lastname
    const firstname = match ? match[1] : '' // if match is null, firstname is empty
    const lastname = match && match[2] ? match[2] : '' // if match is null or match[2] is null, lastname is empty
    emits('search', firstname, lastname )
  } else if (props.type === 'movies') {
    emits('search', searchTerm.value)
  } else if (props.type === 'category') {
    emits('search', searchTerm.value)
  } else {
    return null
  }
}

// Debounce search
const debounceSearch = (callback: Function, delay: number ) => {
  if (timer !== null) clearTimeout(timer);
  timer = setTimeout(callback, delay) as unknown as number;
}

// Update search term
const updateSearch = (newSearch: string) => {
  searchTerm.value = newSearch
  debounceSearch(emitSearch, 400)
}
</script>

<template>
  <UInput
      :placeholder="'Search ' + props.type + '...'"
      type="text"
      v-model="searchTerm"
      @input="updateSearch($event.target.value)"
  />
</template>

<style scoped>

</style>
