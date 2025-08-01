-- Ajouter les politiques RLS manquantes pour la table liberty-marketing-hub
CREATE POLICY "Enable read access for all users" ON "public"."liberty-marketing-hub"
FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."liberty-marketing-hub"
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for authenticated users only" ON "public"."liberty-marketing-hub"
FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable delete for authenticated users only" ON "public"."liberty-marketing-hub"
FOR DELETE USING (auth.uid() IS NOT NULL);

-- Ajouter les politiques RLS manquantes pour la table actions
CREATE POLICY "Enable insert for authenticated users only" ON "public"."actions"
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for authenticated users only" ON "public"."actions"
FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable delete for authenticated users only" ON "public"."actions"
FOR DELETE USING (auth.uid() IS NOT NULL);

-- Améliorer les politiques pour user_profiles pour éviter les erreurs d'avatar
DROP POLICY IF EXISTS "Enable update for users based on email" ON "public"."user_profiles";

CREATE POLICY "Users can update their own profile" ON "public"."user_profiles"
FOR UPDATE USING (auth.uid() = id);

-- Améliorer les politiques pour le stockage des avatars
CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);