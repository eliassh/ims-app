<script setup lang="ts">
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import PageHeader from '@/components/ui/PageHeader.vue';
import { useInventoryStore } from '@/stores/inventory/inventoryStore';
import type { InventoryItem } from '@/stores/inventory/types';

const inventory = useInventoryStore();
const router = useRouter();

const search = ref('');
const categoryFilter = ref('');
const statusFilter = ref('');

onMounted(async () => {
  await inventory.dispatchFetchItems();
});

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

const viewItem = (item: InventoryItem) => {
  router.push({ name: 'inventory-details', params: { id: item.id } });
};
const editItem = (item: InventoryItem) => {
  router.push({ name: 'inventory-edit', params: { id: item.id } });
};
const deleteItem = async (id: string) => {
  const confirmed = confirm(
    `Are you sure you want to delete "${inventory.items.find((i) => i.id === id)?.name}"?`,
  );
  if (!confirmed) return;

  try {
    await inventory.dispatchDeleteItem(id);
  } catch (err: unknown) {
    console.log('Failed to delete item', err);
  }
};

const filteredItems = computed(() => {
  return inventory.items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.value.toLowerCase());
    const matchesCategory = !categoryFilter.value || item.category === categoryFilter.value;
    const matchesStatus = !statusFilter.value || item.status === statusFilter.value;
    return matchesSearch && matchesCategory && matchesStatus;
  });
});
const allInStock = inventory.items.every((p) => p.status === 'in stock');
const allCategories = computed(() => [...new Set(inventory.items.map((i) => i.category))]);
const allStatuses = computed(() => [...new Set(inventory.items.map((i) => i.status))]);
const clearFilters = () => {
  search.value = '';
  categoryFilter.value = '';
  statusFilter.value = '';
};
</script>

<template>
  <PageHeader
    title="Inventory List"
    subtitle="View and manage your current inventory items"
  />

  {{ allInStock }}
  <div class="flex flex-wrap items-center gap-4 mb-4">
    <InputText
      v-model="search"
      placeholder="Search by name"
      class="w-full sm:w-1/5"
    />

    <Dropdown
      v-model="categoryFilter"
      :options="allCategories"
      placeholder="All Categories"
      class="w-full sm:w-1/5"
    />

    <Dropdown
      v-model="statusFilter"
      :options="allStatuses"
      placeholder="All Statuses"
      class="w-full sm:w-1/5"
    />

    <Button
      label="Clear"
      icon="pi pi-filter-slash"
      class="p-button-outlined"
      area-label="Clear"
      @click="clearFilters"
    />

    <RouterLink
      to="/inventory/add"
      class="ml-auto"
    >
      <Button
        label="Add Item"
        area-label="Add Item"
        icon="pi pi-plus"
      />
    </RouterLink>
  </div>

  <DataTable
    :value="filteredItems"
    :paginator="true"
    :rows="10"
    stripedRows
    responsiveLayout="scroll"
    v-if="filteredItems.length"
  >
    <Column
      field="name"
      header="Name"
    />
    <Column
      field="quantity"
      header="Quantity"
    />
    <Column
      field="category"
      header="Category"
    />
    <Column header="Status">
      <template #body="{ data }">
        <Tag
          :value="data.status"
          :severity="statusColor(data.status)"
        />
      </template>
    </Column>
    <Column
      header="Actions"
      class="text-center"
    >
      <template #body="{ data }">
        <Button
          icon="pi pi-eye"
          area-label="View Item"
          class="p-button-text p-button-sm mr-2"
          @click="viewItem(data)"
        />
        <Button
          icon="pi pi-pencil"
          area-label="Edit Item"
          class="p-button-text p-button-sm mr-2"
          @click="editItem(data)"
        />
        <Button
          icon="pi pi-trash"
          area-label="Delete Item"
          class="p-button-text p-button-sm p-button-danger"
          @click="deleteItem(data.id)"
        />
      </template>
    </Column>
  </DataTable>

  <div
    v-else
    class="text-gray-500 text-center py-6"
  >
    No matching inventory items found.
  </div>
</template>
