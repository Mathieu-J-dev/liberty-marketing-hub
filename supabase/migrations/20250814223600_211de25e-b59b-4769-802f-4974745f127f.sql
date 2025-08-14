-- Fix RLS policy to allow public access to active affiliate programs
DROP POLICY IF EXISTS "Authenticated users can view active affiliate programs" ON public.affiliate_programs;

CREATE POLICY "Anyone can view active affiliate programs" 
ON public.affiliate_programs
FOR SELECT 
USING (is_active = true);