-- Fix critical security vulnerability in leads table
-- Currently ANY authenticated user can view all customer emails and names
-- This is a serious privacy breach that could enable data theft

-- Drop the existing unsafe SELECT policy that allows all authenticated users
DROP POLICY "Authenticated users can view leads" ON public.leads;

-- Create a secure SELECT policy that only allows admins to view lead data
-- This protects customer email addresses from unauthorized access
CREATE POLICY "Only admins can view leads" ON public.leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Keep the public insert policy - needed for capture forms to work
-- The "Public can insert leads" policy remains unchanged as it's needed for lead generation