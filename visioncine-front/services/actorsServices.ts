import api from './api'

export default {

    // Routes Get ------------------------------------------------------------
    async getActors(variables: { page: number, itemsPerPage: number, firstname: string, lastname: string }) {
        const query = `
        query actors($page: Int, $itemsPerPage: Int, $firstname: String, $lastname: String) {
            actors(page: $page, itemsPerPage: $itemsPerPage, firstname: $firstname, lastname: $lastname, validated: true){
                paginationInfo {
                    itemsPerPage
                    lastPage
                    totalCount
                }
                collection {
                    id
                    _id
                    lastname
                    firstname
                    mediaObject {
                        id
                        contentUrl
                    }
                }
            }
        }
        `;

        return api('/graphql', { // Replace '/graphql' with your actual GraphQL endpoint
            method: 'POST',
            body: JSON.stringify({
                query,
                variables
            })
        })
    },

    async getActorById (variables: { id: string, page: number, itemsPerPage: number }) {
        const query = `
        query actor($id: ID!, $page: Int, $itemsPerPage: Int) {
            actor(id: $id) {
                id
                _id
                lastname
                firstname
                birthDate
                nationality
                biography
                reward
                mediaObject {
                    id
                    contentUrl
                }
                movies(page: $page, itemsPerPage: $itemsPerPage, validated: true) {
                    paginationInfo {
                        itemsPerPage
                        lastPage
                        totalCount
                    }
                    collection {
                        id
                        _id
                        title
                        synopsis
                        duration
                        releaseDate
                        score
                        entry
                        budget
                        director
                        website
                        mediaObject {
                            id
                            contentUrl
                        }
                    }
                }
            }
        }
        `;

        return api('/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query,
                variables
            })
        })
    },

    // Routes Post ------------------------------------------------------------
   async postActor (variables: { validated: Boolean, firstname: string, lastname: string, birthdate: string, nationality: string, reward: string, mediaId: string, selectedMovies: string[] }) {
        const query = `
        mutation createActor($validated: Boolean!, $firstname: String!, $lastname: String!, $birthdate: String, $nationality: String, $reward: String, $mediaId: String, $selectedMovies: [String]) {
            createActor(input: {validated: $validated, firstname: $firstname, lastname: $lastname, birthDate: $birthdate, nationality: $nationality, reward: $reward, mediaObject: $mediaId, movies: $selectedMovies}) {
                actor {
                    id,
                    firstname,
                    lastname,
                    birthDate,
                    nationality,
                    reward
                    mediaObject {
                        id
                        contentUrl
                    }
                    movies {
                        collection {
                            id
                            title
                            synopsis
                            duration
                            releaseDate
                            score
                            entry
                            budget
                            director
                            website
                            mediaObject {
                                id
                                contentUrl
                            }
                        }
                    }
                }
            }
        }
        `;

        return api(`/graphql`, {
            method: 'POST',
            body: JSON.stringify({
                query,
                variables
            })
        })
   },

    // Routes Put ------------------------------------------------------------
    // putActor (actor: object) {
    //     return api(`/actors/${actor.id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(actor)
    //     })
    // },

    // Routes Patch ------------------------------------------------------------
    async patchActor (variables: { validated: Boolean, id: string, firstname: string, lastname: string, birthdate: string, nationality: string, reward: string, movies: string[] }) {
        const query = `
        mutation updateActor($validated: Boolean!, $id: String, $firstname: String!, $lastname: String!, $birthdate: String, $nationality: String, $reward: String, $movies: [String]) {
            updateActor(input: {validated: $validated, id: $id, firstname: $firstname, lastname: $lastname, birthDate: $birthdate, nationality: $nationality, reward: $reward, movies: $movies}) {
               actor {
                    id
                    lastname
                    firstname
                    birthDate
                    nationality
                    biography
                    reward
                    mediaObject {
                        id
                        contentUrl
                    }
                    movies {
                        collection {
                            id
                        }
                    }
                }
            }
        }
        `;

        return api(`/graphql`, {
            method: 'POST',
            body: JSON.stringify({
                query,
                variables
            })
        })
    },

    // Routes Delete ------------------------------------------------------------
    async deleteActor (variables: { id: string }) {
        const query = `
        mutation deleteActor($id: ID!) {
            deleteActor(input: {id: $id}) {
                actor {
                    id
                }
            }
        }
        `;

        return api(`/graphql`, {
            method: 'POST',
            body: JSON.stringify({
                query,
                variables
            })
        })
    }
}