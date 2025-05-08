import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            setAccessToken: (newToken) => set({ token: newToken }),
            removeAccessToken: () => set({ token: null }),
        }),
        {
            name: "auth-storage", 
        }
    )
);

export default useAuthStore;