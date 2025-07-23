<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useInventoryStore } from '@/stores/inventory/inventoryStore'
import InventoryForm from '@/components/forms/InventoryForm.vue'
import type { InventoryItem } from '@/stores/inventory/types'

const router = useRouter()
const inventory = useInventoryStore()

const handleSubmit = async (formData: Omit<InventoryItem, 'id'>) => {
  await inventory.dispatchAddItem(formData)
  router.push('/inventory')
}
</script>

<template>
  <InventoryForm mode="add" :onSubmit="handleSubmit" />
</template>
