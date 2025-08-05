-- Fix Starter Pack external URL to use internal route
UPDATE member_content 
SET external_url = NULL,
    file_path = '/espace-membre?tab=starter-pack'
WHERE title = 'Starter Pack Débutant';