import api  from './api'

export default {
    async patchProfil(variables: { id: string, username: string, email: string, password: string }) {
        console.log(variables)
        const query = `
        mutation updateUser($id: ID!, $username: String, $email: String, $password: String) {
            updateUser(input: {id: $id, username: $username, email: $email, plainPassword: $password}) {
                user {
                    id,
                    username,
                    email,
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
    }
}