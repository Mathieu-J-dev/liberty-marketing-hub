-- Security Fix - Fix storage policies and complete remaining fixes

-- First, let's check and fix storage policies (avoid conflicts)
DO $$ 
BEGIN
    -- Drop existing conflicting policies if they exist
    DROP POLICY IF EXISTS "Authenticated users can view member content" ON storage.objects;
    DROP POLICY IF EXISTS "Users can view public avatars and thumbnails" ON storage.objects;
    DROP POLICY IF EXISTS "Users can manage their own avatars" ON storage.objects;
    DROP POLICY IF EXISTS "Admin can manage member content" ON storage.objects;
END $$;

-- Create storage policies with proper names
CREATE POLICY "Public access to avatars and thumbnails" 
ON storage.objects 
FOR SELECT 
USING (bucket_id IN ('avatars', 'thumbnails'));

CREATE POLICY "Users manage own avatars" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Authenticated users view member content files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'member-content' AND auth.role() = 'authenticated'::text);

CREATE POLICY "Service role manages member content files" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'member-content' AND auth.role() = 'service_role'::text);

-- Add missing triggers for our functions
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_level_on_xp_change ON public.user_profiles;
CREATE TRIGGER update_user_level_on_xp_change
    BEFORE UPDATE OF xp ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_level_from_xp();

DROP TRIGGER IF EXISTS award_xp_on_action_completion ON public.completed_actions;
CREATE TRIGGER award_xp_on_action_completion
    AFTER INSERT ON public.completed_actions
    FOR EACH ROW
    EXECUTE FUNCTION public.award_xp_for_completed_action();

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();