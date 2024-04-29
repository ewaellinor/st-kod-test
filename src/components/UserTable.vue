<template>
  <table class="m-4 text-left table-auto min-w-max">
    <thead>
      <tr class="bg-slate-100">
        <th class="p-3">
          <p
            class="block font-sans font-semibold text-sm antialiased leading-normal text-slate-900"
          >
            Name
          </p>
        </th>
        <th class="p-3">
          <p
            class="block font-sans font-semibold text-sm antialiased leading-normal text-slate-900"
          >
            E-mail
          </p>
        </th>
        <th colspan="2" class="p-3">
          <p
            class="block font-sans font-semibold text-sm antialiased font-semibold leading-normal text-slate-900"
          >
            Job title
          </p>
        </th>
      </tr>
    </thead>
    <tbody>
      <UserRow v-for="user in users" :key="user.userId" :user="user" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import UserRow from './UserRow.vue'

const store = useUsersStore()
const { users } = storeToRefs(store)
</script>
