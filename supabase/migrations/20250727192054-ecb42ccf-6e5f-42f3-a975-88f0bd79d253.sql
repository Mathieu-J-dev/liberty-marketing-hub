-- Create affiliate programs table
CREATE TABLE public.affiliate_programs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  commission text NOT NULL,
  category text NOT NULL,
  link text NOT NULL,
  description text NOT NULL,
  rating numeric(2,1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  recurring boolean NOT NULL DEFAULT false,
  earnings text NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  is_active boolean NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.affiliate_programs ENABLE ROW LEVEL SECURITY;

-- Create policies for affiliate programs
CREATE POLICY "Everyone can view active affiliate programs" 
ON public.affiliate_programs 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can insert affiliate programs" 
ON public.affiliate_programs 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own affiliate programs" 
ON public.affiliate_programs 
FOR UPDATE 
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY "Admins can manage all affiliate programs" 
ON public.affiliate_programs 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_affiliate_programs_updated_at
BEFORE UPDATE ON public.affiliate_programs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing data from the static file
INSERT INTO public.affiliate_programs (name, commission, category, link, description, rating, recurring, earnings) VALUES
('Systeme.io', 'Jusqu''à 50%', 'Marketing', 'https://systeme.io/?sa=sa003638356280f7ff04e5ba8b8e65a86b80f3fa18', 'Plateforme tout-en-un pour créer et vendre des formations en ligne, gérer des campagnes email et automatiser votre marketing.', 4.8, true, '€500-2000/mois'),
('ClickFunnels', '40%', 'Marketing', 'https://www.clickfunnels.com', 'Outil de création de tunnels de vente et pages de capture performants.', 4.7, true, '€300-1500/mois'),
('GetResponse', '33%', 'Email Marketing', 'https://www.getresponse.com', 'Solution complète d''email marketing avec automation avancée.', 4.6, true, '€200-800/mois'),
('Hostinger', '60%', 'Hébergement', 'https://www.hostinger.com', 'Hébergement web rapide et abordable avec outils de création de sites.', 4.5, false, '€50-300/mois'),
('Canva Pro', '10$', 'Design', 'https://www.canva.com', 'Outil de design graphique professionnel avec templates premium.', 4.8, true, '€100-500/mois'),
('Notion', '50%', 'Productivité', 'https://www.notion.so', 'Espace de travail tout-en-un pour notes, bases de données et collaboration.', 4.7, true, '€150-600/mois'),
('Convertkit', '30%', 'Email Marketing', 'https://convertkit.com', 'Email marketing conçu spécialement pour les créateurs de contenu.', 4.6, true, '€200-900/mois'),
('Leadpages', '30%', 'Marketing', 'https://www.leadpages.com', 'Créateur de landing pages optimisées pour la conversion.', 4.4, true, '€250-1000/mois'),
('ActiveCampaign', '30%', 'Email Marketing', 'https://www.activecampaign.com', 'Automation marketing avancée avec CRM intégré.', 4.7, true, '€300-1200/mois'),
('Shopify', 'Jusqu''à 2000$', 'E-commerce', 'https://www.shopify.com', 'Plateforme e-commerce leader pour créer votre boutique en ligne.', 4.8, true, '€500-3000/mois'),
('MailerLite', '30%', 'Email Marketing', 'https://www.mailerlite.com', 'Email marketing simple et efficace pour débutants.', 4.5, true, '€100-400/mois'),
('Thinkific', '45%', 'Formation', 'https://www.thinkific.com', 'Plateforme de création et vente de cours en ligne.', 4.6, true, '€400-1800/mois'),
('Teachable', '30%', 'Formation', 'https://teachable.com', 'Solution simple pour créer et monétiser vos formations.', 4.5, true, '€300-1500/mois'),
('Elementor Pro', '50%', 'Design', 'https://elementor.com', 'Page builder WordPress le plus populaire au monde.', 4.7, true, '€200-800/mois');