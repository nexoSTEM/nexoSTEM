-- Profiles table to track Stripe subscription state per user.
-- Mirrors data also cached in auth.users.raw_user_meta_data for fast client reads,
-- but this table is the source of truth for server-side / webhook writes.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text not null default 'none'
    check (subscription_status in ('none', 'trialing', 'active', 'past_due', 'canceled', 'expired')),
  trial_ends_at timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Service role (used by the Stripe webhook Edge Function) bypasses RLS by default.

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();
