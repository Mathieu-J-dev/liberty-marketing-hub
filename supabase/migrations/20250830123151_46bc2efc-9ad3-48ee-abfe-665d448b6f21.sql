-- Fix CRITICAL security issues with RLS policies

-- 1. Fix member_content premium content exposure
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view active content" ON public.member_content;

-- Create proper policy that respects premium content restrictions
CREATE POLICY "Users can view non-premium content or premium with valid subscription" 
ON public.member_content 
FOR SELECT 
USING (
  (auth.uid() IS NOT NULL) 
  AND (is_active = true) 
  AND (
    (is_premium = false) 
    OR (
      is_premium = true 
      AND EXISTS (
        SELECT 1 FROM public.subscribers 
        WHERE user_id = auth.uid() 
        AND subscribed = true 
        AND (subscription_end IS NULL OR subscription_end > now())
        AND (trial_end IS NULL OR trial_end > now() OR subscribed = true)
      )
    )
  )
);

-- 2. Fix subscribers table - remove user update policy
DROP POLICY IF EXISTS "users_can_update_own_subscription" ON public.subscribers;

-- Users should only be able to read their subscription, not modify it
-- Only service role (edge functions) should be able to update subscriptions

-- 3. Fix actions table - restrict to admin-only operations
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.actions;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.actions;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.actions;

-- Only admins should be able to manage actions
CREATE POLICY "Only admins can insert actions" 
ON public.actions 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update actions" 
ON public.actions 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete actions" 
ON public.actions 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. Harden lead capture - add basic validation
ALTER TABLE public.leads 
ADD CONSTRAINT leads_email_format_check 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.leads 
ADD CONSTRAINT leads_name_not_empty_check 
CHECK (length(trim(name)) > 0);

-- 5. Add rate limiting table for security
CREATE TABLE IF NOT EXISTS public.security_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  ip_address inet,
  action_type text NOT NULL,
  details jsonb,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view security logs" 
ON public.security_logs 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));