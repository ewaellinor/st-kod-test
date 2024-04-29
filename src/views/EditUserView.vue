<template>
  <UserForm :user="user" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import UserForm from '@/components/UserForm.vue'
import { useUsersStore } from '@/stores/users'

const store = useUsersStore()
const route = useRoute()

const userId = route.params.userId as string

const user = store.getUserById(userId)
</script>
