import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { faker } from '@faker-js/faker'
import type { User } from '../types/User'

export function createRandomUser(): User {
  return {
    userId: faker.string.uuid(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    jobTitle: faker.person.jobTitle()
  }
}

export const useUsersStore = defineStore('users', () => {
  const users: Ref<User[]> = ref(
    faker.helpers.multiple(createRandomUser, {
      count: 10
    })
  )

  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  function addUser(user: User): void {
    users.value = [
      ...users.value,
      {
        ...user,
        userId: faker.string.uuid()
      }
    ]
  }

  function updateUser(editedUser: User): void {
    users.value = users.value.map((user) => {
      if (user.userId === editedUser.userId) {
        return editedUser
      }

      return user
    })
  }

  function getUserById(userId: string): User | undefined {
    return users.value.find((user) => user.userId === userId)
  }

  return { users, addUser, getUserById, updateUser }
})
