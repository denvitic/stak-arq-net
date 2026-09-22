export type NavPage = 'inicio' | 'sobre-nos' | 'projectos' | 'servicos' | 'artigos' | 'contactos' | 'admin';

export type ProjectCategory = 
  | 'todos'
  | 'residencial'
  | 'comercial'
  | 'interiores'
  | 'urbanismo'
  | 'em-construcao';

export interface FichaTecnica {
  localizacao: string;
  ano: string;
  area: string;
  tipologia: string;
  estadoObra: 'Concluído' | 'Em Execução' | 'Estudo Prévio' | 'Licenciamento Aprovado';
  cliente: string;
  especialidades: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: 'residencial' | 'comercial' | 'interiores' | 'urbanismo' | 'em-construcao';
  categoryLabel: string;
  coverImage: string;
  beforeImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeDescription?: string;
  featuredInBeforeAfter?: boolean;
  videoUrl?: string;
  videoPoster?: string;
  galleryImages: string[];
  description: string;
  architecturalConcept: string;
  fichaTecnica: FichaTecnica;
  featured: boolean;
  highlightOrder?: number;
}

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  ctaLabel: string;
  ctaAction: string;
  image: string;
  typicalDuration?: string;
  icon?: string;
}

export interface MethodologyStep {
  step: string;
  title: string;
  subtitle?: string;
  description?: string;
  desc?: string;
  details?: string[];
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
}

export interface BriefingSubmission {
  id: string;
  createdAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectType: string;
  location: string;
  estimatedArea: string;
  budgetRange: string;
  timeline: string;
  description: string;
  status: 'Pendente' | 'Contactado' | 'Em Análise' | 'Reunião Agendada';
}

export interface SeoMetaSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  canonicalUrl?: string;
  author?: string;
}

export interface AtelierInfo {
  name: string;
  brandTagline: string;
  manifesto: string;
  history: string;
  locationAddress: string;
  city: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  briefingNotificationEmail?: string;
  instagram: string;
  linkedin?: string;
  facebook?: string;
  workingHours: string;
  stats: {
    yearsOfExperience: string;
    completedProjects: string;
    designedArea: string;
    architecturalAwards: string;
  };
  heroMediaType?: 'video' | 'slideshow';
  heroVideoUrl?: string;
  heroVideoPoster?: string;
  heroVideoTitle?: string;
  // Brand Assets
  logoLight?: string;
  logoDark?: string;
  favicon?: string;
  // SEO Meta
  seoMeta?: SeoMetaSettings;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size?: string;
  uploadedAt: string;
  category?: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  location: string;
  projectType: string;
  quote: string;
  rating: number;
  year?: string;
}

export interface GuaranteePillar {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface NavigationLinkItem {
  id: string;
  label: string;
  page: NavPage;
  url?: string;
  enabled: boolean;
}

export interface SiteNavigationContent {
  header: {
    items: NavigationLinkItem[];
    ctaLabel: string;
    ctaPage: NavPage;
    showThemeToggle: boolean;
  };
  footer: {
    manifesto: string;
    socialLinks: {
      instagram: string;
      whatsapp: string;
      linkedin: string;
      facebook: string;
    };
    navLinks: { label: string; page: NavPage }[];
    copyrightNotice: string;
    showRestrictedArea: boolean;
  };
}

export interface HomePageContent {
  hero: {
    enabled?: boolean;
    badgeTag: string;
    titleLine1: string;
    titleLine2Italic: string;
    titleLine2Gradient: string;
    description: string;
    ctaPrimaryLabel: string;
    ctaPrimaryLink?: string;
    ctaSecondaryLabel: string;
    ctaSecondaryLink?: string;
    mediaType: 'video' | 'slideshow';
    videoUrl: string;
    videoPoster: string;
    slideshowImages: string[];
  };
  sections: {
    synthesis: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      image: string;
      imageCaption: string;
      feature1Title: string;
      feature1Desc: string;
      feature2Title: string;
      feature2Desc: string;
      buttonLabel: string;
      buttonLink?: string;
    };
    featuredProjects: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      buttonLabel: string;
      buttonLink?: string;
    };
    materials: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      items: {
        id: string;
        name: string;
        tag: string;
        description: string;
        properties: string[];
        image: string;
      }[];
    };
    specialties?: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
    };
    beforeAfter: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
    };
    testimonials: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      items?: TestimonialItem[];
      assurances?: GuaranteePillar[];
    };
    cta: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      buttonLabel: string;
      buttonLink?: string;
      secondaryButtonLabel: string;
      secondaryButtonLink?: string;
    };
  };
}

export interface AtelierPageContent {
  hero: {
    enabled?: boolean;
    badge: string;
    title: string;
    description: string;
    bgImage: string;
  };
  sections: {
    manifesto?: {
      enabled: boolean;
      tag: string;
      title: string;
      content: string;
      sideImage: string;
      sideImageCaption: string;
      quote?: string;
    };
    pillars: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      items: {
        title: string;
        desc: string;
      }[];
    };
    history: {
      enabled: boolean;
      tag: string;
      title: string;
      content: string;
      image?: string;
      timeline?: {
        year: string;
        title: string;
        desc: string;
      }[];
    };
    methodology?: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      steps: MethodologyStep[];
    };
    bioclimatic?: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      image?: string;
      features: {
        title: string;
        desc: string;
      }[];
    };
    team: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      members: {
        name: string;
        role: string;
        bio: string;
        image: string;
      }[];
    };
    cta?: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      buttonLabel: string;
      buttonLink?: string;
      secondaryButtonLabel?: string;
      secondaryButtonLink?: string;
    };
  };
}

export interface ProjectsPageContent {
  hero: {
    enabled?: boolean;
    badge: string;
    title: string;
    description: string;
    bgImage: string;
  };
  sections: {
    catalogIntro: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
    };
    cta: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      buttonLabel: string;
      buttonLink?: string;
    };
  };
}

export interface ServicesPageContent {
  hero: {
    enabled?: boolean;
    badge: string;
    title: string;
    description: string;
    bgImage: string;
    tagPills?: string[];
  };
  sections: {
    methodology: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      steps: MethodologyStep[];
    };
    servicesList: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
    };
    faq?: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      items: FaqItem[];
    };
    cta: {
      enabled: boolean;
      title: string;
      description: string;
      buttonLabel: string;
      buttonLink?: string;
    };
  };
}

export interface ArticlesPageContent {
  hero: {
    enabled?: boolean;
    badge: string;
    title: string;
    description: string;
    bgImage: string;
  };
  sections: {
    editorialIntro: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
    };
    newsletter: {
      enabled: boolean;
      badge?: string;
      title: string;
      description: string;
      buttonLabel: string;
    };
  };
}

export interface ContactsPageContent {
  hero: {
    enabled?: boolean;
    badge: string;
    title: string;
    description: string;
    bgImage: string;
  };
  sections: {
    info: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
      address: string;
      phone: string;
      whatsapp: string;
      email: string;
      workingHours: string;
      receptionNotice: string;
    };
    briefingIntro: {
      enabled: boolean;
      tag: string;
      title: string;
      description: string;
    };
  };
}

export interface GlobalFaqContent {
  enabled: boolean;
  tag: string;
  title: string;
  description: string;
  items: FaqItem[];
}

export interface SitePagesContent {
  home: HomePageContent;
  atelier: AtelierPageContent;
  projects: ProjectsPageContent;
  services: ServicesPageContent;
  articles: ArticlesPageContent;
  contacts: ContactsPageContent;
  navigation?: SiteNavigationContent;
  faq?: GlobalFaqContent;
}

export type UserRole = 'super_admin' | 'administrador' | 'arquitecto' | 'editor';

export interface AtelierUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  status: 'Activo' | 'Inactivo' | 'Pendente';
  phone?: string;
  department?: string;
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
  password?: string;
}
