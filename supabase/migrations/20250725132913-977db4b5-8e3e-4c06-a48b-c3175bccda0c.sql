-- Fix remaining security issues

-- 1. Add policy for user_roles table that has RLS enabled but no policies
CREATE POLICY "Users can insert their own roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 2. Fix any remaining functions that might not have proper search_path
-- Check and update has_role function to ensure it has search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Also ensure the handle_new_user function has proper search_path in the trigger context
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.user_profiles (id, display_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'display_name', 'User' || substr(new.id::text, 1, 8)));
  RETURN NEW;
END;
$function$;

-- Update other functions to ensure they all have search_path
CREATE OR REPLACE FUNCTION public.award_xp_for_completed_action()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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