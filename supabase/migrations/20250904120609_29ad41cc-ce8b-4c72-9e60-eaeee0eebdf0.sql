-- Fix security issue: Remove public access to member_content metadata
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Users can view non-premium content or premium with valid subscr" ON public.member_content;
DROP POLICY IF EXISTS "Premium content requires subscription" ON public.member_content;

-- Create secure RLS policies for member_content
CREATE POLICY "Authenticated users can view active non-premium content"
ON public.member_content
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND is_active = true 
  AND is_premium = false
);

CREATE POLICY "Valid subscribers can view premium content"
ON public.member_content
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND is_active = true 
  AND is_premium = true
  AND EXISTS (
    SELECT 1 FROM public.subscribers 
    WHERE user_id = auth.uid() 
    AND subscribed = true 
    AND (subscription_end IS NULL OR subscription_end > now())
    AND (trial_end IS NULL OR trial_end > now() OR subscribed = true)
  )
);

-- Keep existing admin/content manager policies (they remain secure)
-- Policy "Admins can manage all content" already exists
-- Policy "Content managers can manage all content" already exists