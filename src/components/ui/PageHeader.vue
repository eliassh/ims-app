<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="mb-8 pb-4">
    <h1 class="text-2xl font-semibold text-gray-300">
      {{ title }}
    </h1>
    <p
      v-if="subtitle"
      class="text-gray-500 mt-1"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<style scoped>
p {
  font-size: 13px;
}
</style>
