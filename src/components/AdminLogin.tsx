import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Building2,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminLoginProps {
  onBackToWebsite: () => void;
}

type AuthMode = 'signin' | 'forgot';

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToWebsite }) => {
  const { signIn, resetPassword, authError, clearAuthError } = useAuth();

  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    clearAuthError();
    setLoading(true);

    try {
      if (mode === 'signin') {
        if (!email.trim() || !password) {
          setFormError('Por favor preencha o e-mail e a palavra-passe.');
          setLoading(false);
          return;
        }
        const { error } = await signIn(email.trim(), password);
        if (error) {
          setFormError(error);
        }
      } else if (mode === 'forgot') {
        if (!email.trim()) {
          setFormError('Por favor introduza o seu e-mail institucional.');
          setLoading(false);
          return;
        }
        const { error, message } = await resetPassword(email.trim());
        if (error) {
          setFormError(error);
        } else if (message) {
          setSuccessMessage(message);
        }
      }
    } catch (err: any) {
      setFormError(err?.message || 'Ocorreu um erro ao processar o pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-white flex flex-col justify-between selection:bg-[#c6a87c] selection:text-black relative overflow-hidden">
      {/* Background architectural ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial from-[#c6a87c]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-radial from-[#1e2029]/40 to-transparent blur-2xl pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <button
          type="button"
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#c6a87c]" />
          <span>Voltar ao Website</span>
        </button>

        {/* Security status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111217] border border-white/10 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-gray-400">Portal Administrativo</span>
          <span className="text-[#c6a87c] font-mono text-[10px] font-semibold">STAK Core</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-md mx-auto px-4 py-8 z-10">
        <div className="bg-[#111318]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Atelier Brand Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black border border-[#c6a87c]/40 text-[#c6a87c] mb-1 shadow-lg">
              <Building2 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-heading">
              STAK Arquitectura
            </h1>
            <p className="text-xs text-gray-400 font-light">
              Gabinete Central de Gestão & Direcção Técnica
            </p>
          </div>

          {/* Feedback alerts */}
          {(formError || authError) && (
            <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{formError || authError}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{successMessage}</span>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-gray-400">
                E-mail Institucional
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@dominio.com"
                  className="w-full bg-[#181a22] border border-white/10 rounded-lg pl-9.5 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#c6a87c] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-400">
                    Palavra-passe
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setFormError(null);
                      setSuccessMessage(null);
                    }}
                    className="text-[11px] text-[#c6a87c] hover:underline cursor-pointer"
                  >
                    Esqueceu a palavra-passe?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#181a22] border border-white/10 rounded-lg pl-9.5 pr-10 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#c6a87c] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'forgot' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setFormError(null);
                    setSuccessMessage(null);
                  }}
                  className="text-[11px] text-gray-400 hover:text-white cursor-pointer"
                >
                  Voltar ao ecrã de início de sessão
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#c6a87c] hover:bg-[#d8bb90] text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === 'signin' ? 'Iniciar Sessão' : 'Enviar Instruções de Reposição'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-[11px] text-gray-500 z-10 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2">
        <span>© {new Date().getFullYear()} STAK Arquitectura • Luanda, Angola.</span>
        <span className="hidden sm:inline text-gray-700">•</span>
        <span>
          Plataforma desenvolvida por{' '}
          <a
            href="https://www.denvitic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#c6a87c] font-medium transition-colors"
          >
            Denvitic Tecnologias
          </a>
        </span>
      </footer>
    </div>
  );
};
