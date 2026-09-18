import React from 'react';
import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import { useCms } from '@/src/context/CmsContext';
import { BriefingSubmission } from '@/src/types';

export default function Overview() {
  const { projects, briefings, articles, atelierInfo, toggleFeaturedProject, updateBriefingStatus } =
    useCms();

  const pendingBriefings = briefings.filter((b) => b.status === 'Pendente');
  const featuredProjects = projects.filter((p) => p.featured);
  const recentBriefings = briefings.slice(0, 5);
  const recentProjects = projects.slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#c6a87c] uppercase">
              Painel de Gestão STAK
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-serif">
            Gestão do Website & Portfólio
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
            Faça a gestão dos projectos de arquitectura, modifique imagens, textos, logótipos e acompanhe
            os briefings enviados pelos potenciais clientes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111827] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Icon icon="solar:add-circle-linear" width="16" />
            <span>Novo Projecto</span>
          </Link>
          <a
            href="#inicio"
            onClick={() => {
              window.location.hash = 'inicio';
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold rounded-lg border border-gray-300 transition-colors cursor-pointer shadow-2xs"
          >
            <Icon icon="solar:arrow-right-up-linear" width="16" />
            <span>Ver Website</span>
          </a>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Projectos */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Projectos
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#fbf8f3] text-[#c6a87c] flex items-center justify-center">
              <Icon icon="solar:buildings-3-linear" width="20" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{projects.length}</span>
            <span className="text-xs text-gray-500">no portfólio</span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <span>Destaques na Home:</span>
            <span className="font-semibold text-gray-900">{featuredProjects.length}</span>
          </div>
        </div>

        {/* Briefings */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Briefings de Clientes
            </span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Icon icon="solar:inbox-linear" width="20" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{briefings.length}</span>
            <span className="text-xs text-gray-500">recebidos</span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-600">Pendentes de resposta:</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                pendingBriefings.length > 0
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {pendingBriefings.length} pendente{pendingBriefings.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        {/* Artigos */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Artigos & Notícias
            </span>
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Icon icon="solar:document-text-linear" width="20" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{articles.length}</span>
            <span className="text-xs text-gray-500">publicados</span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <span>Última publicação:</span>
            <span className="font-semibold text-gray-900 truncate max-w-[130px]">
              {articles[0]?.date || 'Activo'}
            </span>
          </div>
        </div>

        {/* Mídia Hero & Atelier */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Mídia Principal
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Icon icon="solar:videocamera-linear" width="20" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900 capitalize">
              {atelierInfo.heroMediaType === 'video' ? 'Vídeo MP4' : 'Slideshow'}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <span>Experiência:</span>
            <span className="font-semibold text-[#c6a87c]">{atelierInfo.stats.yearsOfExperience}</span>
          </div>
        </div>
      </div>

      {/* Main Content: Recent Briefings and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Recent Briefings (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Últimos Briefings Recebidos
              </h2>
              <p className="text-xs text-gray-500">
                Propostas e solicitações submetidas através do website
              </p>
            </div>
            <Link
              to="/briefings"
              className="text-xs font-semibold text-[#c6a87c] hover:underline flex items-center gap-1"
            >
              <span>Ver Todos ({briefings.length})</span>
              <Icon icon="solar:arrow-right-linear" width="14" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentBriefings.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                Nenhum briefing recebido até ao momento.
              </div>
            ) : (
              recentBriefings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-900">
                        {b.clientName}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          b.status === 'Pendente'
                            ? 'bg-amber-100 text-amber-800'
                            : b.status === 'Em Análise'
                            ? 'bg-blue-100 text-blue-800'
                            : b.status === 'Contactado'
                            ? 'bg-purple-100 text-purple-800'
                            : b.status === 'Reunião Agendada'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span>{b.projectType}</span>
                      <span>•</span>
                      <span>{b.budgetRange || 'Orçamento não definido'}</span>
                      <span>•</span>
                      <span className="text-gray-400">
                        {new Date(b.createdAt).toLocaleDateString('pt-PT')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Status Changer */}
                    <select
                      value={b.status}
                      onChange={(e) =>
                        updateBriefingStatus(
                          b.id,
                          e.target.value as BriefingSubmission['status']
                        )
                      }
                      className="text-xs bg-white border border-gray-200 rounded-md px-2 py-1 text-gray-700 cursor-pointer"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Em Análise">Em Análise</option>
                      <option value="Reunião Agendada">Reunião Agendada</option>
                      <option value="Contactado">Contactado</option>
                    </select>

                    {/* WhatsApp Action */}
                    {b.clientPhone && (
                      <a
                        href={`https://wa.me/${b.clientPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        title="Contactar via WhatsApp"
                      >
                        <Icon icon="solar:chat-round-dots-linear" width="16" />
                      </a>
                    )}

                    {/* Email Action */}
                    {b.clientEmail && (
                      <a
                        href={`mailto:${b.clientEmail}`}
                        className="p-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        title="Enviar E-mail"
                      >
                        <Icon icon="solar:letter-linear" width="16" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Quick Management Links & Atelier Summary */}
        <div className="space-y-6">
          {/* Quick Access Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Acesso Rápido à Gestão
            </h3>

            <div className="space-y-2">
              <Link
                to="/frontweb"
                className="flex items-center justify-between p-3 rounded-lg border border-[#c6a87c]/40 bg-[#fbf8f3]/60 hover:bg-[#fbf8f3] hover:border-[#c6a87c] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#c6a87c] text-white flex items-center justify-center shadow-xs">
                    <Icon icon="solar:window-frame-linear" width="18" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#c6a87c] transition-colors">
                      Frontweb (Páginas do Site)
                    </h4>
                    <p className="text-[11px] text-gray-500">Mudar textos, hero, fotos e vídeos</p>
                  </div>
                </div>
                <Icon
                  icon="solar:arrow-right-linear"
                  className="text-[#c6a87c] group-hover:translate-x-0.5 transition-all"
                  width="16"
                />
              </Link>

              <Link
                to="/projects"
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-300 hover:bg-gray-50/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#fbf8f3] text-[#c6a87c] flex items-center justify-center">
                    <Icon icon="solar:buildings-3-linear" width="18" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 group-hover:text-black">
                      Gerir Projectos
                    </h4>
                    <p className="text-[11px] text-gray-500">Adicionar fotos, antes/depois</p>
                  </div>
                </div>
                <Icon
                  icon="solar:arrow-right-linear"
                  className="text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-all"
                  width="16"
                />
              </Link>

              <Link
                to="/services"
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-300 hover:bg-gray-50/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Icon icon="solar:shield-check-linear" width="18" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 group-hover:text-black">
                      Serviços & Especialidades
                    </h4>
                    <p className="text-[11px] text-gray-500">Núcleos técnicos de actuação</p>
                  </div>
                </div>
                <Icon
                  icon="solar:arrow-right-linear"
                  className="text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-all"
                  width="16"
                />
              </Link>

              <Link
                to="/atelier"
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-300 hover:bg-gray-50/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Icon icon="solar:palette-round-linear" width="18" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 group-hover:text-black">
                      Identidade & Mídia Hero
                    </h4>
                    <p className="text-[11px] text-gray-500">Logótipos, vídeo e manifesto</p>
                  </div>
                </div>
                <Icon
                  icon="solar:arrow-right-linear"
                  className="text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-all"
                  width="16"
                />
              </Link>

              <Link
                to="/briefings"
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-300 hover:bg-gray-50/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Icon icon="solar:inbox-linear" width="18" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 group-hover:text-black">
                      Briefings & Propostas
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      {pendingBriefings.length} pendente{pendingBriefings.length === 1 ? '' : 's'}
                    </p>
                  </div>
                </div>
                <Icon
                  icon="solar:arrow-right-linear"
                  className="text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-all"
                  width="16"
                />
              </Link>

              <Link
                to="/articles"
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-300 hover:bg-gray-50/80 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-700 flex items-center justify-center">
                    <Icon icon="solar:document-text-linear" width="18" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 group-hover:text-black">
                      Artigos & Notícias
                    </h4>
                    <p className="text-[11px] text-gray-500">Blog de arquitectura</p>
                  </div>
                </div>
                <Icon
                  icon="solar:arrow-right-linear"
                  className="text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-all"
                  width="16"
                />
              </Link>
            </div>
          </div>

          {/* Atelier Contact Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-5 space-y-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Atelier STAK • Dados Actuais
            </h3>
            <div className="text-xs text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <Icon icon="solar:map-point-linear" className="text-[#c6a87c] shrink-0" width="16" />
                <span className="truncate">{atelierInfo.locationAddress}, {atelierInfo.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="solar:phone-linear" className="text-[#c6a87c] shrink-0" width="16" />
                <span>{atelierInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="solar:letter-linear" className="text-[#c6a87c] shrink-0" width="16" />
                <span>{atelierInfo.email}</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/atelier"
                className="text-xs font-semibold text-[#c6a87c] hover:underline inline-flex items-center gap-1"
              >
                Editar Informações do Atelier →
              </Link>
            </div>
          </div>

          {/* Supabase Integration Readiness Card */}
          <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-xl shadow-2xs p-5 space-y-3 border border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-bold">
                  Supabase Ready
                </span>
              </div>
              <span className="text-[10px] font-mono text-gray-400">PostgreSQL / Auth</span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white">
                Base de Dados & Autenticação
              </h4>
              <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
                A estrutura de migração (<code className="text-[#c6a87c]">supabase/schema.sql</code>), o cliente seguro e variáveis de ambiente já estão configurados para o Supabase.
              </p>
            </div>

            <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-[10px] text-gray-400 font-mono">
              <span>Status: Pronto para Chaves</span>
              <span className="text-emerald-400">RLS Configurado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Architectural Projects */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Projectos em Destaque no Atelier
            </h2>
            <p className="text-xs text-gray-500">
              Gerencie a visibilidade dos projectos no website principal
            </p>
          </div>
          <Link
            to="/projects"
            className="text-xs font-semibold text-[#c6a87c] hover:underline flex items-center gap-1"
          >
            <span>Gerir Todos os Projectos ({projects.length})</span>
            <Icon icon="solar:arrow-right-linear" width="14" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentProjects.map((p) => (
            <div
              key={p.id}
              className="group border border-gray-200 rounded-lg overflow-hidden bg-gray-50/50 hover:border-gray-400 transition-all flex flex-col"
            >
              <div className="relative aspect-4/3 bg-gray-200 overflow-hidden">
                <img
                  src={p.coverImage}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  type="button"
                  onClick={() => toggleFeaturedProject(p.id)}
                  className={`absolute top-2 right-2 px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    p.featured
                      ? 'bg-[#c6a87c] text-white'
                      : 'bg-black/60 text-gray-200 hover:bg-black'
                  }`}
                  title="Alternar Destaque no Website"
                >
                  {p.featured ? '★ Destaque' : '☆ Promover'}
                </button>
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-medium">
                  {p.categoryLabel}
                </span>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xs text-gray-900 line-clamp-1">{p.title}</h3>
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{p.subtitle}</p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-gray-200/80 flex items-center justify-between text-[11px] text-gray-500">
                  <span>{p.fichaTecnica.localizacao}</span>
                  <span className="font-mono">{p.fichaTecnica.ano}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
