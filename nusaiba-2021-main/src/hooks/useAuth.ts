import { create } from 'zustand';
import { AuthState, User } from '@/types';
import { database } from '@/lib/database';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  loginWithUser: (user: User) => void;
}

export const useAuth = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await database.authenticateUser(email, password);
      if (!user) {
        set({ error: 'Invalid credentials', isLoading: false });
        return;
      }
      database.setCurrentUserId(user.id);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: 'Login failed', isLoading: false });
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const newUser = await database.createUser(userData);
      database.setCurrentUserId(newUser.id);
      set({ user: newUser, isAuthenticated: true, isLoading: false });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      set({ error: errorMessage, isLoading: false });
    }
  },

  logout: () => {
    database.clearCurrentUserId();
    set({ user: null, isAuthenticated: false, error: null });
  },

  updateUser: (userData) => {
    const currentUser = get().user;
    if (currentUser) {
      const updated = { ...currentUser, ...userData, updatedAt: new Date() } as User;
      database.updateUser(currentUser.id, userData);
      set({ user: updated });
    }
  },

  loginWithUser: (user: User) => {
    database.setCurrentUserId(user.id);
    set({ user, isAuthenticated: true, isLoading: false, error: null });
  },
}));