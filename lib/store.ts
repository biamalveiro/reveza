import { create } from "zustand";

type Store = {
  window: number;
  setWindow: (window: number) => void;
};

export const useStore = create<Store>((set) => ({
  window: 16,
  setWindow: (window: number) => set({ window }),
}));
