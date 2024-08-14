import api from './api'

export default {
    register (variables: { username: string; email: string; plainPassword: string }) {
        // const query = `
        // mutation createUser($username: String!, $email: String!, $password: String) {
        //     createUser(input: {username: $username, email: $email, plainPassword: $password}) {
        //         user {
        //             id
        //             username
        //             email
        //         }
        //     }
        // }
        // `;
        // return api('/graphql', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         query,
        //         variables
        //     })
        // })

        return api('/users', {
            method: 'POST',
            body: JSON.stringify(variables)
        })
    },

    login (credentials: { email: string; password: string }) {
        return api('/login_check', {
            method: 'POST',
            body: JSON.stringify(credentials)
        })
    },

    forgotPassword (credentials: { email: string }) {
        return api('/forgot-password', {
            method: 'POST',
            body: JSON.stringify(credentials)
        })
    }
}
