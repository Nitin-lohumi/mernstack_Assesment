import { create } from "zustand";
interface User {
  id: string;
  name: string;
  email?: string;
}
interface UserState {
  user: User | null;
  role: "teacher" | "student" | null;
  loading: boolean;
  setRole: (role: string | null) => void;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  role: null,
  loading: true,
  setUser: (user) =>
    set({
      user,
      loading: false,
    }),
  logoutUser: () =>
    set({
      user: null,
      loading: false,
    }),
  setRole: (type) => set({ role: type as "teacher" | "student" | null }),
}));
