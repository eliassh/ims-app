import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { supabase } from '@/services/supabase';
import type { InventoryItem, InventoryStatus } from '@/stores/inventory/types';

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<InventoryItem[]>([]);
  const loading = ref(false);

  // ====== GETTERS ======
  const getItemById = computed(() => {
    return (id: string) => items.value.find((item) => item.id === id);
  });

  // ====== MUTATIONS ======
  const initItems = (data: InventoryItem[]) => {
    items.value = data;
  };

  const addItem = (item: InventoryItem) => {
    items.value.push(item);
  };

  const updateItem = (updated: InventoryItem) => {
    const index = items.value.findIndex((i) => i.id === updated.id);
    if (index !== -1) {
      items.value[index] = updated;
    }
  };

  const removeItem = (id: string) => {
    items.value = items.value.filter((i) => i.id !== id);
  };

  // ====== ACTIONS ======

  const dispatchFetchItems = async () => {
    loading.value = true;
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      if (data) initItems(data as InventoryItem[]);
    } finally {
      loading.value = false;
    }
  };

  const dispatchAddItem = async (input: {
    name: string;
    quantity: number;
    category: string;
    status: InventoryStatus;
  }) => {
    loading.value = true;
    try {
      const { data, error } = await supabase.from('inventory_items').insert([input]).select().single();

      if (error) throw new Error(error.message);
      if (data) addItem(data as InventoryItem);
    } finally {
      loading.value = false;
    }
  };

  const dispatchUpdateItem = async (id: string, updatedFields: Partial<InventoryItem>) => {
    loading.value = true;
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      if (data) updateItem(data as InventoryItem);
    } finally {
      loading.value = false;
    }
  };

  const dispatchDeleteItem = async (id: string) => {
    loading.value = true;
    try {
      const { error } = await supabase.from('inventory_items').delete().eq('id', id);

      if (error) throw new Error(error.message);
      removeItem(id);
    } finally {
      loading.value = false;
    }
  };

  return {
    items,
    loading,
    getItemById,
    initItems,
    addItem,
    updateItem,
    removeItem,
    dispatchFetchItems,
    dispatchAddItem,
    dispatchUpdateItem,
    dispatchDeleteItem,
  };
});
