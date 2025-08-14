import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AffiliateProgram {
  id: string;
  name: string;
  commission: string;
  category: string;
  link: string;
  description: string;
  rating: number;
  recurring: boolean;
  earnings: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  is_active: boolean;
}

export const useAffiliatePrograms = () => {
  const [programs, setPrograms] = useState<AffiliateProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchPrograms = async () => {
    try {
      console.log('🔍 Fetching affiliate programs...');
      setLoading(true);
      const { data, error } = await supabase
        .from('affiliate_programs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      console.log('📊 Database response:', { data, error, count: data?.length });

      if (error) throw error;

      setPrograms(data || []);
      console.log('✅ Programs set in state:', data?.length || 0);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data?.map(program => program.category) || [])];
      setCategories(uniqueCategories);
      console.log('📋 Categories extracted:', uniqueCategories);
    } catch (error) {
      console.error('❌ Error fetching affiliate programs:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les programmes d'affiliation. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addProgram = async (programData: Omit<AffiliateProgram, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('affiliate_programs')
        .insert([programData])
        .select()
        .single();

      if (error) throw error;

      setPrograms(prev => [data, ...prev]);
      toast({
        title: "Succès",
        description: "Programme d'affiliation ajouté avec succès",
      });

      return data;
    } catch (error) {
      console.error('Error adding affiliate program:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le programme d'affiliation",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProgram = async (id: string, updates: Partial<AffiliateProgram>) => {
    try {
      const { data, error } = await supabase
        .from('affiliate_programs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setPrograms(prev => prev.map(p => p.id === id ? data : p));
      toast({
        title: "Succès",
        description: "Programme d'affiliation mis à jour",
      });

      return data;
    } catch (error) {
      console.error('Error updating affiliate program:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le programme",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteProgram = async (id: string) => {
    try {
      const { error } = await supabase
        .from('affiliate_programs')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      setPrograms(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Succès",
        description: "Programme d'affiliation supprimé",
      });
    } catch (error) {
      console.error('Error deleting affiliate program:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le programme",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return {
    programs,
    categories,
    loading,
    addProgram,
    updateProgram,
    deleteProgram,
    refreshPrograms: fetchPrograms,
  };
};