
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  membershipLevel: 'free' | 'premium' | 'vip';
  xp: number;
  level: number;
  progression: number;
};

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fonction pour convertir un utilisateur Supabase en notre format d'utilisateur
const formatUser = async (user: User | null): Promise<AuthUser | null> => {
  if (!user) return null;
  
  // Récupération des données de profil depuis notre table user_profiles
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .select('display_name, xp, level, progression')
    .eq('id', user.id)
    .single();
  
  if (error) {
    console.error('Erreur lors de la récupération du profil:', error);
  }
  
  return {
    id: user.id,
    name: profile?.display_name || user.email?.split('@')[0] || 'Utilisateur',
    email: user.email || '',
    membershipLevel: 'premium', // Par défaut, on considère tous les utilisateurs comme premium
    xp: profile?.xp || 0,
    level: profile?.level || 1,
    progression: profile?.progression || 0
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  
  const isAuthenticated = !!user;

  // Vérifier l'état de l'authentification au chargement
  useEffect(() => {
    // D'abord, configurer l'écouteur d'événements d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const currentUser = await formatUser(session.user);
          setUser(currentUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Ensuite, vérifier la session initiale
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const currentUser = await formatUser(data.session.user);
        setUser(currentUser);
      }
      setLoading(false);
    };
    
    checkUser();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: error.message,
        });
        return false;
      }
      
      // Enregistrer l'action de première connexion (si applicable)
      try {
        // Vérifier si l'utilisateur a déjà effectué cette action
        const { data: session } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: existingAction } = await supabase
            .from('completed_actions')
            .select('id')
            .eq('user_id', session.user.id)
            .eq('action_id', '00000000-0000-0000-0000-000000000002') // ID de l'action "Première connexion"
            .maybeSingle();
            
          // Si l'action n'a pas déjà été complétée, l'enregistrer
          if (!existingAction) {
            const { data: actions } = await supabase
              .from('actions')
              .select('id')
              .eq('title', 'Première connexion')
              .single();
              
            if (actions) {
              await supabase
                .from('completed_actions')
                .insert({
                  user_id: session.user.id,
                  action_id: actions.id
                });
            }
          }
        }
      } catch (actionError) {
        console.error("Erreur lors de l'enregistrement de l'action:", actionError);
        // Ne pas bloquer le processus si l'enregistrement de l'action échoue
      }
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Une erreur inattendue s'est produite",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fonction d'inscription
  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: window.location.origin + '/espace-membre'
        }
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur d'inscription",
          description: error.message,
        });
        return false;
      }
      
      toast({
        title: "Vérifiez votre email",
        description: "Un lien de confirmation a été envoyé à votre adresse email.",
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Une erreur inattendue s'est produite",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: "Une erreur s'est produite lors de la déconnexion",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
