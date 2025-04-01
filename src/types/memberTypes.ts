
export type ContentItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  type: 'pdf' | 'video' | 'course';
  date: string;
  premium: boolean;
};

// Content data for the member area
export const memberContent: ContentItem[] = [
  {
    id: '1',
    title: 'Guide Complet de l\'Affiliation Marketing',
    description: 'Un guide PDF complet pour comprendre et maîtriser l\'affiliation marketing en 2025.',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    url: '#pdf-guide',
    type: 'pdf',
    date: '15 Mai 2025',
    premium: true
  },
  {
    id: '2',
    title: 'Formation: Trafic Qualifié pour Affiliés',
    description: 'Comment générer du trafic ciblé pour maximiser vos conversions d\'affiliation.',
    imageUrl: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    url: '#video-course',
    type: 'video',
    date: '28 Mars 2025',
    premium: true
  },
  {
    id: '3',
    title: 'Masterclass SEO pour Affiliés',
    description: 'Optimisez votre contenu pour les moteurs de recherche et boostez vos commissions.',
    imageUrl: 'https://images.unsplash.com/photo-1572177215652-08fca998a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    url: '#course',
    type: 'course',
    date: '10 Avril 2025',
    premium: true
  },
  {
    id: '4',
    title: 'Webinaire: Stratégies de Conversion Avancées',
    description: 'Techniques psychologiques pour augmenter vos taux de conversion en affiliation.',
    imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    url: '#video-webinar',
    type: 'video',
    date: '22 Juin 2025',
    premium: true
  },
  {
    id: '5',
    title: 'Les Secrets des Super Affiliés',
    description: 'PDF exclusif révélant les habitudes et stratégies des affiliés qui gagnent +10K€/mois.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    url: '#pdf-secrets',
    type: 'pdf',
    date: '5 Février 2025',
    premium: true
  }
];
