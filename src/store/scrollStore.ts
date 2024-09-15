// store/scrollStore.ts
import { create } from "zustand";

interface ScrollState {
  hasScrollBar: boolean;
  setHasScrollBar: (hasScrollBar: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  hasScrollBar: false, // 초기 스크롤바 상태
  setHasScrollBar: (hasScrollBar: boolean) => set({ hasScrollBar }),
}));
