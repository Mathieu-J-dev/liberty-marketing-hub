import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MemberContent {
  id: string;
  title: string;
  description: string;
  content_type: 'pdf' | 'video' | 'course';
  file_path?: string;
  thumbnail_path?: string;
  external_url?: string;
  download_url?: string;
  affiliate_link?: string;
  is_premium: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  view_count: number;
  download_count: number;
}

export const useFileManagement = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Récupérer tous les contenus actifs
  const fetchContent = useCallback(async (): Promise<MemberContent[]> => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('member_content')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as MemberContent[];
    } catch (error) {
      console.error('Erreur lors de la récupération du contenu:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger le contenu"
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Upload d'un fichier vers Supabase Storage
  const uploadFile = useCallback(async (
    file: File, 
    bucket: 'member-content' | 'thumbnails'
  ): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (error) throw error;
      return data.path;
    } catch (error) {
      console.error('Erreur upload:', error);
      toast({
        variant: "destructive",
        title: "Erreur d'upload",
        description: "Impossible d'uploader le fichier"
      });
      return null;
    } finally {
      setUploading(false);
    }
  }, [toast]);

  // Créer un nouveau contenu
  const createContent = useCallback(async (contentData: {
    title: string;
    description: string;
    content_type: 'pdf' | 'video' | 'course';
    file_path?: string;
    thumbnail_path?: string;
    external_url?: string;
    download_url?: string;
    affiliate_link?: string;
    is_premium: boolean;
  }): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('member_content')
        .insert([contentData]);

      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Contenu créé avec succès"
      });
      return true;
    } catch (error) {
      console.error('Erreur création contenu:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer le contenu"
      });
      return false;
    }
  }, [toast]);

  // Télécharger un fichier sécurisé
  const downloadSecureFile = useCallback(async (
    contentId: string,
    filePath: string
  ): Promise<string | null> => {
    try {
      // Enregistrer le téléchargement
      await supabase.from('content_downloads').insert([{
        content_id: contentId,
        user_id: (await supabase.auth.getUser()).data.user?.id || '',
        ip_address: '0.0.0.0', // À remplacer par l'IP réelle si nécessaire
        user_agent: navigator.userAgent
      }]);

      // Incrémenter le compteur
      await supabase.rpc('increment_content_stats', {
        content_id_param: contentId,
        stat_type: 'download'
      });

      // Générer l'URL de téléchargement sécurisée
      const { data, error } = await supabase.storage
        .from('member-content')
        .createSignedUrl(filePath, 60); // URL valide 1 minute

      if (error) throw error;
      return data.signedUrl;
    } catch (error) {
      console.error('Erreur téléchargement:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de télécharger le fichier"
      });
      return null;
    }
  }, [toast]);

  // Incrémenter le nombre de vues
  const incrementViews = useCallback(async (contentId: string) => {
    try {
      await supabase.rpc('increment_content_stats', {
        content_id_param: contentId,
        stat_type: 'view'
      });
    } catch (error) {
      console.error('Erreur incrémentation vues:', error);
    }
  }, []);

  // Obtenir l'URL publique d'une miniature
  const getThumbnailUrl = useCallback((path: string): string => {
    const { data } = supabase.storage
      .from('thumbnails')
      .getPublicUrl(path);
    return data.publicUrl;
  }, []);

  return {
    loading,
    uploading,
    fetchContent,
    uploadFile,
    createContent,
    downloadSecureFile,
    incrementViews,
    getThumbnailUrl
  };
};