-- Assurer que RLS est activé sur les tables de documentation
ALTER TABLE public.nods_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nods_page_section ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques publiques actuelles
DROP POLICY IF EXISTS "Public can read documentation pages" ON public.nods_page;
DROP POLICY IF EXISTS "Public can read documentation sections" ON public.nods_page_section;

-- Créer des politiques de lecture réservées aux utilisateurs authentifiés
CREATE POLICY "Authenticated users can read documentation pages"
  ON public.nods_page
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can read documentation sections"
  ON public.nods_page_section
  FOR SELECT
  USING (auth.uid() IS NOT NULL);