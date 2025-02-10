
<template>
  <div>
    <h1>User List</h1>
    <UserTable />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const UserTable = defineAsyncComponent(() => import('@/components/UserTable.vue'));
</script>

<style scoped>
/* Add your styles here */
</style>
