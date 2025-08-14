-- Fix subscribers table security vulnerabilities with service role policies

-- Drop the overly permissive service role policies
DROP POLICY IF EXISTS "service_role_can_delete_subscriptions" ON public.subscribers;
DROP POLICY IF EXISTS "service_role_can_insert_subscriptions" ON public.subscribers;
DROP POLICY IF EXISTS "service_role_can_update_subscriptions" ON public.subscribers;

-- Create more restrictive service role policies with proper validation

-- Allow service role to insert subscriptions only with valid user_id and email
CREATE POLICY "service_role_can_insert_validated_subscriptions" 
ON public.subscribers 
FOR INSERT 
WITH CHECK (
  -- Must be called by service role (bypass for edge functions)
  current_setting('role') = 'service_role'
  AND
  -- Must have valid user_id (not null)
  user_id IS NOT NULL
  AND
  -- Must have valid email format
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND
  -- Email must not be empty
  LENGTH(trim(email)) > 0
);

-- Allow service role to update subscriptions only for existing records with validation
CREATE POLICY "service_role_can_update_validated_subscriptions" 
ON public.subscribers 
FOR UPDATE 
USING (
  -- Must be called by service role
  current_setting('role') = 'service_role'
  AND
  -- Record must already exist (has an id)
  id IS NOT NULL
)
WITH CHECK (
  -- Validate updated data
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND
  LENGTH(trim(email)) > 0
  AND
  -- Don't allow setting user_id to null on updates
  user_id IS NOT NULL
);

-- Restrict delete operations - only allow for data cleanup with specific conditions
CREATE POLICY "service_role_can_delete_inactive_subscriptions" 
ON public.subscribers 
FOR DELETE 
USING (
  -- Must be called by service role
  current_setting('role') = 'service_role'
  AND
  -- Only allow deletion of unsubscribed records older than 7 days
  (
    subscribed = false 
    AND created_at < (now() - interval '7 days')
  )
);

-- Add additional security constraints to the table
ALTER TABLE public.subscribers 
ADD CONSTRAINT check_email_not_empty 
CHECK (LENGTH(trim(email)) > 0);

ALTER TABLE public.subscribers 
ADD CONSTRAINT check_valid_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Ensure user_id is not nullable for security
ALTER TABLE public.subscribers 
ALTER COLUMN user_id SET NOT NULL;