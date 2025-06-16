
import React from 'react';
import { Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthUser } from '@/auth/types';

interface XPProgressSectionProps {
  user: AuthUser;
}

const XPProgressSection: React.FC<XPProgressSectionProps> = ({ user }) => {
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

  // Calculer les statistiques XP
  const currentLevelXP = calculateCurrentLevelXP(user.level, user.progression);
  const nextLevelXP = calculateNextLevelXP(user.level);
  const previousLevelXP = calculateNextLevelXP(user.level - 1);
  const xpForCurrentLevel = currentLevelXP - previousLevelXP;
  const xpNeededForNextLevel = nextLevelXP - previousLevelXP;
  const progressPercent = (xpForCurrentLevel / xpNeededForNextLevel) * 100;

  return (
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
  );
};

export default XPProgressSection;
