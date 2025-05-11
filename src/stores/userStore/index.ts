import { create } from "zustand";
import { UserStore } from "./types";
import { persist } from "zustand/middleware";

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userData: null,
      setUserData: (data) => set({ userData: data }),
      clearUserData: () => set({ userData: null }),
    }),
    {
      name: "spndr-user-data",
    }
  )
);
