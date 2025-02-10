<template>
  <v-app-bar
    color="grey-lighten-4"
    height="72"
    flat
  >
    <v-spacer />
    <v-badge
      color="green"
      class="ma-8"
      dot
    >
      <v-btn
        icon="mdi-account"
        size="small"
      >
        <v-icon
          icon="mdi-account-circle-outline"
          size="40"
        />
        <v-menu activator="parent">
          <v-sheet
            class="text-white mx-auto"
            min-width="250"
            max-width="400"
          >
            <v-list>
              <v-list-item>
                <v-list-item-title>Ramjan Ali</v-list-item-title>
                <v-list-item-subtitle>ramjan.ali.ashik@gmail.com</v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <v-divider
              thickness="1"
              color="black"
            />
            <v-list>
              <v-list-item>
                <v-btn
                  block
                  variant="flat"
                  size="small"
                  color="primary"
                >
                  Logout
                </v-btn>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-menu>
      </v-btn>
    </v-badge>
  </v-app-bar>
</template>


<script lang="ts">
export default {
  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),
}
</script>
