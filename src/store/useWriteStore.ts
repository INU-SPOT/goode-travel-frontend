import { create } from "zustand";
import { PostCreateUpdateRequest } from "../types/post";
import {
  ItemPostCreateUpdateRequest,
  ItemPostImageRequest,
} from "../types/item";

interface WriteState extends PostCreateUpdateRequest {
  setTitle: (title: string) => void;
  setFirstContent: (content: string) => void;
  setLastContent: (content: string) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  addItemPost: (newItem: ItemPostCreateUpdateRequest) => void;
  updateContent: (id: number, content: string) => void;
  updatePostImages: (id: number, images: ItemPostImageRequest[]) => void;
  removeItemPost: (id: number) => void;
  reorderItems: (startIndex: number, endIndex: number) => void;
  clearItemPosts: () => void;
}

const reorder = (
  list: ItemPostCreateUpdateRequest[],
  startIndex: number,
  endIndex: number
): ItemPostCreateUpdateRequest[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const useWriteStore = create<WriteState>((set) => ({
  title: "",
  firstContent: "",
  lastContent: "",
  startDate: "",
  endDate: "",
  itemPosts: [],
  setTitle: (title) => set(() => ({ title })),
  setFirstContent: (content) => set(() => ({ firstContent: content })),
  setLastContent: (content) => set(() => ({ lastContent: content })),
  setStartDate: (date) => set(() => ({ startDate: date })),
  setEndDate: (date) => set(() => ({ endDate: date })),
  addItemPost: (newItem) =>
    set((state) => ({ itemPosts: [...state.itemPosts, newItem] })),
  updateContent: (id, content) =>
    set((state) => ({
      itemPosts: state.itemPosts.map((item) =>
        item.itemId === id ? { ...item, content } : item
      ),
    })),
  updatePostImages: (id, images) =>
    set((state) => ({
      itemPosts: state.itemPosts.map((item) =>
        item.itemId === id ? { ...item, images } : item
      ),
    })),
  removeItemPost: (id) =>
    set((state) => ({
      itemPosts: state.itemPosts.filter((item) => item.itemId !== id),
    })),
  reorderItems: (startIndex, endIndex) =>
    set((state) => ({
      itemPosts: reorder(state.itemPosts, startIndex, endIndex),
    })),
  clearItemPosts: () => set(() => ({ itemPosts: [] })),
}));

export default useWriteStore;
