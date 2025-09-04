
  -- 1) Protéger par défaut: ajouter un flag de visibilité publique
  ALTER TABLE public.affiliate_programs
  ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT false;

  COMMENT ON COLUMN public.affiliate_programs.is_public IS
  'Quand true, le programme peut être affiché au public (non connecté). Laisser false pour les données sensibles.';

  -- 2) Nettoyer l’ancienne politique publique trop large
  DROP POLICY IF EXISTS "Anyone can view active affiliate programs" ON public.affiliate_programs;

  -- 3) Politique publique restrictive: seuls les programmes non sensibles et actifs
  CREATE POLICY "Public can view public, active affiliate programs"
    ON public.affiliate_programs
    FOR SELECT
    USING (is_active = true AND is_public = true);

  -- 4) Politique pour utilisateurs authentifiés: voir tous les programmes actifs
  CREATE POLICY "Authenticated users can view active affiliate programs"
    ON public.affiliate_programs
    FOR SELECT
    USING (auth.uid() IS NOT NULL AND is_active = true);

  -- NB: On conserve les autres politiques existantes (admins manage all, insert/update par créateur, etc.)

  -- 5) Index pour accélérer les filtres
  CREATE INDEX IF NOT EXISTS idx_affiliate_programs_active_public
    ON public.affiliate_programs (is_active, is_public);
  