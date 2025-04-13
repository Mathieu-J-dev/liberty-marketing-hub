
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { AuthUser } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  user: AuthUser;
  onLogout: () => Promise<void>;
}

const ProfileHeader = ({ user, onLogout }: ProfileHeaderProps) => {
  // Obtient les initiales du nom d'utilisateur pour l'avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center mb-4 md:mb-0">
        <Avatar className="h-16 w-16 mr-4 bg-liberty-blue text-white">
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <div className="flex items-center mt-1">
            <span className="text-sm bg-liberty-blue text-white px-2 py-0.5 rounded-full">
              Niveau {user.level}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {user.xp} XP
            </span>
          </div>
        </div>
      </div>
      <Button 
        variant="outline" 
        className="border-liberty-blue text-liberty-blue hover:bg-liberty-blue hover:text-white"
        onClick={onLogout}
      >
        <LogOut className="mr-2 h-4 w-4" /> Déconnexion
      </Button>
    </div>
  );
};

export default ProfileHeader;
