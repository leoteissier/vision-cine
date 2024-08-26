import { navigateTo } from "#app";
import { ref } from "vue";
import CategorieService from "~/services/categoriesServices";
import type Category from "~/interfaces/category";
import type Movie from "~/interfaces/movie";
import { useToast } from "#imports";

export default function useCategory() {
    const isLoading = ref(false);

    const categories = ref<Category[]>([]);
    const category = ref<Category>({
        name: '',
        validated: false,
        mediaId: ''
    });
    const selectedCategories = ref<string[]>([]);
    const categoryMovieIds = ref<number[]>([]);
    const movies = ref<Movie[]>([]);

    // filter
    const categoryPage = ref(1);
    const categoryItemsPerPage = ref(10);
    const categoryTotalPages = ref(0);
    const name = ref('');
    const title = ref('');

    // modal
    const isAddOpen = ref(false);
    const isEditOpen = ref(false)
    const isDeleteOpen = ref(false)

    const selectedMedia = ref<File | null>(null);

    const toast = useToast();

    const fetchCategories = async () => {
        isLoading.value = true;
        try {
            const variables = {
                page: categoryPage.value,
                itemsPerPage: categoryItemsPerPage.value,
                name: name.value,
            };
            const response = await CategorieService.getCategories(variables);
            if (response.data.categories !== null) {
                categories.value = response.data.categories.collection;
                categoryTotalPages.value = response.data.categories.paginationInfo.lastPage;
            }
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    };

    const fetchCategoryById = async (id: number) => {
        isLoading.value = true;
        try {
            const variables = {
                id: "/api/categories/" + id,
                page: categoryPage.value,
                itemsPerPage: categoryItemsPerPage.value,
                title: title.value,
            };
            const response = await CategorieService.getCategoryById(variables);
            if (response.data.categories !== null) {
                category.value = response.data.category;
                movies.value = response.data.category.movies.collection;
                categoryTotalPages.value = response.data.category.movies.paginationInfo.lastPage;
                categoryMovieIds.value = response.data.category.movies.collection.map((movie: Movie) => movie.id);
            }
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    }

    const postCategory = async (categoryData: { validated: boolean, name: string, mediaId: string, selectedMovies: string[]}) => {
        try {
            await CategorieService.postCategory(categoryData);
            await fetchCategories(); // Refresh categories after posting
            toast.add({
                title: 'Category Added',
                description: 'A new category has been added successfully. Wait for validation.',
            });
        } catch (error) {
            console.error('Error while adding category:', error);
        }
    };

    const patchCategory = async (CategoryData: { validated: boolean, id: string, name: string, mediaId: string, selectedMovies: string[]}) => {
        try {
            await CategorieService.patchCategory(CategoryData);
            await fetchCategories(); // Refresh categories after patching
            toast.add({
                title: 'Category Updated',
                description: 'A category has been updated successfully.',
            });
        } catch (error) {
            console.error('Error while updating category:', error);
        }
    }

    const deleteCategory = async (id: string) => {
        try {
            await CategorieService.deleteCategory({ id });
            navigateTo('/categories');
            await fetchCategories(); // Refresh categories after deleting
            toast.add({
                title: 'Category Deleted',
                description: 'A category has been deleted successfully.',
            });
        } catch (error) {
            console.error('Error while deleting category:', error);
        } finally {
            isDeleteOpen.value = false;
            navigateTo('/categories');
        }
    }

    return {
        isLoading,
        categories,
        category,
        categoryMovieIds,
        selectedCategories,
        movies,
        categoryPage,
        categoryItemsPerPage,
        categoryTotalPages,
        name,
        title,
        isAddOpen,
        isEditOpen,
        isDeleteOpen,
        selectedMedia,
        fetchCategories,
        fetchCategoryById,
        postCategory,
        patchCategory,
        deleteCategory,
    };
}
