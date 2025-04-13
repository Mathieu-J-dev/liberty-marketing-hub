
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { FileText, FileVideo, Book, Award, Target, List } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import ProfileHeader from '@/components/member/ProfileHeader';
import ContentList from '@/components/member/ContentList';
import { memberContent } from '@/types/memberTypes';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
  const { user, logout, loading, isAuthenticated } = useAuth();
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

  // Calculer l'XP nécessaire pour le niveau suivant
  const calculateNextLevelXP = (level: number) => {
    return Math.pow((level), 2) * 100;
  };

  // Calculer l'XP actuelle du niveau
  const calculateCurrentLevelXP = (level: number, progression: number) => {
    const totalXPForNextLevel = calculateNextLevelXP(level);
    const totalXPForCurrentLevel = calculateNextLevelXP(level - 1);
    return Math.floor(totalXPForCurrentLevel + progression * (totalXPForNextLevel - totalXPForCurrentLevel));
  };

  // Filtrer les contenus par type
  const pdfContent = memberContent.filter(item => item.type === 'pdf');
  const videoContent = memberContent.filter(item => item.type === 'video');
  const courseContent = memberContent.filter(item => item.type === 'course');

  // Filtrer les actions par type
  const onboardingActions = actions.filter(action => action.type === 'onboarding');
  const explorationActions = actions.filter(action => action.type === 'exploration');

  // Vérifier si une action est complétée
  const isActionCompleted = (actionId: string) => {
    return completedActions.some(ca => ca.action_id === actionId);
  };

  // Afficher un message de chargement pendant la vérification de l'authentification
  if (loading) {
    return (
      <Layout>
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

  // Calculer les statistiques XP
  const currentLevelXP = calculateCurrentLevelXP(user.level, user.progression);
  const nextLevelXP = calculateNextLevelXP(user.level);
  const previousLevelXP = calculateNextLevelXP(user.level - 1);
  const xpForCurrentLevel = currentLevelXP - previousLevelXP;
  const xpNeededForNextLevel = nextLevelXP - previousLevelXP;
  const progressPercent = (xpForCurrentLevel / xpNeededForNextLevel) * 100;

  return (
    <Layout>
      <div className="section py-8">
        <div className="container mx-auto">
          <ProfileHeader user={user} onLogout={handleLogout} />
          
          {/* Section XP et Progression */}
          <div className="mb-10">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-liberty-gold" />
                    Niveau {user.level}
                  </div>
                </CardTitle>
                <CardDescription>
                  Votre progression et récompenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between mb-1">
                    <span>Progression vers le niveau {user.level + 1}</span>
                    <span>{xpForCurrentLevel} / {xpNeededForNextLevel} XP</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                  
                  <div className="text-sm text-gray-500 mt-2">
                    XP total accumulé: {user.xp} points
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all">Tous les contenus</TabsTrigger>
              <TabsTrigger value="pdf">
                <FileText className="mr-2 h-4 w-4" /> Documents PDF
              </TabsTrigger>
              <TabsTrigger value="video">
                <FileVideo className="mr-2 h-4 w-4" /> Vidéos
              </TabsTrigger>
              <TabsTrigger value="course">
                <Book className="mr-2 h-4 w-4" /> Formations
              </TabsTrigger>
              <TabsTrigger value="actions">
                <Target className="mr-2 h-4 w-4" /> Actions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ContentList items={memberContent} />
            </TabsContent>

            <TabsContent value="pdf">
              <ContentList items={pdfContent} />
            </TabsContent>

            <TabsContent value="video">
              <ContentList items={videoContent} />
            </TabsContent>

            <TabsContent value="course">
              <ContentList items={courseContent} />
            </TabsContent>
            
            <TabsContent value="actions">
              <div className="space-y-8">
                {loadingActions ? (
                  <div className="text-center py-10">Chargement des actions...</div>
                ) : (
                  <>
                    {/* Actions d'Onboarding */}
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <div className="flex items-center">
                            <List className="mr-2 h-5 w-5 text-liberty-blue" />
                            Onboarding
                          </div>
                        </CardTitle>
                        <CardDescription>
                          Actions pour débuter avec Affi-Liberty
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {onboardingActions.map(action => (
                            <li key={action.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div>
                                <div className="font-medium">{action.title}</div>
                                <div className="text-sm text-gray-500">{action.description}</div>
                              </div>
                              <div className="flex items-center">
                                <span className="mr-3 text-sm font-medium">+{action.xp_reward} XP</span>
                                {isActionCompleted(action.id) ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Complété
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    À faire
                                  </span>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    {/* Actions d'Exploration */}
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <div className="flex items-center">
                            <Target className="mr-2 h-5 w-5 text-liberty-gold" />
                            Exploration
                          </div>
                        </CardTitle>
                        <CardDescription>
                          Découvrez toutes les fonctionnalités de la plateforme
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {explorationActions.map(action => (
                            <li key={action.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div>
                                <div className="font-medium">{action.title}</div>
                                <div className="text-sm text-gray-500">{action.description}</div>
                              </div>
                              <div className="flex items-center">
                                <span className="mr-3 text-sm font-medium">+{action.xp_reward} XP</span>
                                {isActionCompleted(action.id) ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Complété
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    À faire
                                  </span>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default MemberArea;
