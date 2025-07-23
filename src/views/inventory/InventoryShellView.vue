<script setup lang="ts">
import ProgressBar from 'primevue/progressbar';
import { useInventoryStore } from '@/stores/inventory/inventoryStore';

const inventory = useInventoryStore();
</script>
<template>
  <div
    class="-mx-6 -mt-7 mb-5"
    style="height: 3px"
  >
    <ProgressBar
      v-if="inventory.loading"
      mode="indeterminate"
      style="height: 3px"
    ></ProgressBar>
  </div>
  <router-view></router-view>
</template>
