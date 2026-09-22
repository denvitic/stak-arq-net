import React, { useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import { useCms } from '@/src/context/CmsContext';
import { useAuth } from '@/src/context/AuthContext';
import { AtelierInfo } from '@/src/types';
import { ImagePickerInput } from '@/src/dashboard/src/components/ImagePickerInput';
import {
  getSupabaseProjectRef,
  isSupabaseConfigured,
  checkSupabaseHealth,
  SupabaseHealthResult,
  supabaseUrl,
  supabaseAnonKey,
} from '@/src/lib/supabase';

export default function SettingsManager() {
  const { atelierInfo, updateAtelierInfo, isSupabaseLive, seedSupabaseInitialData } = useCms();
  const { user, isAdminRegistrationLocked, setAdminRegistrationLocked } = useAuth();
  const [formData, setFormData] = useState<AtelierInfo>(() => ({
    ...atelierInfo,
    seoMeta: {
      metaTitle: atelierInfo.seoMeta?.metaTitle || 'STAK Arquitectura & Design de Interiores | Luanda, Angola',
      metaDescription: atelierInfo.seoMeta?.metaDescription || 'Gabinete de arquitectura de autor e design de ambientes de alto padrão em Luanda. Projectos residenciais, sedes corporativas, urbanismo e fiscalização.',
      metaKeywords: atelierInfo.seoMeta?.metaKeywords || 'arquitectura luanda, arquitectos angola, design de interiores talatona, projectos residenciais luxo, fiscalização obras angola, atelier arquitectura luanda',
      ogImage: atelierInfo.seoMeta?.ogImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      author: atelierInfo.seoMeta?.author || 'STAK Arquitectura & Design de Interiores',
    },
  }));

  const [activeTab, setActiveTab] = useState<'branding' | 'seo' | 'contacts' | 'stats' | 'supabase' | 'email'>('branding');
  const [isSaved, setIsSaved] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [copiedQuickFix, setCopiedQuickFix] = useState(false);
  const [healthStatus, setHealthStatus] = useState<SupabaseHealthResult | null>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);

  // Email & Resend diagnostic states
  const [emailStatus, setEmailStatus] = useState<{
    status?: string;
    resendConfigured?: boolean;
    sender?: string;
    recipient?: string;
  } | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [emailTestResult, setEmailTestResult] = useState<{
    success: boolean;
    delivered?: boolean;
    message: string;
    details?: any;
    error?: string;
  } | null>(null);

  const checkEmailStatus = async () => {
    setIsCheckingEmail(true);
    try {
      let res = await fetch('/api/send-briefing');
      if (res.status === 404) {
        res = await fetch('/.netlify/functions/send-briefing');
      }
      if (res.ok) {
        const data = await res.json();
        setEmailStatus(data);
      }
    } catch {
      // ignore
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleTestEmail = async () => {
    setIsTestingEmail(true);
    setEmailTestResult(null);
    const targetEmail = formData.briefingNotificationEmail || 'denvitc@gmail.com';
    const testPayload = {
      clientName: 'Diagnóstico Técnico STAK',
      clientEmail: targetEmail,
      recipientEmail: targetEmail,
      clientPhone: '+244 928 000 000',
      projectType: 'Teste de Entrega Resend',
      location: 'Talatona, Luanda',
      estimatedArea: '350 m²',
      budgetRange: 'Validação de Sistema',
      timeline: 'Imediato',
      description:
        'Mensagem automática de teste gerada a partir do Painel Administrativo do Atelier STAK para verificar a integridade do despachante de e-mail Resend.',
    };

    try {
      let res = await fetch('/api/send-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPayload),
      });
      if (res.status === 404) {
        res = await fetch('/.netlify/functions/send-briefing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testPayload),
        });
      }
      const data = await res.json();
      setEmailTestResult(data);
      await checkEmailStatus();
    } catch (err: any) {
      setEmailTestResult({
        success: false,
        message: 'Erro ao contactar a API de envio: ' + (err?.message || 'Erro de rede'),
      });
    } finally {
      setIsTestingEmail(false);
    }
  };

  const verifyConnection = async () => {
    setIsCheckingHealth(true);
    try {
      const res = await checkSupabaseHealth();
      setHealthStatus(res);
    } catch {
      setHealthStatus({
        isConfigured: false,
        canConnect: false,
        status: 'error',
        message: 'Erro inesperado ao verificar ligação.',
        projectRef: getSupabaseProjectRef(),
      });
    } finally {
      setIsCheckingHealth(false);
    }
  };

  React.useEffect(() => {
    if (activeTab === 'supabase' && !healthStatus) {
      verifyConnection();
    }
    if (activeTab === 'email' && !emailStatus) {
      checkEmailStatus();
    }
  }, [activeTab]);

  const handleSeed = async () => {
    setIsSeeding(true);
    setSeedResult(null);
    try {
      const result = await seedSupabaseInitialData();
      setSeedResult(result);
    } catch (err: any) {
      setSeedResult({ success: false, message: err?.message || 'Erro ao sincronizar dados.' });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleCopyQuickFix = () => {
    const quickFixSql = `-- ==============================================================================
-- CORRECÇÃO RÁPIDA: ADICIONAR COLUNAS QUE FALTAM NA TABELA PROJECTS
-- ==============================================================================
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS category_label TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS cover_image TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS before_image TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS after_image TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS before_label TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS after_label TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS before_description TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS architectural_concept TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS ficha_tecnica JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS featured_in_before_after BOOLEAN DEFAULT false;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS video_poster TEXT;

-- Recarregar cache de schema do PostgREST
NOTIFY pgrst, 'reload schema';`;

    navigator.clipboard.writeText(quickFixSql);
    setCopiedQuickFix(true);
    setTimeout(() => setCopiedQuickFix(false), 3000);
  };

  const handleCopySchema = () => {
    const schemaSql = `-- ==============================================================================
-- STAK ARQUITECTURA • SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROJECTS TABLE
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

-- Garantir colunas adicionais caso a tabela já existisse previamente
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS category_label TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS cover_image TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS before_image TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS after_image TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS before_label TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS after_label TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS before_description TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS architectural_concept TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS ficha_tecnica JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS featured_in_before_after BOOLEAN DEFAULT false;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS video_poster TEXT;

NOTIFY pgrst, 'reload schema';

-- SERVICES TABLE
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

-- ARTICLES TABLE
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

-- BRIEFINGS TABLE
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

-- ATELIER INFO TABLE
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

-- PAGES CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.pages_content (
  page_key TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  hero JSONB DEFAULT '{}'::jsonb,
  sections JSONB DEFAULT '{}'::jsonb,
  seo JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- MEDIA LIBRARY TABLE
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

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.atelier_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

-- Politicas de Leitura Publica
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

-- Politicas de Insercao de Briefings
DROP POLICY IF EXISTS "Public Insert Briefings" ON public.briefings;
CREATE POLICY "Public Insert Briefings" ON public.briefings FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public Read Briefings" ON public.briefings;
CREATE POLICY "Public Read Briefings" ON public.briefings FOR SELECT USING (true);

-- Politicas de Gestao
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
CREATE POLICY "Manage Media Library" ON public.media_library FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);`;

    navigator.clipboard.writeText(schemaSql);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAtelierInfo(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  const tabs = [
    { id: 'branding', label: 'Logótipos & Favicon', icon: 'solar:palette-round-bold' },
    { id: 'seo', label: 'Metatags Globais & SEO', icon: 'solar:magnifer-bold' },
    { id: 'contacts', label: 'Contactos & Redes Sociais', icon: 'solar:phone-calling-rounded-bold' },
    { id: 'stats', label: 'Métricas & Números Oficiais', icon: 'solar:chart-square-bold' },
    { id: 'supabase', label: 'Base de Dados Supabase', icon: 'solar:database-bold' },
    { id: 'email', label: 'E-mail & Resend', icon: 'solar:letter-bold' },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl pb-16">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold text-[#c6a87c] tracking-widest uppercase">
              Configurações do Sistema
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-serif">
            Definições Gerais do Website & SEO
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Personalize a identidade visual, logótipos em alta definição, favicon do navegador, metatags de indexação e contactos centrais.
          </p>
        </div>

        {isSaved && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200 animate-fade-in">
            <Icon icon="solar:check-circle-bold" width="16" />
            <span>Definições gravadas com sucesso!</span>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === t.id
                ? 'bg-[#c6a87c] text-black shadow-xs font-bold'
                : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Icon icon={t.icon} width="16" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TAB 1: LOGOS & FAVICON */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            {/* Logótipos Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-base font-bold text-gray-900">
                  Logótipos Oficiais do Website
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Carregue os ficheiros oficiais da marca para renderização automática sobre fundos escuros e fundos claros.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Logo Dark (Para fundos escuros / Navbar transparente) */}
                <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-black"></span>
                      Logótipo Principal (Branco / Fundo Escuro)
                    </label>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-200 text-gray-700 rounded-md">
                      Dark / Hero Mode
                    </span>
                  </div>

                  <ImagePickerInput
                    label="Ficheiro do Logótipo Branco"
                    helperText="Recomendado: Formato PNG ou SVG transparente. Proporção 4:1 ou 5:1 (ex: 400x100px). Largura mínima: 300px."
                    value={formData.logoDark || ''}
                    onChange={(url) => setFormData({ ...formData, logoDark: url })}
                    placeholder="/img/Stak-Logo-Original-PNG.png"
                  />

                  {/* Visual Preview Box */}
                  <div className="pt-2">
                    <span className="text-[11px] font-medium text-gray-500 block mb-1">
                      Pré-visualização em fundo escuro:
                    </span>
                    <div className="h-20 bg-[#090a0c] rounded-xl border border-white/10 flex items-center justify-center p-3">
                      <img
                        src={formData.logoDark || '/img/Stak-Logo-Original-PNG.png'}
                        alt="Preview Logo Dark"
                        className="max-h-12 max-w-[220px] object-contain drop-shadow-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/img/Stak-Logo-Original-PNG.png';
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Logo Light (Para fundos claros / Scroll) */}
                <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white border border-gray-300"></span>
                      Logótipo Secundário (Preto / Fundo Claro)
                    </label>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-200 text-gray-700 rounded-md">
                      Light / Scrolled
                    </span>
                  </div>

                  <ImagePickerInput
                    label="Ficheiro do Logótipo Preto"
                    helperText="Recomendado: Formato PNG ou SVG transparente. Proporção 4:1 ou 5:1 (ex: 400x100px)."
                    value={formData.logoLight || ''}
                    onChange={(url) => setFormData({ ...formData, logoLight: url })}
                    placeholder="/img/Stak-Logo-Original-PNG-BLACK.png"
                  />

                  {/* Visual Preview Box */}
                  <div className="pt-2">
                    <span className="text-[11px] font-medium text-gray-500 block mb-1">
                      Pré-visualização em fundo claro:
                    </span>
                    <div className="h-20 bg-[#f8f7f5] rounded-xl border border-gray-300 flex items-center justify-center p-3">
                      <img
                        src={formData.logoLight || '/img/Stak-Logo-Original-PNG-BLACK.png'}
                        alt="Preview Logo Light"
                        className="max-h-12 max-w-[220px] object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/img/Stak-Logo-Original-PNG-BLACK.png';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Favicon Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
              <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    Favicon do Navegador & Ícone do Google
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Ícone que aparece na aba do navegador (Chrome, Safari, Edge) e nos resultados de pesquisa mobile do Google.
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg">
                  Proporção 1:1 Quadrada
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <ImagePickerInput
                    label="Ficheiro do Favicon (Ícone)"
                    helperText="Proporção recomendada: 1:1 Quadrada (32x32px, 64x64px ou 512x512px). Formato PNG ou ICO com fundo transparente."
                    value={formData.favicon || ''}
                    onChange={(url) => setFormData({ ...formData, favicon: url })}
                    placeholder="/favicon.ico ou /img/icon.png"
                  />

                  <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
                    <Icon icon="solar:info-circle-bold" width="18" className="text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Dica de Otimização:</strong> Ao carregar o favicon, o sistema substitui dinamicamente o ícone cinzento padrão do navegador, assegurando a identidade corporativa da STAK nos navegadores dos visitantes.
                    </div>
                  </div>
                </div>

                {/* Browser Tab Simulation Preview */}
                <div className="md:col-span-5 bg-gray-100 p-4 rounded-2xl border border-gray-300 space-y-2">
                  <span className="text-[11px] font-mono uppercase text-gray-600 font-bold tracking-wider block">
                    Simulação da Aba do Navegador:
                  </span>
                  <div className="bg-white rounded-t-xl border border-gray-300 p-2.5 shadow-sm flex items-center gap-2 max-w-[260px]">
                    <div className="w-5 h-5 rounded-sm bg-gray-900 flex items-center justify-center p-0.5 overflow-hidden shrink-0">
                      {formData.favicon ? (
                        <img src={formData.favicon} alt="Favicon" className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-[10px] font-bold text-[#c6a87c]">S</span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-800 truncate">
                      STAK Arquitectura | Luanda
                    </span>
                    <span className="text-gray-400 text-xs ml-auto">×</span>
                  </div>
                  <div className="bg-[#202124] text-white p-2.5 rounded-b-xl text-[11px] font-mono truncate text-gray-400">
                    https://stakarquitectura.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GLOBAL METATAGS & SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-base font-bold text-gray-900">
                  Metatags Globais de Indexação (Google, Redes Sociais & OpenGraph)
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Configure os títulos, descrições e cartões de pré-visualização que aparecem no Google e ao partilhar links no WhatsApp/LinkedIn.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-800">
                      Meta Título Principal (Page Title / Google Snippet)
                    </label>
                    <span className="text-[11px] font-mono text-gray-400">
                      {(formData.seoMeta?.metaTitle || '').length}/70 caracteres
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.seoMeta?.metaTitle || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seoMeta: { ...formData.seoMeta!, metaTitle: e.target.value },
                      })
                    }
                    className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-medium"
                    placeholder="STAK Arquitectura & Design de Interiores | Luanda, Angola"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-800">
                      Meta Descrição (Resumo de Pesquisa Google)
                    </label>
                    <span className="text-[11px] font-mono text-gray-400">
                      {(formData.seoMeta?.metaDescription || '').length}/160 caracteres recomendados
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.seoMeta?.metaDescription || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seoMeta: { ...formData.seoMeta!, metaDescription: e.target.value },
                      })
                    }
                    className="w-full text-xs p-3.5 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none leading-relaxed"
                    placeholder="Gabinete de arquitectura de autor e design de ambientes de alto padrão em Luanda. Projectos residenciais, sedes corporativas, urbanismo e fiscalização..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-800">
                    Palavras-Chave de Pesquisa (Keywords separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={formData.seoMeta?.metaKeywords || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seoMeta: { ...formData.seoMeta!, metaKeywords: e.target.value },
                      })
                    }
                    className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none font-mono"
                    placeholder="arquitectura luanda, arquitectos angola, design de interiores talatona, moradias luxo"
                  />
                </div>

                <ImagePickerInput
                  label="Imagem de Partilha Social (OpenGraph Image / og:image)"
                  helperText="Proporção recomendada: 1200x630px (1.91:1). Esta imagem aparece automaticamente ao colar o link no WhatsApp, Facebook ou LinkedIn."
                  value={formData.seoMeta?.ogImage || ''}
                  onChange={(url) =>
                    setFormData({
                      ...formData,
                      seoMeta: { ...formData.seoMeta!, ogImage: url },
                    })
                  }
                />

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-800">
                    Nome do Autor / Entidade
                  </label>
                  <input
                    type="text"
                    value={formData.seoMeta?.author || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seoMeta: { ...formData.seoMeta!, author: e.target.value },
                      })
                    }
                    className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                    placeholder="STAK Arquitectura & Design de Interiores"
                  />
                </div>
              </div>
            </div>

            {/* LIVE SEO PREVIEWERS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Google SERP Preview */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                <span className="text-[11px] font-mono uppercase text-gray-400 font-bold tracking-wider block">
                  Pré-visualização no Google Search:
                </span>
                <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-xs space-y-1 font-sans">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-700">
                      S
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-800 font-medium leading-none">STAK Arquitectura</div>
                      <div className="text-[10px] text-gray-500 leading-none">https://stakarquitectura.com</div>
                    </div>
                  </div>
                  <h3 className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer line-clamp-1 pt-1">
                    {formData.seoMeta?.metaTitle || 'STAK Arquitectura & Design de Interiores | Luanda'}
                  </h3>
                  <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                    {formData.seoMeta?.metaDescription || 'Gabinete de arquitectura de autor e design de ambientes de alto padrão em Luanda...'}
                  </p>
                </div>
              </div>

              {/* Social Share Card Preview */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                <span className="text-[11px] font-mono uppercase text-gray-400 font-bold tracking-wider block">
                  Pré-visualização no WhatsApp / LinkedIn:
                </span>
                <div className="rounded-xl border border-gray-200 overflow-hidden bg-gray-50 shadow-xs">
                  <div className="aspect-[1.91/1] bg-gray-900 relative">
                    <img
                      src={formData.seoMeta?.ogImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'}
                      alt="OpenGraph Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white space-y-1">
                    <span className="text-[10px] font-mono text-gray-400 uppercase">STAK.AO</span>
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                      {formData.seoMeta?.metaTitle || 'STAK Arquitectura & Design de Interiores'}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-snug">
                      {formData.seoMeta?.metaDescription || 'Projectos residenciais e corporativos de excelência em Luanda.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACTS & SOCIAL */}
        {activeTab === 'contacts' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-base font-bold text-gray-900">
                Contactos Oficiais & Canais de Comunicação
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Informações de contacto exibidas no cabeçalho, rodapé e página de contactos do website.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-800">Nome Oficial do Gabinete</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-800">Slogan / Tagline Institucional</label>
                <input
                  type="text"
                  value={formData.brandTagline}
                  onChange={(e) => setFormData({ ...formData, brandTagline: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-800">Telefone Directo</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-800">WhatsApp Oficial (+244...)</label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-800">E-mail Geral de Contacto (Público no Website)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="geral@stakarquitectura.com"
                  className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-800">E-mail de Notificação de Briefings (Resend)</label>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                    Salvo no Supabase
                  </span>
                </div>
                <input
                  type="email"
                  value={formData.briefingNotificationEmail || ''}
                  onChange={(e) => setFormData({ ...formData, briefingNotificationEmail: e.target.value })}
                  placeholder="denvitc@gmail.com"
                  className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl font-mono focus:border-[#c6a87c] focus:outline-none"
                />
                <p className="text-[10px] text-gray-500">
                  Endereço privado onde chegam as notificações por e-mail dos novos briefings de clientes.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-800">Horário de Atendimento</label>
                <input
                  type="text"
                  value={formData.workingHours}
                  onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-gray-800">Morada Completa</label>
                <input
                  type="text"
                  value={formData.locationAddress}
                  onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-800">Instagram (@utilizador ou link)</label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-800">LinkedIn Institucional (URL)</label>
                <input
                  type="text"
                  value={formData.linkedin || ''}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-800">Facebook Oficial (URL)</label>
                <input
                  type="text"
                  value={formData.facebook || ''}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-gray-200 rounded-xl font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STATS */}
        {activeTab === 'stats' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-base font-bold text-gray-900">
                Métricas & Números Oficiais do Atelier
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Números que demonstram a envergadura e solidez técnica do gabinete nos blocos institucionais.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <label className="text-xs font-semibold text-gray-700">Anos em Luanda</label>
                <input
                  type="text"
                  value={formData.stats.yearsOfExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, yearsOfExperience: e.target.value },
                    })
                  }
                  className="w-full text-base font-bold px-3 py-2 border border-gray-200 rounded-lg bg-white"
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <label className="text-xs font-semibold text-gray-700">Obras Executadas</label>
                <input
                  type="text"
                  value={formData.stats.completedProjects}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, completedProjects: e.target.value },
                    })
                  }
                  className="w-full text-base font-bold px-3 py-2 border border-gray-200 rounded-lg bg-white"
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <label className="text-xs font-semibold text-gray-700">Área Desenvolvida</label>
                <input
                  type="text"
                  value={formData.stats.designedArea}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, designedArea: e.target.value },
                    })
                  }
                  className="w-full text-base font-bold px-3 py-2 border border-gray-200 rounded-lg bg-white"
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <label className="text-xs font-semibold text-gray-700">Prémios & Distinções</label>
                <input
                  type="text"
                  value={formData.stats.architecturalAwards}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, architecturalAwards: e.target.value },
                    })
                  }
                  className="w-full text-base font-bold px-3 py-2 border border-gray-200 rounded-lg bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Supabase Database & Auth */}
        {activeTab === 'supabase' && (
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Icon icon="solar:database-bold" width="18" className="text-[#c6a87c]" />
                  <span>Base de Dados PostgreSQL & Conexão Supabase</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Diagnóstico de ligação, chaves de API, tabelas na nuvem e persistência de dados.
                </p>
              </div>

              <button
                type="button"
                onClick={verifyConnection}
                disabled={isCheckingHealth}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                <Icon
                  icon={isCheckingHealth ? 'solar:refresh-linear' : 'solar:tuning-square-2-bold'}
                  width="15"
                  className={isCheckingHealth ? 'animate-spin' : ''}
                />
                <span>{isCheckingHealth ? 'A diagnosticar...' : 'Testar Conexão Agora'}</span>
              </button>
            </div>

            {/* Connection Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-1.5">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Estado da Ligação</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      healthStatus?.canConnect
                        ? 'bg-emerald-500 animate-pulse'
                        : healthStatus?.status === 'unregistered_key'
                        ? 'bg-amber-500 animate-pulse'
                        : 'bg-rose-500'
                    }`}
                  />
                  <span className="text-sm font-bold text-gray-900">
                    {healthStatus
                      ? healthStatus.canConnect
                        ? 'Conectado e Operacional'
                        : healthStatus.status === 'unregistered_key'
                        ? 'Chave Não Registada (401)'
                        : healthStatus.status === 'missing_tables'
                        ? 'Tabelas em Falta'
                        : 'Erro de Conexão'
                      : isSupabaseConfigured()
                      ? 'Supabase Configurado'
                      : 'Não Configurado'}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  {healthStatus?.canConnect
                    ? 'Leitura e escrita no PostgreSQL activas'
                    : healthStatus?.status === 'unregistered_key'
                    ? 'Necessário actualizar a anon key pública'
                    : isSupabaseLive
                    ? 'Sincronizado'
                    : 'A aguardar validação'}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-1.5">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Project Reference</span>
                <div className="font-mono text-sm font-bold text-gray-900 truncate">
                  {getSupabaseProjectRef() || 'fxdcearoepqdhycfwtcq'}
                </div>
                <p className="text-[11px] text-gray-500">ID do Projecto no Supabase</p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-1.5">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Sessão CMS</span>
                <div className="text-sm font-bold text-gray-900 truncate">
                  {user?.email || 'Administrador (Sessão Activa)'}
                </div>
                <p className="text-[11px] text-emerald-600 font-medium">Permissões de Gestão</p>
              </div>
            </div>

            {/* Diagnostic Alert Box */}
            {healthStatus && (
              <div
                className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
                  healthStatus.canConnect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : healthStatus.status === 'unregistered_key'
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Icon
                    icon={
                      healthStatus.canConnect
                        ? 'solar:check-circle-bold'
                        : healthStatus.status === 'unregistered_key'
                        ? 'solar:danger-triangle-bold'
                        : 'solar:close-circle-bold'
                    }
                    width="20"
                    className="shrink-0"
                  />
                  <span>{healthStatus.message}</span>
                </div>

                {healthStatus.hint && (
                  <p className="text-xs font-normal opacity-90 pl-7">{healthStatus.hint}</p>
                )}

                {healthStatus.status === 'unregistered_key' && (
                  <div className="mt-3 pl-7 pt-2 border-t border-amber-200/60 space-y-2 text-xs">
                    <p className="font-semibold text-amber-950">
                      O que fazer para resolver e ligar o Supabase no Netlify, Vercel e Localmente:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-amber-900">
                      <li>
                        Aceda ao seu painel:{' '}
                        <a
                          href={`https://supabase.com/dashboard/project/${getSupabaseProjectRef()}/settings/api`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="font-bold underline text-amber-950 inline-flex items-center gap-1"
                        >
                          Supabase Project Settings &rarr; API
                          <Icon icon="solar:arrow-right-up-linear" width="12" />
                        </a>
                      </li>
                      <li>
                        Copie a chave <strong>anon</strong> / <strong>public</strong> (começada por{' '}
                        <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">eyJhbGci...</code>).
                      </li>
                      <li>
                        No ficheiro local <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env</code>,
                        substitua o valor de <code className="font-mono">VITE_SUPABASE_ANON_KEY</code>.
                      </li>
                      <li>
                        No <strong>Netlify</strong> (Site configuration &rarr; Environment variables) ou na <strong>Vercel</strong> (Project Settings &rarr; Environment Variables),
                        adicione as variáveis:
                        <ul className="list-disc list-inside pl-4 mt-1 space-y-0.5 font-mono text-[11px]">
                          <li>
                            VITE_SUPABASE_URL ={' '}
                            {supabaseUrl || `https://${getSupabaseProjectRef()}.supabase.co`}
                          </li>
                          <li>VITE_SUPABASE_ANON_KEY = [a sua chave anon pública]</li>
                        </ul>
                      </li>
                      <li>
                        Faça um novo <strong>Trigger deploy / Redeploy</strong> no Netlify para que as variáveis entrem em vigor.
                      </li>
                    </ol>
                  </div>
                )}
              </div>
            )}

            {/* Seed / Synchronization Section */}
            <div className="p-5 rounded-xl border border-[#c6a87c]/30 bg-[#c6a87c]/5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Icon icon="solar:refresh-circle-bold" width="18" className="text-[#c6a87c]" />
                    <span>Sincronização / Seed de Dados Iniciais</span>
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5 max-w-xl">
                    Transfira todos os projectos, serviços, artigos, briefings e dados institucionais para as tabelas PostgreSQL no Supabase.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSeed}
                  disabled={isSeeding}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50 shrink-0"
                >
                  <Icon
                    icon={isSeeding ? 'solar:refresh-linear' : 'solar:upload-track-2-bold'}
                    width="16"
                    className={isSeeding ? 'animate-spin' : ''}
                  />
                  <span>{isSeeding ? 'A sincronizar...' : 'Sincronizar com Supabase'}</span>
                </button>
              </div>

              {seedResult && (
                <div
                  className={`p-3 rounded-lg text-xs font-medium border flex items-start gap-2 ${
                    seedResult.success
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  <Icon
                    icon={seedResult.success ? 'solar:check-circle-bold' : 'solar:danger-triangle-bold'}
                    width="16"
                    className="shrink-0 mt-0.5"
                  />
                  <span>{seedResult.message}</span>
                </div>
              )}
            </div>

            {/* Registration Security & User Management Notice */}
            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/70 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:shield-check-bold" width="18" className="text-emerald-600" />
                    <h3 className="text-sm font-bold text-gray-900">
                      Gestão Centralizada de Utilizadores & Segurança
                    </h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                      Registo Público Fechado
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 max-w-xl">
                    O ecrã de login não permite criação pública de contas. Apenas os administradores autenticados podem cadastrar novos membros da equipa técnica através do módulo de Utilizadores.
                  </p>
                </div>

                <Link
                  to="/users"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-gray-900 hover:bg-black text-white transition-all cursor-pointer shrink-0"
                >
                  <Icon icon="solar:users-group-two-rounded-bold" width="14" />
                  <span>Gerir Utilizadores</span>
                </Link>
              </div>
            </div>

            {/* Quick Fix Column Alert */}
            <div className="border border-amber-200 bg-amber-50/70 rounded-xl p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:shield-warning-bold" width="18" className="text-amber-600" />
                    <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      Correção Rápida: Colunas em Falta (Ex: 'after_image')
                    </h3>
                  </div>
                  <p className="text-xs text-amber-900/90">
                    Se a tabela <code>projects</code> já existia antes, execute este comando de 1 clique no SQL Editor para adicionar todas as novas colunas e atualizar o cache do Supabase:
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyQuickFix}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <Icon icon={copiedQuickFix ? 'solar:check-circle-bold' : 'solar:copy-bold'} width="14" />
                  <span>{copiedQuickFix ? 'Copiado!' : 'Copiar Comando de Correção'}</span>
                </button>
              </div>

              <div className="bg-amber-950/90 text-amber-100 p-2.5 rounded-lg font-mono text-[10px] overflow-x-auto">
                <pre>{`ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS category_label TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS cover_image TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS before_image TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS after_image TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS before_label TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS after_label TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS before_description TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS architectural_concept TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS ficha_tecnica JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS featured_in_before_after BOOLEAN DEFAULT false;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS video_poster TEXT;
NOTIFY pgrst, 'reload schema';`}</pre>
              </div>
            </div>

            {/* SQL Schema helper */}
            <div className="border border-gray-200 rounded-xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Script SQL para Criação das Tabelas & Políticas RLS
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Execute este script no SQL Editor do Supabase Dashboard para criar todas as tabelas e políticas de acesso:
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopySchema}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    <Icon icon={copiedSchema ? 'solar:check-circle-bold' : 'solar:copy-bold'} width="14" />
                    <span>{copiedSchema ? 'Copiado!' : 'Copiar Script SQL Completo'}</span>
                  </button>
                  <a
                    href={`https://supabase.com/dashboard/project/${getSupabaseProjectRef()}/sql`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Abrir SQL Editor Supabase</span>
                    <Icon icon="solar:arrow-right-up-linear" width="14" />
                  </a>
                </div>
              </div>

              <div className="bg-gray-900 text-gray-200 p-3 rounded-lg font-mono text-[11px] overflow-x-auto max-h-48 scrollbar-thin">
                <pre>{`-- Tabelas geridas:
1. public.projects (id, slug, title, category, typology, location, year, cover_image, etc.)
2. public.services (id, code, title, tagline, description, deliverables, cta_label, etc.)
3. public.articles (id, title, category, date, read_time, image, excerpt, content, etc.)
4. public.briefings (id, client_name, client_email, client_phone, project_type, budget, etc.)
5. public.atelier_info (id, name, tagline, manifesto, email, phone, address, etc.)
6. public.pages_content (page_key, title, subtitle, hero, sections, seo, etc.)
7. public.media_library (id, name, url, type, size, category, uploaded_at, etc.)

-- Políticas de Row Level Security (RLS) configuradas para leitura pública e escrita via CMS.`}</pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Email & Resend Notifications */}
        {activeTab === 'email' && (
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Icon icon="solar:letter-bold" width="18" className="text-[#c6a87c]" />
                  <span>Notificações por E-mail (Resend API)</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Despacho automático de cópias de novos formulários de briefing e pedidos de consulta preenchidos no website.
                </p>
              </div>

              <button
                type="button"
                onClick={checkEmailStatus}
                disabled={isCheckingEmail}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                <Icon
                  icon={isCheckingEmail ? 'solar:refresh-linear' : 'solar:tuning-square-2-bold'}
                  width="15"
                  className={isCheckingEmail ? 'animate-spin' : ''}
                />
                <span>{isCheckingEmail ? 'A verificar...' : 'Actualizar Estado'}</span>
              </button>
            </div>

            {/* Direct Configuration Card: Notification Destination Email */}
            <div className="p-5 sm:p-6 rounded-2xl border-2 border-[#c6a87c]/40 bg-gradient-to-br from-[#c6a87c]/5 to-transparent space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      E-mail de Destino dos Briefings
                    </h3>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-300">
                      Sincronizado no Supabase
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Insira aqui o e-mail onde deseja receber as notificações de novos briefings e pedidos de consulta submetidos no website.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    updateAtelierInfo(formData);
                    setIsSaved(true);
                    setTimeout(() => setIsSaved(false), 3500);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
                >
                  <Icon icon="solar:disk-bold" width="16" className="text-[#c6a87c]" />
                  <span>Guardar E-mail no Supabase</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div className="sm:col-span-2">
                  <input
                    type="email"
                    value={formData.briefingNotificationEmail || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        briefingNotificationEmail: e.target.value,
                      })
                    }
                    placeholder="denvitc@gmail.com"
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl font-mono text-gray-900 focus:border-[#c6a87c] focus:outline-none shadow-2xs font-semibold"
                  />
                </div>
                <div className="text-[11px] text-gray-500 font-mono truncate">
                  Destinatário activo: <strong className="text-gray-800">{formData.briefingNotificationEmail || 'denvitc@gmail.com'}</strong>
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2.5">
                <Icon icon="solar:info-circle-bold" width="16" className="text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Nota sobre o Resend (Plano Gratuito / Onboarding):</strong> Caso esteja a usar o remetente de teste (<code>onboarding@resend.dev</code>), o Resend entrega para a conta associada (<code>denvitc@gmail.com</code>). Assim que registar o domínio próprio do atelier no painel do Resend, poderá redireccionar livremente para qualquer endereço institucional.
                </p>
              </div>
            </div>

            {/* Email Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-1.5">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Chave Resend API
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      emailStatus?.resendConfigured ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  <span className="text-sm font-bold text-gray-900">
                    {emailStatus?.resendConfigured ? 'Configurada' : 'Pendente no .env'}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  {emailStatus?.resendConfigured
                    ? 'A chave RESEND_API_KEY foi detectada no ambiente do servidor.'
                    : 'Aguardando definição da chave RESEND_API_KEY no ficheiro .env ou servidor.'}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-1.5">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  E-mail de Destino
                </span>
                <div className="flex items-center gap-2">
                  <Icon icon="solar:inbox-line-bold" width="16" className="text-gray-700" />
                  <span className="text-xs font-mono font-bold text-gray-900 truncate">
                    {formData.briefingNotificationEmail || emailStatus?.recipient || 'denvitc@gmail.com'}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Recebe o alerta formatado em HTML com todos os detalhes do cliente.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-1.5">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Remetente Autorizado
                </span>
                <div className="flex items-center gap-2">
                  <Icon icon="solar:plain-bold" width="16" className="text-[#c6a87c]" />
                  <span className="text-xs font-mono font-bold text-gray-900 truncate">
                    {emailStatus?.sender || 'onboarding@resend.dev'}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Domínio de teste do Resend ou o seu domínio personalizado verificado.
                </p>
              </div>
            </div>

            {/* Test Trigger Card */}
            <div className="p-5 rounded-xl border border-[#c6a87c]/30 bg-[#c6a87c]/5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <Icon icon="solar:play-circle-bold" width="16" className="text-[#c6a87c]" />
                    <span>Disparar E-mail de Teste de Diagnóstico</span>
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Envia um pedido de teste real para o endpoint{' '}
                    <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 font-mono text-[11px]">
                      /api/send-briefing
                    </code>{' '}
                    para validar a entrega na caixa de entrada.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleTestEmail}
                  disabled={isTestingEmail}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs rounded-xl shadow-xs cursor-pointer transition-all disabled:opacity-50 shrink-0"
                >
                  <Icon
                    icon={isTestingEmail ? 'solar:refresh-linear' : 'solar:letter-unread-bold'}
                    width="16"
                    className={isTestingEmail ? 'animate-spin' : ''}
                  />
                  <span>{isTestingEmail ? 'A enviar teste...' : 'Enviar E-mail de Teste'}</span>
                </button>
              </div>

              {emailTestResult && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-2 animate-fade-in ${
                    emailTestResult.delivered
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : emailTestResult.success
                      ? 'bg-blue-50 border-blue-200 text-blue-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    <Icon
                      icon={
                        emailTestResult.delivered
                          ? 'solar:check-circle-bold'
                          : emailTestResult.success
                          ? 'solar:info-circle-bold'
                          : 'solar:danger-circle-bold'
                      }
                      width="16"
                    />
                    <span>{emailTestResult.message}</span>
                  </div>
                  {emailTestResult.details && (
                    <div className="text-[11px] font-mono bg-white/70 p-2.5 rounded-lg border border-current/10 overflow-x-auto">
                      <pre>
                        {typeof emailTestResult.details === 'string'
                          ? emailTestResult.details
                          : JSON.stringify(emailTestResult.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Resend Free Tier Rule Explanatory Card */}
            <div className="p-4 rounded-xl border border-gray-200 bg-amber-50/60 text-xs text-amber-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <Icon icon="solar:info-circle-bold" width="16" />
                <span>Regra Essencial do Resend (Plano Gratuito)</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Ao utilizar o remetente gratuito padrão (<code className="font-mono bg-amber-100 px-1 py-0.5 rounded">onboarding@resend.dev</code>),
                o serviço do Resend apenas permite entregar e-mails <strong>no próprio endereço de e-mail associado à sua conta do Resend</strong> (por exemplo: <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">denvitic@gmail.com</code>).
                Para enviar notificações para outros e-mails do atelier, adicione e verifique o domínio da empresa no painel do Resend em <em>Domains</em>.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://resend.com/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-amber-900 underline hover:text-amber-950"
                >
                  <span>Obter ou verificar chave no Resend.com</span>
                  <Icon icon="solar:arrow-right-up-linear" width="13" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Todas as alterações são aplicadas e sincronizadas imediatamente no website público.
          </span>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Icon icon="solar:check-circle-bold" width="16" />
            <span>Guardar Definições Gerais</span>
          </button>
        </div>
      </form>
    </div>
  );
}
