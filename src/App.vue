<script setup lang="ts">
import { RouterView } from 'vue-router';

import MainHeader from '@/components/ui/MainHeader.vue';
</script>

<template>
  <main-header />
  <main>
    <div class="container px-7 pt-7 pb-12 mx-auto">
      <RouterView />
    </div>
  </main>
</template>

<style scoped></style>
