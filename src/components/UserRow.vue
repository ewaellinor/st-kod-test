<template>
  <tr class="even:bg-slate-50">
    <td class="p-2">
      <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        {{ user.fullName }}
      </p>
    </td>
    <td class="p-2">
      <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        {{ user.email }}
      </p>
    </td>
    <td class="p-2">
      <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        {{ user.jobTitle }}
      </p>
    </td>
    <td class="p-2">
      <button @click="editUser(user.userId)">
        <IconEdit class="hover:shadow-md rounded text-gray-300" />
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { User } from '@/types/User'
import IconEdit from './icons/IconEdit.vue'

const router = useRouter()

defineProps<{
  user: User
}>()

const editUser = (userId: string) => router.push({ name: 'edit', params: { userId } })
</script>
