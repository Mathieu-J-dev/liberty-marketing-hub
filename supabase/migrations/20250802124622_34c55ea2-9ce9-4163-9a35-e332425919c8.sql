-- Insérer du contenu de démonstration pour l'espace membre

-- Documents PDF
INSERT INTO public.member_content (
  title, 
  description, 
  content_type, 
  external_url,
  is_active, 
  is_premium,
  download_url
) VALUES 
(
  'Guide Complet de l''Affiliation Marketing',
  'Un guide détaillé pour débuter et optimiser vos campagnes d''affiliation en 2025. Stratégies, outils et techniques avancées.',
  'pdf',
  '/Comment gagner de l''argent en ligne en France.pdf',
  true,
  false,
  '/Comment gagner de l''argent en ligne en France.pdf'
),
(
  'Générer des Revenus avec l''IA et le No-Code',
  'Méthodes pratiques pour créer des revenus passifs en utilisant les outils d''IA et les plateformes no-code les plus performantes.',
  'pdf',
  '/Générer des revenus en ligne (actifs & passifs) avec l''IA et le no-code _ alternatives fiables.pdf',
  true,
  true,
  '/Générer des revenus en ligne (actifs & passifs) avec l''IA et le no-code _ alternatives fiables.pdf'
),
(
  'Analyse de Niche 2025',
  'Rapport complet sur les niches les plus rentables en 2025 avec données de marché et opportunités d''affiliation.',
  'pdf',
  '/analyse_niche_2025.pdf',
  true,
  true,
  '/analyse_niche_2025.pdf'
);

-- Vidéos de formation
INSERT INTO public.member_content (
  title, 
  description, 
  content_type, 
  external_url,
  is_active, 
  is_premium,
  download_url
) VALUES 
(
  'Les 5 Secrets d''une Affiliation Rentable',
  'Vidéo exclusive révélant les 5 stratégies méconnues pour multiplier vos revenus d''affiliation et créer un business pérenne.',
  'video',
  '/Les_5_Secrets_Affiliation_Rentable.mp4',
  true,
  true,
  '/Les_5_Secrets_Affiliation_Rentable.mp4'
),
(
  'Masterclass : Automatisation avec l''IA',
  'Formation complète sur l''automatisation de vos processus marketing grâce aux outils d''IA les plus performants.',
  'video',
  'https://www.youtube.com/watch?v=example1',
  true,
  false,
  NULL
),
(
  'Comment Créer des Pages de Capture Performantes',
  'Tutoriel pas-à-pas pour créer des landing pages qui convertissent et optimiser vos taux de conversion.',
  'video',
  'https://www.youtube.com/watch?v=example2',
  true,
  true,
  NULL
);

-- Formations complètes
INSERT INTO public.member_content (
  title, 
  description, 
  content_type, 
  external_url,
  is_active, 
  is_premium,
  affiliate_link
) VALUES 
(
  'Formation Complète : Affiliation 2025',
  'Programme de formation sur 8 semaines pour maîtriser l''affiliation marketing moderne. Modules progressifs, exercices pratiques et support personnalisé.',
  'course',
  'https://formation.affi-liberty.com/affiliation-2025',
  true,
  true,
  'https://1tpe.net/go.php?dat=bGliZXJ0eS1hZmZpbGlhdGlvbiZhZmY9MTIzNDU2'
),
(
  'Bootcamp IA & No-Code',
  'Formation intensive de 4 semaines pour créer des systèmes automatisés générateurs de revenus passifs avec l''IA et les outils no-code.',
  'course',
  'https://formation.affi-liberty.com/bootcamp-ia',
  true,
  true,
  'https://systeme.io/bootcamp-ia-nocode'
),
(
  'Académie du Marketing Digital',
  'Cursus complet de 12 modules couvrant tous les aspects du marketing digital : SEO, publicité, funnels, automation et monétisation.',
  'course',
  'https://formation.affi-liberty.com/academie-marketing',
  true,
  false,
  NULL
),
(
  'Starter Pack Débutant',
  'Pack de démarrage gratuit avec les bases essentielles : choix de niche, création de contenu et premières ventes.',
  'course',
  'https://formation.affi-liberty.com/starter-pack',
  true,
  false,
  NULL
);