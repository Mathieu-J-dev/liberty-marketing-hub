-- Add the 3 new training courses to member_content
INSERT INTO member_content (
  title, 
  description, 
  content_type, 
  file_path,
  is_premium, 
  is_active
) VALUES 
(
  'Marketing Avancé',
  'Maîtrisez les techniques avancées de marketing digital : psychologie du consommateur, funnels optimisés, analyse de données et retargeting pour maximiser vos conversions.',
  'course',
  '/espace-membre?tab=marketing-advanced',
  false,
  true
),
(
  'Automation & IA',
  'Automatisez votre marketing avec l''intelligence artificielle : création de contenu, email automation, réseaux sociaux et workflows complets pour gagner du temps.',
  'course',
  '/espace-membre?tab=automation-ai',
  false,
  true
),
(
  'Scaling Business',
  'Faites passer votre business à l''échelle supérieure : stratégies de croissance, monétisation avancée, construction d''équipe et expansion internationale.',
  'course',
  '/espace-membre?tab=scaling-business',
  true,
  true
);