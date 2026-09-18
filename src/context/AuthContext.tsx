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
  email: 'denvitic@gmail.com',
  user_metadata: {
    full_name: 'Administrador STAK',
    role: 'super_admin',
    department: 'Direcção Geral & Coordenação',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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

    // 1. Direct validation for predefined default admin account
    const isDefaultAdmin =
      (normalizedEmail === 'denvitic@gmail.com' && password === 'Admin2026@') ||
      (normalizedEmail === 'admin@stak.ao' &&
        (password === 'stak.arquitectura' || password === 'stak2025' || password === 'admin123'));

    // Also check if matches registered studio users
    let isRegisteredStudioUser = false;
    let matchedUserName = 'Administrador STAK';
    let matchedUserRole = 'super_admin';
    try {
      const savedUsers = localStorage.getItem('stak_architects_users_v1');
      if (savedUsers) {
        const parsed = JSON.parse(savedUsers);
        const match = parsed.find((u: any) => u.email?.toLowerCase() === normalizedEmail);
        if (match && match.status !== 'Inactivo') {
          isRegisteredStudioUser = true;
          matchedUserName = match.name;
          matchedUserRole = match.role;
        }
      }
    } catch {
      // ignore
    }

    const client = getSupabase();

    // If default admin or no backend client, authenticate immediately
    if (isDefaultAdmin) {
      setUser(DEFAULT_ADMIN_USER);
      localStorage.setItem('stak_admin_demo_session', 'true');
      localStorage.setItem('stak_admin_registered', 'true');
      localStorage.setItem('stak_admin_registration_locked', 'true');
      setIsAdminRegistrationLocked(true);
      return { error: null };
    }

    if (!client) {
      if (isRegisteredStudioUser) {
        setUser({
          id: 'user-' + normalizedEmail.replace(/[^a-z0-9]/g, '-'),
          email: normalizedEmail,
          user_metadata: {
            full_name: matchedUserName,
            role: matchedUserRole,
          },
        } as any);
        localStorage.setItem('stak_admin_demo_session', 'true');
        return { error: null };
      }
      return { error: 'Credenciais incorrectas. Verifique o seu e-mail e palavra-passe.' };
    }

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        // Fallback for registered studio user or default admin credentials
        if (isRegisteredStudioUser) {
          setUser({
            id: 'user-' + normalizedEmail.replace(/[^a-z0-9]/g, '-'),
            email: normalizedEmail,
            user_metadata: {
              full_name: matchedUserName,
              role: matchedUserRole,
            },
          } as any);
          localStorage.setItem('stak_admin_demo_session', 'true');
          return { error: null };
        }
        const friendlyMsg =
          error.message.includes('Invalid login credentials') || error.message.includes('Email not confirmed')
            ? 'Credenciais de acesso incorrectas. Por favor verifique o seu e-mail e palavra-passe.'
            : 'Não foi possível validar as credenciais. Tente novamente.';
        setAuthError(friendlyMsg);
        return { error: friendlyMsg };
      }

      setUser(data.user);
      setSession(data.session);
      localStorage.removeItem('stak_admin_demo_session');
      localStorage.setItem('stak_admin_registered', 'true');
      localStorage.setItem('stak_admin_registration_locked', 'true');
      setIsAdminRegistrationLocked(true);
      return { error: null };
    } catch (err: any) {
      if (isRegisteredStudioUser) {
        setUser(DEFAULT_ADMIN_USER);
        localStorage.setItem('stak_admin_demo_session', 'true');
        return { error: null };
      }
      const msg = 'Erro ao processar a autenticação. Verifique os dados inseridos.';
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
