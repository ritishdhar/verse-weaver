-- Run this in Supabase SQL Editor to create the newsletter_signups table for the Stay Updated form.
create table if not exists newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Optional: allow anonymous inserts (Supabase RLS)
-- alter table newsletter_signups enable row level security;
-- create policy "Allow anonymous insert" on newsletter_signups for insert with (true);
