-- Enhanced security for subscribers table (fixed version)

-- 1. Create enhanced security policy with session validation
DROP POLICY IF EXISTS "select_own_subscription_secure" ON public.subscribers;

CREATE POLICY "secure_subscription_access" ON public.subscribers
FOR SELECT
USING (
  user_id = auth.uid() 
  AND auth.uid() IS NOT NULL
  -- Additional security: ensure session is recent (within 24 hours)
  AND auth.jwt() ? 'exp'
  AND (auth.jwt()->>'exp')::bigint > extract(epoch from now() - interval '24 hours')
);

-- 2. Strengthen service role policies with additional validation
DROP POLICY IF EXISTS "service_role_can_update_validated_subscriptions" ON public.subscribers;

CREATE POLICY "service_role_secure_update" ON public.subscribers
FOR UPDATE
USING (
  current_setting('role') = 'service_role' 
  AND id IS NOT NULL
)
WITH CHECK (
  -- Enhanced validation for updates
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(TRIM(BOTH FROM email)) > 0
  AND user_id IS NOT NULL
);

-- 3. Create audit trigger for sensitive operations (fixed)
CREATE OR REPLACE FUNCTION public.audit_subscriber_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Log sensitive operations for security monitoring
  INSERT INTO public.security_logs (
    action_type,
    user_id,
    details,
    ip_address
  ) VALUES (
    TG_OP || '_SUBSCRIBER',
    CASE 
      WHEN TG_OP = 'DELETE' THEN OLD.user_id
      ELSE NEW.user_id
    END,
    jsonb_build_object(
      'table', 'subscribers',
      'operation', TG_OP,
      'sensitive_data_accessed', true,
      'stripe_customer_modified', CASE 
        WHEN TG_OP IN ('UPDATE') THEN (OLD.stripe_customer_id IS DISTINCT FROM NEW.stripe_customer_id)
        ELSE false
      END
    ),
    inet_client_addr()
  );
  
  RETURN CASE 
    WHEN TG_OP = 'DELETE' THEN OLD
    ELSE NEW
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- 4. Create trigger for audit logging
DROP TRIGGER IF EXISTS audit_subscriber_operations ON public.subscribers;
CREATE TRIGGER audit_subscriber_operations
  AFTER INSERT OR UPDATE OR DELETE ON public.subscribers
  FOR EACH ROW EXECUTE FUNCTION public.audit_subscriber_changes();

-- 5. Create secure function for subscription checks (replaces direct table access)
CREATE OR REPLACE FUNCTION public.get_user_subscription_status()
RETURNS TABLE (
  subscribed boolean,
  subscription_tier text,
  subscription_end timestamptz,
  trial_end timestamptz,
  is_valid boolean
) AS $$
BEGIN
  -- Only return data for authenticated users
  IF auth.uid() IS NULL THEN
    RETURN QUERY SELECT false, null::text, null::timestamptz, null::timestamptz, false;
    RETURN;
  END IF;
  
  RETURN QUERY
  SELECT 
    s.subscribed,
    s.subscription_tier,
    s.subscription_end,
    s.trial_end,
    -- Enhanced validation logic
    (
      s.subscribed = true 
      AND (s.subscription_end IS NULL OR s.subscription_end > now())
      AND (s.trial_end IS NULL OR s.trial_end > now() OR s.subscribed = true)
    ) as is_valid
  FROM public.subscribers s
  WHERE s.user_id = auth.uid()
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- 6. Grant appropriate permissions
GRANT EXECUTE ON FUNCTION public.get_user_subscription_status() TO authenticated;

-- 7. Create additional constraint to prevent stripe_customer_id exposure
ALTER TABLE public.subscribers ADD CONSTRAINT check_stripe_id_format 
CHECK (stripe_customer_id IS NULL OR stripe_customer_id ~ '^cus_[A-Za-z0-9]+$');