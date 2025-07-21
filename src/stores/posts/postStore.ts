import { defineStore } from 'pinia';
import type { CreatePostDTO, Post, UpdatePostDTO } from '@/services/posts/types';
import { API } from '@/services';
import { AxiosError } from 'axios';
import type { APIResponse } from '@/services/types';
import { computed, ref } from 'vue';


export const usePostStore = defineStore('post', () => {
  const posts = ref<Post[]>([]);

  const getPostById = computed((): ((postId: number) => Post | undefined) => {
    return (postId: number) => posts.value.find((p) => p.id === postId);
  });

  const initPosts = (data: Post[]) => posts.value = data;
  const dispatchGetPosts = async (): Promise<APIResponse<Post[]> | undefined> => {
    const response = await API.posts.getPosts();
    if (response.status === 200) {
      if (response) {
        initPosts(response.data);
      }
      return {
        success: true,
        data: [],
      };
    }
  }

  const addPost = (post: Post) => {
    posts.value.push(post);
  }
  const dispatchGetPostById = async (id: number) => {
    try {
      const { status, data } = await API.posts.getPostById(id);

      if (status === 200) {
        addPost(data);
        return {
          status
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;

      return {
        status: _error.response?.status
      };
    }
  }

  return {
    posts,
    getPostById,
    initPosts,
    addPost,
    dispatchGetPosts,
    dispatchGetPostById
  }
})