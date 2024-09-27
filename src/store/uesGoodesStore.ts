// 굳이 목록을 관리
import { create } from "zustand";
import { ItemsResponse } from "../types/item";
import { City, Filters } from "../types/common";

interface GoodesState {
  goodes: ItemsResponse[];
  filters: Filters;
  setGoodes: (
    goodes: ItemsResponse[] | ((prevPosts: ItemsResponse[]) => ItemsResponse[])
  ) => void;
  setFilters: (filters: Filters) => void;
  removeTheme: (theme: string) => void;
  removeMetropolitanGovernment: (id: City) => void;
  removeLocalGovernment: (id: City) => void;
}

const useGoodesStore = create<GoodesState>((set) => ({
  goodes: [],
  filters: {
    theme: [],
    metropolitanGovernments: [], // 초기값 빈 배열
    localGovernments: [], // 초기값 빈 배열
  },
  setGoodes: (goodes) =>
    set((state) => ({
      goodes: typeof goodes === "function" ? goodes(state.goodes) : goodes,
    })),
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
}));

export default useGoodesStore;
