<template>
  <div class="flex w-full">
    <div class="w-96 h-screen shadow bg-slate-50">
      <UserForm />
    </div>
    <main>
      <UserTable />
    </main>
  </div>
</template>

<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import UserTable from '@/components/UserTable.vue'
</script>
