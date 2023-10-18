<script setup>
import { onBeforeMount, watch, ref } from 'vue'
import UsersListItem from './UsersListItem.vue'
import { usersStore, fetchUsers } from '../stores/users'

const limit = ref(5)

function loader () {
    fetchUsers(limit.value)
}

watch(limit, loader)

onBeforeMount(loader)
</script>

<template>

    <h2>How many users do you?</h2>

    <select v-model="limit">
        <option v-for="_, idx in Array(100)" :value="idx">{{ idx }}</option>
    </select>

    <p v-if="usersStore.errors">
        Sorry! There was an error.
    </p>

    <p v-else-if="usersStore.users.length === 0">
        You have no users.
    </p>

    <UsersListItem v-else v-for="user in usersStore.users" :key="user.cell" :user="user" />
</template>

<style scoped>
    select {
        margin-bottom: 20px;
    }
</style>