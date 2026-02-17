import {create} from 'zustand'
import { Session } from '@/types'

type AuthStore = {
  session: Session | null;
  setSession: (sess: Session | null) => void;

  isSignin: boolean;
  setIsSignin: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set)=>({
    session: null,
    setSession: (sess) => set({ session: sess }),
    isSignin: true,
    setIsSignin: (value: boolean)=> set({isSignin: value})
}))