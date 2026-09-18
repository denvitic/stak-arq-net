import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key' &&
    supabaseUrl.startsWith('https://')
  );
};

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return supabaseInstance;
};

export const supabase = getSupabase();

export const getSupabaseProjectRef = (): string => {
  try {
    const url = new URL(supabaseUrl);
    return url.hostname.split('.')[0] || 'fxdcearoepqdhycfwtcq';
  } catch {
    return 'fxdcearoepqdhycfwtcq';
  }
};

export interface SupabaseHealthResult {
  isConfigured: boolean;
  canConnect: boolean;
  status: 'connected' | 'unregistered_key' | 'not_configured' | 'missing_tables' | 'error';
  message: string;
  hint?: string;
  projectRef: string;
}

export const checkSupabaseHealth = async (): Promise<SupabaseHealthResult> => {
  const projectRef = getSupabaseProjectRef();

  if (!isSupabaseConfigured()) {
    return {
      isConfigured: false,
      canConnect: false,
      status: 'not_configured',
      message: 'Variáveis de ambiente do Supabase não configuradas.',
      hint: 'Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no ficheiro .env local e nas variáveis de ambiente da Vercel.',
      projectRef,
    };
  }

  // Detect if key format looks like a secret key or legacy token
  const isKeySecretFormat = supabaseAnonKey.startsWith('sb_secret_');

  const client = getSupabase();
  if (!client) {
    return {
      isConfigured: true,
      canConnect: false,
      status: 'error',
      message: 'Não foi possível inicializar a instância do Supabase.',
      projectRef,
    };
  }

  try {
    const { data, error } = await client.from('projects').select('id').limit(1);

    if (error) {
      const errMsg = error.message || '';
      const errCode = (error as any).code || '';

      if (errMsg.toLowerCase().includes('unregistered api key') || (error as any).status === 401 || errCode === 'PGRST301') {
        return {
          isConfigured: true,
          canConnect: false,
          status: 'unregistered_key',
          message: 'Chave de API rejeitada pelo Supabase ("Unregistered API key" / 401 Unauthorized).',
          hint: isKeySecretFormat
            ? 'A chave actual começa por "sb_secret_", que é uma Secret Key inválida para este projecto. Copie a chave "anon" "public" (JWT começado por eyJ...) no Supabase Dashboard > Project Settings > API.'
            : 'Aceda a Supabase Dashboard > Project Settings > API e copie a chave pública "anon" "public" para VITE_SUPABASE_ANON_KEY.',
          projectRef,
        };
      }

      if (errMsg.toLowerCase().includes('relation "public.projects" does not exist') || errCode === '42P01') {
        return {
          isConfigured: true,
          canConnect: false,
          status: 'missing_tables',
          message: 'Ligação estabelecida, mas as tabelas ainda não foram criadas no Supabase.',
          hint: 'Aceda ao SQL Editor do Supabase Dashboard e execute o script contido em supabase/schema.sql.',
          projectRef,
        };
      }

      return {
        isConfigured: true,
        canConnect: false,
        status: 'error',
        message: `Erro na base de dados Supabase: ${errMsg}`,
        hint: error.hint || 'Verifique as políticas RLS e a estrutura das tabelas.',
        projectRef,
      };
    }

    return {
      isConfigured: true,
      canConnect: true,
      status: 'connected',
      message: 'Ligação à base de dados Supabase PostgreSQL verificada com sucesso!',
      projectRef,
    };
  } catch (err: any) {
    return {
      isConfigured: true,
      canConnect: false,
      status: 'error',
      message: err?.message || 'Falha ao testar conexão ao Supabase.',
      hint: 'Verifique a conectividade de rede e as credenciais fornecidas.',
      projectRef,
    };
  }
};
