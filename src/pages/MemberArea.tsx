
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/auth';
import ProfileHeader from '@/components/member/ProfileHeader';
import XPProgressSection from '@/components/member/XPProgressSection';
import MemberTabs from '@/components/member/MemberTabs';

type Action = {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number;
  type: string;
};

type CompletedAction = {
  id: string;
  action_id: string;
  completed_at: string;
};

const MemberArea = () => {
  const { user, logout, loading, isAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [actions, setActions] = useState<Action[]>([]);
  const [completedActions, setCompletedActions] = useState<CompletedAction[]>([]);
  const [loadingActions, setLoadingActions] = useState(true);

  // Rediriger si non connecté
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Charger les actions et les actions complétées
  useEffect(() => {
    const fetchActions = async () => {
      if (!user) return;
      
      setLoadingActions(true);
      
      try {
        // Récupérer toutes les actions
        const { data: actionsData, error: actionsError } = await supabase
          .from('actions')
          .select('*');
          
        if (actionsError) {
          console.error('Erreur lors du chargement des actions:', actionsError);
          return;
        }
        
        // Récupérer les actions complétées par l'utilisateur
        const { data: completedActionsData, error: completedActionsError } = await supabase
          .from('completed_actions')
          .select('*')
          .eq('user_id', user.id);
          
        if (completedActionsError) {
          console.error('Erreur lors du chargement des actions complétées:', completedActionsError);
          return;
        }
        
        setActions(actionsData || []);
        setCompletedActions(completedActionsData || []);
      } catch (error) {
        console.error('Erreur inattendue:', error);
      } finally {
        setLoadingActions(false);
      }
    };
    
    fetchActions();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
    navigate('/');
  };

  const handleProfileUpdate = (updatedUser: any) => {
    if (setUser) {
      setUser(updatedUser);
    }
  };

  // Afficher un message de chargement pendant la vérification de l'authentification
  if (loading) {
  return (
    <Layout>
      <div id="top"></div>
        <div className="section py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold">Chargement de votre espace membre...</h2>
            <p className="mt-2">Veuillez patienter pendant que nous vérifions votre identité.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Si l'utilisateur n'est pas connecté, on ne render rien (la redirection se fera via useEffect)
  if (!user) return null;

  return (
    <Layout>
      <div className="section py-8">
        <div className="container mx-auto">
          <ProfileHeader 
            user={user} 
            onLogout={handleLogout} 
            onProfileUpdate={handleProfileUpdate}
          />
          
          <XPProgressSection user={user} />

          <MemberTabs 
            actions={actions}
            completedActions={completedActions}
            loadingActions={loadingActions}
          />
        </div>
      </div>
    </Layout>
  );
};

export default MemberArea;
