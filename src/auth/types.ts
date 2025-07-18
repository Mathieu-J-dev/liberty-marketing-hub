
import { User } from '@supabase/supabase-js';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  membershipLevel: 'free' | 'premium' | 'vip';
  xp: number;
  level: number;
  progression: number;
  avatar_url?: string;
};

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  loading: boolean;
  setUser?: (user: AuthUser) => void;
}
