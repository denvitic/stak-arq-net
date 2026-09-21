import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Project,
  Article,
  BriefingSubmission,
  AtelierInfo,
  SitePagesContent,
  ServiceItem,
  MediaItem,
  AtelierUser,
} from '../types';
import {
  initialProjects,
  initialArticles,
  initialBriefings,
  initialAtelierInfo,
  initialPagesContent,
  initialServices,
  initialMediaLibrary,
  initialUsers,
} from '../data/initialData';
import { getSupabase, isSupabaseConfigured, uploadFileToStorage } from '../lib/supabase';

interface CmsContextType {
  projects: Project[];
  services: ServiceItem[];
  articles: Article[];
  briefings: BriefingSubmission[];
  atelierInfo: AtelierInfo;
  pagesContent: SitePagesContent;
  mediaLibrary: MediaItem[];
  users: AtelierUser[];
  isCmsOpen: boolean;
  setIsCmsOpen: (open: boolean) => void;
  activeCmsTab: string;
  setActiveCmsTab: (tab: string) => void;
  // Supabase Status & Seeding
  isSupabaseLive: boolean;
  isHydrated: boolean;
  seedSupabaseInitialData: () => Promise<{ success: boolean; message: string }>;
  // Actions
  addProject: (project: Omit<Project, 'id' | 'slug'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  toggleFeaturedProject: (id: string) => void;
  toggleBeforeAfterProject: (id: string) => void;
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;
  addBriefing: (briefing: Omit<BriefingSubmission, 'id' | 'createdAt' | 'status'>) => void;
  updateBriefingStatus: (id: string, status: BriefingSubmission['status']) => void;
  deleteBriefing: (id: string) => void;
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  updateAtelierInfo: (info: AtelierInfo) => void;
  updatePagesContent: (pages: SitePagesContent) => void;
  updatePageContent: <K extends keyof SitePagesContent>(pageKey: K, content: SitePagesContent[K]) => void;
  // Users CRUD
  addUser: (user: Omit<AtelierUser, 'id' | 'createdAt'>) => AtelierUser;
  updateUser: (id: string, updates: Partial<AtelierUser>) => void;
  deleteUser: (id: string) => void;
  // Media Library
  uploadMediaFile: (file: File) => Promise<string>;
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => MediaItem;
  deleteMediaItem: (id: string) => void;
  resetToDefaults: () => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'stak_architects_projects_v4',
  SERVICES: 'stak_architects_services_v2',
  ARTICLES: 'stak_architects_articles_v4',
  BRIEFINGS: 'stak_architects_briefings_v3',
  ATELIER: 'stak_architects_atelier_v3',
  PAGES: 'stak_architects_pages_v3',
  MEDIA: 'stak_architects_media_v2',
  USERS: 'stak_architects_users_v1',
};

// Safe LocalStorage setter helper with quota error catch
const safeSetLocalStorage = (key: string, data: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`LocalStorage quota exceeded for key "${key}". Saving gracefully in memory.`, err);
  }
};

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCmsOpen, setIsCmsOpen] = useState<boolean>(false);
  const [activeCmsTab, setActiveCmsTab] = useState<string>('projects');
  const [isSupabaseLive, setIsSupabaseLive] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved =
      localStorage.getItem(STORAGE_KEYS.PROJECTS) ||
      localStorage.getItem('stak_architects_projects_v3') ||
      localStorage.getItem('stak_architects_projects_v2');
    if (saved) {
      try {
        const parsed: Project[] = JSON.parse(saved);
        return parsed.map((p) => {
          const match = initialProjects.find((ip) => ip.id === p.id);
          return {
            ...match,
            ...p,
            featuredInBeforeAfter: p.featuredInBeforeAfter ?? (match?.featuredInBeforeAfter ?? false),
          };
        });
      } catch (e) {
        console.error('Error parsing projects from localStorage', e);
      }
    }
    return initialProjects;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES) || localStorage.getItem('stak_architects_services_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing services from localStorage', e);
      }
    }
    return initialServices;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved =
      localStorage.getItem(STORAGE_KEYS.ARTICLES) ||
      localStorage.getItem('stak_architects_articles_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing articles from localStorage', e);
      }
    }
    return initialArticles;
  });

  const [briefings, setBriefings] = useState<BriefingSubmission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BRIEFINGS) || localStorage.getItem('stak_architects_briefings_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing briefings from localStorage', e);
      }
    }
    return initialBriefings;
  });

  const [atelierInfo, setAtelierInfo] = useState<AtelierInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATELIER) || localStorage.getItem('stak_architects_atelier_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...initialAtelierInfo,
          ...parsed,
          seoMeta: {
            ...initialAtelierInfo.seoMeta,
            ...(parsed.seoMeta || {}),
          },
        };
      } catch (e) {
        console.error('Error parsing atelier info from localStorage', e);
      }
    }
    return initialAtelierInfo;
  });

  const [pagesContent, setPagesContent] = useState<SitePagesContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PAGES) || localStorage.getItem('stak_architects_pages_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...initialPagesContent,
          ...parsed,
          home: {
            ...initialPagesContent.home,
            ...(parsed.home || {}),
            sections: {
              ...initialPagesContent.home.sections,
              ...(parsed.home?.sections || {}),
              testimonials: {
                ...initialPagesContent.home.sections.testimonials,
                ...(parsed.home?.sections?.testimonials || {}),
                items: Array.isArray(parsed.home?.sections?.testimonials?.items)
                  ? parsed.home.sections.testimonials.items
                  : initialPagesContent.home.sections.testimonials.items,
                assurances: Array.isArray(parsed.home?.sections?.testimonials?.assurances)
                  ? parsed.home.sections.testimonials.assurances
                  : initialPagesContent.home.sections.testimonials.assurances,
              },
            },
          },
          atelier: {
            ...initialPagesContent.atelier,
            ...(parsed.atelier || {}),
            sections: {
              ...initialPagesContent.atelier.sections,
              ...(parsed.atelier?.sections || {}),
            },
          },
          projects: { ...initialPagesContent.projects, ...(parsed.projects || {}) },
          services: {
            ...initialPagesContent.services,
            ...(parsed.services || {}),
            hero: {
              ...initialPagesContent.services.hero,
              ...(parsed.services?.hero || {}),
              tagPills: Array.isArray(parsed.services?.hero?.tagPills)
                ? parsed.services.hero.tagPills
                : initialPagesContent.services.hero.tagPills,
            },
            sections: {
              ...initialPagesContent.services.sections,
              ...(parsed.services?.sections || {}),
              faq: {
                ...initialPagesContent.services.sections.faq,
                ...(parsed.services?.sections?.faq || {}),
                items: Array.isArray(parsed.services?.sections?.faq?.items)
                  ? parsed.services.sections.faq.items
                  : initialPagesContent.services.sections.faq?.items || [],
              },
            },
          },
          articles: { ...initialPagesContent.articles, ...(parsed.articles || {}) },
          contacts: { ...initialPagesContent.contacts, ...(parsed.contacts || {}) },
          navigation: {
            ...initialPagesContent.navigation,
            ...(parsed.navigation || {}),
            header: {
              ...initialPagesContent.navigation?.header,
              ...(parsed.navigation?.header || {}),
              items: parsed.navigation?.header?.items || initialPagesContent.navigation?.header?.items || [],
            },
            footer: {
              ...initialPagesContent.navigation?.footer,
              ...(parsed.navigation?.footer || {}),
            },
          },
          faq: {
            ...initialPagesContent.faq,
            ...(parsed.faq || {}),
            items: parsed.faq?.items || initialPagesContent.faq?.items || [],
          },
        };
      } catch (e) {
        console.error('Error parsing pages content from localStorage', e);
      }
    }
    return initialPagesContent;
  });

  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDIA) || localStorage.getItem('stak_architects_media_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing media library from localStorage', e);
      }
    }
    return initialMediaLibrary;
  });

  const [users, setUsers] = useState<AtelierUser[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Sync master admin email to denvitic@gmail.com if previously stored as admin@stak.ao
          return parsed.map((u: AtelierUser) =>
            u.id === 'user-admin-master' || u.email === 'admin@stak.ao'
              ? { ...u, email: 'denvitic@gmail.com' }
              : u
          );
        }
      } catch (e) {
        console.error('Error parsing users from localStorage', e);
      }
    }
    return initialUsers;
  });

  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.USERS, users);
  }, [users]);

  // Sync to LocalStorage safely
  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.SERVICES, services);
  }, [services]);

  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.ARTICLES, articles);
  }, [articles]);

  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.BRIEFINGS, briefings);
  }, [briefings]);

  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.ATELIER, atelierInfo);
  }, [atelierInfo]);

  useEffect(() => {
    safeSetLocalStorage(STORAGE_KEYS.PAGES, pagesContent);
  }, [pagesContent]);

  useEffect(() => {
    // Only save media library if size permits, otherwise prune older data URLs safely
    try {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(mediaLibrary));
    } catch (e) {
      console.warn('Storage quota reached for media library; pruning bulky cache from storage', e);
      try {
        // Keep media items but trim heavy raw base64 for persistent storage if needed
        const pruned = mediaLibrary.slice(0, 15);
        localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(pruned));
      } catch {
        // Safe fallback
      }
    }
  }, [mediaLibrary]);

  // Sync document head metatags & favicon
  useEffect(() => {
    if (atelierInfo.seoMeta?.metaTitle) {
      document.title = atelierInfo.seoMeta.metaTitle;
    }

    if (atelierInfo.seoMeta?.metaDescription) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', atelierInfo.seoMeta.metaDescription);
    }

    if (atelierInfo.favicon) {
      let linkIcon = document.querySelector('link[rel~="icon"]') as HTMLLinkElement;
      if (!linkIcon) {
        linkIcon = document.createElement('link');
        linkIcon.rel = 'icon';
        document.head.appendChild(linkIcon);
      }
      linkIcon.href = atelierInfo.favicon;
    }
  }, [atelierInfo.seoMeta, atelierInfo.favicon]);

  // Load live data from Supabase if tables exist
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setIsHydrated(true);
      return;
    }
    const client = getSupabase();
    if (!client) {
      setIsHydrated(true);
      return;
    }

    const hydrateFromSupabase = async () => {
      try {
        // 1. Projects
        const { data: projData, error: projErr } = await client.from('projects').select('*');
        if (!projErr && Array.isArray(projData)) {
          setIsSupabaseLive(true);
          if (projData.length > 0) {
            setProjects(
              projData.map((p: any) => {
                const match = initialProjects.find((ip) => ip.id === p.id);
                return {
                  id: p.id,
                  slug: p.slug || (match?.slug ?? p.id),
                  title: p.title || (match?.title ?? 'Projecto STAK'),
                  subtitle: p.subtitle || (match?.subtitle ?? 'Arquitectura'),
                  category: p.category || (match?.category ?? 'residencial'),
                  categoryLabel: p.category_label || (match?.categoryLabel ?? 'Residencial'),
                  coverImage: p.cover_image || p.hero_image || (match?.coverImage ?? ''),
                  beforeImage: p.before_image || match?.beforeImage,
                  afterLabel: p.after_label || match?.afterLabel,
                  beforeLabel: p.before_label || match?.beforeLabel,
                  galleryImages: Array.isArray(p.gallery_images) ? p.gallery_images : (match?.galleryImages ?? []),
                  description: p.description || (match?.description ?? ''),
                  architecturalConcept: p.architectural_concept || p.concept || (match?.architecturalConcept ?? ''),
                  fichaTecnica: p.ficha_tecnica || match?.fichaTecnica || {
                    localizacao: p.location || 'Luanda, Angola',
                    ano: p.year || '2024',
                    area: p.area || '450 m²',
                    tipologia: p.typology || 'Habitacional',
                    estadoObra: p.status || 'Concluído',
                    cliente: p.client || 'Privado',
                    especialidades: ['Arquitectura', 'Estruturas', 'Interiores'],
                  },
                  featured: Boolean(p.featured),
                  featuredInBeforeAfter:
                    typeof p.featured_in_before_after === 'boolean'
                      ? p.featured_in_before_after
                      : Boolean(match?.featuredInBeforeAfter),
                };
              })
            );
          }
        }

        // 2. Services
        const { data: servData, error: servErr } = await client
          .from('services')
          .select('*')
          .order('code', { ascending: true });
        if (!servErr && Array.isArray(servData) && servData.length > 0) {
          const mapped = servData.map((s: any) => ({
            id: s.id,
            code: s.code,
            title: s.title,
            tagline: s.tagline,
            description: s.description,
            deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
            ctaLabel: s.cta_label,
            ctaAction: s.cta_action,
            image: s.image,
            typicalDuration: s.typical_duration,
            icon: s.icon,
          }));
          // Sort deterministically 01..06
          mapped.sort((a, b) => (a.code || '').localeCompare(b.code || '', undefined, { numeric: true }));
          setServices(mapped);
        }

        // 3. Articles
        const { data: artData, error: artErr } = await client.from('articles').select('*');
        if (!artErr && Array.isArray(artData) && artData.length > 0) {
          setArticles(
            artData.map((a: any) => ({
              id: a.id,
              title: a.title,
              category: a.category,
              date: a.date,
              readTime: a.read_time,
              image: a.image,
              excerpt: a.excerpt,
              content: Array.isArray(a.content) ? a.content : [],
              author: a.author,
            }))
          );
        }

        // 4. Briefings
        const { data: briefData, error: briefErr } = await client
          .from('briefings')
          .select('*')
          .order('created_at', { ascending: false });
        if (!briefErr && Array.isArray(briefData) && briefData.length > 0) {
          setBriefings(
            briefData.map((b: any) => ({
              id: b.id,
              clientName: b.client_name,
              clientEmail: b.client_email || '',
              clientPhone: b.client_phone,
              projectType: b.project_type,
              budgetRange: b.budget || '',
              timeline: b.timeline || '',
              location: b.location || '',
              estimatedArea: b.estimated_area || '',
              description: b.description || '',
              status: b.status || 'Pendente',
              createdAt: b.created_at || '',
            }))
          );
        }

        // 5. Atelier Info
        const { data: infoData, error: infoErr } = await client
          .from('atelier_info')
          .select('*')
          .limit(1)
          .maybeSingle();
        if (!infoErr && infoData) {
          setAtelierInfo((prev) => ({
            ...prev,
            name: infoData.name || prev.name,
            brandTagline: infoData.tagline || infoData.brand_tagline || prev.brandTagline,
            manifesto: infoData.manifesto || prev.manifesto,
            email: infoData.email || prev.email,
            phone: infoData.phone || prev.phone,
            locationAddress: infoData.address || infoData.location_address || prev.locationAddress,
            city: infoData.city || prev.city,
            country: infoData.country || prev.country,
            instagram: infoData.instagram || prev.instagram,
            linkedin: infoData.linkedin || prev.linkedin,
            whatsapp: infoData.whatsapp || prev.whatsapp,
            stats: infoData.stats && typeof infoData.stats === 'object' ? infoData.stats : prev.stats,
          }));
        }

        // 6. Pages Content
        const { data: pagesData, error: pagesErr } = await client.from('pages_content').select('*');
        if (!pagesErr && Array.isArray(pagesData) && pagesData.length > 0) {
          setPagesContent((prev) => {
            const next = { ...prev };
            for (const item of pagesData) {
              if (item.page_key && (next as any)[item.page_key]) {
                (next as any)[item.page_key] = {
                  ...(next as any)[item.page_key],
                  ...(item.hero ? { hero: item.hero } : {}),
                  ...(item.sections ? { sections: item.sections } : {}),
                  ...(item.seo ? { seo: item.seo } : {}),
                };
              }
            }
            return next;
          });
        }

        // 7. Media Library
        const { data: mediaData, error: mediaErr } = await client
          .from('media_library')
          .select('*')
          .order('uploaded_at', { ascending: false });
        if (!mediaErr && Array.isArray(mediaData) && mediaData.length > 0) {
          setMediaLibrary(
            mediaData.map((m: any) => ({
              id: m.id,
              name: m.name,
              url: m.url,
              type: m.type || 'image',
              size: m.size || '',
              uploadedAt: m.uploaded_at ? m.uploaded_at.split('T')[0] : new Date().toISOString().split('T')[0],
              category: m.category || 'Uploads',
            }))
          );
        }
      } catch (err) {
        console.warn('Supabase hydration check note:', err);
      } finally {
        setIsHydrated(true);
      }
    };

    hydrateFromSupabase();
  }, []);

  // Supabase Safe Operation Helpers (Auto-adapts if schema is missing optional columns)
  const safeUpsert = async (client: any, table: string, row: Record<string, any>) => {
    let payload = { ...row };
    let { error } = await client.from(table).upsert(payload);
    let attempts = 0;
    while (error && (error.code === 'PGRST204' || error.message?.includes('Could not find the')) && attempts < 6) {
      attempts++;
      const match = error.message?.match(/Could not find the '([^']+)' column/i);
      if (match && match[1] && payload[match[1]] !== undefined) {
        console.warn(`[Supabase Auto-Adapt] Coluna "${match[1]}" não existe na tabela ${table}. A reenviar sem ela...`);
        delete payload[match[1]];
        const res = await client.from(table).upsert(payload);
        error = res.error;
      } else {
        break;
      }
    }
    return { error };
  };

  const safeInsert = async (client: any, table: string, row: Record<string, any>) => {
    let payload = { ...row };
    let { error } = await client.from(table).insert(payload);
    let attempts = 0;
    while (error && (error.code === 'PGRST204' || error.message?.includes('Could not find the')) && attempts < 6) {
      attempts++;
      const match = error.message?.match(/Could not find the '([^']+)' column/i);
      if (match && match[1] && payload[match[1]] !== undefined) {
        console.warn(`[Supabase Auto-Adapt] Coluna "${match[1]}" não existe na tabela ${table}. A reenviar sem ela...`);
        delete payload[match[1]];
        const res = await client.from(table).insert(payload);
        error = res.error;
      } else {
        break;
      }
    }
    return { error };
  };

  // Supabase Mapping Helpers
  const mapProjectToRow = (p: Project) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category,
    category_label: p.categoryLabel,
    typology: p.fichaTecnica?.tipologia || null,
    location: p.fichaTecnica?.localizacao || 'Luanda, Angola',
    year: p.fichaTecnica?.ano || '2024',
    hero_image: p.coverImage,
    cover_image: p.coverImage,
    before_image: p.beforeImage || null,
    after_image: p.coverImage,
    before_label: p.beforeLabel || null,
    after_label: p.afterLabel || null,
    before_description: p.beforeDescription || null,
    gallery_images: p.galleryImages || [],
    description: p.description || null,
    concept: p.architecturalConcept || null,
    architectural_concept: p.architecturalConcept || null,
    ficha_tecnica: p.fichaTecnica || {},
    area: p.fichaTecnica?.area || null,
    client: p.fichaTecnica?.cliente || null,
    status: p.fichaTecnica?.estadoObra || 'Concluído',
    featured: Boolean(p.featured),
    featured_in_before_after: Boolean(p.featuredInBeforeAfter),
    video_url: p.videoUrl || null,
    video_poster: p.videoPoster || null,
    updated_at: new Date().toISOString(),
  });

  const mapServiceToRow = (s: ServiceItem) => ({
    id: s.id,
    code: s.code,
    title: s.title,
    tagline: s.tagline || null,
    description: s.description,
    deliverables: s.deliverables || [],
    cta_label: s.ctaLabel || 'Solicitar Proposta',
    cta_action: s.ctaAction || 'briefing-geral',
    image: s.image,
    typical_duration: s.typicalDuration || null,
    icon: s.icon || null,
    updated_at: new Date().toISOString(),
  });

  const mapArticleToRow = (a: Article) => ({
    id: a.id,
    title: a.title,
    category: a.category || null,
    date: a.date,
    read_time: a.readTime || null,
    image: a.image,
    excerpt: a.excerpt,
    content: a.content || [],
    author: a.author || 'Atelier STAK',
    updated_at: new Date().toISOString(),
  });

  const mapAtelierToRow = (info: AtelierInfo) => ({
    id: 'stak-main-atelier',
    name: info.name,
    tagline: info.brandTagline,
    brand_tagline: info.brandTagline,
    manifesto: info.manifesto,
    email: info.email,
    phone: info.phone,
    phone_secondary: null,
    address: info.locationAddress,
    location_address: info.locationAddress,
    city: info.city,
    country: info.country,
    instagram: info.instagram,
    linkedin: info.linkedin || null,
    whatsapp: info.whatsapp,
    founded_year: info.stats?.yearsOfExperience || '10+',
    logo: info.logoDark || info.logoLight || null,
    favicon: info.favicon || null,
    stats: info.stats || [],
    seo_meta: info.seoMeta || {},
    updated_at: new Date().toISOString(),
  });

  // Project Actions
  const addProject = (projectData: Omit<Project, 'id' | 'slug'>) => {
    const id = 'proj-' + Date.now();
    const slug = projectData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProject: Project = {
      ...projectData,
      id,
      slug,
      featuredInBeforeAfter: projectData.featuredInBeforeAfter ?? (!!projectData.beforeImage),
    };
    setProjects((prev) => [newProject, ...prev]);

    const client = getSupabase();
    if (client) {
      safeInsert(client, 'projects', mapProjectToRow(newProject)).then(({ error }) => {
        if (error) {
          console.error('Erro ao registar projecto no Supabase:', error.message);
        } else {
          setIsSupabaseLive(true);
        }
      });
    }
  };

  const updateProject = (updated: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

    const client = getSupabase();
    if (client) {
      safeUpsert(client, 'projects', mapProjectToRow(updated)).then(({ error }) => {
        if (error) {
          console.error('Erro ao actualizar projecto no Supabase:', error.message);
        } else {
          setIsSupabaseLive(true);
        }
      });
    }
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));

    const client = getSupabase();
    if (client) {
      client
        .from('projects')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.error('Erro ao eliminar projecto no Supabase:', error.message);
        });
    }
  };

  const toggleFeaturedProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    const newFeatured = target ? !target.featured : false;
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: newFeatured } : p))
    );

    const client = getSupabase();
    if (client) {
      client
        .from('projects')
        .update({ featured: newFeatured, updated_at: new Date().toISOString() })
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.error('Erro ao alternar destaque no Supabase:', error.message);
        });
    }
  };

  const toggleBeforeAfterProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    const newStatus = target ? !target.featuredInBeforeAfter : false;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, featuredInBeforeAfter: newStatus }
          : p
      )
    );

    const client = getSupabase();
    if (client) {
      client
        .from('projects')
        .update({ featured_in_before_after: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.error('Erro ao alternar Antes/Depois no Supabase:', error.message);
        });
    }
  };

  // Service Actions
  const addService = (data: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...data,
      id: 'serv-' + Date.now(),
    };
    setServices((prev) => [...prev, newService]);

    const client = getSupabase();
    if (client) {
      client
        .from('services')
        .insert(mapServiceToRow(newService))
        .then(({ error }) => {
          if (error) console.error('Erro ao inserir serviço no Supabase:', error.message);
        });
    }
  };

  const updateService = (updated: ServiceItem) => {
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));

    const client = getSupabase();
    if (client) {
      client
        .from('services')
        .upsert(mapServiceToRow(updated))
        .then(({ error }) => {
          if (error) console.error('Erro ao actualizar serviço no Supabase:', error.message);
        });
    }
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));

    const client = getSupabase();
    if (client) {
      client
        .from('services')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.error('Erro ao eliminar serviço no Supabase:', error.message);
        });
    }
  };

  // Briefing Actions
  const addBriefing = (data: Omit<BriefingSubmission, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const createdAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newId = 'brief-' + Date.now();
    const newBriefing: BriefingSubmission = {
      ...data,
      id: newId,
      createdAt,
      status: 'Pendente',
    };
    setBriefings((prev) => [newBriefing, ...prev]);

    // Asynchronously insert into Supabase if configured
    const client = getSupabase();
    if (client) {
      (async () => {
        try {
          const { error } = await client.from('briefings').insert({
            id: newId,
            client_name: data.clientName,
            client_email: data.clientEmail || null,
            client_phone: data.clientPhone,
            project_type: data.projectType,
            budget: data.budgetRange || null,
            timeline: data.timeline || null,
            location: data.location || null,
            estimated_area: data.estimatedArea || null,
            description: data.description || null,
            status: 'Pendente',
          });
          if (error) {
            console.warn('Supabase briefing insert note:', error.message);
          } else {
            console.info('Briefing gravado com sucesso no Supabase PostgreSQL.');
          }
        } catch (err) {
          console.warn('Supabase briefing insert error:', err);
        }
      })();
    }
  };

  const updateBriefingStatus = (id: string, status: BriefingSubmission['status']) => {
    setBriefings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );

    const client = getSupabase();
    if (client) {
      (async () => {
        try {
          const { error } = await client.from('briefings').update({ status }).eq('id', id);
          if (error) console.warn('Supabase briefing status note:', error.message);
        } catch (err) {
          console.warn('Supabase briefing status update error:', err);
        }
      })();
    }
  };

  const deleteBriefing = (id: string) => {
    setBriefings((prev) => prev.filter((b) => b.id !== id));

    const client = getSupabase();
    if (client) {
      (async () => {
        try {
          const { error } = await client.from('briefings').delete().eq('id', id);
          if (error) console.warn('Supabase briefing delete note:', error.message);
        } catch (err) {
          console.warn('Supabase briefing delete error:', err);
        }
      })();
    }
  };

  // Article Actions
  const addArticle = (data: Omit<Article, 'id'>) => {
    const newArticle: Article = {
      ...data,
      id: 'art-' + Date.now(),
    };
    setArticles((prev) => [newArticle, ...prev]);

    const client = getSupabase();
    if (client) {
      client
        .from('articles')
        .insert(mapArticleToRow(newArticle))
        .then(({ error }) => {
          if (error) console.error('Erro ao registar artigo no Supabase:', error.message);
        });
    }
  };

  const updateArticle = (updated: Article) => {
    setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));

    const client = getSupabase();
    if (client) {
      client
        .from('articles')
        .upsert(mapArticleToRow(updated))
        .then(({ error }) => {
          if (error) console.error('Erro ao actualizar artigo no Supabase:', error.message);
        });
    }
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));

    const client = getSupabase();
    if (client) {
      client
        .from('articles')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.error('Erro ao eliminar artigo no Supabase:', error.message);
        });
    }
  };

  const updateAtelierInfo = (info: AtelierInfo) => {
    setAtelierInfo(info);

    const client = getSupabase();
    if (client) {
      client
        .from('atelier_info')
        .upsert(mapAtelierToRow(info))
        .then(({ error }) => {
          if (error) console.error('Erro ao guardar atelier_info no Supabase:', error.message);
        });
    }
  };

  const updatePagesContent = (pages: SitePagesContent) => {
    setPagesContent(pages);

    const client = getSupabase();
    if (client) {
      for (const [key, content] of Object.entries(pages)) {
        if (content && typeof content === 'object') {
          const anyContent = content as any;
          client
            .from('pages_content')
            .upsert({
              page_key: key,
              title: anyContent.title || anyContent.hero?.title || key,
              subtitle: anyContent.subtitle || anyContent.hero?.subtitle || null,
              hero: anyContent.hero || {},
              sections: anyContent.sections || {},
              seo: anyContent.seo || {},
              updated_at: new Date().toISOString(),
            })
            .then(({ error }) => {
              if (error) console.error(`Erro ao guardar página ${key} no Supabase:`, error.message);
            });
        }
      }
    }
  };

  const updatePageContent = <K extends keyof SitePagesContent>(pageKey: K, content: SitePagesContent[K]) => {
    setPagesContent((prev) => ({
      ...prev,
      [pageKey]: content,
    }));

    const client = getSupabase();
    if (client && content && typeof content === 'object') {
      const anyContent = content as any;
      client
        .from('pages_content')
        .upsert({
          page_key: String(pageKey),
          title: anyContent.title || anyContent.hero?.title || String(pageKey),
          subtitle: anyContent.subtitle || anyContent.hero?.subtitle || null,
          hero: anyContent.hero || {},
          sections: anyContent.sections || {},
          seo: anyContent.seo || {},
          updated_at: new Date().toISOString(),
        })
        .then(({ error }) => {
          if (error) console.error(`Erro ao actualizar página ${String(pageKey)} no Supabase:`, error.message);
        });
    }
  };

  // Users Management
  const addUser = (userData: Omit<AtelierUser, 'id' | 'createdAt'>): AtelierUser => {
    const newUser: AtelierUser = {
      ...userData,
      id: 'user-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Nunca acedeu',
    };
    setUsers((prev) => [newUser, ...prev]);
    return newUser;
  };

  const updateUser = (id: string, updates: Partial<AtelierUser>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Regista o ficheiro na tabela media_library do Supabase (usado após upload para o Storage)
  const persistMediaItemToSupabase = (item: MediaItem) => {
    const client = getSupabase();
    if (!client) return;
    client
      .from('media_library')
      .insert({
        id: item.id,
        name: item.name,
        url: item.url,
        type: item.type,
        size: item.size,
        category: item.category || 'Uploads',
        uploaded_at: new Date().toISOString(),
      })
      .then(({ error }) => {
        if (error) console.error('Erro ao registar media no Supabase:', error.message);
      });
  };

  // Robust Media Library Upload Handler
  const uploadMediaFile = (file: File): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const isVideo = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|ogg|mov|mkv)$/i);

      // Caminho preferencial: enviar directamente para o Supabase Storage.
      // Isto é essencial para ficheiros pesados (vídeos MP4 longos), que rapidamente
      // excedem a quota do localStorage do navegador se guardados como base64.
      if (isSupabaseConfigured()) {
        try {
          const publicUrl = await uploadFileToStorage(file, isVideo ? 'videos' : 'imagens');
          const sizeLabel =
            file.size >= 1024 * 1024
              ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
              : `${Math.round(file.size / 1024)} KB`;

          const newItem: MediaItem = {
            id: 'media-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
            name: file.name,
            url: publicUrl,
            type: isVideo ? 'video' : 'image',
            size: sizeLabel,
            uploadedAt: new Date().toISOString().split('T')[0],
            category: isVideo ? 'Vídeos & Mídia' : 'Uploads do Dispositivo',
          };
          setMediaLibrary((prev) => [newItem, ...prev]);
          persistMediaItemToSupabase(newItem);
          resolve(publicUrl);
          return;
        } catch (storageErr) {
          console.warn(
            'Falha ao enviar para o Supabase Storage; a usar fallback local (base64) para este ficheiro.',
            storageErr
          );
          // Continua para o fallback local abaixo em caso de erro (ex: bucket ainda não criado).
        }
      }

      // Fallback local: usado apenas quando o Supabase não está configurado, ou o
      // upload para o Storage falhou. Mantém o comportamento original em base64.
      try {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const maxDim = 1200;
              let width = img.width;
              let height = img.height;
              if (width > maxDim || height > maxDim) {
                if (width > height) {
                  height = Math.round((height * maxDim) / width);
                  width = maxDim;
                } else {
                  width = Math.round((width * maxDim) / height);
                  height = maxDim;
                }
              }
              const canvas = document.createElement('canvas');
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.80);
                const newItem: MediaItem = {
                  id: 'media-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
                  name: file.name,
                  url: dataUrl,
                  type: 'image',
                  size: `${Math.round((dataUrl.length * 0.75) / 1024)} KB`,
                  uploadedAt: new Date().toISOString().split('T')[0],
                  category: 'Uploads do Dispositivo',
                };
                setMediaLibrary((prev) => [newItem, ...prev]);
                resolve(dataUrl);
              } else {
                const rawUrl = e.target?.result as string;
                const newItem: MediaItem = {
                  id: 'media-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
                  name: file.name,
                  url: rawUrl,
                  type: 'image',
                  size: `${Math.round(file.size / 1024)} KB`,
                  uploadedAt: new Date().toISOString().split('T')[0],
                  category: 'Uploads do Dispositivo',
                };
                setMediaLibrary((prev) => [newItem, ...prev]);
                resolve(rawUrl);
              }
            };
            img.onerror = () => {
              // Fallback to raw data url if canvas decode fails
              const rawUrl = e.target?.result as string;
              resolve(rawUrl);
            };
            img.src = e.target?.result as string;
          };
          reader.onerror = () => reject(new Error('Falha ao ler o ficheiro de imagem'));
          reader.readAsDataURL(file);
        } else if (isVideo) {
          // Video upload handler
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
            const newItem: MediaItem = {
              id: 'media-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
              name: file.name,
              url: dataUrl,
              type: 'video',
              size: `${sizeMb} MB`,
              uploadedAt: new Date().toISOString().split('T')[0],
              category: 'Vídeos & Mídia',
            };
            setMediaLibrary((prev) => [newItem, ...prev]);
            resolve(dataUrl);
          };
          reader.onerror = () => reject(new Error('Falha ao ler o ficheiro de vídeo'));
          reader.readAsDataURL(file);
        } else {
          // Other media
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            const newItem: MediaItem = {
              id: 'media-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
              name: file.name,
              url: dataUrl,
              type: 'image',
              size: `${Math.round(file.size / 1024)} KB`,
              uploadedAt: new Date().toISOString().split('T')[0],
              category: 'Ficheiros Diversos',
            };
            setMediaLibrary((prev) => [newItem, ...prev]);
            resolve(dataUrl);
          };
          reader.onerror = () => reject(new Error('Falha ao ler o ficheiro'));
          reader.readAsDataURL(file);
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  const addMediaItem = (itemData: Omit<MediaItem, 'id' | 'uploadedAt'>): MediaItem => {
    const newItem: MediaItem = {
      ...itemData,
      id: 'media-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setMediaLibrary((prev) => [newItem, ...prev]);

    const client = getSupabase();
    if (client) {
      client
        .from('media_library')
        .insert({
          id: newItem.id,
          name: newItem.name,
          url: newItem.url,
          type: newItem.type,
          size: newItem.size,
          category: newItem.category || 'Uploads',
          uploaded_at: new Date().toISOString(),
        })
        .then(({ error }) => {
          if (error) console.error('Erro ao registar media no Supabase:', error.message);
        });
    }
    return newItem;
  };

  const deleteMediaItem = (id: string) => {
    setMediaLibrary((prev) => prev.filter((m) => m.id !== id));

    const client = getSupabase();
    if (client) {
      client
        .from('media_library')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.error('Erro ao eliminar media no Supabase:', error.message);
        });
    }
  };

  const resetToDefaults = () => {
    setProjects(initialProjects);
    setServices(initialServices);
    setArticles(initialArticles);
    setBriefings(initialBriefings);
    setAtelierInfo(initialAtelierInfo);
    setPagesContent(initialPagesContent);
    setMediaLibrary(initialMediaLibrary);
    setUsers(initialUsers);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.BRIEFINGS);
    localStorage.removeItem(STORAGE_KEYS.ATELIER);
    localStorage.removeItem(STORAGE_KEYS.PAGES);
    localStorage.removeItem(STORAGE_KEYS.MEDIA);
    localStorage.removeItem(STORAGE_KEYS.USERS);
  };

  const seedSupabaseInitialData = async (): Promise<{ success: boolean; message: string }> => {
    const client = getSupabase();
    if (!client) {
      return {
        success: false,
        message: 'Supabase não está configurado. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.',
      };
    }

    try {
      // 1. Projects
      const projectsToSeed = projects.length > 0 ? projects : initialProjects;
      for (const p of projectsToSeed) {
        const { error: pErr } = await safeUpsert(client, 'projects', mapProjectToRow(p));
        if (pErr) {
          throw new Error(`Erro na tabela "projects": ${pErr.message} (Código: ${pErr.code || 'RLS/Schema'})`);
        }
      }

      // 2. Services
      const servicesToSeed = services.length > 0 ? services : initialServices;
      for (const s of servicesToSeed) {
        const { error: sErr } = await safeUpsert(client, 'services', mapServiceToRow(s));
        if (sErr) {
          throw new Error(`Erro na tabela "services": ${sErr.message} (Código: ${sErr.code || 'RLS/Schema'})`);
        }
      }

      // 3. Articles
      const articlesToSeed = articles.length > 0 ? articles : initialArticles;
      for (const a of articlesToSeed) {
        const { error: aErr } = await safeUpsert(client, 'articles', mapArticleToRow(a));
        if (aErr) {
          throw new Error(`Erro na tabela "articles": ${aErr.message} (Código: ${aErr.code || 'RLS/Schema'})`);
        }
      }

      // 4. Atelier info
      const { error: infoErr } = await safeUpsert(client, 'atelier_info', mapAtelierToRow(atelierInfo));
      if (infoErr) {
        throw new Error(`Erro na tabela "atelier_info": ${infoErr.message} (Código: ${infoErr.code || 'RLS/Schema'})`);
      }

      // 5. Pages content
      const pageEntries = Object.entries(pagesContent);
      for (const [key, content] of pageEntries) {
        if (content && typeof content === 'object') {
          const anyContent = content as any;
          const { error: pageErr } = await safeUpsert(client, 'pages_content', {
            page_key: key,
            title: anyContent.title || anyContent.hero?.title || key,
            subtitle: anyContent.subtitle || anyContent.hero?.subtitle || null,
            hero: anyContent.hero || {},
            sections: anyContent.sections || {},
            seo: anyContent.seo || {},
            updated_at: new Date().toISOString(),
          });
          if (pageErr) {
            throw new Error(`Erro na tabela "pages_content" (página ${key}): ${pageErr.message}`);
          }
        }
      }

      // 6. Media Library
      for (const m of mediaLibrary) {
        if (!m.url.startsWith('data:')) {
          await safeUpsert(client, 'media_library', {
            id: m.id,
            name: m.name,
            url: m.url,
            type: m.type,
            size: m.size,
            category: m.category || 'Uploads',
            uploaded_at: new Date().toISOString(),
          });
        }
      }

      setIsSupabaseLive(true);
      return {
        success: true,
        message: 'Dados do Atelier STAK sincronizados com sucesso para a base de dados PostgreSQL no Supabase!',
      };
    } catch (err: any) {
      console.error('Supabase seed error:', err);
      return {
        success: false,
        message:
          err?.message ||
          'Falha ao sincronizar dados com o Supabase. Verifique se executou o script schema.sql no SQL Editor do Supabase.',
      };
    }
  };

  return (
    <CmsContext.Provider
      value={{
        projects,
        services,
        articles,
        briefings,
        atelierInfo,
        pagesContent,
        mediaLibrary,
        isCmsOpen,
        setIsCmsOpen,
        activeCmsTab,
        setActiveCmsTab,
        isSupabaseLive,
        isHydrated,
        seedSupabaseInitialData,
        addProject,
        updateProject,
        deleteProject,
        toggleFeaturedProject,
        toggleBeforeAfterProject,
        addService,
        updateService,
        deleteService,
        addBriefing,
        updateBriefingStatus,
        deleteBriefing,
        addArticle,
        updateArticle,
        deleteArticle,
        updateAtelierInfo,
        updatePagesContent,
        updatePageContent,
        users,
        addUser,
        updateUser,
        deleteUser,
        uploadMediaFile,
        addMediaItem,
        deleteMediaItem,
        resetToDefaults,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
