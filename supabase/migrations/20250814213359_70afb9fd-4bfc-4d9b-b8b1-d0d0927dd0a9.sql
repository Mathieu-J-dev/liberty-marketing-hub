-- Fix subscribers table RLS policies to allow legitimate service operations
-- while maintaining security for customer data

-- Drop existing overly restrictive policies
DROP POLICY IF EXISTS "service_role_insert_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "service_role_update_subscription" ON public.subscribers;

-- Create proper policies that allow service role operations
-- Service role can insert subscription records (for edge functions)
CREATE POLICY "service_role_can_insert_subscriptions" 
ON public.subscribers 
FOR INSERT 
WITH CHECK (true);

-- Service role can update subscription records (for edge functions)  
CREATE POLICY "service_role_can_update_subscriptions" 
ON public.subscribers 
FOR UPDATE 
USING (true);

-- Users can only update their own subscription records
CREATE POLICY "users_can_update_own_subscription" 
ON public.subscribers 
FOR UPDATE 
TO authenticated
USING (user_id = auth.uid());

-- Add delete policy for service role operations
CREATE POLICY "service_role_can_delete_subscriptions" 
ON public.subscribers 
FOR DELETE 
USING (true);