-- Activamos RLS: por defecto, nadie puede ver ni escribir nada hasta que lo permitamos explícitamente
alter table public.profiles enable row level security;
alter table public.entries enable row level security;

-- Cualquier usuario autenticado (solo ustedes dos van a existir) puede ver ambos perfiles
create policy "Los dos pueden ver perfiles"
  on public.profiles for select
  using (auth.role() = 'authenticated');

-- Cada uno solo puede editar su propio perfil
create policy "Cada uno edita solo su perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Cualquier usuario autenticado puede LEER todas las entradas (así se ven las del otro)
create policy "Los dos pueden leer todas las entradas"
  on public.entries for select
  using (auth.role() = 'authenticated');

-- Cada uno solo puede CREAR entradas a su propio nombre
create policy "Solo puedo crear mis propias entradas"
  on public.entries for insert
  with check (auth.uid() = author_id);

-- Cada uno solo puede EDITAR sus propias entradas (no las del otro)
create policy "Solo edito mis propias entradas"
  on public.entries for update
  using (auth.uid() = author_id);