<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useInventoryStore } from '@/stores/inventory/inventoryStore'
import AiChatBlock from '@/components/ui/AIChatBlock.vue'
import type { InventoryItem } from '@/services/inventory/types'

const inventory = useInventoryStore()
const router = useRouter()

// Filters
const search = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')

onMounted(async () => {
  await inventory.dispatchFetchItems()
})

const statusColor = (status: InventoryItem['status']) => {
  switch (status) {
    case 'in stock':
      return 'bg-green-100 text-green-700'
    case 'low stock':
      return 'bg-yellow-100 text-yellow-700'
    case 'ordered':
      return 'bg-blue-100 text-blue-700'
    case 'discontinued':
      return 'bg-gray-200 text-gray-500'
    default:
      return ''
  }
}

const viewItem = (item: InventoryItem) => {
  router.push({ name: 'inventory', params: { id: item.id } })
}
const editItem = (item: InventoryItem) => {
  router.push({ name: 'edit', params: { id: item.id } })
}
const deleteItem = async (id: string) => {
  const confirmed = confirm(
    `Are you sure you want to delete "${inventory.items.find((i) => i.id === id)?.name}"?`,
  )
  if (!confirmed) return

  try {
    await inventory.dispatchDeleteItem(id)
  } catch (err: unknown) {
    console.log('Failed to delete item', err)
  }
}

const filteredItems = computed(() => {
  return inventory.items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = !categoryFilter.value || item.category === categoryFilter.value
    const matchesStatus = !statusFilter.value || item.status === statusFilter.value
    return matchesSearch && matchesCategory && matchesStatus
  })
})

const allCategories = computed(() => [...new Set(inventory.items.map((i) => i.category))])
const allStatuses = computed(() => [...new Set(inventory.items.map((i) => i.status))])
const clearFilters = () => {
  search.value = ''
  categoryFilter.value = ''
  statusFilter.value = ''
}
</script>

<template>
  <ai-chat-block />

  <div class="flex flex-wrap items-center gap-4 mb-4">
    <input
      v-model="search"
      type="text"
      placeholder="Search by name"
      class="border px-3 py-2 rounded w-full sm:w-1/3"
    />
    <select v-model="categoryFilter" class="border px-3 py-2 rounded w-full sm:w-1/4">
      <option value="">All Categories</option>
      <option v-for="cat in allCategories" :key="cat" :value="cat">{{ cat }}</option>
    </select>
    <select v-model="statusFilter" class="border px-3 py-2 rounded w-full sm:w-1/4">
      <option value="">All Statuses</option>
      <option v-for="stat in allStatuses" :key="stat" :value="stat">{{ stat }}</option>
    </select>
    <a class="" v-on:click="clearFilters" title="Clear filter">clear</a>
    <button
      class="ml-auto text-white bg-indigo-500 border-0 py-2 px-6 rounded hover:bg-indigo-600"
      title="Add Item"
      @click="router.push('/add')"
    >
      Add Item
    </button>
  </div>

  <div v-if="filteredItems.length === 0" class="text-gray-500 text-center py-6">
    No matching inventory items found.
  </div>

  <table v-else class="min-w-full divide-y divide-gray-200 border shadow rounded-md">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">Quantity</th>
        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">Category</th>
        <th class="px-4 py-2 text-left text-sm font-semibold text-gray-600">Status</th>
        <th class="px-4 py-2 text-center text-sm font-semibold text-gray-600">Actions</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 bg-white">
      <tr v-for="item in filteredItems" :key="item.id" class="hover:bg-gray-50">
        <td class="px-4 py-2">{{ item.name }}</td>
        <td class="px-4 py-2">{{ item.quantity }}</td>
        <td class="px-4 py-2">{{ item.category }}</td>
        <td class="px-4 py-2">
          <span
            :class="[
              'inline-block px-2 py-1 rounded text-xs font-medium',
              statusColor(item.status),
            ]"
          >
            {{ item.status }}
          </span>
        </td>
        <td class="px-4 py-2 text-center">
          <button
            @click="viewItem(item)"
            class="text-blue-600 hover:underline text-sm mr-3"
            title="View"
          >
            View
          </button>
          <button
            @click="editItem(item)"
            class="text-blue-600 hover:underline text-sm mr-3"
            title="Edit"
          >
            Edit
          </button>
          <button
            @click="deleteItem(item.id)"
            class="text-red-600 hover:underline text-sm"
            title="Delete"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
