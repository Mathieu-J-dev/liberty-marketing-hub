-- Fix security issue: Restrict liberty-marketing-hub table to admin-only access
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can read liberty-marketing-hub" ON public."liberty-marketing-hub";
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public."liberty-marketing-hub";
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public."liberty-marketing-hub";
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public."liberty-marketing-hub";

-- Create new admin-only policies
CREATE POLICY "Only admins can read liberty-marketing-hub"
  ON public."liberty-marketing-hub"
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can insert into liberty-marketing-hub"
  ON public."liberty-marketing-hub"
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update liberty-marketing-hub"
  ON public."liberty-marketing-hub"
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete from liberty-marketing-hub"
  ON public."liberty-marketing-hub"
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));