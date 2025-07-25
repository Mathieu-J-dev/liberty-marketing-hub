-- Security Fix Phase 1: Critical RLS Fixes

-- 1. Enable RLS on liberty-marketing-hub table and add basic policy
ALTER TABLE public."liberty-marketing-hub" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view liberty-marketing-hub" 
ON public."liberty-marketing-hub" 
FOR SELECT 
USING (auth.role() = 'authenticated'::text);

-- 2. Fix overly permissive subscription UPDATE policy
DROP POLICY IF EXISTS "update_own_subscription" ON public.subscribers;

CREATE POLICY "update_own_subscription" 
ON public.subscribers 
FOR UPDATE 
USING ((user_id = auth.uid()) OR (email = auth.email()));

-- 3. Add missing INSERT policy to user_profiles
CREATE POLICY "Users can insert their own profile" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- 4. Add proper admin policies for actions table (INSERT, UPDATE, DELETE)
CREATE POLICY "Service role can manage actions" 
ON public.actions 
FOR ALL 
USING (auth.role() = 'service_role'::text);

-- Security Fix Phase 2: Database Function Security
-- Update all functions to include proper search_path

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

-- Security Fix Phase 3: Storage Security
-- Add RLS policies for storage.objects

CREATE POLICY "Users can view public avatars and thumbnails" 
ON storage.objects 
FOR SELECT 
USING (bucket_id IN ('avatars', 'thumbnails'));

CREATE POLICY "Users can manage their own avatars" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Authenticated users can view member content" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'member-content' AND auth.role() = 'authenticated'::text);

CREATE POLICY "Admin can manage member content" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'member-content' AND auth.role() = 'service_role'::text);

-- Security Fix Phase 4: Enhanced Role-Based Access Control
-- Create user roles system

CREATE TYPE public.app_role AS ENUM ('admin', 'content_manager', 'user');

CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user roles
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

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Update member_content policies for better role-based access
DROP POLICY IF EXISTS "Admin can manage all content" ON public.member_content;

CREATE POLICY "Content managers can manage all content" 
ON public.member_content 
FOR ALL 
USING (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'content_manager') OR 
  auth.uid() = created_by
);