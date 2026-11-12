# Kenya Love Connect

Location-based online dating platform for people in Kenya. Create profiles, match with nearby users by GPS/county, swipe, and chat.

## Features (MVP)
- User registration & login (Supabase Auth)
- Profile setup (photos, bio, age, interests, county)
- GPS location tracking & nearby matching
- Swipe / like / match system
- Real-time chat (Supabase Realtime)
- Photo uploads (Supabase Storage)
- Kenya-specific filters (counties, etc.)

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend / DB**: Supabase (PostgreSQL + PostGIS, Auth, Realtime, Storage)
- **Hosting**: Netlify
- **Maps/Location**: Browser Geolocation API + PostGIS for queries

## Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Enable the **PostGIS** extension: Database → Extensions → search PostGIS → Enable.
3. Create the profiles table and functions (run in SQL Editor):

```sql
-- Enable PostGIS if not already
create extension if not exists postgis with schema extensions;

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  age int,
  gender text,
  bio text,
  interests text[],
  county text, -- e.g. Nairobi, Mombasa, Kisumu
  location geography(POINT, 4326),
  avatar_url text,
  created_at timestamptz default now()
);

-- RLS policies (basic)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
on profiles for select using (true);

create policy "Users can insert their own profile"
on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
on profiles for update using (auth.uid() = id);

-- Nearby users function (distance in meters)
create or replace function nearby_users(
  user_lat float,
  user_lng float,
  max_distance_meters int default 50000,
  current_user_id uuid
)
returns table (
  id uuid,
  username text,
  full_name text,
  age int,
  bio text,
  interests text[],
  county text,
  avatar_url text,
  distance_meters float
)
language sql
as $$
  select
    p.id,
    p.username,
    p.full_name,
    p.age,
    p.bio,
    p.interests,
    p.county,
    p.avatar_url,
    st_distance(p.location, st_point(user_lng, user_lat)::geography) as distance_meters
  from profiles p
  where p.id != current_user_id
    and p.location is not null
    and st_dwithin(
      p.location,
      st_point(user_lng, user_lat)::geography,
      max_distance_meters
    )
  order by distance_meters;
$$;
```

4. Create a Storage bucket named `avatars` (public or with RLS).
5. Get your Project URL and Anon Key from Settings → API.

### 2. Local Development
```bash
git clone https://github.com/gachiesamuel14/kenya-love-connect.git
cd kenya-love-connect
npm install
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

### 3. Deploy to Netlify
1. Connect this GitHub repo to a new Netlify site.
2. Add environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Build command: `npm run build`
4. Publish directory: `.next` (or as detected for Next.js).

## Kenya Localization Ideas
- County filters (Nairobi, Mombasa, Kisumu, Kiambu, Nakuru, etc.)
- M-Pesa for premium (via Stripe or local gateway later)
- Sheng language support in bios/chat
- Modes: Student, Professional, Church

## Next Steps
- Implement swipe logic & matches table
- Real-time chat with Supabase
- Photo upload flow
- Safety / report system
- Premium features

Built with love for Kenya 🇰🇪
