<script setup lang="ts">
import useVeulidate from '@vuelidate/core';
import { minValue, required } from '@vuelidate/validators';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import { ref, watch, computed } from 'vue';

import type { InventoryItem, InventoryStatus } from '@/stores/inventory/types';

// Props and Emit
const props = defineProps<{
  mode: 'add' | 'edit';
  initialData?: InventoryItem;
  onSubmit: (formData: InventoryItem | Omit<InventoryItem, 'id'>) => Promise<void>;
}>();

const emit = defineEmits<{
  (e: 'success'): void;
}>();

// Form State
const form = ref<Omit<InventoryItem, 'id'>>({
  name: '',
  quantity: 0,
  category: '',
  status: '' as InventoryStatus,
});

const rules = {
  name: { required },
  quantity: { minValue: minValue(1) },
  category: { required },
  status: { required },
};

const v$ = useVeulidate(rules, form);

const loading = ref(false);
const error = ref<string | null>(null);

const statusOptions = [
  { label: 'In Stock', value: 'in stock' },
  { label: 'Low Stock', value: 'low stock' },
  { label: 'Ordered', value: 'ordered' },
  { label: 'Discontinued', value: 'discontinued' },
];

// Watch initialData to prefill the form for edit mode
watch(
  () => props.initialData,
  (val) => {
    if (val) {
      form.value = {
        name: val.name,
        quantity: val.quantity,
        category: val.category,
        status: val.status,
      };
    }
  },
  { immediate: true },
);

// Submit handler
const handleSubmit = async () => {
  const result = await v$.value.$validate();

  if (!result) return;

  loading.value = true;
  error.value = null;

  try {
    await props.onSubmit(form.value);
    emit('success');

    if (props.mode === 'add') {
      form.value = {
        name: '',
        quantity: 0,
        category: '',
        status: '' as InventoryStatus,
      };
    }
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred.';
  } finally {
    loading.value = false;
  }
};

const submitLabel = computed(() => (props.mode === 'add' ? 'Add Item' : 'Update Item'));
const title = computed(() => (props.mode === 'add' ? 'Add Inventory Item' : 'Edit Inventory Item'));
</script>

<template>
  <div class="max-w-lg mx-auto p-6 rounded-md shadow-md mt-6">
    <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>

    <form
      @submit.prevent="handleSubmit"
      class="space-y-4"
      aria-labelledby="inventory-form"
    >
      <div>
        <label
          class="block text-sm font-medium mb-1"
          for="name"
        >
          Name
        </label>
        <InputText
          id="name"
          v-model="form.name"
          class="w-full"
        />
        {{ v$.name?.invalid }}
        <Message
          v-for="error of v$.name.$errors"
          :key="error.$uid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ error?.$message }}
        </Message>
      </div>

      <div>
        <label
          class="block text-sm font-medium mb-1"
          for="quantity"
        >
          Quantity
        </label>
        <InputNumber
          id="quantity"
          v-model="form.quantity"
          :min="0"
          inputClass="w-full"
          class="w-full"
          :useGrouping="false"
        />
        <Message
          v-if="v$.quantity.$errors"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ v$.quantity.$errors[0]?.$message }}
        </Message>
      </div>

      <div>
        <label
          class="block text-sm font-medium mb-1"
          for="category"
        >
          Category
        </label>
        <InputText
          id="category"
          v-model="form.category"
          class="w-full"
        />
        <Message
          v-if="v$.category.$errors"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ v$.category.$errors[0]?.$message }}
        </Message>
      </div>

      <div>
        <label
          class="block text-sm font-medium mb-1"
          for="status"
        >
          Status
        </label>
        <Dropdown
          id="status"
          v-model="form.status"
          :options="statusOptions"
          placeholder="Select status"
          optionLabel="label"
          optionValue="value"
          class="w-full"
        />
        <Message
          v-if="v$.status.$errors"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ v$.status.$errors[0]?.$message }}
        </Message>
      </div>

      <div class="pt-2">
        <Button
          type="submit"
          :label="submitLabel"
          :loading="loading"
          class="w-full"
        />
      </div>

      <Message
        v-if="error"
        severity="error"
        :closable="false"
        class="mt-2"
      >
        {{ error }}
      </Message>
    </form>
  </div>
</template>
