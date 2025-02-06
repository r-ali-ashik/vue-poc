
<template>
    <div>
      <h1>User List</h1>
      <UserTable />
    </div>
  </template>
  
  <script lang="ts">
   const UserTable = () => import('@/components/UserTable.vue');

  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>