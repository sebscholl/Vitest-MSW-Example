import { reactive } from "vue"
import { get } from "../utils/api"
/**
 * users.js
 * 
 * Simple store to load and store user records. 
 * 
 * Uses the api.js file to make requests.
 */
export const usersStore = reactive({
    users: [],
    errors: null
})

export async function fetchUsers(limit) {
    const response = await get('api', {
        results: limit
    })

    if (response.errors) {
        usersStore.errors = response.errors
        usersStore.users = []
        return
    }

    usersStore.users = response.results
}
/**
 * addUser, removeUser, updateUser ...
 */