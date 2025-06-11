
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Upload } from 'lucide-react';
import { AuthUser } from '@/auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProfileEditModalProps {
  user: AuthUser;
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdate: (updatedUser: AuthUser) => void;
}

const ProfileEditModal = ({ user, isOpen, onClose, onProfileUpdate }: ProfileEditModalProps) => {
  const [displayName, setDisplayName] = useState(user.name);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "Fichier trop volumineux",
          description: "Veuillez choisir une image de moins de 5MB.",
        });
        return;
      }
      
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      let avatarUrl = user.avatar_url;
      
      // Upload avatar if file is selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}_${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);
          
        if (uploadError) {
          console.error('Error uploading avatar:', uploadError);
          toast({
            variant: "destructive",
            title: "Erreur de téléchargement",
            description: "Impossible de télécharger l'image de profil.",
          });
          return;
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
          
        avatarUrl = publicUrl;
      }
      
      // Update user profile
      const updateData: any = {
        display_name: displayName,
      };
      
      if (avatarUrl && avatarUrl !== user.avatar_url) {
        updateData.avatar_url = avatarUrl;
      }
      
      const { error } = await supabase
        .from('user_profiles')
        .update(updateData)
        .eq('id', user.id);
        
      if (error) {
        console.error('Error updating profile:', error);
        toast({
          variant: "destructive",
          title: "Erreur de mise à jour",
          description: "Impossible de mettre à jour le profil.",
        });
        return;
      }
      
      // Update the user object
      const updatedUser: AuthUser = {
        ...user,
        name: displayName,
        avatar_url: avatarUrl,
      };
      
      onProfileUpdate(updatedUser);
      
      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès.",
      });
      
      onClose();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Erreur inattendue",
        description: "Une erreur s'est produite lors de la mise à jour.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier mon profil</DialogTitle>
          <DialogDescription>
            Personnalisez votre profil en modifiant votre nom et votre photo.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24 bg-liberty-blue text-white">
                <AvatarImage src={avatarPreview || user.avatar_url} />
                <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
              </Avatar>
              <Label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-1 bg-liberty-gold text-white rounded-full cursor-pointer hover:bg-liberty-gold/90">
                <Camera className="h-4 w-4" />
              </Label>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div className="text-center">
              <Label htmlFor="avatar-upload" className="flex items-center gap-2 cursor-pointer text-liberty-blue hover:text-liberty-blue/90">
                <Upload className="h-4 w-4" />
                Changer la photo de profil
              </Label>
            </div>
          </div>
          
          {/* Name Section */}
          <div className="grid gap-2">
            <Label htmlFor="display-name">Nom d'affichage</Label>
            <Input
              id="display-name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Votre nom"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Annuler
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className="bg-liberty-blue hover:bg-liberty-blue/90"
          >
            {isLoading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
