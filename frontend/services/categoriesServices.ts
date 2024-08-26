import api from './api'

export default {
    // Routes Get ------------------------------------------------------------
    async getCategories(variables: { page: number, itemsPerPage: number, name: string }) {
        const query = `
        query categories($page: Int, $itemsPerPage: Int, $name: String) {
            categories(page: $page, itemsPerPage: $itemsPerPage, name: $name, validated: true){
                paginationInfo{
                    itemsPerPage,
                    lastPage,
                    totalCount
                },
                collection{
                    id,
                    _id,
                    name,
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

    async getCategoryById (variables: { id: string, page: number, itemsPerPage: number, title: string }) {
        const query = `
        query category($id: ID!, $page: Int, $itemsPerPage: Int, $title: String) {
            category(id: $id) {
                id,
                _id
                name,
                mediaObject {
                    id
                    contentUrl
                }
                movies(page: $page, itemsPerPage: $itemsPerPage, title: $title validated: true) {
                    paginationInfo {
                        itemsPerPage
                        lastPage
                        totalCount
                    }
                    collection{
                        id,
                        _id,
                        title,
                        releaseDate,
                        synopsis,
                        duration,
                        score,
                        entry,
                        budget,
                        director,
                        website,
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
    async postCategory(variables: { validated: boolean, name: string, mediaId: string, selectedMovies: string[]  }) {
        const query = `
        mutation createCategory($validated: Boolean!, $name: String!, $mediaId: String!, $selectedMovies: [String]){
            createCategory(input: {validated: $validated, name: $name, mediaObject: $mediaId, movies: $selectedMovies}){
                category{
                    id,
                    _id
                    name,
                    mediaObject {
                        id
                        contentUrl
                    }
                    movies {
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

    // Routes Put ------------------------------------------------------------

    // Routes Patch ------------------------------------------------------------
    async patchCategory(variables: { validated: boolean, id: string , name: string, mediaId: string, selectedMovies: string[]}) {
        const query = `
        mutation updateCategory($validated: $Boolean, $id: ID!, $name: String!, $mediaId: String, $selectedMovies: [String]) {
            updateCategory(input: {validated: $validated, id: $id, name: $name, mediaObject: $mediaId, movies: $selectedMovies}) {
                category {
                    id,
                    name,
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

        return api('/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query,
                variables
            })
        })
    },

    // Routes Delete ------------------------------------------------------------
    async deleteCategory(variables: { id: string }) {
        const query = `
        mutation deleteCategory($id: ID!){
            deleteCategory(input: {id: $id}){
                category {
                    id
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
    }
}