import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useCms } from '@/src/context/CmsContext';
import { useAuth } from '@/src/context/AuthContext';
import { AtelierUser, UserRole } from '@/src/types';

const ROLE_CONFIG: Record<
  UserRole,
  { label: string; bg: string; text: string; border: string; desc: string }
> = {
  super_admin: {
    label: 'Super Administrador',
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    border: 'border-amber-500/30',
    desc: 'Acesso irrestrito a configurações centrais, base de dados e utilizadores.',
  },
  administrador: {
    label: 'Director Técnico / Admin',
    bg: 'bg-blue-500/10',
    text: 'text-blue-500',
    border: 'border-blue-500/30',
    desc: 'Gestão executiva de projectos, propostas, orçamentos e serviços.',
  },
  arquitecto: {
    label: 'Arquitecto / Especialista',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-500',
    border: 'border-emerald-500/30',
    desc: 'Publicação de projectos arquitectónicos, fotografias e fichas técnicas.',
  },
  editor: {
    label: 'Gestor de Comunicação / Editor',
    bg: 'bg-purple-500/10',
    text: 'text-purple-500',
    border: 'border-purple-500/30',
    desc: 'Gestão de artigos editoriais, notícias, biblioteca de mídia e FAQs.',
  },
};

export default function UsersManager() {
  const { users, addUser, updateUser, deleteUser } = useCms();
  const { user: currentAuthUser } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('todos');
  const [statusFilter, setStatusFilter] = useState<string>('todos');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AtelierUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<AtelierUser | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: 'arquitecto' as UserRole,
    status: 'Activo' as 'Activo' | 'Inactivo' | 'Pendente',
    password: '',
    avatar: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCreate = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '+244 ',
      department: 'Gabinete de Projectos',
      role: 'arquitecto',
      status: 'Activo',
      password: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: AtelierUser) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      department: user.department || '',
      role: user.role,
      status: user.status,
      password: '',
      avatar: user.avatar || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Por favor preencha o nome e o e-mail do utilizador.');
      return;
    }

    const roleInfo = ROLE_CONFIG[formData.role];

    if (editingUser) {
      updateUser(editingUser.id, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        department: formData.department.trim(),
        role: formData.role,
        roleLabel: roleInfo.label,
        status: formData.status,
        avatar: formData.avatar.trim(),
      });
      showToast(`Utilizador "${formData.name}" atualizado com sucesso.`);
    } else {
      addUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        department: formData.department.trim(),
        role: formData.role,
        roleLabel: roleInfo.label,
        status: formData.status,
        avatar: formData.avatar.trim() || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      });
      showToast(`Utilizador "${formData.name}" adicionado com sucesso.`);
    }

    setIsModalOpen(false);
  };

  const handleToggleStatus = (user: AtelierUser) => {
    const nextStatus = user.status === 'Activo' ? 'Inactivo' : 'Activo';
    updateUser(user.id, { status: nextStatus });
    showToast(`Estado de "${user.name}" alterado para ${nextStatus}.`);
  };

  const confirmDelete = () => {
    if (!userToDelete) return;
    if (
      userToDelete.email === 'denvitic@gmail.com' ||
      userToDelete.email === 'admin@stak.ao' ||
      userToDelete.id === 'user-admin-master'
    ) {
      alert('A conta padrão de Super Administrador não pode ser eliminada por segurança.');
      setUserToDelete(null);
      return;
    }
    deleteUser(userToDelete.id);
    showToast(`Utilizador "${userToDelete.name}" removido.`);
    setUserToDelete(null);
  };

  // Filtered list
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.department && u.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchRole = roleFilter === 'todos' || u.role === roleFilter;
    const matchStatus = statusFilter === 'todos' || u.status === statusFilter;

    return matchSearch && matchRole && matchStatus;
  });

  // KPI calculations
  const totalCount = users.length;
  const adminCount = users.filter((u) => u.role === 'super_admin' || u.role === 'administrador').length;
  const architectCount = users.filter((u) => u.role === 'arquitecto').length;
  const activeCount = users.filter((u) => u.status === 'Activo').length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-gray-900 text-white text-xs rounded-xl shadow-2xl border border-gray-700 animate-fade-in">
          <Icon icon="solar:check-circle-bold" className="text-emerald-400 text-base" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading">
            Gestão de Utilizadores & Permissões
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Controlo de acessos, administradores e membros da equipa técnica do Atelier STAK.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#c6a87c] hover:bg-[#b5966a] text-black font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-sm shrink-0"
        >
          <Icon icon="solar:user-plus-bold" width="16" />
          <span>Novo Utilizador</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">Total</span>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">{totalCount}</h3>
            <span className="text-[11px] text-gray-500">Contas registadas</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
            <Icon icon="solar:users-group-two-rounded-bold" width="20" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-amber-600 uppercase tracking-wider">Administração</span>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">{adminCount}</h3>
            <span className="text-[11px] text-gray-500">Super Admins / Directores</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Icon icon="solar:shield-user-bold" width="20" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-emerald-600 uppercase tracking-wider">Equipa Técnica</span>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">{architectCount}</h3>
            <span className="text-[11px] text-gray-500">Arquitectos & Designers</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Icon icon="solar:buildings-3-bold" width="20" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-blue-600 uppercase tracking-wider">Estado</span>
            <h3 className="text-xl font-bold text-emerald-600 mt-0.5">{activeCount}</h3>
            <span className="text-[11px] text-gray-500">Utilizadores activos</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Icon icon="solar:check-circle-bold" width="20" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Icon
            icon="solar:magnifer-linear"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            width="16"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por nome, e-mail institucional ou departamento..."
            className="w-full pl-9.5 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c6a87c] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:border-[#c6a87c]"
          >
            <option value="todos">Todos os Perfis</option>
            <option value="super_admin">Super Administrador</option>
            <option value="administrador">Director Técnico / Admin</option>
            <option value="arquitecto">Arquitecto</option>
            <option value="editor">Editor de Conteúdos</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:border-[#c6a87c]"
          >
            <option value="todos">Todos os Estados</option>
            <option value="Activo">Activos</option>
            <option value="Inactivo">Inactivos</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/75 text-[11px] font-mono uppercase text-gray-500 tracking-wider">
                <th className="py-3 px-5">Utilizador</th>
                <th className="py-3 px-4">Função / Acesso</th>
                <th className="py-3 px-4">Departamento</th>
                <th className="py-3 px-4">Telefone</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4">Último Acesso</th>
                <th className="py-3 px-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <Icon icon="solar:user-cross-linear" width="36" className="mx-auto mb-2 text-gray-300" />
                    <p>Nenhum utilizador encontrado com os filtros actuais.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((item) => {
                  const roleCfg = ROLE_CONFIG[item.role] || ROLE_CONFIG.arquitecto;
                  const isCurrentAuth =
                    currentAuthUser?.email?.toLowerCase() === item.email.toLowerCase();

                  return (
                    <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              item.avatar ||
                              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'
                            }
                            alt={item.name}
                            className="w-9 h-9 rounded-xl object-cover border border-gray-200 shrink-0"
                          />
                          <div>
                            <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                              <span>{item.name}</span>
                              {isCurrentAuth && (
                                <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono">
                                  Você
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-gray-500 font-mono">{item.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Role Pill */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${roleCfg.bg} ${roleCfg.text} ${roleCfg.border}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {item.roleLabel || roleCfg.label}
                        </span>
                      </td>

                      {/* Department */}
                      <td className="py-3.5 px-4 text-gray-600">
                        {item.department || 'Geral'}
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-gray-500">
                        {item.phone || '—'}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item)}
                          title="Clique para alternar estado"
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium cursor-pointer transition-colors ${
                            item.status === 'Activo'
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.status === 'Activo' ? 'bg-emerald-500' : 'bg-gray-400'
                            }`}
                          />
                          <span>{item.status}</span>
                        </button>
                      </td>

                      {/* Last Login */}
                      <td className="py-3.5 px-4 text-[11px] text-gray-500">
                        {item.lastLogin || item.createdAt}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            title="Editar utilizador"
                            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <Icon icon="solar:pen-new-square-linear" width="16" />
                          </button>

                          {item.email !== 'denvitic@gmail.com' &&
                            item.email !== 'admin@stak.ao' &&
                            item.id !== 'user-admin-master' && (
                              <button
                                type="button"
                                onClick={() => setUserToDelete(item)}
                                title="Remover utilizador"
                                className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              >
                                <Icon icon="solar:trash-bin-trash-linear" width="16" />
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Criar / Editar Utilizador */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 overflow-hidden animate-scale-up">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#c6a87c]/20 text-[#c6a87c] flex items-center justify-center">
                  <Icon icon={editingUser ? 'solar:pen-bold' : 'solar:user-plus-bold'} width="18" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {editingUser ? 'Editar Utilizador' : 'Adicionar Novo Utilizador'}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Defina as permissões e dados da equipa técnica do atelier.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Icon icon="solar:close-circle-linear" width="20" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Arq. Manuel da Costa"
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c6a87c] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">E-mail Institucional</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nome@stak.ao"
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c6a87c] focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+244 928 000 000"
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c6a87c] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Departamento / Gabinete</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="Ex: Gabinete de Projectos & Urbanismo"
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c6a87c] focus:bg-white"
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Perfil de Acesso & Permissões</label>
                <div className="space-y-2">
                  {(Object.keys(ROLE_CONFIG) as UserRole[]).map((rKey) => {
                    const cfg = ROLE_CONFIG[rKey];
                    const isSelected = formData.role === rKey;
                    return (
                      <label
                        key={rKey}
                        onClick={() => setFormData({ ...formData, role: rKey })}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#c6a87c]/10 border-[#c6a87c]'
                            : 'bg-gray-50/70 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          checked={isSelected}
                          onChange={() => setFormData({ ...formData, role: rKey })}
                          className="mt-0.5 text-[#c6a87c] focus:ring-[#c6a87c]"
                        />
                        <div className="text-xs">
                          <div className="font-semibold text-gray-900 flex items-center gap-2">
                            <span>{cfg.label}</span>
                            {rKey === 'super_admin' && (
                              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono">
                                Total
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 text-[11px] mt-0.5">{cfg.desc}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Estado da Conta</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as 'Activo' | 'Inactivo' | 'Pendente',
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c6a87c] focus:bg-white"
                  >
                    <option value="Activo">Activo (Acesso autorizado)</option>
                    <option value="Inactivo">Inactivo (Acesso bloqueado)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">URL Foto de Perfil</label>
                  <input
                    type="url"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#c6a87c] focus:bg-white"
                  />
                </div>
              </div>

              {/* Password info */}
              {!editingUser && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Icon icon="solar:info-circle-bold" width="14" />
                    <span>Primeiro Acesso do Utilizador</span>
                  </span>
                  <p className="text-[11px] text-amber-700">
                    O utilizador poderá iniciar sessão com o seu e-mail institucional utilizando a palavra-passe padrão provisória ou recuperar através do portal.
                  </p>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-black bg-[#c6a87c] hover:bg-[#b5966a] rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  {editingUser ? 'Salvar Alterações' : 'Criar Utilizador'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Delete User */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-scale-up text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Icon icon="solar:trash-bin-trash-bold" width="24" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">Remover Utilizador?</h3>
              <p className="text-xs text-gray-500">
                Tem a certeza que deseja eliminar o utilizador{' '}
                <strong className="text-gray-800">{userToDelete.name}</strong> ({userToDelete.email})?
                Esta acção revogará imediatamente o acesso ao painel.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 text-xs text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer"
              >
                Sim, Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
