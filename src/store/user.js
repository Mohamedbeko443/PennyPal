import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user: user }),
            removeUser: () => set({ user: null }),
        }),
        {
            name: "user-storage", 
        }
    )
);

export default useUserStore;