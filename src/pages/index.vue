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


<script lang="ts">
import NavigationDrawer from '@/components/core/NavigationDrawer.vue';
import AppBar from '@/components/core/AppBar.vue';

import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const cards = ref<string[]>(['Today', 'Yesterday'])
    return {
      cards,
    }
  },
})
</script>