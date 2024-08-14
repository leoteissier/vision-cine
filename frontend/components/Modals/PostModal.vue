<script setup lang="ts">
const {
  movies,
  movie,
  selectedMovies,
  moviePage,
  movieTotalPages,
  title,
  fetchMovies,
  postMovie,
} = useMovie();
const {
  actors,
  actor,
  selectedActors,
  actorPage,
  actorTotalPages,
  firstname,
  lastname,
  fetchActors,
  postActor,
} = useActor();
const {
  categories,
  category,
  selectedCategories,
  categoryPage,
  categoryTotalPages,
  name,
  fetchCategories,
  postCategory,
} = useCategory();
const { selectedMedia, handleMediaUpload } = useMediaUpload();

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  }
});

const isAddOpen = ref(props.isOpen);

const onSubmit = async () => {
  switch (props.type) {
    case 'movie':
      await PostMovie();
      break;
    case 'actor':
      await PostActor();
      break;
    case 'category':
      await PostCategory();
      break;
    default:
      console.error('Type non reconnu');
  }
};

// Création de l'objet de données réactif
const data = reactive({
  movie: {}, // structure initiale pour un film
  actor: {}, // structure initiale pour un acteur
  category: {}, // structure initiale pour une catégorie
});

const emits = defineEmits(['update:data', 'close', 'submit']);

// Post movie
const PostMovie = async () => {
  try {
    const validated = false;
    const mediaId = selectedMedia.value ? await handleMediaUpload(selectedMedia.value) : '';
    data.movie.releaseDate = data.movie.releaseDate === "" ? null : data.movie.releaseDate;
    await postMovie({ validated, ...data.movie, mediaId, selectedActors: selectedActors.value, selectedCategories: selectedCategories.value });
    emits('close')
  } catch (error) {
    console.log(error);
  }
};

const PostActor = async () => {
  try {
    const validated = false;
    const mediaId = selectedMedia.value ? await handleMediaUpload(selectedMedia.value) : '';
    data.actor.birthdate = data.actor.birthdate === "" ? null : data.actor.birthdate;
    await postActor({ validated, ...data.actor, mediaId, selectedMovies: selectedMovies.value });
    emits('close')
  } catch (error) {
    console.log(error);
  }
};

const PostCategory = async () => {
  try {
    const validated = false;
    const mediaId = selectedMedia.value ? await handleMediaUpload(selectedMedia.value) : '';
    await postCategory({ validated, ...data.category, mediaId, selectedMovies: selectedMovies.value });
    emits('close')
  } catch (error) {
    console.log(error);
  }
};

// Gestion de la recherche
const onSearchMovie = (searchValue: string) => {
  handleSearch(searchValue, title, () => onChangePageMovie(1))
};

const onSearchActor = (searchFirstname: string, searchLastname: string) => {
  firstname.value = searchFirstname;
  lastname.value = searchLastname;
  fetchActors()
};

const onSearchCategory = (searchName: string) => {
  handleSearch(searchName, name, () => onChangePageCategory(1));
};

// Gestion de la pagination
const onChangePageMovie = async (newPage: number) => {
  goToPage(newPage, movieTotalPages.value, moviePage, fetchMovies);
};

const onChangePageActor = async (newPage: number) => {
  goToPage(newPage, actorTotalPages.value, actorPage, fetchActors);
};

const onChangePageCategory = async (newPage: number) => {
  goToPage(newPage, categoryTotalPages.value, categoryPage, fetchCategories);
};

// Gestion des étapes
const STEP_DETAILS = 1;
const STEP_MOVIE_SELECT_MOVIES = 2; // Pour les acteurs et les catégories
const STEP_MOVIE_SELECT_ACTORS = 2; // Pour les films
const STEP_MOVIE_SELECT_CATEGORIES = 3; // Pour les films

// Initialisation de l'étape actuelle
const currentStep = ref(STEP_DETAILS);

// Logique de navigation des étapes
const nextStep = () => {
  if (props.type === 'movie') {
    if (currentStep.value < STEP_MOVIE_SELECT_CATEGORIES) {
      currentStep.value++;
    } else {
      onSubmit(); // Soumettre le formulaire pour les films
    }
  } else {
    if (currentStep.value < STEP_MOVIE_SELECT_MOVIES) {
      currentStep.value++;
    } else {
      onSubmit(); // Soumettre le formulaire pour les acteurs et les catégories
    }
  }
};

const previousStep = () => {
  if (currentStep.value > STEP_DETAILS) {
    currentStep.value--;
  }
};

onMounted(async () => {
  switch (props.type) {
    case 'movie':
      await fetchActors();
      await fetchCategories();
      break;
    case 'actor':
      await fetchMovies();
      break;
    case 'category':
      await fetchMovies();
      break;
    default:
      console.error('Type non reconnu');
  }
});
</script>

<template>
  <UModal v-model="isAddOpen" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <!-- Dynamic form title -->
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ props.title }}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="emits('close')" />
        </div>
      </template>

      <!-- Dynamic form -->
      <UForm :state="data">
        <!-- Movie Form -->
        <div v-if="type === 'movie'" class="flex gap-4">
          <div v-if="currentStep === STEP_DETAILS" class="w-full">
            <UFormGroup label="Title*" label-position="top">
              <UInput v-model="data.movie.title" placeholder="Title" required />
            </UFormGroup>
            <UFormGroup label="Synopsis*" label-position="top">
              <UInput v-model="data.movie.synopsis" placeholder="Synopsis" required />
            </UFormGroup>
            <UFormGroup label="Duration*" label-position="top">
              <UInput v-model="data.movie.duration" type="number" placeholder="Duration (en minutes)" required />
            </UFormGroup>
            <UFormGroup label="Release date" label-position="top">
              <UInput v-model="data.movie.releaseDate" type="date" placeholder="Release date" />
            </UFormGroup>
            <UFormGroup label="Score" label-position="top">
              <UInput v-model="data.movie.score" type="number" placeholder="Score" />
            </UFormGroup>
            <UFormGroup label="Entry" label-position="top">
              <UInput v-model="data.movie.entry" type="number" placeholder="Entry" />
            </UFormGroup>
            <UFormGroup label="Budget" label-position="top">
              <UInput v-model="data.movie.budget" type="number" placeholder="Budget" />
            </UFormGroup>
            <UFormGroup label="Director" label-position="top">
              <UInput v-model="data.movie.director" placeholder="Director" />
            </UFormGroup>
            <UFormGroup label="Website" label-position="top">
              <UInput v-model="data.movie.website" placeholder="Website" />
            </UFormGroup>
            <UFormGroup label="Image" name="media" class="mb-6">
              <input type="file" @change="event => selectedMedia = event.target.files[0]" />
            </UFormGroup>
          </div>
          <div v-else-if="currentStep === STEP_MOVIE_SELECT_ACTORS" class="w-full">
            <UFormGroup label="Actors" name="actors" class="mb-6">
              <SearchBar :type="'actors'" @search="onSearchActor" class="w-full mb-4" />
              <div>
                <UCheckbox
                    v-for="actor in actors"
                    :key="actor.id"
                    :value="actor.id"
                    v-model="selectedActors"
                    :label="actor.firstname + ' ' + actor.lastname"
                />
              </div>
            </UFormGroup>

            <Pagination :currentPage="actorPage" :totalPages="actorTotalPages" @pageChanged="onChangePageActor" />
          </div>

          <div v-else-if="currentStep === STEP_MOVIE_SELECT_CATEGORIES" class="w-full">
            <UFormGroup label="Categories" name="categories" class="mb-6">
              <SearchBar :type="'categories'" @search="onSearchCategory" class="w-full mb-4" />
              <div>
                <UCheckbox
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                    v-model="selectedCategories"
                    :label="category.name"
                />
              </div>
            </UFormGroup>

            <Pagination :currentPage="categoryPage" :totalPages="categoryTotalPages" @pageChanged="onChangePageCategory" />
          </div>
        </div>

        <!-- Actor Form -->
        <div v-else-if="type === 'actor'" class="flex gap-4">
          <div v-if="currentStep === STEP_DETAILS" class="w-full">
            <UFormGroup label="FirstName*" label-position="top">
              <UInput v-model="data.actor.firstname" placeholder="Firstname" required />
            </UFormGroup>
            <UFormGroup label="LastName*" label-position="top">
              <UInput v-model="data.actor.lastname" placeholder="Lastname" required />
            </UFormGroup>
            <UFormGroup label="BirthDate" label-position="top">
              <UInput v-model="data.actor.birthdate" type="date" placeholder="BirthDate" />
            </UFormGroup>
            <UFormGroup label="Nationality" label-postion="top">
              <UInput v-model="data.actor.nationality" placeholder="Nationality" required />
            </UFormGroup>
            <UFormGroup label="Reward" label-position="top">
              <UInput v-model="data.actor.reward" placeholder="Reward" />
            </UFormGroup>
            <UFormGroup label="Image" name="media" class="mb-6">
              <input type="file" @change="event => selectedMedia = event.target.files[0]" />
            </UFormGroup>
          </div>
          <div v-else-if="currentStep === STEP_MOVIE_SELECT_MOVIES" class="w-full">
            <UFormGroup label="Movies" name="movies" class="mb-6">
              <SearchBar :type="'movies'" @search="onSearchMovie" class="w-full mb-4" />
              <div>
                <UCheckbox
                    v-for="movie in movies"
                    :key="movie.id"
                    :value="movie.id"
                    v-model="selectedMovies"
                    :label="movie.title"
                />
              </div>

              <Pagination :currentPage="moviePage" :totalPages="movieTotalPages" @pageChanged="onChangePageMovie" />
            </UFormGroup>
          </div>
        </div>

        <!-- Category Form -->
        <div v-else-if="type === 'category'" class="flex gap-4">
          <div v-if="currentStep === STEP_DETAILS" class="w-full">
            <UFormGroup label="Name" name="name" class="mb-6">
              <UInput v-model="data.category.name"/>
            </UFormGroup>

            <UFormGroup label="Image" name="media" class="mb-6">
              <input type="file" @change="event => selectedMedia = event.target.files[0]" />
            </UFormGroup>
          </div>
          <div v-else-if="currentStep === STEP_MOVIE_SELECT_MOVIES" class="w-full">
            <UFormGroup label="Movies" name="movies" class="mb-6">
              <SearchBar :type="'movies'" @search="onSearchMovie" class="w-full mb-4" />
              <div>
                <UCheckbox
                    v-for="movie in movies"
                    :key="movie.id"
                    :value="movie.id"
                    v-model="selectedMovies"
                    :label="movie.title"
                />
              </div>
            </UFormGroup>

            <Pagination :currentPage="moviePage" :totalPages="movieTotalPages" @pageChanged="onChangePageMovie" />
          </div>
        </div>

        <div class="flex justify-end space-x-2">
          <UButton v-if="currentStep > STEP_DETAILS" @click="previousStep" label="Previous" />
          <UButton @click="nextStep" :label="currentStep === STEP_MOVIE_SELECT_CATEGORIES || (type !== 'movie' && currentStep === STEP_MOVIE_SELECT_MOVIES) ? 'Add ' + type.charAt(0).toUpperCase() + type.slice(1) : 'Next'" />
        </div>

      </UForm>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>