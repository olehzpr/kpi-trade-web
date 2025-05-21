import { create } from "zustand";

type Filters = {
  categoryId?: number;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  name?: string;
  sort?: string;
  setFilters: (filters: Partial<Filters>) => void;
};

export const useProductFilters = create<Filters>((set) => ({
  sort: "createdAt,asc",
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
}));
