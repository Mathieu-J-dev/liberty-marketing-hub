
// Importer le type de table depuis Supabase
import { Tables } from '@/integrations/supabase/types';

// Définir le type pour garder la compatibilité
export type AffiliateProgram = Tables<'affiliate_tables'>;

// La fonction pour récupérer les programmes sera maintenant déplacée vers une requête Supabase
export const categories = [
  'Marketing', 'Finance', 'E-commerce', 'SEO', 
  'IA', 'Éducation', 'Santé', 'Médias Sociaux', 
  'Business', 'Art & Création'
];
