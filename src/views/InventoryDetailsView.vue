<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useInventoryStore } from '@/stores/inventory/inventoryStore'
import type { InventoryItem } from '@/services/inventory/types'

const route = useRoute()
const router = useRouter()
const inventory = useInventoryStore()

const loading = ref(true)
const item = ref<InventoryItem | undefined>(undefined)

onMounted(async () => {
  try {
    if (inventory.items.length === 0) {
      await inventory.dispatchFetchItems()
    }
    item.value = inventory.getItemById(route.params.id as string)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const goBack = () => {
  router.back()
}

const editItem = () => {
  router.push(`/edit/${item.value?.id}`)
}

const deleteItem = async () => {
  if (!item.value?.id) return
  const confirmed = confirm(`Are you sure you want to delete "${item.value.name}"?`)
  if (!confirmed) return

  try {
    await inventory.dispatchDeleteItem(item.value.id)
    router.push('/')
  } catch (e) {
    alert('Failed to delete item')
  }
}

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

const formatDate = (date?: string) => {
  if (!date) return '-'
  return new Date(date).toLocaleString()
}
</script>
<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
    <div v-if="loading" class="text-center text-gray-500">Loading item...</div>
    <div v-else-if="!item" class="text-center text-red-500">Item not found.</div>
    <div v-else>
      <h2 class="text-2xl font-bold mb-4">{{ item.name }}</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <span class="font-medium text-gray-600">Quantity:</span>
          <p>{{ item.quantity }}</p>
        </div>
        <div>
          <span class="font-medium text-gray-600">Category:</span>
          <p>{{ item.category }}</p>
        </div>
        <div>
          <span class="font-medium text-gray-600">Status:</span>
          <p>
            <span
              :class="[
                'inline-block px-2 py-1 rounded text-xs font-medium',
                statusColor(item.status),
              ]"
            >
              {{ item.status }}
            </span>
          </p>
        </div>
        <div>
          <span class="font-medium text-gray-600">Created At:</span>
          <p>{{ formatDate(item.created_at) }}</p>
        </div>
        <div>
          <span class="font-medium text-gray-600">Updated At:</span>
          <p>{{ formatDate(item.updated_at) }}</p>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <button @click="goBack" class="text-gray-600 hover:underline">← Back</button>
        <button @click="editItem" class="text-blue-600 hover:underline">Edit</button>
        <button @click="deleteItem" class="text-red-600 hover:underline">Delete</button>
      </div>
    </div>
  </div>
</template>
