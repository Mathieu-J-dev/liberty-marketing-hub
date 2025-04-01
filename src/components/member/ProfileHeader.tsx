
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { AuthUser } from '@/contexts/AuthContext';

interface ProfileHeaderProps {
  user: AuthUser;
  onLogout: () => Promise<void>;
}

const ProfileHeader = ({ user, onLogout }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Bienvenue, {user.name}</h1>
        <p className="text-gray-600">Accédez à vos ressources exclusives</p>
      </div>
      <Button 
        variant="outline" 
        className="mt-4 md:mt-0"
        onClick={onLogout}
      >
        <LogOut className="mr-2 h-4 w-4" /> Déconnexion
      </Button>
    </div>
  );
};

export default ProfileHeader;
