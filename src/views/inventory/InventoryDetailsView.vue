<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { formatDate } from '@/composables/useDateTime';
import { useInventoryStore } from '@/stores/inventory/inventoryStore';
import type { InventoryItem } from '@/stores/inventory/types';

const route = useRoute();
const router = useRouter();
const inventory = useInventoryStore();

const loading = ref(true);
const item = ref<InventoryItem | undefined>(undefined);

onMounted(async () => {
  try {
    if (inventory.items.length === 0) {
      await inventory.dispatchFetchItems();
    }
    item.value = inventory.getItemById(route.params.id as string);
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
const goBack = () => router.back();
const editItem = () => {
  if (item.value?.id) {
    router.push(`/edit/${item.value.id}`);
  }
};

const deleteItem = async () => {
  if (!item.value?.id) return;
  const confirmed = confirm(`Are you sure you want to delete "${item.value.name}"?`);
  if (!confirmed) return;

  try {
    await inventory.dispatchDeleteItem(item.value.id);
    router.push('/inventory');
  } catch (e) {
    console.error('Failed to delete item', e);
  }
};

const statusColor = (status: InventoryItem['status']) => {
  switch (status) {
    case 'in stock':
      return 'success';
    case 'low stock':
      return 'warning';
    case 'ordered':
      return 'info';
    case 'discontinued':
      return 'secondary';
    default:
      return '';
  }
};
</script>

<template>
  <div class="max-w-3xl mx-auto mt-6 p-4">
    <div
      v-if="loading"
      class="text-center"
    >
      Loading item...
    </div>
    <div
      v-else-if="!item"
      class="text-center text-danger"
    >
      Item not found.
    </div>

    <Card v-else>
      <template #title>
        <div class="text-2xl font-semibold">{{ item.name }}</div>
      </template>

      <template #content>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Quantity:</strong>
            <p>{{ item.quantity }}</p>
          </div>
          <div>
            <strong>Category:</strong>
            <p>{{ item.category }}</p>
          </div>
          <div>
            <strong>Status:</strong>
            <Tag
              :value="item.status"
              :severity="statusColor(item.status)"
            />
          </div>
          <div>
            <strong>Created At:</strong>
            <p>{{ formatDate(item.created_at) }}</p>
          </div>
          <div>
            <strong>Updated At:</strong>
            <p>{{ formatDate(item.updated_at) }}</p>
          </div>
        </div>

        <div class="mt-5 flex justify-end gap-2">
          <Button
            label="Back"
            icon="pi pi-arrow-left"
            variant="link"
            @click="goBack"
          />

          <Button
            label="Edit"
            icon="pi pi-pencil"
            @click="editItem"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            @click="deleteItem"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
