-- Fix security linter warnings

-- 1. Fix RLS enabled no policy for nods_page and nods_page_section tables
CREATE POLICY "Public can read documentation pages" 
ON public.nods_page 
FOR SELECT 
USING (true);

CREATE POLICY "Public can read documentation sections" 
ON public.nods_page_section 
FOR SELECT 
USING (true);

-- 2. Fix function search path mutable issues by setting search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.increment_content_stats(content_id_param uuid, stat_type text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
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

-- Add admin role assignment for initial setup (if needed)
-- Note: This should be done manually for the first admin user