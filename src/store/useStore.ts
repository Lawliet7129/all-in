import { create } from 'zustand'

interface User {
  id: string
  name: string
  avatar: string
  position: [number, number, number]
}

interface AppState {
  users: User[]
  currentUser: User | null
  setCurrentUser: (user: User) => void
  addUser: (user: User) => void
  removeUser: (userId: string) => void
  updateUserPosition: (userId: string, position: [number, number, number]) => void
}

export const useStore = create<AppState>((set) => ({
  users: [],
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
  updateUserPosition: (userId, position) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, position } : user
      ),
    })),
})) 