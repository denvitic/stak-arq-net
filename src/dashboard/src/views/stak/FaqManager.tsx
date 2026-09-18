import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useCms } from '@/src/context/CmsContext';
import { FaqItem } from '@/src/types';

export default function FaqManager() {
  const { pagesContent, updatePageContent } = useCms();
  const currentFaqSection = pagesContent.services?.sections?.faq || pagesContent.faq || {
    enabled: true,
    tag: 'Esclarecimentos & FAQs',
    title: 'Perguntas Frequentes sobre os Nossos Serviços',
    description: 'Tire as suas dúvidas sobre processos de licenciamento, prazos, orçamentos e fiscalização de obra.',
    items: [],
  };

  const [faqItems, setFaqItems] = useState<FaqItem[]>(() => {
    if (currentFaqSection.items && currentFaqSection.items.length > 0) {
      return [...currentFaqSection.items];
    }
    return [
      {
        id: 'faq-1',
        question: 'Como funciona a tramitação e aprovação de projectos no Governo Provincial de Luanda (GPL)?',
        answer: 'A equipa da STAK assume toda a instrução processual do projecto camarário: memória descritiva, termo de responsabilidade de técnicos habilitados pela Ordem dos Arquitectos de Angola (OAA) e Ordem dos Engenheiros de Angola (OEA), plantas de localização e peças desenhadas regulamentares. Acompanhamos o processo até à emissão da Licença de Construção definitiva.',
        category: 'Licenciamento GPL',
      },
      {
        id: 'faq-2',
        question: 'É possível contratar apenas a Fiscalização de Obra para um projecto feito por terceiros?',
        answer: 'Sim. Efectuamos uma auditoria prévia ao projecto existente para identificar eventuais incompatibilidades geométricas ou orçamentais. A partir daí, alocamos um engenheiro/arquitecto fiscal residente para vistorias semanais, emissão de autos de medição e garantia de que o empreiteiro cumpre as normas técnicas angolanas.',
        category: 'Fiscalização de Obra',
      },
      {
        id: 'faq-3',
        question: 'Como é calculado o orçamento e o mapa de quantidades?',
        answer: 'Com base no projecto de execução 3D/BIM, extraímos medições exactas de betão armado, cofragens, aço, revestimentos, caixilharias e instalações técnicas (hidráulica, eletricidade, AVAC). O cliente recebe um caderno de encargos discriminado para lançar consultas a empreiteiros em pé de igualdade e sem surpresas adicionais.',
        category: 'Prazos & Orçamento',
      },
      {
        id: 'faq-4',
        question: 'Desenvolvem projectos fora de Luanda ou em outras províncias?',
        answer: 'Sim. Embora a nossa sede esteja em Luanda, temos no nosso histórico intervenções e consultorias desenvolvidas em Benguela, Huíla (Lubango), Namibe e Cabinda, coordenando a logística técnica através de vistorias planeadas e modelos digitais colaborativos.',
        category: 'Geral',
      },
    ];
  });

  const [sectionConfig, setSectionConfig] = useState({
    enabled: currentFaqSection.enabled ?? true,
    tag: currentFaqSection.tag || 'Esclarecimentos & FAQs',
    title: currentFaqSection.title || 'Perguntas Frequentes sobre os Nossos Serviços',
    description: currentFaqSection.description || 'Tire as suas dúvidas sobre processos de licenciamento, prazos, orçamentos e fiscalização de obra.',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Form State
  const [formQuestion, setFormQuestion] = useState('');
  const [formAnswer, setFormAnswer] = useState('');
  const [formCategory, setFormCategory] = useState('Geral');

  const categories = ['Todas', 'Geral', 'Licenciamento GPL', 'Prazos & Orçamento', 'Fiscalização de Obra', 'Design de Interiores'];

  const handleOpenNew = () => {
    setEditingFaq(null);
    setFormQuestion('');
    setFormAnswer('');
    setFormCategory('Geral');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FaqItem) => {
    setEditingFaq(faq);
    setFormQuestion(faq.question);
    setFormAnswer(faq.answer);
    setFormCategory(faq.category || 'Geral');
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || !formAnswer.trim()) return;

    if (editingFaq) {
      setFaqItems((prev) =>
        prev.map((item) =>
          item.id === editingFaq.id
            ? { ...item, question: formQuestion, answer: formAnswer, category: formCategory }
            : item
        )
      );
    } else {
      const newItem: FaqItem = {
        id: 'faq-' + Date.now(),
        question: formQuestion,
        answer: formAnswer,
        category: formCategory,
      };
      setFaqItems((prev) => [...prev, newItem]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem a certeza que deseja eliminar esta pergunta frequente?')) {
      setFaqItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newItems = [...faqItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setFaqItems(newItems);
  };

  const handleSaveAll = () => {
    const updatedFaqSection = {
      ...sectionConfig,
      items: faqItems,
    };

    // Update in services page and general faq
    const updatedServices = {
      ...pagesContent.services,
      sections: {
        ...pagesContent.services.sections,
        faq: updatedFaqSection,
      },
    };

    updatePageContent('services', updatedServices);
    updatePageContent('faq', updatedFaqSection);

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const filteredItems = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === 'Todas' || (item.category || 'Geral') === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold text-[#c6a87c] tracking-widest uppercase">
              Centro de Suporte & Informação
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-serif">
            Gestão de Perguntas Frequentes (FAQs)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Adicione, edite, reordene e remova perguntas técnicas sobre licenciamento GPL, fiscalização e metodologia.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSaved && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 animate-fade-in">
              <Icon icon="solar:check-circle-bold" width="16" />
              <span>FAQs sincronizadas!</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleOpenNew}
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-xs"
          >
            <Icon icon="solar:add-circle-bold" width="16" />
            <span>Adicionar Pergunta</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className="px-5 py-2 bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-xs"
          >
            <Icon icon="solar:check-read-linear" width="16" />
            <span>Guardar Alterações</span>
          </button>
        </div>
      </div>

      {/* Section Header Controls */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-sm font-bold text-gray-900">
            Cabeçalho da Secção de FAQs no Website
          </h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={sectionConfig.enabled}
              onChange={(e) => setSectionConfig({ ...sectionConfig, enabled: e.target.checked })}
              className="rounded text-[#c6a87c] focus:ring-[#c6a87c]"
            />
            <span className="text-xs font-semibold text-gray-700">Secção de FAQs Activa</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Etiqueta / Tag Superior</label>
            <input
              type="text"
              value={sectionConfig.tag}
              onChange={(e) => setSectionConfig({ ...sectionConfig, tag: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Título Principal</label>
            <input
              type="text"
              value={sectionConfig.title}
              onChange={(e) => setSectionConfig({ ...sectionConfig, title: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Descrição / Subtítulo</label>
            <input
              type="text"
              value={sectionConfig.description}
              onChange={(e) => setSectionConfig({ ...sectionConfig, description: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Icon icon="solar:magnifer-linear" className="absolute left-3 top-2.5 text-gray-400" width="16" />
          <input
            type="text"
            placeholder="Pesquisar perguntas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
          />
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-gray-200 text-gray-500 space-y-2">
            <Icon icon="solar:question-circle-linear" width="36" className="mx-auto text-gray-300" />
            <p className="text-xs font-medium">Nenhuma pergunta frequente encontrada.</p>
          </div>
        ) : (
          filteredItems.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs hover:border-gray-300 transition-all space-y-3 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md">
                      {faq.category || 'Geral'}
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">#{index + 1}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 font-heading">
                    {faq.question}
                  </h3>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 cursor-pointer rounded-lg hover:bg-gray-100"
                    title="Mover para cima"
                  >
                    <Icon icon="solar:arrow-up-linear" width="16" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === faqItems.length - 1}
                    className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 cursor-pointer rounded-lg hover:bg-gray-100"
                    title="Mover para baixo"
                  >
                    <Icon icon="solar:arrow-down-linear" width="16" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(faq)}
                    className="p-1.5 text-gray-600 hover:text-[#c6a87c] cursor-pointer rounded-lg hover:bg-gray-100"
                    title="Editar"
                  >
                    <Icon icon="solar:pen-linear" width="16" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(faq.id)}
                    className="p-1.5 text-red-400 hover:text-red-600 cursor-pointer rounded-lg hover:bg-red-50"
                    title="Eliminar"
                  >
                    <Icon icon="solar:trash-bin-trash-linear" width="16" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed font-light border-t border-gray-100 pt-3">
                {faq.answer}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl border border-gray-200 shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="text-sm font-bold text-gray-900 font-heading">
                {editingFaq ? 'Editar Pergunta Frequente' : 'Nova Pergunta Frequente'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <Icon icon="solar:close-circle-linear" width="20" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Categoria</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                >
                  {categories.filter((c) => c !== 'Todas').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Pergunta (Título do Acordeão)</label>
                <input
                  type="text"
                  required
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none"
                  placeholder="Ex: Qual o prazo médio para licenciamento no GPL?"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Resposta Completa</label>
                <textarea
                  required
                  rows={4}
                  value={formAnswer}
                  onChange={(e) => setFormAnswer(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-[#c6a87c] focus:outline-none leading-relaxed"
                  placeholder="Escreva a resposta detalhada que será exibida ao expandir o acordeão..."
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#c6a87c] hover:bg-[#b59567] text-black font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Guardar Pergunta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
