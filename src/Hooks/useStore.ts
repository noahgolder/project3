import { create } from "zustand";

interface Store {
  minutes: number;
  setMinutes: (minutes: number) => void;
}

const useStore = create<Store>((set) => ({
  minutes: 0,
  setMinutes: (minutes: number | ((prev: number) => number)) => {
    if (typeof minutes === "function") {
      set((state) => ({ minutes: minutes(state.minutes) }));
    } else {
      set({ minutes });
    }
  },
}));

export default useStore;
