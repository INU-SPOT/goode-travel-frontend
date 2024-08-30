import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostsState {
  posts: Post[];
  searchQuery: string;
  filters: {
    theme: string[];
    district: string[];
  };
}

const initialState: PostsState = {
  posts: [],
  searchQuery: "",
  filters: {
    theme: [],
    district: [],
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setFilters(state, action: PayloadAction<PostsState['filters']>) {
      state.filters = action.payload;
    },
  },
});

export const { setPosts, setSearchQuery, setFilters } = postsSlice.actions;

export default postsSlice.reducer;
