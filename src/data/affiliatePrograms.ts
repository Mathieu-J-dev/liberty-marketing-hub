

// Définir directement le type pour le programme d'affiliation
export type AffiliateProgram = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  commission: string;
  recurring: boolean;
  earnings: string;
  rating: number;
  link: string;
  created_at?: string;
};

// Liste des catégories disponibles
export const categories = [
  'Marketing', 'Finance', 'E-commerce', 'SEO', 
  'IA', 'Éducation', 'Santé', 'Médias Sociaux', 
  'Business', 'Art & Création'
];

