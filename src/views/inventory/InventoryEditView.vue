<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useInventoryStore } from '@/stores/inventory/inventoryStore';
import type { InventoryItem } from '@/stores/inventory/types';
import InventoryForm from '@/components/forms/InventoryForm.vue';

const route = useRoute();
const router = useRouter();
const inventory = useInventoryStore();
const item = ref<InventoryItem | undefined>();

const itemId = route.params.id as string;

onMounted(async () => {
  if (inventory.items.length === 0) {
    await inventory.dispatchFetchItems();
  }
  item.value = inventory.getItemById(itemId);
});

const handleSubmit = async (formData: Partial<InventoryItem>) => {
  await inventory.dispatchUpdateItem(itemId, formData);
  router.push('/inventory');
};
</script>

<template>
  <div v-if="item">
    <InventoryForm
      mode="edit"
      :initialData="item"
      :onSubmit="handleSubmit"
    />
  </div>
  <div
    v-else
    class="text-center text-red-500 mt-8"
  >
    Item not found or loading failed.
  </div>
</template>
