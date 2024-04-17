import api from './api'

export default {
    // Route Get -------------------------------
    async getMovies(variables: { page: number, itemsPerPage: number, title: string, validated: boolean, order: string }) {
        const query = `
        query movies($page: Int, $itemsPerPage: Int, $title: String, $validated: Boolean, $order: String) {
            movies(page: $page, itemsPerPage: $itemsPerPage, title: $title, validated: $validated, order: { createdAt: $order }){
                paginationInfo{
                    itemsPerPage,
                    lastPage,
                    totalCount
                }
                collection{
                    id,
                    _id,
                    title,
                    score,
                    mediaObject {
                        id
                        contentUrl
                    }
                }
            }
        }
        `;

        return api('/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query,
                variables,
            })
        })
    },

    async getMovieById (variables: { page: number, itemsPerPage: number, id: string }) {
        const query = `
        query movie($id: ID!, $page: Int, $itemsPerPage: Int) {
            movie(id: $id) {
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
                actors(page: $page, itemsPerPage: $itemsPerPage, validated: true) {
                    paginationInfo {
                        itemsPerPage
                        lastPage
                        totalCount
                    }
                    collection{
                        id,
                        _id,
                        firstname,
                        lastname,
                        birthDate,
                        nationality,
                        reward,
                        validated,
                        mediaObject {
                            id
                            contentUrl
                        }
                    }
                }
                categories(validated: true) {
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

    // Route Post -------------------------------
    async postMovie (variables: { validated: boolean, title: string, releaseDate: Date, synopsis: string, duration: number, score: number, entry: number, budget: number, director: string, website: string, mediaId: string, selectedActors: string[], selectedCategories: string[] }) {
        console.log(variables)
        const query = `
        mutation createMovie($validated: Boolean!, $title: String!, $releaseDate: String, $synopsis: String!, $duration: Int!, $score: Float, $entry: Int, $budget: Int, $director: String, $website: String, $mediaId: String, $selectedActors: [String], $selectedCategories: [String]) {
            createMovie(input: {validated: $validated, title: $title, releaseDate: $releaseDate, synopsis: $synopsis, duration: $duration, score: $score, entry: $entry, budget: $budget, director: $director, website: $website, mediaObject: $mediaId, actors: $selectedActors, categories: $selectedCategories}) {
                movie {
                    id,
                    title,
                    releaseDate,
                    synopsis,
                    duration,
                    score,
                    entry,
                    budget,
                    director,
                    website
                    mediaObject {
                        id
                        contentUrl
                    }
                    actors{
                        collection{
                            id
                        }
                    }
                    categories{
                        collection{
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

    // Route Put -------------------------------
    // putMovie (Movie: object) {
    //     return api(`/movies/${Movie.id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(Movie)
    //     })
    // },

    // Route Patch -------------------------------
   async patchMovie (variables: { validated: boolean, id: string, title: string, releaseDate: Date, synopsis: string, duration: number, score: number, entry: number, budget: number, director: string, website: string, mediaId: string, selectedActors: string[], selectedCategories: string[]}) {
        console.log(variables)
        const query = `
        mutation updateMovie($validated: Boolean!, $id: ID!, $title: String, $releaseDate: String, $synopsis: String, $duration: Int, $score: Float, $entry: Int, $budget: Int, $director: String, $website: String, $mediaId: String, $selectedActors: [String], $selectedCategories: [String]) {
            updateMovie(input: {validated: $validated, id: $id, title: $title, releaseDate: $releaseDate, synopsis: $synopsis, duration: $duration, score: $score, entry: $entry, budget: $budget, director: $director, website: $website, mediaObject: $mediaId, actors: $selectedActors, categories: $selectedCategories}) {
                movie {
                    id,
                    title,
                    releaseDate,
                    synopsis,
                    duration,
                    score,
                    entry,
                    budget,
                    director,
                    website
                    mediaObject {
                        id
                        contentUrl
                    }
                    actors{
                        collection{
                            id
                        }
                    }
                    categories{
                        collection{
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

    // Route Delete -------------------------------
     async deleteMovie (variables: { id: string }) {
        console.log(variables)
        const query = `
        mutation deleteMovie($id: ID!) {
            deleteMovie(input: {id: $id}) {
                movie {
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
    },
}