<script setup lang="ts">
import { ref } from 'vue'
import { useInventoryStore } from '@/stores/inventory/inventoryStore'
import type { InventoryStatus } from '@/services/inventory/types'

const inventory = useInventoryStore()

const form = ref({
  name: '',
  quantity: 0,
  category: '',
  status: '' as InventoryStatus,
})

const loading = ref(false)
const error = ref<string | null>(null)

const handleSubmit = async () => {
  loading.value = true
  error.value = null

  try {
    await inventory.dispatchAddItem(form.value)
    // Optionally reset form after successful insert
    form.value = {
      name: '',
      quantity: 0,
      category: '',
      status: '' as InventoryStatus,
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to add item.'
  }

  loading.value = false
}
</script>

<template>
  <div class="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md mt-6">
    <h2 class="text-xl font-semibold mb-4">Add Inventory Item</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
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
          :disabled="loading"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? 'Saving...' : 'Add Item' }}
        </button>
      </div>

      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped></style>
