
-- Création de la table pour stocker les prospects capturés via le formulaire
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'capture_page',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer la sécurité au niveau des lignes (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Créer une politique autorisant l'insertion publique de nouveaux prospects
-- C'est nécessaire pour que le formulaire de capture puisse ajouter des données.
CREATE POLICY "Public can insert leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Créer une politique autorisant la lecture des prospects uniquement aux utilisateurs authentifiés
-- Cela protège les données de vos prospects.
CREATE POLICY "Authenticated users can view leads"
ON public.leads
FOR SELECT
USING (auth.role() = 'authenticated');
