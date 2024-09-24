// 커뮤니티 페이지 글 목록을 관리
import { create } from "zustand";
import { PostThumbnailResponse } from "../types/post";
import { City } from "../types/common";

interface PostsState {
  posts: PostThumbnailResponse[];
  searchQuery: string;
  filters: {
    theme: string[];
    metropolitanGovernments: City[];
    localGovernments: City[];
  };
  setPosts: (
    posts:
      | PostThumbnailResponse[]
      | ((prevPosts: PostThumbnailResponse[]) => PostThumbnailResponse[])
  ) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: PostsState["filters"]) => void;
  removeTheme: (theme: string) => void;
  removeMetropolitanGovernment: (id: City) => void;
  removeLocalGovernment: (id: City) => void;
  clearSearchQuery: () => void;
}

const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  searchQuery: "",
  filters: {
    theme: [],
    metropolitanGovernments: [], // 초기값 빈 배열
    localGovernments: [], // 초기값 빈 배열
  },
  setPosts: (posts) =>
    set((state) => ({
      posts: typeof posts === "function" ? posts(state.posts) : posts,
    })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) => set({ filters }),
  removeTheme: (theme) =>
    set((state) => ({
      filters: {
        ...state.filters,
        theme: state.filters.theme.filter((t) => t !== theme),
      },
    })),
  removeMetropolitanGovernment: (city) =>
    set((state) => ({
      filters: {
        ...state.filters,
        metropolitanGovernments: state.filters.metropolitanGovernments.filter(
          (mCity) => mCity !== city
        ),
      },
    })),
  removeLocalGovernment: (city) =>
    set((state) => ({
      filters: {
        ...state.filters,
        localGovernments: state.filters.localGovernments.filter(
          (lCity) => lCity !== city
        ),
      },
    })),
  clearSearchQuery: () => set({ searchQuery: "" }),
}));

export default usePostsStore;
