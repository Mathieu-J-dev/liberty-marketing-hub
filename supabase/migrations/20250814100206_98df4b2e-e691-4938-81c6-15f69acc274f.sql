-- Fix critical security vulnerability in subscribers table RLS policies
-- Drop existing unsafe policies
DROP POLICY "insert_subscription" ON public.subscribers;
DROP POLICY "update_own_subscription" ON public.subscribers;

-- Create secure policies that only allow edge functions to modify subscription data
-- Edge functions use service role key which bypasses RLS, so these policies protect against regular user access

-- Only allow service role (edge functions) to insert subscription data
CREATE POLICY "service_role_insert_subscription" ON public.subscribers
FOR INSERT
WITH CHECK (false); -- This effectively blocks regular users, only service role can bypass

-- Only allow service role (edge functions) to update subscription data  
CREATE POLICY "service_role_update_subscription" ON public.subscribers
FOR UPDATE
USING (false); -- This effectively blocks regular users, only service role can bypass

-- Keep the existing SELECT policy which is properly secured
-- Users can still read their own subscription data via the existing policy:
-- "select_own_subscription" allows users to view only their own records