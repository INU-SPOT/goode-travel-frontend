import { create } from "zustand";

interface ItemPostSummary extends Pick<ItemPost, "id" | "title" | "content"> {}

interface WriteState {
  title: string;
  firstContent: string;
  lastContent: string;
  startDate: Date | null;
  endDate: Date | null;
  ItemPosts: ItemPostSummary[];
  setTitle: (title: string) => void;
  setFirstContent: (content: string) => void;
  setLastContent: (content: string) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  addItemPost: (newItem: ItemPostSummary) => void;
  updateContent: (id: number, content: string) => void;
  removeItemPost: (id: number) => void;
  reorderItems: (startIndex: number, endIndex: number) => void;
  clearItemPosts: () => void;
}

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

const useWriteStore = create<WriteState>((set) => ({
  title: "",
  firstContent: "",
  lastContent: "",
  startDate: null,
  endDate: null,
  ItemPosts: [],
  setTitle: (title) => set(() => ({ title })),
  setFirstContent: (content) => set(() => ({ firstContent: content })),
  setLastContent: (content) => set(() => ({ lastContent: content })),
  setStartDate: (date) => set(() => ({ startDate: date })),
  setEndDate: (date) => set(() => ({ endDate: date })),
  addItemPost: (newItem) =>
    set((state) => ({ ItemPosts: [...state.ItemPosts, newItem] })),
  updateContent: (id, content) =>
    set((state) => ({
      ItemPosts: state.ItemPosts.map((item) =>
        item.id === id ? { ...item, content } : item
      ),
    })),
  removeItemPost: (id) =>
    set((state) => ({
      ItemPosts: state.ItemPosts.filter((item) => item.id !== id),
    })),
  reorderItems: (startIndex, endIndex) =>
    set((state) => ({
      ItemPosts: reorder(state.ItemPosts, startIndex, endIndex),
    })),
  clearItemPosts: () => set(() => ({ ItemPosts: [] })),
}));

export default useWriteStore;
