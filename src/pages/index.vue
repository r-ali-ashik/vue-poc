<template>
  <v-app id="inspire">

    <NavigationDrawer />
    <AppBar/>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>


<script setup lang="ts">
import NavigationDrawer from '@/components/core/NavigationDrawer.vue';
import AppBar from '@/components/core/AppBar.vue';
import { ref } from 'vue';
ref<string[]>(['Today', 'Yesterday']);
</script>
