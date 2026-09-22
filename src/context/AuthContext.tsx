import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  isConfigured: boolean;
  isAdminRegistrationLocked: boolean;
  setAdminRegistrationLocked: (locked: boolean) => void;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: string | null; message?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null; message?: string }>;
  loginAsDemo: () => void;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_ADMIN_USER: any = {
  id: 'stak-admin-master',
  email: 'stak@denvitic.com',
  user_metadata: {
    full_name: 'Administrador STAK',
    role: 'super_admin',
    department: 'Direcção Geral & Coordenação',
    avatar_url: '',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedDemo = localStorage.getItem('stak_admin_demo_session');
      if (savedDemo === 'true') {
        return DEFAULT_ADMIN_USER;
      }
      const cached = localStorage.getItem('stak_admin_cached_user');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === 'object') {
          // Normalize to stak@denvitic.com if old email
          if (parsed.email === 'denvitic@gmail.com') {
            parsed.email = 'stak@denvitic.com';
          }
          if (parsed.user_metadata) {
            parsed.user_metadata.avatar_url = '';
          }
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return null;
  });
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(() => {
    // If we already have a synchronous user, initial loading is false
    const hasCached =
      localStorage.getItem('stak_admin_demo_session') === 'true' ||
      !!localStorage.getItem('stak_admin_cached_user');
    return !hasCached;
  });
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAdminRegistrationLocked, setIsAdminRegistrationLocked] = useState<boolean>(() => {
    const isLocked = localStorage.getItem('stak_admin_registration_locked');
    const isRegistered = localStorage.getItem('stak_admin_registered');
    return isLocked === 'true' || isRegistered === 'true';
  });

  const configured = isSupabaseConfigured();

  const setAdminRegistrationLocked = (locked: boolean) => {
    setIsAdminRegistrationLocked(locked);
    localStorage.setItem('stak_admin_registration_locked', locked ? 'true' : 'false');
    if (locked) {
      localStorage.setItem('stak_admin_registered', 'true');
    }
  };

  useEffect(() => {
    // Check local storage for persistent demo/admin session
    const savedDemo = localStorage.getItem('stak_admin_demo_session');
    if (savedDemo === 'true') {
      setUser(DEFAULT_ADMIN_USER);
      setLoading(false);
      return;
    }

    if (!configured) {
      setLoading(false);
      return;
    }

    const client = getSupabase();
    if (!client) {
      setLoading(false);
      return;
    }

    // Get current active session from Supabase
    client.auth
      .getSession()
      .then(({ data: { session: currentSession }, error }) => {
        if (error) {
          console.warn('Auth getSession error:', error.message);
        }
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Error fetching auth session:', err);
        setLoading(false);
      });

    // Listen for real-time auth changes (sign in, sign out, token refresh)
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession) {
        localStorage.removeItem('stak_admin_demo_session');
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [configured]);

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    setAuthError(null);
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password;

    if (!normalizedEmail || !trimmedPassword) {
      const err = 'Por favor introduza o e-mail e a palavra-passe.';
      setAuthError(err);
      return { error: err };
    }

    // 1. Direct validation for predefined Master Super Admin account with STRICT password check
    const isMasterAdmin =
      ((normalizedEmail === 'stak@denvitic.com' || normalizedEmail === 'denvitic@gmail.com') &&
        trimmedPassword === 'Admin2026@') ||
      (normalizedEmail === 'admin@stak.ao' &&
        (trimmedPassword === 'stak.arquitectura' ||
          trimmedPassword === 'stak2025' ||
          trimmedPassword === 'admin123'));

    if (isMasterAdmin) {
      setUser(DEFAULT_ADMIN_USER);
      localStorage.setItem('stak_admin_demo_session', 'true');
      localStorage.setItem('stak_admin_cached_user', JSON.stringify(DEFAULT_ADMIN_USER));
      localStorage.setItem('stak_admin_active_view', 'admin');
      localStorage.setItem('stak_admin_registered', 'true');
      localStorage.setItem('stak_admin_registration_locked', 'true');
      setIsAdminRegistrationLocked(true);
      return { error: null };
    }

    // 2. Check registered studio users with STRICT password verification
    let matchedStudioUser: any = null;
    try {
      const savedUsers =
        localStorage.getItem('stak_architects_users_v4') ||
        localStorage.getItem('stak_architects_users_v1');
      if (savedUsers) {
        const parsed = JSON.parse(savedUsers);
        const match = parsed.find(
          (u: any) => u.email?.toLowerCase() === normalizedEmail
        );
        if (match && match.status !== 'Inactivo') {
          // A password MUST be set and MUST strictly match the entered password
          if (match.password && match.password === trimmedPassword) {
            matchedStudioUser = match;
          }
        }
      }
    } catch {
      // ignore
    }

    if (matchedStudioUser) {
      const customUser = {
        id: matchedStudioUser.id || 'user-' + normalizedEmail.replace(/[^a-z0-9]/g, '-'),
        email: normalizedEmail,
        user_metadata: {
          full_name: matchedStudioUser.name,
          role: matchedStudioUser.role,
          avatar_url: matchedStudioUser.avatar || '',
        },
      } as any;
      setUser(customUser);
      localStorage.setItem('stak_admin_demo_session', 'true');
      localStorage.setItem('stak_admin_cached_user', JSON.stringify(customUser));
      localStorage.setItem('stak_admin_active_view', 'admin');
      return { error: null };
    }

    // 3. Supabase Auth authentication if client is configured
    const client = getSupabase();
    if (!client) {
      // Neither master password nor local studio password matched, and no Supabase is configured
      const msg = 'Credenciais incorrectas. Por favor verifique o seu e-mail e palavra-passe.';
      setAuthError(msg);
      return { error: msg };
    }

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: normalizedEmail,
        password: trimmedPassword,
      });

      if (error) {
        const errMsg = error.message || '';
        let friendlyMsg =
          'Credenciais de acesso incorrectas. Por favor verifique o seu e-mail e palavra-passe.';
        if (errMsg.toLowerCase().includes('email not confirmed')) {
          friendlyMsg =
            'O seu endereço de e-mail ainda não foi confirmado no Supabase. Verifique a sua caixa de entrada.';
        } else if (
          errMsg.toLowerCase().includes('too many requests') ||
          errMsg.toLowerCase().includes('rate limit')
        ) {
          friendlyMsg =
            'Demasiadas tentativas de início de sessão. Por favor aguarde alguns instantes.';
        }
        setAuthError(friendlyMsg);
        return { error: friendlyMsg };
      }

      if (!data.user) {
        const msg = 'Não foi possível validar as credenciais. Tente novamente.';
        setAuthError(msg);
        return { error: msg };
      }

      setUser(data.user);
      setSession(data.session);
      localStorage.setItem('stak_admin_cached_user', JSON.stringify(data.user));
      localStorage.setItem('stak_admin_active_view', 'admin');
      localStorage.removeItem('stak_admin_demo_session');
      localStorage.setItem('stak_admin_registered', 'true');
      localStorage.setItem('stak_admin_registration_locked', 'true');
      setIsAdminRegistrationLocked(true);
      return { error: null };
    } catch (err: any) {
      const msg =
        err?.message || 'Erro ao processar a autenticação. Verifique os dados inseridos.';
      setAuthError(msg);
      return { error: msg };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName?: string
  ): Promise<{ error: string | null; message?: string }> => {
    setAuthError(null);
    const client = getSupabase();

    if (!client) {
      return { error: 'Supabase não está disponível para registo.' };
    }

    try {
      const { data, error } = await client.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName || 'Administrador STAK',
            role: 'admin',
          },
        },
      });

      if (error) {
        setAuthError(error.message);
        return { error: error.message };
      }

      // Automatically lock registration once admin account is created
      localStorage.setItem('stak_admin_registered', 'true');
      localStorage.setItem('stak_admin_registration_locked', 'true');
      setIsAdminRegistrationLocked(true);

      if (data.session) {
        setUser(data.user);
        setSession(data.session);
        return {
          error: null,
          message: 'Conta de administrador criada com sucesso! O registo público foi automaticamente bloqueado.',
        };
      }

      return {
        error: null,
        message: 'Registo de administrador concluído! O formulário de criação de novas contas foi bloqueado por segurança.',
      };
    } catch (err: any) {
      const msg = err?.message || 'Erro ao criar conta no Supabase.';
      setAuthError(msg);
      return { error: msg };
    }
  };

  const signOut = async () => {
    const client = getSupabase();
    localStorage.removeItem('stak_admin_demo_session');
    localStorage.removeItem('stak_admin_cached_user');
    localStorage.removeItem('stak_admin_active_view');
    if (client) {
      try {
        await client.auth.signOut();
      } catch (err) {
        console.warn('Error signing out from Supabase:', err);
      }
    }
    setUser(null);
    setSession(null);
  };

  const resetPassword = async (email: string): Promise<{ error: string | null; message?: string }> => {
    setAuthError(null);
    const client = getSupabase();
    if (!client) {
      return { error: 'Supabase não está configurado.' };
    }

    try {
      const { error } = await client.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin + '/#admin',
      });
      if (error) {
        setAuthError('Não foi possível enviar as instruções de reposição. Verifique o e-mail introduzido.');
        return { error: 'Não foi possível enviar as instruções de reposição.' };
      }
      return {
        error: null,
        message: 'Instruções de reposição enviadas com sucesso para o seu e-mail.',
      };
    } catch (err: any) {
      const msg = 'Não foi possível processar o pedido de recuperação.';
      setAuthError(msg);
      return { error: msg };
    }
  };

  const loginAsDemo = () => {
    setUser(DEFAULT_ADMIN_USER);
    localStorage.setItem('stak_admin_demo_session', 'true');
    localStorage.setItem('stak_admin_cached_user', JSON.stringify(DEFAULT_ADMIN_USER));
    localStorage.setItem('stak_admin_active_view', 'admin');
    setAuthError(null);
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAuthenticated: !!user,
        isConfigured: configured,
        isAdminRegistrationLocked,
        setAdminRegistrationLocked,
        signIn,
        signUp,
        signOut,
        resetPassword,
        loginAsDemo,
        authError,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};
