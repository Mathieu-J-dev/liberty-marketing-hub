
import { User } from '@supabase/supabase-js';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  membershipLevel: 'free' | 'premium' | 'vip';
  xp: number;
  level: number;
  progression: number;
};

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}
