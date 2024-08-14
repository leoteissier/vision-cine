import api from './api'

export default {
    async patchCategoryValidate (variables: { id: number, validate: boolean }) {
        const query = `
        mutation validateCategory($id: Int!, $validate: Boolean!){
            validateCategory(id: $id, validate: $validate){
                id,
                _id,
                validated
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

    async patchActorValidate (variables: { id: number, validate: boolean }) {
        const query = `
        mutation validateActor($id: Int!, $validate: Boolean!){
            validateActor(id: $id, validate: $validate){
                id,
                _id,
                validated
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

    patchMovieValidate (variables: { id: number, validate: boolean }) {
        const query = `
        mutation validateMovie($id: Int!, $validate: Boolean!){
            validateMovie(id: $id, validate: $validate){
                id,
                _id,
                validated
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
    }
}