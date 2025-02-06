<template>
    <v-navigation-drawer v-model="drawer">
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
          title="John Leider"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list>
            <v-list-item prepend-icon="mdi-home" title="Home" to="/dashboard"></v-list-item>

            <v-list-group value="Users">
                <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        prepend-icon="mdi-account-circle"
                        title="Users"
                        color="primary"
                       
                    ></v-list-item>
                </template>
                <v-list-item prepend-icon="mdi-circle-medium" title="List" color="primary"  to="/users"></v-list-item>
                <v-list-item prepend-icon="mdi-circle-medium" title="Manage" color="primary"  to="/manage-user"></v-list-item>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const drawer = ref<boolean | null>(null)

        return {
            drawer,
        }
    },
})
</script>

<style scoped>
.v-list-group__items .v-list-item {
    padding-inline-start: 16px !important;
}
</style>