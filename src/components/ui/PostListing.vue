<script setup lang="ts">
import type { Post } from '@/services/posts/types'
import type { PropType } from 'vue'
import PostItem from './PostItem.vue'

const props = defineProps({
  posts: {
    type: Array as PropType<Post[]>,
    required: true,
  },
})
</script>

<template>
  <div v-for="post in props.posts" :key="post.id" class="p-4 md:w-1/3">
    <post-item :post="post" :show-link="true" />
  </div>
</template>
