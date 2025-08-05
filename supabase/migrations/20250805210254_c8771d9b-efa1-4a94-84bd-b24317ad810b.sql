-- CRITICAL SECURITY FIXES

-- 1. Fix member_content RLS policies
-- First, drop the broken admin policy
DROP POLICY IF EXISTS "Admin can manage all content" ON member_content;

-- Update any content with NULL created_by to assign to system admin
-- (We'll use the first user in user_roles with admin role, or create one)
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Find an existing admin user
    SELECT user_id INTO admin_user_id 
    FROM user_roles 
    WHERE role = 'admin'::app_role 
    LIMIT 1;
    
    -- If no admin exists, we'll leave them as NULL for now and handle in application
    -- Update NULL created_by to the admin user if one exists
    IF admin_user_id IS NOT NULL THEN
        UPDATE member_content 
        SET created_by = admin_user_id 
        WHERE created_by IS NULL;
    END IF;
END $$;

-- Create proper admin policy for member_content
CREATE POLICY "Admins can manage all content" 
ON member_content 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add subscription-based access for premium content
CREATE POLICY "Premium content requires subscription" 
ON member_content 
FOR SELECT 
USING (
    (is_premium = false) OR 
    (is_premium = true AND EXISTS (
        SELECT 1 FROM subscribers 
        WHERE user_id = auth.uid() 
        AND subscribed = true 
        AND (subscription_end IS NULL OR subscription_end > now())
    ))
);

-- 2. Secure user_roles table
-- Remove the dangerous policy that allows users to assign themselves roles
DROP POLICY IF EXISTS "Users can insert their own roles" ON user_roles;

-- Create admin-only role assignment policy
CREATE POLICY "Only admins can assign roles" 
ON user_roles 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles" 
ON user_roles 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles" 
ON user_roles 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Fix database functions with proper search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
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
SET search_path TO 'public'
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
SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_level_from_xp()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
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

-- 4. Create initial admin user if none exists
-- This will help with the created_by issue for existing content
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'mathieujeanmaire88@gmail.com' -- Current logged in user
AND NOT EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = auth.users.id AND role = 'admin'::app_role
)
LIMIT 1;