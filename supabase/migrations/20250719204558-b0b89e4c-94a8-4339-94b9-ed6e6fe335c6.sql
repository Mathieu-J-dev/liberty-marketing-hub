-- Créer les buckets de stockage pour les fichiers membres
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('member-content', 'member-content', false),
  ('thumbnails', 'thumbnails', true);

-- Créer la table pour gérer les contenus membres
CREATE TABLE public.member_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('pdf', 'video', 'course')),
  file_path TEXT, -- chemin vers le fichier dans storage
  thumbnail_path TEXT, -- chemin vers la miniature
  external_url TEXT, -- pour vidéos/cours externes
  download_url TEXT, -- URL de téléchargement direct si applicable
  affiliate_link TEXT, -- lien d'affiliation optionnel
  is_premium BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0
);

-- Activer RLS sur member_content
ALTER TABLE public.member_content ENABLE ROW LEVEL SECURITY;

-- Politique pour voir les contenus actifs
CREATE POLICY "Authenticated users can view active content" 
ON public.member_content 
FOR SELECT 
USING (auth.role() = 'authenticated'::text AND is_active = true);

-- Politique pour les admin (à adapter selon votre système de rôles)
CREATE POLICY "Admin can manage all content" 
ON public.member_content 
FOR ALL 
USING (auth.uid() = created_by);

-- Créer la table pour suivre les téléchargements
CREATE TABLE public.content_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  content_id UUID NOT NULL REFERENCES public.member_content(id),
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address INET,
  user_agent TEXT
);

-- Activer RLS sur content_downloads
ALTER TABLE public.content_downloads ENABLE ROW LEVEL SECURITY;

-- Politique pour voir ses propres téléchargements
CREATE POLICY "Users can view their downloads" 
ON public.content_downloads 
FOR SELECT 
USING (auth.uid() = user_id);

-- Politique pour enregistrer ses téléchargements
CREATE POLICY "Users can record their downloads" 
ON public.content_downloads 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policies pour Storage - member-content (privé)
CREATE POLICY "Authenticated users can view member content" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'member-content' AND auth.role() = 'authenticated'::text);

CREATE POLICY "Admin can upload member content" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'member-content' AND auth.role() = 'authenticated'::text);

CREATE POLICY "Admin can update member content" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'member-content' AND auth.role() = 'authenticated'::text);

-- Policies pour Storage - thumbnails (public)
CREATE POLICY "Anyone can view thumbnails" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'thumbnails');

CREATE POLICY "Authenticated users can upload thumbnails" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'thumbnails' AND auth.role() = 'authenticated'::text);

-- Fonction pour incrémenter les compteurs de vues/téléchargements
CREATE OR REPLACE FUNCTION public.increment_content_stats(
  content_id_param UUID,
  stat_type TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF stat_type = 'view' THEN
    UPDATE public.member_content 
    SET view_count = view_count + 1, updated_at = now()
    WHERE id = content_id_param;
  ELSIF stat_type = 'download' THEN
    UPDATE public.member_content 
    SET download_count = download_count + 1, updated_at = now()
    WHERE id = content_id_param;
  END IF;
END;
$$;

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_member_content_updated_at
  BEFORE UPDATE ON public.member_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();