import { create } from "zustand";

export const usePostStore = create((set) => ({
  posts: [],
  addPost: (newPost) => {
    set((state) => ({ posts: [...state.posts, newPost] }));
  },
  removePost: (id) => {
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) }));
  },
  setPosts: (newPosts) => {
    set((state) => ({
      posts: newPosts,
    }));
  },
}));
