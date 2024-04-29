<template>
  <div class="p-4">
    <h4 v-if="user" class="font-semibold text-slate-700 font-sans">Edit user</h4>
    <h4 v-else class="font-semibold text-slate-700 font-sans">Add new user</h4>

    <form>
      <label class="block mb-4">
        <span class="block text-sm font-medium text-slate-700">Name</span>
        <input
          type="text"
          v-model="userData.fullName"
          required
          class="peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        <p v-if="isInvalid.name" class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
          Please provide a name.
        </p>
      </label>
      <label class="block mb-4">
        <span class="block text-sm font-medium text-slate-700">E-mail</span>
        <input
          type="text"
          v-model="userData.email"
          required
          class="peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        <p v-if="isInvalid.email" class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
          Please provide a valid email address.
        </p>
      </label>
      <label class="block mb-4">
        <span class="block text-sm font-medium text-slate-700">Job title</span>
        <input
          type="text"
          v-model="userData.jobTitle"
          required
          class="peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        <p v-if="isInvalid.title" class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
          Please provide a job title.
        </p>
      </label>

      <button
        v-if="user"
        @click="editUser"
        class="select-none rounded-lg bg-green-500 py-3 px-4 mt-4 mr-2 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Update user
      </button>
      <button
        v-else
        @click="addUser"
        class="select-none rounded-lg bg-green-500 py-3 px-4 mt-4 mr-2 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Add user
      </button>
      <button
        @click="cancel"
        class="select-none rounded-lg bg-red-500 py-3 px-4 mt-4 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Cancel
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import type { User } from '@/types/User'

const props = defineProps<{
  user?: User
}>()

const store = useUsersStore()
const router = useRouter()

const userData: Ref<User> = ref({
  userId: props.user ? props.user.userId : '',
  fullName: props.user ? props.user.fullName : '',
  email: props.user ? props.user.email : '',
  jobTitle: props.user ? props.user.jobTitle : ''
})

const isInvalid = ref({
  form: false,
  name: false,
  email: false,
  title: false
})

const addUser = (): void => {
  validateForm()
  if (isInvalid.value.form) return

  store.addUser(userData.value)
  clearForm()
}

const editUser = (): void => {
  validateForm()
  if (isInvalid.value.form) return
  store.updateUser(userData.value)
  router.go(-1)
}

const cancel = (): void => {
  if (props.user) {
    router.go(-1)
  }
  clearForm()
}

const clearForm = (): void => {
  userData.value.fullName = ''
  userData.value.email = ''
  userData.value.jobTitle = ''
}

const validateForm = (): void => {
  isInvalid.value.name = !userData.value.fullName.length
  isInvalid.value.email = !userData.value.email.length
  isInvalid.value.title = !userData.value.jobTitle.length

  isInvalid.value.form = isInvalid.value.name || isInvalid.value.email || isInvalid.value.title
}
</script>
