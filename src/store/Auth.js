import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            setToken: (newToken) => set({ token: newToken }),
            removeToken: () => set({ token: null }),
        }),
        {
            name: "auth-storage", 
        }
    )
);

export default useAuthStore;