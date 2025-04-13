
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser } from './types';

// Fonction pour convertir un utilisateur Supabase en notre format d'utilisateur
export const formatUser = async (user: User | null): Promise<AuthUser | null> => {
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

export const registerFirstLoginAction = async (userId: string): Promise<void> => {
  if (!userId) return;
  
  try {
    // Vérifier si l'utilisateur a déjà effectué cette action
    const { data: existingAction } = await supabase
      .from('completed_actions')
      .select('id')
      .eq('user_id', userId)
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
            user_id: userId,
            action_id: actions.id
          });
      }
    }
  } catch (actionError) {
    console.error("Erreur lors de l'enregistrement de l'action:", actionError);
  }
};
