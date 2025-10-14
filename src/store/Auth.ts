import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/client/config";

export type RepraTier =
  | "rookie"
  | "novice"
  | "intermediate"
  | "advanced"
  | "expert"
  | "elite"
  | "master";

export interface UserPrefs {
  pfpUrl: string | null;
  weightUnit: "kg" | "lbs";
  primaryLocation: string | null;
  repraTier: RepraTier;
  publicProfile: boolean;
  publicHistory: boolean;
  publicLibrary: boolean;
  publicProgress: boolean;
}

interface IAuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;

  setHydrated(): void;
  verifySession(): Promise<void>;
  login(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  createAccount(
    username: string,
    name: string,
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  logout(): Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      setHydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        try {
          const session = await account.getSession({
            sessionId: "current",
          });
          set({ session });
        } catch (error) {
          console.log(error);
        }
      },

      async login(email: string, password: string) {
        try {
          const session = await account.createEmailPasswordSession({
            email,
            password,
          });
          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ]);
          const updatedPrefs: Partial<UserPrefs> = {};
          if (!user.prefs?.pfpUrl) updatedPrefs.pfpUrl = null;
          if (!user.prefs?.weightUnit) updatedPrefs.weightUnit = "kg";
          if (!user.prefs?.primaryLocation) updatedPrefs.primaryLocation = null;
          if (!user.prefs?.repraTier) updatedPrefs.repraTier = "rookie";
          if (user.prefs?.publicProfile === undefined)
            updatedPrefs.publicProfile = true;
          if (user.prefs?.publicHistory === undefined)
            updatedPrefs.publicHistory = true;
          if (user.prefs?.publicLibrary === undefined)
            updatedPrefs.publicLibrary = true;
          if (user.prefs?.publicProgress === undefined)
            updatedPrefs.publicProgress = true;

          const allPrefs = { ...user.prefs, ...updatedPrefs };

          if (Object.keys(updatedPrefs).length > 0) {
            await account.updatePrefs<UserPrefs>({ prefs: allPrefs });
          }

          user.prefs = { ...allPrefs } as UserPrefs;

          set({ session, user, jwt });

          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async createAccount(
        username: string,
        name: string,
        email: string,
        password: string
      ) {
        try {
          await account.create({
            userId: username || ID.unique(),
            email,
            password,
            name,
          });
          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async logout() {
        try {
          await account.deleteSessions();
          set({ session: null, jwt: null, user: null });
        } catch (error) {
          console.log(error);
        }
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
