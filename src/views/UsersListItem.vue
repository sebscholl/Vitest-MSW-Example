<script setup>
defineProps(['user'])
</script>

<template>
  <div>
    <h3>{{ user.name.title }}, {{ user.name.first }} {{ user.name.last }}</h3>
    <ul>
        <li>Email: {{ user.email }}</li>
        <li>Cell: {{ user.cell }}</li>
        <li>Bday: {{ user.dob.date }}</li>
    </ul>
  </div>
</template>

<style scoped>
    div {
        padding: 20px;
        text-align: left;
        border: 1px dashed;
        margin-bottom: 20px;
    }

    h3 {
        margin: 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }
</style>
