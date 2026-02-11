import {create} from 'zustand'
import { Session } from '@/types'

export const useAuthStore = create((set)=>({
    session: null,
    setSession: (sess : Session) => set({session: sess})
}))