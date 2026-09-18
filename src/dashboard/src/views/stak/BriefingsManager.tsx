import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useCms } from '@/src/context/CmsContext';
import { BriefingSubmission } from '@/src/types';

export default function BriefingsManager() {
  const { briefings, updateBriefingStatus, deleteBriefing } = useCms();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBriefing, setSelectedBriefing] = useState<BriefingSubmission | null>(null);
  const [briefingToDelete, setBriefingToDelete] = useState<{ id: string; name: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredBriefings = briefings.filter((b) => {
    if (statusFilter === 'all') return true;
    return b.status === statusFilter;
  });

  const getStatusBadge = (status: BriefingSubmission['status']) => {
    switch (status) {
      case 'Pendente':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-100 text-amber-800">
            Pendente
          </span>
        );
      case 'Em Análise':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-100 text-blue-800">
            Em Análise
          </span>
        );
      case 'Reunião Agendada':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-100 text-indigo-800">
            Reunião Agendada
          </span>
        );
      case 'Contactado':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-100 text-purple-800">
            Contactado
          </span>
        );
      default:
        return null;
    }
  };

  const handleConfirmDelete = () => {
    if (!briefingToDelete) return;
    const { id, name } = briefingToDelete;
    deleteBriefing(id);
    if (selectedBriefing?.id === id) {
      setSelectedBriefing(null);
    }
    showToast(`Briefing de "${name}" eliminado com sucesso.`);
    setBriefingToDelete(null);
  };

  const handleStatusChange = (id: string, newStatus: BriefingSubmission['status']) => {
    updateBriefingStatus(id, newStatus);
    showToast(`Estado do briefing alterado para "${newStatus}".`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#111827] text-white rounded-xl shadow-2xl border border-emerald-500/50 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-[#c6a87c] tracking-widest uppercase">
              Comunicação & Clientes
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-serif">
            Briefings & Propostas de Clientes
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Acompanhe as propostas de arquitectura e pedidos de reunião recebidos através do website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-500">
            Total de {briefings.length} pedido{briefings.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-[#111827] text-white shadow-2xs'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Todos ({briefings.length})
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('Pendente')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            statusFilter === 'Pendente'
              ? 'bg-[#111827] text-white shadow-2xs'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Pendentes ({briefings.filter((b) => b.status === 'Pendente').length})
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('Em Análise')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            statusFilter === 'Em Análise'
              ? 'bg-[#111827] text-white shadow-2xs'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Em Análise ({briefings.filter((b) => b.status === 'Em Análise').length})
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('Reunião Agendada')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            statusFilter === 'Reunião Agendada'
              ? 'bg-[#111827] text-white shadow-2xs'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Reuniões ({briefings.filter((b) => b.status === 'Reunião Agendada').length})
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('Contactado')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            statusFilter === 'Contactado'
              ? 'bg-[#111827] text-white shadow-2xs'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Contactados ({briefings.filter((b) => b.status === 'Contactado').length})
        </button>
      </div>

      {/* Briefings Table / Card List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredBriefings.length === 0 ? (
            <div className="p-12 text-center">
              <Icon icon="solar:inbox-linear" width="40" className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-semibold text-gray-700">Nenhum briefing nesta categoria</p>
            </div>
          ) : (
            filteredBriefings.map((briefing) => (
              <div
                key={briefing.id}
                className="p-5 hover:bg-gray-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Client and Project Info */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">
                      {briefing.clientName}
                    </span>
                    {getStatusBadge(briefing.status)}
                    <span className="text-xs text-gray-400 font-mono">
                      {new Date(briefing.createdAt).toLocaleDateString('pt-PT')}
                    </span>
                  </div>

                  <div className="text-xs text-gray-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-semibold text-gray-800">
                      {briefing.projectType}
                    </span>
                    <span>•</span>
                    <span>{briefing.clientPhone || 'Sem telefone'}</span>
                    <span>•</span>
                    <span className="text-gray-500">{briefing.clientEmail}</span>
                  </div>

                  {briefing.description && (
                    <p className="text-xs text-gray-500 line-clamp-1 italic max-w-2xl">
                      "{briefing.description}"
                    </p>
                  )}
                </div>

                {/* Right: Status selector and Quick Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Status Dropdown */}
                  <select
                    value={briefing.status}
                    onChange={(e) =>
                      handleStatusChange(briefing.id, e.target.value as any)
                    }
                    className="text-xs bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-gray-800 font-medium focus:ring-1 focus:ring-[#c6a87c] focus:outline-none cursor-pointer"
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Em Análise">Em Análise</option>
                    <option value="Reunião Agendada">Reunião Agendada</option>
                    <option value="Contactado">Contactado</option>
                  </select>

                  {/* View Details Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedBriefing(briefing)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                    title="Ver Detalhes do Briefing"
                  >
                    <Icon icon="solar:eye-linear" width="16" />
                  </button>

                  {/* WhatsApp Action */}
                  {briefing.clientPhone && (
                    <a
                      href={`https://wa.me/${briefing.clientPhone.replace(
                        /[^0-9]/g,
                        ''
                      )}?text=${encodeURIComponent(
                        `Olá ${briefing.clientName}, agradecemos o seu contacto através do website da STAK Arquitectura a respeito do projecto de ${briefing.projectType}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                      title="Abrir Conversa WhatsApp"
                    >
                      <Icon icon="solar:chat-round-dots-linear" width="16" />
                    </a>
                  )}

                  {/* Email Action */}
                  {briefing.clientEmail && (
                    <a
                      href={`mailto:${briefing.clientEmail}?subject=${encodeURIComponent(
                        `STAK Arquitectura • Resposta ao Briefing: ${briefing.projectType}`
                      )}`}
                      className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                      title="Enviar E-mail"
                    >
                      <Icon icon="solar:letter-linear" width="16" />
                    </a>
                  )}

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => setBriefingToDelete({ id: briefing.id, name: briefing.clientName })}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Eliminar Briefing"
                  >
                    <Icon icon="solar:trash-bin-trash-linear" width="16" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Briefing Detail Modal */}
      {selectedBriefing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-up">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#c6a87c] tracking-widest uppercase">
                  Dossiê de Solicitação
                </span>
                <h3 className="text-base font-bold text-gray-900 font-serif">
                  {selectedBriefing.clientName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBriefing(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <Icon icon="solar:close-circle-linear" width="20" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5">Tipologia de Projecto</span>
                  <span className="font-semibold text-gray-800">
                    {selectedBriefing.projectType}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block mb-0.5">Data de Registo</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(selectedBriefing.createdAt).toLocaleDateString('pt-PT')}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block mb-0.5">Telefone</span>
                  <span className="font-semibold text-gray-800">
                    {selectedBriefing.clientPhone || 'Não facultado'}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block mb-0.5">E-mail</span>
                  <span className="font-semibold text-gray-800">
                    {selectedBriefing.clientEmail}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block mb-0.5">Orçamento Previsto</span>
                  <span className="font-semibold text-gray-800">
                    {selectedBriefing.budgetRange || 'Sob consulta'}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block mb-0.5">Status Actual</span>
                  {getStatusBadge(selectedBriefing.status)}
                </div>
              </div>

              {selectedBriefing.description && (
                <div className="pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400 block mb-1">
                    Mensagem / Especificações do Cliente
                  </span>
                  <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-700 leading-relaxed">
                    {selectedBriefing.description}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {selectedBriefing.clientPhone && (
                    <a
                      href={`https://wa.me/${selectedBriefing.clientPhone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      style={{ color: '#ffffff' }}
                    >
                      <Icon icon="solar:chat-round-dots-linear" width="16" style={{ color: '#ffffff' }} />
                      <span style={{ color: '#ffffff' }}>WhatsApp</span>
                    </a>
                  )}

                  {selectedBriefing.clientEmail && (
                    <a
                      href={`mailto:${selectedBriefing.clientEmail}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-black text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      style={{ color: '#ffffff' }}
                    >
                      <Icon icon="solar:letter-linear" width="16" style={{ color: '#ffffff' }} />
                      <span style={{ color: '#ffffff' }}>E-mail</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedBriefing(null)}
                  className="px-4 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* In-App Delete Confirmation Modal (NO window.confirm!) */}
      {briefingToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-fade-in space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Icon icon="solar:trash-bin-trash-bold" width="24" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-gray-900">
                Eliminar Briefing?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tem a certeza que deseja eliminar o registo de briefing de <strong>"{briefingToDelete.name}"</strong>? Esta acção é irreversível.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBriefingToDelete(null)}
                className="w-1/2 py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Sim, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
