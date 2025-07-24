import { axiosInstance } from '@/services/api';

import type { Post, CreatePostDTO, UpdatePostDTO } from './types';
import type { APIResponse } from '../types';

const getPosts = async (): Promise<APIResponse<Post[]>> => {
  const response = await axiosInstance.get('posts');
  return {
    status: response.status,
    data: response.data,
    success: response.status === 200,
  };
};

const getPostById = async (id: number) => {
  return await axiosInstance.get<Post>(`posts/${id}`);
};

const createPost = async (newPost: CreatePostDTO) => {
  return await axiosInstance.post<Post>('posts', newPost);
};

const updatePost = async (updatedPost: UpdatePostDTO) => {
  return await axiosInstance.put<Post>(`posts/${updatedPost.id}`, updatedPost);
};

const deletePost = async (id: number) => {
  return await axiosInstance.delete<Post>(`posts/${id}`);
};

export const PostService = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
