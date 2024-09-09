import { create } from "zustand";

interface ItemPostSummary extends Pick<ItemPost, "id" | "title" | "content"> {}

interface ItemPostsState {
  ItemPosts: ItemPostSummary[];
  addItemPost: (newItem: ItemPostSummary) => void;
  updateContent: (id: number, content: string) => void;
  removeItemPost: (id: number) => void;
  reorderItems: (startIndex: number, endIndex: number) => void;
}

// reorder 함수의 매개변수와 반환값 타입 지정
const reorder = (
  list: ItemPostSummary[],
  startIndex: number,
  endIndex: number
): ItemPostSummary[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const useItemPostsStore = create<ItemPostsState>((set) => ({
  ItemPosts: [],

  // addItemPost 함수의 타입 지정
  addItemPost: (newItem: ItemPostSummary) =>
    set((state) => ({
      ItemPosts: [...state.ItemPosts, newItem],
    })),

  // updateContent 함수의 타입 지정
  updateContent: (id: number, content: string) =>
    set((state) => ({
      ItemPosts: state.ItemPosts.map((item) =>
        item.id === id ? { ...item, content } : item
      ),
    })),

  // removeItemPost 함수의 타입 지정
  removeItemPost: (id: number) =>
    set((state) => ({
      ItemPosts: state.ItemPosts.filter((item) => item.id !== id),
    })),

  // reorderItems 함수의 타입 지정
  reorderItems: (startIndex: number, endIndex: number) =>
    set((state) => ({
      ItemPosts: reorder(state.ItemPosts, startIndex, endIndex),
    })),
}));

export default useItemPostsStore;
