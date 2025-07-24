export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type CreatePostDTO = Omit<Post, 'id'>;

export type UpdatePostDTO = Post;
