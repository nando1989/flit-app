import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from 'firebase/auth';
import { StoreApi, UseBoundStore, create } from 'zustand';

import { firebaseAuth } from '@/service/firebase/configs';

import { TActions, TState } from './types';

export const useAuth: UseBoundStore<StoreApi<TState & TActions>> = create<TState & TActions>(
  (set) => ({
    currentUser: null,
    loadingAuth: false,

    checkAuth() {
      set({ loadingAuth: true });

      const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        set({
          currentUser: user,
          loadingAuth: false,
        });
      });

      return unsubscribe;
    },

    async signIn({ email, password }) {
      set({
        loadingAuth: true,
      });

      return await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((result) => {
          set({ currentUser: result.user });
        })
        .finally(() => {
          set({ loadingAuth: false });
        });
    },

    async signOut() {
      await signOutFirebase(firebaseAuth);
      set({
        currentUser: null,
      });
    },
  }),
);
