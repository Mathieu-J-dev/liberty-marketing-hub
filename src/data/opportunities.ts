
import { Opportunity } from '@/components/opportunities/OpportunityCard';

export const opportunities: Opportunity[] = [
  {
    id: 1,
    title: 'Marketing Automation Pro',
    category: 'Marketing',
    rating: 4.9,
    commission: 'Jusqu\'à 40%',
    recurring: true,
    earnings: '€200-500/client',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Plateforme leader d\'automatisation du marketing avec commissions récurrentes. Idéal pour les clients B2B.'
  },
  {
    id: 2,
    title: 'Finance Intelligence Suite',
    category: 'Finance',
    rating: 4.7,
    commission: 'Jusqu\'à 35%',
    recurring: true,
    earnings: '€150-400/client',
    image: 'https://images.unsplash.com/photo-1565514501974-5ed5210d39f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Outils de gestion financière et d\'investissement. Très demandé par les professionnels et particuliers.'
  },
  {
    id: 3,
    title: 'E-commerce Empire Builder',
    category: 'E-commerce',
    rating: 4.8,
    commission: 'Jusqu\'à 45%',
    recurring: false,
    earnings: '€300-800/vente',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Solution complète de création et gestion de boutiques en ligne. Formation incluse pour vos clients.'
  },
  {
    id: 4,
    title: 'Health & Wellness Program',
    category: 'Santé',
    rating: 4.6,
    commission: 'Jusqu\'à 30%',
    recurring: true,
    earnings: '€80-250/client',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Programme de bien-être et de santé avec abonnement mensuel. Marché en forte croissance.'
  },
  {
    id: 5,
    title: 'Learning Management System',
    category: 'Éducation',
    rating: 4.8,
    commission: 'Jusqu\'à 50%',
    recurring: true,
    earnings: '€100-350/client',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Plateforme LMS complète pour créateurs de contenu éducatif. Idéal pour coaches et formateurs.'
  },
  {
    id: 6,
    title: 'AI Content Creation Suite',
    category: 'IA & Tech',
    rating: 4.9,
    commission: 'Jusqu\'à 40%',
    recurring: true,
    earnings: '€150-450/client',
    image: 'https://images.unsplash.com/photo-1677442135072-d38be748a860?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Outils d\'IA pour création de contenu marketing. Solution innovante à forte demande en 2025.'
  }
];
