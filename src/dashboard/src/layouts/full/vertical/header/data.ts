// STAK Architecture Dashboard Data

interface LinkType {
  href: string;
  title: string;
}

interface SearchType {
  href: string;
  title: string;
}

const SearchLinks: SearchType[] = [
  {
    title: 'Visão Geral do Atelier',
    href: '/',
  },
  {
    title: 'Projectos de Arquitectura',
    href: '/projects',
  },
  {
    title: 'Briefings & Propostas de Clientes',
    href: '/briefings',
  },
  {
    title: 'Identidade & Mídia Hero',
    href: '/atelier',
  },
  {
    title: 'Artigos & Notícias',
    href: '/articles',
  },
  {
    title: 'Serviços & Especialidades',
    href: '/services',
  },
];

interface ProfileType {
  title: string;
  subtitle: string;
  url: string;
  icon: string;
}

const profileDD: ProfileType[] = [
  {
    title: 'Visão Geral',
    subtitle: 'Métricas e estado do atelier',
    icon: 'solar:widget-2-linear',
    url: '/',
  },
  {
    title: 'Projectos de Arquitectura',
    subtitle: 'Gerir portfólio e obras',
    icon: 'solar:buildings-3-linear',
    url: '/projects',
  },
  {
    title: 'Briefings de Clientes',
    subtitle: 'Pedidos e reuniões',
    icon: 'solar:inbox-linear',
    url: '/briefings',
  },
  {
    title: 'Identidade & Mídia',
    subtitle: 'Logos, hero e contactos',
    icon: 'solar:palette-round-linear',
    url: '/atelier',
  },
];

export { SearchLinks, profileDD };
