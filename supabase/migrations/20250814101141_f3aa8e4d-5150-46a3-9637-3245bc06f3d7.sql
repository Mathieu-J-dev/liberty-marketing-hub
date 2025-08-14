-- Security fixes for database functions and RLS policies

-- 1. Fix database function security by adding secure search_path
-- This prevents potential SQL injection through search_path manipulation

-- Update has_role function to use secure search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

-- Update increment_content_stats function to use secure search_path
CREATE OR REPLACE FUNCTION public.increment_content_stats(content_id_param uuid, stat_type text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
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
$function$;

-- Update update_updated_at_column function to use secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Update update_level_from_xp function to use secure search_path
CREATE OR REPLACE FUNCTION public.update_level_from_xp()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $function$
BEGIN
  NEW.level := FLOOR(SQRT(NEW.xp / 100)) + 1;
  NEW.progression := (SQRT(NEW.xp / 100) - FLOOR(SQRT(NEW.xp / 100)));
  RETURN NEW;
END;
$function$;

-- Update award_xp_for_completed_action function to use secure search_path
CREATE OR REPLACE FUNCTION public.award_xp_for_completed_action()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $function$
DECLARE
  _xp_amount INTEGER;
BEGIN
  SELECT xp_reward INTO _xp_amount FROM public.actions WHERE id = NEW.action_id;
  
  UPDATE public.user_profiles
  SET xp = xp + _xp_amount
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$function$;

-- Update handle_new_user function to use secure search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.user_profiles (id, display_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'display_name', 'User' || substr(new.id::text, 1, 8)));
  RETURN NEW;
END;
$function$;

-- 2. Restrict affiliate_programs table access to authenticated users only
-- Drop overly permissive policy
DROP POLICY IF EXISTS "Everyone can view active affiliate programs" ON public.affiliate_programs;

-- Create secure policy that requires authentication
CREATE POLICY "Authenticated users can view active affiliate programs" ON public.affiliate_programs
FOR SELECT
USING ((is_active = true) AND (auth.role() = 'authenticated'));

-- 3. Update member_content table access to be more explicit about authentication requirement
-- The existing policy already requires authentication, but let's make it more explicit
DROP POLICY IF EXISTS "Authenticated users can view active content" ON public.member_content;

CREATE POLICY "Authenticated users can view active content" ON public.member_content
FOR SELECT
USING ((auth.uid() IS NOT NULL) AND (is_active = true));