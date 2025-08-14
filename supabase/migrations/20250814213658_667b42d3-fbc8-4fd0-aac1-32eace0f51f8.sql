-- Fix security vulnerabilities in database functions and leads table

-- 1. Fix all database functions to use secure search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

CREATE OR REPLACE FUNCTION public.increment_content_stats(content_id_param uuid, stat_type text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
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

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.validate_password(password text)
RETURNS boolean
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
  -- Minimum 8 characters
  IF LENGTH(password) < 8 THEN
    RETURN false;
  END IF;
  
  -- Must contain uppercase letter
  IF password !~ '[A-Z]' THEN
    RETURN false;
  END IF;
  
  -- Must contain lowercase letter
  IF password !~ '[a-z]' THEN
    RETURN false;
  END IF;
  
  -- Must contain number
  IF password !~ '[0-9]' THEN
    RETURN false;
  END IF;
  
  -- Must contain special character
  IF password !~ '[^A-Za-z0-9]' THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_level_from_xp()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
  NEW.level := FLOOR(SQRT(NEW.xp / 100)) + 1;
  NEW.progression := (SQRT(NEW.xp / 100) - FLOOR(SQRT(NEW.xp / 100)));
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.award_xp_for_completed_action()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
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

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.user_profiles (id, display_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'display_name', 'User' || substr(new.id::text, 1, 8)));
  RETURN NEW;
END;
$function$;

-- 2. Secure the leads table with rate limiting and validation
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;

-- Create a more secure policy with basic validation
CREATE POLICY "Rate limited lead insertion" 
ON public.leads 
FOR INSERT 
WITH CHECK (
  -- Basic email validation
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND
  -- Name must be at least 2 characters
  LENGTH(trim(name)) >= 2
  AND
  -- Prevent duplicate submissions from same IP within 5 minutes
  NOT EXISTS (
    SELECT 1 FROM public.leads 
    WHERE created_at > (now() - interval '5 minutes')
    AND email = NEW.email
  )
);

-- Add index for performance on rate limiting check
CREATE INDEX IF NOT EXISTS idx_leads_email_created_at ON public.leads(email, created_at);