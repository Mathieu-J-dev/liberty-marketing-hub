-- Secure the leads table and implement rate limiting infrastructure

-- Create rate_limits table to track submissions by IP
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address inet NOT NULL,
  action_type text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT unique_ip_action UNIQUE (ip_address, action_type, created_at)
);

-- Enable RLS on rate_limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can manage rate limits
CREATE POLICY "Service role can manage rate limits"
  ON public.rate_limits
  FOR ALL
  USING (current_setting('role') = 'service_role');

-- Create index for faster rate limit lookups
CREATE INDEX idx_rate_limits_ip_action_time 
  ON public.rate_limits (ip_address, action_type, created_at DESC);

-- Drop the existing public insert policy on leads
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;

-- Create new policy: Only service role can insert leads
CREATE POLICY "Service role can insert leads"
  ON public.leads
  FOR INSERT
  WITH CHECK (current_setting('role') = 'service_role');

-- Function to clean up old rate limit entries (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limits
  WHERE created_at < now() - interval '24 hours';
END;
$$;

-- Add comment for documentation
COMMENT ON TABLE public.rate_limits IS 'Tracks rate limiting for public endpoints to prevent spam and abuse. Entries older than 24 hours should be cleaned up periodically.';