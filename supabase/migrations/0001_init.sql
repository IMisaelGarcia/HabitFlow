-- Tabla de perfiles: extiende auth.users con datos visibles
create table public.profiles (
  id uuid references auth.users(id) primary key,
  display_name text not null,
  created_at timestamptz default now()
);

-- Tabla principal: las entradas del diario
create table public.entries (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users(id) not null,
  content text not null,
  mood_score smallint,           -- para futuro: calendario emocional (1-5, nullable por ahora)
  tags text[] default '{}',      -- para futuro: etiquetas
  is_favorite boolean default false, -- para futuro: mensajes favoritos
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Índice para que las consultas por fecha (calendario, historial) sean rápidas
create index entries_created_at_idx on public.entries (created_at desc);