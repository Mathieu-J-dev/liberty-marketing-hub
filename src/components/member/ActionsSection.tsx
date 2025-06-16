
import React from 'react';
import { Target, List } from 'lucide-react';
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

interface ActionsSectionProps {
  actions: Action[];
  completedActions: CompletedAction[];
  loadingActions: boolean;
}

const ActionsSection: React.FC<ActionsSectionProps> = ({ 
  actions, 
  completedActions, 
  loadingActions 
}) => {
  // Filtrer les actions par type
  const onboardingActions = actions.filter(action => action.type === 'onboarding');
  const explorationActions = actions.filter(action => action.type === 'exploration');

  // Vérifier si une action est complétée
  const isActionCompleted = (actionId: string) => {
    return completedActions.some(ca => ca.action_id === actionId);
  };

  const renderActionCard = (action: Action) => (
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
  );

  if (loadingActions) {
    return (
      <div className="text-center py-10">Chargement des actions...</div>
    );
  }

  return (
    <div className="space-y-8">
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
            {onboardingActions.map(renderActionCard)}
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
            {explorationActions.map(renderActionCard)}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionsSection;
