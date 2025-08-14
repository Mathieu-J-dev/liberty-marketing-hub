-- Fix critical security vulnerability in subscribers table SELECT policy
-- The current policy allows users to access other customers' payment data via email matching
-- This is a serious privacy and security breach

-- Drop the existing unsafe SELECT policy
DROP POLICY "select_own_subscription" ON public.subscribers;

-- Create a secure SELECT policy that only allows access based on user_id
-- This ensures users can ONLY see their own subscription data
CREATE POLICY "select_own_subscription_secure" ON public.subscribers
FOR SELECT
USING (user_id = auth.uid());

-- Note: Removing the email-based access (email = auth.email()) part completely
-- as it was the security vulnerability allowing cross-user data access