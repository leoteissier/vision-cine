import { ref } from 'vue';
import ActorService from '~/services/actorsServices';
import type Actor from '~/interfaces/actor';
import type Movie from "~/interfaces/movie";
import { useToast } from '#imports';

export default function useActor() {
    const isLoading = ref(false);

    // données
    const actors = ref<Actor[]>([]);
    const actor = ref<Actor>({
        firstname: '',
        lastname: '',
        birthdate: '',
        nationality: '',
        biography: '',
        reward: '',
        mediaId: ''
    })
    const selectedActors = ref<string[]>([]);
    const movies = ref([]);

    // filtre
    const actorPage = ref(1);
    const actorItemsPerPage = ref(10);
    const actorTotalPages = ref(0);
    const firstname = ref('');
    const lastname = ref('');

    // modal
    const isAddOpen = ref(false);
    const isEditOpen = ref(false);
    const isDeleteOpen = ref(false);

    // toast
    const toast = useToast();

    const fetchActors = async () => {
        isLoading.value = true;
        try {
            const variables = {
                page: actorPage.value,
                itemsPerPage: actorItemsPerPage.value,
                firstname: firstname.value,
                lastname: lastname.value
            };
            const response = await ActorService.getActors(variables);
            actors.value = response.data.actors.collection;
            actorTotalPages.value = response.data.actors.paginationInfo.lastPage;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    };

    const fetchActorById = async (id: number) => {
        isLoading.value = true;
        try {
            const variables = {
                id: `/api/actors/` + id,
                page: actorPage.value,
                itemsPerPage: actorItemsPerPage.value
            };
            const response = await ActorService.getActorById(variables);
            actor.value = response.data.actor;
            movies.value = response.data.actor.movies.collection;
            actorTotalPages.value = response.data.actor.movies.paginationInfo.lastPage;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    }

    const postActor = async (actorData: {validated: boolean, firstname: string, lastname: string, birthdate: string, nationality: string, reward: string, mediaId: string, selectedMovies: string[]}) => {
        try {
            await ActorService.postActor(actorData);
            await fetchActors(); // Refresh actors after posting
            toast.add({
                title: 'Actor Added',
                description: 'A new actor has been added successfully. Wait for validation.',
            });
        } catch (error) {
            console.error('Error while adding actor:', error);
            toast.add({
                title: 'Error',
                description: 'An error occured while adding the actor.',
            });
        }
    }

    const patchActor = async (actorData: {}) => {
        try {
            await ActorService.patchActor(actorData)
            toast.add({
                id: 'editActor',
                title: 'Actor edited',
                description: 'The actor has been edited',
            })
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            toast.add({
                id: 'editActor',
                title: 'Actor not edited',
                description: 'Actor not edited',
            })
        }
    }

    const deleteActor = async (id: string) => {
        try {
            await ActorService.deleteActor({ id })
            toast.add({
                id: 'deleteActor',
                title: 'Actor deleted',
                description: 'Actor deleted successfully',
            })
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            toast.add({
                id: 'deleteActor',
                title: 'Actor not deleted',
                description: 'Actor not deleted',
            })
        } finally {
            isDeleteOpen.value = false
            navigateTo('/actors')
        }
    }

    return {
        isLoading,
        actors,
        actor,
        movies,
        selectedActors,
        actorPage,
        actorItemsPerPage,
        actorTotalPages,
        firstname,
        lastname,
        isAddOpen,
        isEditOpen,
        isDeleteOpen,
        fetchActors,
        fetchActorById,
        postActor,
        patchActor,
        deleteActor
    };
}