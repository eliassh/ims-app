<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Button from 'primevue/button';
</script>

<template>
  <header class="text-gray-600 body-font border-b shadow-sm">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <RouterLink
        class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        to="/"
        title="Main logo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl font-semibold text-indigo-600">IMS</span>
      </RouterLink>

      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center gap-2">
        <RouterLink
          to="/"
          activeClass="bg-indigo-800 rounded"
        >
          <Button
            label="Home"
            text
            class="hover:bg-indigo-100"
          />
        </RouterLink>
        <RouterLink
          to="/inventory"
          activeClass="bg-indigo-800 rounded"
        >
          <Button
            label="Inventory"
            text
            class="hover:bg-indigo-100x"
          />
        </RouterLink>
        <RouterLink
          to="/about"
          activeClass="bg-indigo-800 rounded"
        >
          <Button
            label="About"
            text
            class="hover:bg-indigo-100"
          />
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
