
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { AuthContextType, AuthUser } from './types';
import { formatUser, registerFirstLoginAction } from './utils';
import { Session, User } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  const isAuthenticated = !!user && !!session;

  const setUser = (updatedUser: AuthUser) => {
    setUserState(updatedUser);
  };

  // Fonction pour vérifier l'abonnement
  const checkSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) {
        console.error('Erreur lors de la vérification de l\'abonnement:', error);
      } else {
        console.log('Statut d\'abonnement vérifié:', data);
      }
    } catch (error) {
      console.error('Erreur inattendue lors de la vérification de l\'abonnement:', error);
    }
  };

  // Vérifier l'état de l'authentification au chargement
  useEffect(() => {
    // D'abord, configurer l'écouteur d'événements d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state change:', event, currentSession);
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Utiliser setTimeout pour éviter les problèmes de récursion
          setTimeout(async () => {
            const currentUser = await formatUser(currentSession.user);
            setUserState(currentUser);
            // Vérifier l'abonnement après l'authentification
            checkSubscription();
          }, 0);
        } else {
          setUserState(null);
        }
        setLoading(false);
      }
    );

    // Ensuite, vérifier la session initiale
    const checkUser = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      
      if (initialSession?.user) {
        const currentUser = await formatUser(initialSession.user);
        setUserState(currentUser);
        // Vérifier l'abonnement pour la session existante
        checkSubscription();
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
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: error.message,
        });
        return false;
      }
      
      // Enregistrer l'action de première connexion
      const userId = data.session?.user.id;
      if (userId) {
        await registerFirstLoginAction(userId);
        // Vérifier l'abonnement après la connexion
        setTimeout(checkSubscription, 1000);
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

  // Fonction de validation de mot de passe
  const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push("Le mot de passe doit contenir au moins 8 caractères");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Le mot de passe doit contenir au moins une lettre majuscule");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Le mot de passe doit contenir au moins une lettre minuscule");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Le mot de passe doit contenir au moins un chiffre");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push("Le mot de passe doit contenir au moins un caractère spécial");
    }
    
    return { isValid: errors.length === 0, errors };
  };

  // Fonction d'inscription
  const signup = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Valider le mot de passe
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        toast({
          variant: "destructive",
          title: "Mot de passe invalide",
          description: passwordValidation.errors.join(". "),
        });
        return false;
      }
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: redirectUrl
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
      
      if (data.user && !data.user.email_confirmed_at) {
        toast({
          title: "Vérifiez votre email",
          description: "Un lien de confirmation a été envoyé à votre adresse email.",
        });
      } else {
        toast({
          title: "Inscription réussie!",
          description: "Vous pouvez maintenant vous connecter.",
        });
      }
      
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
      // Nettoyer l'état complètement
      setSession(null);
      setUserState(null);
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

  // Fonction de récupération de mot de passe
  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/login?reset=true`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: error.message,
        });
        return false;
      }
      
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte email pour réinitialiser votre mot de passe.",
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, resetPassword, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
