
-- 1) S'assurer que la RLS est activée
alter table public.member_content enable row level security;

-- 2) Supprimer les politiques SELECT existantes trop permissives
drop policy if exists "Premium content requires subscription" on public.member_content;
drop policy if exists "Users can view non-premium content or premium with valid subscr" on public.member_content;

-- 3) Politiques SELECT strictes

-- 3a) Utilisateurs authentifiés peuvent voir le contenu non-premium actif
create policy "Authenticated users can view non-premium active content"
on public.member_content
for select
using (
  auth.uid() is not null
  and is_active = true
  and is_premium = false
);

-- 3b) Abonnés valides peuvent voir le contenu premium actif
--    - abonnement actif OU période d'essai active
create policy "Subscribers can view premium active content"
on public.member_content
for select
using (
  auth.uid() is not null
  and is_active = true
  and is_premium = true
  and exists (
    select 1
    from public.subscribers s
    where s.user_id = auth.uid()
      and s.subscribed = true
      and (
        s.subscription_end is null
        or s.subscription_end > now()
      )
      and (
        s.trial_end is null
        or s.trial_end > now()
        or s.subscribed = true
      )
  )
);

-- NB:
-- - Les politiques ALL existantes pour admin/content_manager/creator
--   ("Admins can manage all content", "Content managers can manage all content")
--   restent en place et couvrent aussi SELECT pour ces rôles.
