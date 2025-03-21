import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isSessionExpired: boolean;
  token: string | null;
  user: any | null ;
  module: any | null ;
  addToken: (token: string) => void;
  setSessionExpired: (isSessionExpired: boolean) => void;
  addUser: (user: object | any) => void;
  addModule: (module: object | any) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isSessionExpired: false,
      token: null,
      user: null,
      module: null,
      addToken: (token: string) =>
        set({
          token: token,
        }),
      setSessionExpired: (isSessionExpired) =>
        set({ isSessionExpired: isSessionExpired }),
      addUser: (user) =>
        set({ user: user }),
      addModule: (module) =>
        set({ module: module })
    }),
    {
      onRehydrateStorage: () => {
        console.log("hydration starts");

        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
         
            console.log("hydration finished");
          }
        };
      },
      name: "auth",
    }
  )
);

export default useAuthStore;
