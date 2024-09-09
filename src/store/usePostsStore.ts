// 커뮤니티 페이지 글 목록을 관리
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
  removeTheme: (theme: string) => void;
  removeDistrict: (district: string) => void;
  clearSearchQuery: () => void;
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
  removeTheme: (theme) =>
    set((state) => ({
      filters: {
        ...state.filters,
        theme: state.filters.theme.filter((t) => t !== theme),
      },
    })),
  removeDistrict: (district) =>
    set((state) => ({
      filters: {
        ...state.filters,
        district: state.filters.district.filter((d) => d !== district),
      },
    })),
  clearSearchQuery: () => set({ searchQuery: "" }),
}));

export default usePostsStore;
