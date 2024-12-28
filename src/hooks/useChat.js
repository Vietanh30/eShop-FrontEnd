import { create } from "zustand";

export const useChat = create((set) => ({
  isOpen: false,
  setStateChat: () => set((state) => ({ isOpen: !state.isOpen })),
}));
