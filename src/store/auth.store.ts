import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";

interface IUser {
    user_id: number;
    email?: string;
    name: string;
    role?: string;
}

type AuthStore = {
    user: IUser | null;
    token: string | null;
    setUser: (value: IUser) => void;
    setToken: (value: string) => void;
    unsetUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            setUser: (value) => set((state) => ({ ...state, user: value })),
            setToken: (value) => set((state) => ({ ...state, token: value })),
            unsetUser: () => set({ user: null }),
            unsetToken: () => set({ token: null }),
        }),
        { name: 'session-auth', storage: createJSONStorage(() => localStorage) }
    ));