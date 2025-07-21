<template>
  <div class="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md mt-6">
    <h2 class="text-xl font-semibold mb-4">Edit Inventory Item</h2>

    <div v-if="loading" class="text-center text-gray-500">Loading item...</div>
    <div v-else-if="!form.id" class="text-center text-red-500">Item not found.</div>
    <form v-else @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Name</label>
        <input
          v-model="form.name"
          type="text"
          required
          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Quantity</label>
        <input
          v-model.number="form.quantity"
          type="number"
          min="0"
          required
          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Category</label>
        <input
          v-model="form.category"
          type="text"
          required
          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Status</label>
        <select
          v-model="form.status"
          required
          class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        >
          <option disabled value="">Select status</option>
          <option value="in stock">In Stock</option>
          <option value="low stock">Low Stock</option>
          <option value="ordered">Ordered</option>
          <option value="discontinued">Discontinued</option>
        </select>
      </div>

      <div class="pt-2">
        <button
          type="submit"
          :disabled="saving"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {{ saving ? 'Saving...' : 'Update Item' }}
        </button>
        <button type="button" @click="router.back()" class="ml-4 text-gray-600 hover:underline">
          Cancel
        </button>
      </div>

      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInventoryStore } from '@/stores/inventory/inventoryStore'
import type { InventoryItem, InventoryStatus } from '@/services/inventory/types'

const route = useRoute()
const router = useRouter()
const inventory = useInventoryStore()

const loading = ref(true)
const saving = ref(false)
const error = ref<string | null>(null)

const form = ref<Partial<InventoryItem>>({
  id: '',
  name: '',
  quantity: 0,
  category: '',
  status: '' as InventoryStatus,
})

onMounted(async () => {
  try {
    if (inventory.items.length === 0) {
      await inventory.dispatchFetchItems()
    }

    const item = inventory.getItemById(route.params.id as string)
    if (item) {
      form.value = { ...item }
    }
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

const handleSubmit = async () => {
  if (!form.value.id) return

  saving.value = true
  error.value = null

  try {
    await inventory.dispatchUpdateItem(form.value.id, {
      name: form.value.name!,
      quantity: form.value.quantity!,
      category: form.value.category!,
      status: form.value.status!,
    })
    router.push('/')
  } catch (e: any) {
    error.value = e.message || 'Failed to update item.'
  }

  saving.value = false
}
</script>

<style scoped></style>
