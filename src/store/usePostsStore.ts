import { create } from "zustand";

interface PostsState {
  posts: Post[];
  searchQuery: string;
  filters: {
    theme: string[];
    district: string[];
  };
  setPosts: (posts: Post[]) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: PostsState["filters"]) => void;
}

const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  searchQuery: "",
  filters: {
    theme: [],
    district: [],
  },
  setPosts: (posts) => set({ posts }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) => set({ filters }),
}));

export default usePostsStore;
