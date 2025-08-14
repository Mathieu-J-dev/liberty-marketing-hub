-- Remove public access to actions table to protect gamification strategy
DROP POLICY "Actions are publicly visible" ON public.actions;

-- Create new policy for authenticated users only
CREATE POLICY "Authenticated users can view actions" 
ON public.actions 
FOR SELECT 
TO authenticated
USING (auth.uid() IS NOT NULL);