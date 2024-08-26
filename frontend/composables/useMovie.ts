import { ref } from 'vue';
import { navigateTo } from '#app';
import { useToast } from '#imports';
import MovieService from '~/services/moviesServices';
import type Movie from '~/interfaces/movie';
import type Actor from '~/interfaces/actor';
import type Category from '~/interfaces/category';


export default function useMovie() {
    const isLoading = ref(false);

    // données
    const movies = ref<Movie[]>([]);
    const movie = ref<Movie>({
        title: '',
        releaseDate: '',
        synopsis: '',
        duration: 0,
        score: 0,
        entry: 0,
        budget: 0,
        director: '',
        website: '',
        mediaId: '',
    })
    const selectedMovies = ref<string[]>([]);
    const actors = ref<Actor[]>([]);
    const categories = ref<Category[]>([]);

    // filtre
    const moviePage = ref(1);
    const movieItemsPerPage = ref(10);
    const movieTotalPages = ref(0);
    const title = ref('');

    // modals
    const isAddOpen = ref(false);
    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);

    const toast = useToast();

    const fetchMovies = async (sortOrder = 'ASC', validated = true, customItemsPerPage = 10) => {
        isLoading.value = true;
        try {
            const variables = {
                page: moviePage.value,
                itemsPerPage: customItemsPerPage,
                title: title.value,
                validated: validated,
                order: sortOrder
            };
            const response = await MovieService.getMovies(variables);
            movies.value = response.data.movies.collection;
            movieTotalPages.value = response.data.movies.paginationInfo.lastPage;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    }

    const fetchMovieById = async (id: number) => {
        isLoading.value = true;
        try {
            const variables = {
                id: `/api/movies/` + id,
                page: moviePage.value,
                itemsPerPage: movieItemsPerPage.value
            }
            const response = await MovieService.getMovieById(variables);
            movie.value = response.data.movie;
            actors.value = response.data.movie.actors.collection;
            categories.value = response.data.movie.categories.collection;
            movieTotalPages.value = response.data.movie.actors.paginationInfo.lastPage;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    }

    const postMovie = async (movieData: {validated: boolean, title: string, releaseDate: Date, synopsis: string, duration: number, score: number, entry: number, budget: number, director: string, website: string, mediaId: string, selectedActors: string[], selectedCategories: string[]}) => {
        try {
            await MovieService.postMovie(movieData);
            await fetchMovies(); // Refresh movies after posting
            toast.add({
                title: 'Movie Added',
                description: 'A new movie has been added successfully. Wait for validation.',
            });
        } catch (error) {
            console.error('Error while adding movie:', error);
            toast.add({
                title: 'Error',
                description: 'An error occured while adding a new movie.',
            });
        }
    }

    const patchMovie = async (movieData: {validated: boolean, id: string, title: string, releaseDate: Date, synopsis: string, duration: number, score: number, entry: number, budget: number, director: string, website: string, mediaId: string, selectedActors: string[], selectedCategories: string[]}) => {
        try {
            await MovieService.patchMovie(movieData);
            await fetchMovies(); // Refresh movies after patching
            toast.add({
                title: 'Movie Updated',
                description: 'A movie has been updated successfully.',
            });
        } catch (error) {
            console.error('Error while updating movie:', error);
            toast.add({
                title: 'Error',
                description: 'An error occured while updating the movie.',
            });
        }
    }

    const deleteMovie = async (id: string) => {
        try {
            await MovieService.deleteMovie({ id });
            await fetchMovies(); // Refresh movies after deleting
            toast.add({
                title: 'Movie Deleted',
                description: 'A movie has been deleted successfully.',
            });
            navigateTo('/movies');
        } catch (error) {
            console.error('Error while deleting movie:', error);
            toast.add({
                title: 'Error',
                description: 'An error occured while deleting the movie.',
            });
        } finally {
            isDeleteOpen.value = false;
            navigateTo('/movies');
        }
    }

    return {
        isLoading,
        movies,
        movie,
        actors,
        categories,
        selectedMovies,
        moviePage,
        movieItemsPerPage,
        movieTotalPages,
        title,
        isAddOpen,
        isEditOpen,
        isDeleteOpen,
        fetchMovies,
        fetchMovieById,
        postMovie,
        patchMovie,
        deleteMovie,
    }
}
