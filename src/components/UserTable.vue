<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    item-value="name"
    @update:options="loadItems"
  ></v-data-table-server>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface User {
  name: string
  age: number
  email: string
  role: string
  status: string
}

const users: User[] = [
  { name: 'John Doe', age: 30, email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
  { name: 'Jane Smith', age: 25, email: 'jane.smith@example.com', role: 'User', status: 'Inactive' },
  { name: 'Alice Johnson', age: 28, email: 'alice.johnson@example.com', role: 'User', status: 'Active' },
  { name: 'Bob Brown', age: 35, email: 'bob.brown@example.com', role: 'Manager', status: 'Inactive' },
  { name: 'Charlie Davis', age: 40, email: 'charlie.davis@example.com', role: 'Admin', status: 'Active' },
  { name: 'Diana Evans', age: 22, email: 'diana.evans@example.com', role: 'User', status: 'Inactive' },
  { name: 'Eve Foster', age: 29, email: 'eve.foster@example.com', role: 'User', status: 'Active' },
  { name: 'Frank Green', age: 33, email: 'frank.green@example.com', role: 'Manager', status: 'Inactive' },
  { name: 'Grace Harris', age: 27, email: 'grace.harris@example.com', role: 'User', status: 'Active' },
  { name: 'Henry Irving', age: 31, email: 'henry.irving@example.com', role: 'Admin', status: 'Inactive' },
]

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }: { page: number, itemsPerPage: number, sortBy: { key: string, order: string }[] }) {
    return new Promise<{ items: User[], total: number }>(resolve => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = users.slice()

        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey as keyof User]
            const bValue = b[sortKey as keyof User]
            return sortOrder === 'desc' ? (bValue as number) - (aValue as number) : (aValue as number) - (bValue as number)
          })
        }

        const paginated = items.slice(start, end)

        resolve({ items: paginated, total: items.length })
      }, 500)
    })
  },
}

export default defineComponent({
  data() {
    return {
      itemsPerPage: 5,
      headers: [
        { title: 'Name', align: 'start', sortable: false, key: 'name' },
        { title: 'Age', key: 'age', align: 'end' },
        { title: 'Email', key: 'email', align: 'end' },
        { title: 'Role', key: 'role', align: 'end' },
        { title: 'Status', key: 'status', align: 'end' },
      ],
      search: '',
      serverItems: [] as User[],
      loading: true,
      totalItems: 0,
    }
  },
  methods: {
    loadItems({ page, itemsPerPage, sortBy }: { page: number, itemsPerPage: number, sortBy: { key: string, order: string }[] }) {
      this.loading = true
      FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
        this.serverItems = items
        this.totalItems = total
        this.loading = false
      })
    },
  },
})
</script>