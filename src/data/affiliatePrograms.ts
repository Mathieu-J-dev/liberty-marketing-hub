
export interface AffiliateProgram {
  id: number;
  name: string;
  commission: string;
  category: string;
  link: string;
  description: string;
  rating: number;
  recurring: boolean;
  earnings: string;
}

// Data for affiliate programs
export const affiliatePrograms: AffiliateProgram[] = [
  {
    id: 1,
    name: 'Marketing Pro Suite',
    commission: '35%',
    category: 'Marketing',
    link: 'https://example.com/aff/1234',
    description: 'Plateforme complète d\'outils de marketing digital pour entrepreneurs.',
    rating: 4.8,
    recurring: true,
    earnings: '€180-350/mois'
  },
  {
    id: 2,
    name: 'Finance Master',
    commission: '25%',
    category: 'Finance',
    link: 'https://example.com/aff/5678',
    description: 'Solutions de gestion financière pour particuliers et professionnels.',
    rating: 4.6,
    recurring: true,
    earnings: '€100-250/mois'
  },
  {
    id: 3,
    name: 'E-commerce Builder',
    commission: '40%',
    category: 'E-commerce',
    link: 'https://example.com/aff/9012',
    description: 'Plateforme de création de boutiques en ligne tout-en-un.',
    rating: 4.9,
    recurring: false,
    earnings: '€200-450/vente'
  },
  {
    id: 4,
    name: 'SEO Optimizer',
    commission: '30%',
    category: 'SEO',
    link: 'https://example.com/aff/3456',
    description: 'Outils d\'optimisation SEO pour sites web et contenus.',
    rating: 4.7,
    recurring: true,
    earnings: '€120-300/mois'
  },
  {
    id: 5,
    name: 'Wellness Program',
    commission: '20%',
    category: 'Santé',
    link: 'https://example.com/aff/7890',
    description: 'Programme de bien-être et santé pour un mode de vie équilibré.',
    rating: 4.5,
    recurring: true,
    earnings: '€50-150/mois'
  },
  {
    id: 6,
    name: 'Social Media Dashboard',
    commission: '45%',
    category: 'Médias Sociaux',
    link: 'https://example.com/aff/1357',
    description: 'Gestion et analyse de médias sociaux pour entrepreneurs et influenceurs.',
    rating: 4.8,
    recurring: true,
    earnings: '€150-400/mois'
  },
  {
    id: 7,
    name: 'AI Content Creator',
    commission: '50%',
    category: 'IA',
    link: 'https://example.com/aff/2468',
    description: 'Création de contenu optimisé par intelligence artificielle.',
    rating: 4.9,
    recurring: true,
    earnings: '€200-500/mois'
  },
  {
    id: 8,
    name: 'Learning Platform',
    commission: '30%',
    category: 'Éducation',
    link: 'https://example.com/aff/3690',
    description: 'Plateforme éducative pour cours en ligne et formations.',
    rating: 4.7,
    recurring: false,
    earnings: '€150-350/vente'
  },
  {
    id: 9,
    name: 'Amazon Affiliation Plus',
    commission: '6-12%',
    category: 'E-commerce',
    link: 'https://example.com/aff/amazon-plus',
    description: 'Programme d\'affiliation Amazon optimisé avec outils et formations exclusives.',
    rating: 4.6,
    recurring: false,
    earnings: '€5-500/vente'
  },
  {
    id: 10,
    name: 'Crypto Trading Academy',
    commission: '45%',
    category: 'Finance',
    link: 'https://example.com/aff/crypto-academy',
    description: 'Formation complète sur le trading de cryptomonnaies pour débutants et avancés.',
    rating: 4.8,
    recurring: false,
    earnings: '€200-600/vente'
  },
  {
    id: 11,
    name: 'Lifestyle Photography Course',
    commission: '40%',
    category: 'Art & Création',
    link: 'https://example.com/aff/photography',
    description: 'Cours premium de photographie lifestyle pour créateurs de contenu.',
    rating: 4.7,
    recurring: false,
    earnings: '€100-250/vente'
  },
  {
    id: 12,
    name: 'SaaS Business Suite',
    commission: '25%',
    category: 'Business',
    link: 'https://example.com/aff/saas-suite',
    description: 'Ensemble d\'outils SaaS pour la gestion d\'entreprise et l\'automatisation.',
    rating: 4.8,
    recurring: true,
    earnings: '€75-300/mois'
  }
];

// Extract unique categories
export const categories = [...new Set(affiliatePrograms.map(program => program.category))];
