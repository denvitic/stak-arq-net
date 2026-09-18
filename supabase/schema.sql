-- ==============================================================================
-- STAK ARQUITECTURA • SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================
-- Execute este script no SQL Editor do Supabase (https://supabase.com/dashboard/project/_/sql)
-- Este script é idempotente: pode ser executado várias vezes sem dar erros.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  category_label TEXT,
  typology TEXT,
  location TEXT NOT NULL,
  year TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  cover_image TEXT,
  before_image TEXT,
  after_image TEXT,
  before_label TEXT,
  after_label TEXT,
  before_description TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  concept TEXT,
  architectural_concept TEXT,
  ficha_tecnica JSONB DEFAULT '{}'::jsonb,
  area TEXT,
  client TEXT,
  status TEXT DEFAULT 'Concluído',
  featured BOOLEAN DEFAULT false,
  featured_in_before_after BOOLEAN DEFAULT false,
  video_url TEXT,
  video_poster TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Garantir colunas adicionais caso a tabela já existisse
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS category_label TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS cover_image TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS before_label TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS after_label TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS before_description TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS architectural_concept TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS ficha_tecnica JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS featured_in_before_after BOOLEAN DEFAULT false;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS video_poster TEXT;

-- 3. SERVICES & ESPECIALIDADES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  deliverables JSONB DEFAULT '[]'::jsonb,
  cta_label TEXT DEFAULT 'Solicitar Proposta',
  cta_action TEXT DEFAULT 'briefing-geral',
  image TEXT NOT NULL,
  typical_duration TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.services ADD COLUMN IF NOT EXISTS cta_action TEXT DEFAULT 'briefing-geral';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS cta_label TEXT DEFAULT 'Solicitar Proposta';

-- 4. ARTICLES TABLE (BLOG / PUBLICAÇÕES)
CREATE TABLE IF NOT EXISTS public.articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  date TEXT NOT NULL,
  read_time TEXT,
  image TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content JSONB DEFAULT '[]'::jsonb,
  author TEXT DEFAULT 'Atelier STAK',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. BRIEFINGS & PROPOSTAS DE CLIENTES
CREATE TABLE IF NOT EXISTS public.briefings (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT NOT NULL,
  client_company TEXT,
  project_type TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  location TEXT,
  estimated_area TEXT,
  description TEXT,
  status TEXT DEFAULT 'Pendente',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS estimated_area TEXT;

-- 6. ATELIER INFO (INFORMAÇÕES INSTITUCIONAIS)
CREATE TABLE IF NOT EXISTS public.atelier_info (
  id TEXT PRIMARY KEY DEFAULT 'stak-main-atelier',
  name TEXT NOT NULL,
  tagline TEXT,
  brand_tagline TEXT,
  manifesto TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  phone_secondary TEXT,
  address TEXT NOT NULL,
  location_address TEXT,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  instagram TEXT,
  linkedin TEXT,
  whatsapp TEXT,
  founded_year TEXT,
  logo TEXT,
  favicon TEXT,
  stats JSONB DEFAULT '[]'::jsonb,
  seo_meta JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.atelier_info ADD COLUMN IF NOT EXISTS brand_tagline TEXT;
ALTER TABLE public.atelier_info ADD COLUMN IF NOT EXISTS location_address TEXT;
ALTER TABLE public.atelier_info ADD COLUMN IF NOT EXISTS logo TEXT;
ALTER TABLE public.atelier_info ADD COLUMN IF NOT EXISTS favicon TEXT;
ALTER TABLE public.atelier_info ADD COLUMN IF NOT EXISTS seo_meta JSONB DEFAULT '{}'::jsonb;

-- 7. PAGES CONTENT (CUSTOMIZADOR DO FRONTWEB)
CREATE TABLE IF NOT EXISTS public.pages_content (
  page_key TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  hero JSONB DEFAULT '{}'::jsonb,
  sections JSONB DEFAULT '{}'::jsonb,
  seo JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. MEDIA LIBRARY TABLE (BIBLIOTECA DE MÍDIA)
CREATE TABLE IF NOT EXISTS public.media_library (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT DEFAULT 'image',
  size TEXT,
  dimensions TEXT,
  category TEXT DEFAULT 'Uploads',
  uploaded_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.media_library ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Uploads';

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Activar RLS em todas as tabelas
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.atelier_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

-- 1. LEITURA PÚBLICA (Qualquer visitante do site pode ler os dados)
DROP POLICY IF EXISTS "Public Read Projects" ON public.projects;
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Services" ON public.services;
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Articles" ON public.articles;
CREATE POLICY "Public Read Articles" ON public.articles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Atelier Info" ON public.atelier_info;
CREATE POLICY "Public Read Atelier Info" ON public.atelier_info FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Pages Content" ON public.pages_content;
CREATE POLICY "Public Read Pages Content" ON public.pages_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Media Library" ON public.media_library;
CREATE POLICY "Public Read Media Library" ON public.media_library FOR SELECT USING (true);

-- 2. INSERÇÃO DE BRIEFINGS (Visitantes do site público podem enviar briefings)
DROP POLICY IF EXISTS "Public Insert Briefings" ON public.briefings;
CREATE POLICY "Public Insert Briefings" ON public.briefings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Briefings" ON public.briefings;
CREATE POLICY "Public Read Briefings" ON public.briefings FOR SELECT USING (true);

-- 3. GESTÃO COMPLETA PELO PAINEL ADMINISTRATIVO (Anon & Authenticated)
-- Isto permite que as operações de Adicionar / Editar / Excluir efectuadas no painel
-- sejam gravadas imediatamente na base de dados do Supabase.
DROP POLICY IF EXISTS "Authenticated Manage Projects" ON public.projects;
DROP POLICY IF EXISTS "Manage Projects" ON public.projects;
CREATE POLICY "Manage Projects" ON public.projects FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated Manage Services" ON public.services;
DROP POLICY IF EXISTS "Manage Services" ON public.services;
CREATE POLICY "Manage Services" ON public.services FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated Manage Articles" ON public.articles;
DROP POLICY IF EXISTS "Manage Articles" ON public.articles;
CREATE POLICY "Manage Articles" ON public.articles FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated Manage Briefings" ON public.briefings;
DROP POLICY IF EXISTS "Manage Briefings" ON public.briefings;
CREATE POLICY "Manage Briefings" ON public.briefings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated Manage Atelier Info" ON public.atelier_info;
DROP POLICY IF EXISTS "Manage Atelier Info" ON public.atelier_info;
CREATE POLICY "Manage Atelier Info" ON public.atelier_info FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated Manage Pages Content" ON public.pages_content;
DROP POLICY IF EXISTS "Manage Pages Content" ON public.pages_content FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated Manage Media Library" ON public.media_library;
DROP POLICY IF EXISTS "Manage Media Library" ON public.media_library;
CREATE POLICY "Manage Media Library" ON public.media_library FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
