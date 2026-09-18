export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: string;
  children?: ChildItem[];
  item?: unknown;
  url?: string;
  color?: string;
  disabled?: boolean;
  subtitle?: string;
  badge?: boolean;
  badgeType?: string;
  isPro?: boolean;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: string;
  id?: string;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: string;
  disabled?: boolean;
  subtitle?: string;
  badgeType?: string;
  badge?: boolean;
  isPro?: boolean;
}

const SidebarContent: MenuItem[] = [
  {
    heading: 'Painel Geral',
    children: [
      {
        name: 'Visão Geral',
        icon: 'solar:widget-2-linear',
        id: 'overview',
        url: '/',
      },
    ],
  },
  {
    heading: 'Gestão do Website',
    children: [
      {
        name: 'Frontweb (Páginas do Site)',
        icon: 'solar:window-frame-linear',
        id: 'frontweb',
        url: '/frontweb',
      },
      {
        name: 'Projectos de Arquitectura',
        icon: 'solar:buildings-3-linear',
        id: 'projects',
        url: '/projects',
      },
      {
        name: 'Serviços & Especialidades',
        icon: 'solar:shield-check-linear',
        id: 'services',
        url: '/services',
      },
      {
        name: 'Perguntas Frequentes (FAQs)',
        icon: 'solar:question-circle-linear',
        id: 'faqs',
        url: '/faqs',
      },
      {
        name: 'Menus & Rodapé',
        icon: 'solar:compass-linear',
        id: 'menus',
        url: '/menus',
      },
      {
        name: 'Biblioteca de Mídia',
        icon: 'solar:gallery-wide-linear',
        id: 'media',
        url: '/media',
      },
      {
        name: 'Artigos & Notícias',
        icon: 'solar:document-text-linear',
        id: 'articles',
        url: '/articles',
      },
      {
        name: 'Briefings & Propostas',
        icon: 'solar:inbox-linear',
        id: 'briefings',
        url: '/briefings',
      },
      {
        name: 'Utilizadores & Permissões',
        icon: 'solar:users-group-two-rounded-linear',
        id: 'users',
        url: '/users',
      },
      {
        name: 'Definições Gerais & SEO',
        icon: 'solar:settings-linear',
        id: 'settings',
        url: '/settings',
      },
    ],
  },
];

export default SidebarContent;
