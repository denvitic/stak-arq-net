import React, { useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { NavPage, Project, PageSeoSettings } from '../types';

interface SeoHeadManagerProps {
  currentPage: NavPage;
  selectedProject: Project | null;
}

const DEFAULT_DOMAIN = 'https://stakarquitectura.com';

export const SeoHeadManager: React.FC<SeoHeadManagerProps> = ({
  currentPage,
  selectedProject,
}) => {
  const { atelierInfo, pagesContent, services, articles } = useCms();

  useEffect(() => {
    // 1. Resolve active page specific SEO with robust fallbacks
    let pageSeo: PageSeoSettings | undefined;
    let pagePath = '/';
    let pageLabel = 'Início';
    let defaultTitle = 'STAK Arquitectura & Design de Interiores | Luanda, Angola';
    let defaultDesc =
      'Gabinete de arquitectura de autor e design de ambientes de alto padrão em Luanda. Projectos residenciais de luxo, edifícios corporativos e fiscalização de obras.';
    let defaultKeywords =
      'arquitectura luanda, arquitectos angola, design de interiores talatona, moradias luxo, atelier de arquitectura';

    if (currentPage === 'inicio') {
      pageSeo = pagesContent?.home?.seo;
      pagePath = '/';
      pageLabel = 'Início';
    } else if (currentPage === 'sobre-nos') {
      pageSeo = pagesContent?.atelier?.seo;
      pagePath = '/#sobre-nos';
      pageLabel = 'O Atelier';
      defaultTitle = 'O Atelier & Filosofia | STAK Arquitectura Luanda';
      defaultDesc =
        'Conheça o atelier STAK Arquitectura em Luanda. Rigor técnico, identidade bioclimática angolana e equipa multidisciplinar de arquitectos e engenheiros.';
      defaultKeywords =
        'atelier arquitectura luanda, arquitectos angola, história stak arquitectura, equipa arquitectura luanda';
    } else if (currentPage === 'projectos') {
      pageSeo = pagesContent?.projects?.seo;
      pagePath = '/#projectos';
      pageLabel = 'Projectos';
      defaultTitle = 'Projectos & Portfólio de Arquitectura | STAK Luanda';
      defaultDesc =
        'Explore o portfólio de residências unifamiliares, interiores corporativos e projectos comerciais desenvolvidos pela STAK Arquitectura em Angola.';
      defaultKeywords =
        'projectos arquitectura luanda, casas luxo angola, moradias talatona, portfólio arquitectura';
    } else if (currentPage === 'servicos') {
      pageSeo = pagesContent?.services?.seo;
      pagePath = '/#servicos';
      pageLabel = 'Serviços';
      defaultTitle = 'Serviços de Arquitectura & Design de Interiores | STAK Luanda';
      defaultDesc =
        'Projectos de arquitectura, licenciamento camarário, design de interiores, estudos bioclimáticos e fiscalização de obras em Angola.';
      defaultKeywords =
        'serviços arquitectura angola, licenciamento obras luanda, design interiores talatona, fiscalização obras';
    } else if (currentPage === 'artigos') {
      pageSeo = pagesContent?.articles?.seo;
      pagePath = '/#artigos';
      pageLabel = 'Artigos';
      defaultTitle = 'Artigos, Ensaios & Tendências de Arquitectura | STAK Journal';
      defaultDesc =
        'Reflexões sobre arquitectura contemporânea tropical, sustentabilidade, materiais nobres e design de interiores em Luanda e no mundo.';
      defaultKeywords =
        'artigos arquitectura angola, tendências design interiores luanda, revista arquitectura';
    } else if (currentPage === 'contactos') {
      pageSeo = pagesContent?.contacts?.seo;
      pagePath = '/#contactos';
      pageLabel = 'Contactos';
      defaultTitle = 'Contactos & Pedido de Briefing | STAK Arquitectura Luanda';
      defaultDesc =
        'Entre em contacto com o atelier STAK em Luanda. Solicite o seu estudo prévio, proposta técnica de arquitectura ou agende uma reunião presencial.';
      defaultKeywords =
        'contactos stak arquitectura, orçamento arquitectura luanda, briefing arquitectura angola, gabinete luanda';
    } else if (currentPage === '404') {
      pagePath = '/404';
      pageLabel = 'Página Não Encontrada';
      defaultTitle = '404 - Página Não Encontrada | STAK Arquitectura';
      defaultDesc = 'A página solicitada não foi encontrada na nossa estrutura digital.';
    }

    const globalSeo = atelierInfo?.seoMeta;
    let pageTitle =
      pageSeo?.metaTitle?.trim() ||
      globalSeo?.metaTitle?.trim() ||
      defaultTitle;
    let pageDesc =
      pageSeo?.metaDescription?.trim() ||
      globalSeo?.metaDescription?.trim() ||
      defaultDesc;
    let pageKeywords =
      pageSeo?.metaKeywords?.trim() ||
      globalSeo?.metaKeywords?.trim() ||
      defaultKeywords;
    let canonical =
      pageSeo?.canonicalUrl?.trim() ||
      `${DEFAULT_DOMAIN}${pagePath}`;
    let ogImg =
      pageSeo?.ogImage?.trim() ||
      globalSeo?.ogImage?.trim() ||
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85';
    let ogTitle =
      pageSeo?.ogTitle?.trim() ||
      pageTitle;
    let ogDesc =
      pageSeo?.ogDescription?.trim() ||
      pageDesc;
    let ogUrl =
      pageSeo?.ogUrl?.trim() ||
      canonical;
    let twitterTitle =
      pageSeo?.twitterTitle?.trim() ||
      ogTitle;
    let twitterDesc =
      pageSeo?.twitterDescription?.trim() ||
      ogDesc;
    let twitterImg =
      pageSeo?.twitterImage?.trim() ||
      ogImg;
    const isNoIndex =
      Boolean(pageSeo?.noIndex) || currentPage === '404' || currentPage === 'admin';

    // Override if project modal is open
    if (selectedProject) {
      pageTitle = `${selectedProject.title} | STAK Arquitectura Luanda`;
      pageDesc = `${selectedProject.subtitle} – ${selectedProject.description.slice(0, 145)}...`;
      canonical = `${DEFAULT_DOMAIN}/#projectos/${encodeURIComponent(selectedProject.slug || selectedProject.id)}`;
      ogImg = selectedProject.coverImage || ogImg;
      ogTitle = pageTitle;
      ogDesc = pageDesc;
      ogUrl = canonical;
      twitterTitle = pageTitle;
      twitterDesc = pageDesc;
      twitterImg = ogImg;
    }

    // 2. Apply document title
    document.title = pageTitle;

    // 3. Helper to update/create meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Description & Keywords
    setMetaTag('meta[name="description"]', 'name', 'description', pageDesc);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', pageKeywords);

    // Robots (index/noindex)
    setMetaTag(
      'meta[name="robots"]',
      'name',
      'robots',
      isNoIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    // OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', ogTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', ogDesc);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImg);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', ogUrl);
    setMetaTag(
      'meta[property="og:type"]',
      'property',
      'og:type',
      currentPage === 'artigos' ? 'article' : 'website'
    );
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', atelierInfo?.name || 'STAK Arquitectura');
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'pt_AO');

    // Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', twitterTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', twitterDesc);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', twitterImg);

    // Favicon
    if (atelierInfo?.favicon) {
      let fav = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!fav) {
        fav = document.createElement('link');
        fav.rel = 'icon';
        document.head.appendChild(fav);
      }
      fav.href = atelierInfo.favicon;
    }

    // 4. Google Search Console Verification Tag
    if (globalSeo?.googleSearchConsoleTag) {
      const gscCode = globalSeo.googleSearchConsoleTag.trim();
      if (gscCode) {
        setMetaTag('meta[name="google-site-verification"]', 'name', 'google-site-verification', gscCode);
      }
    }

    // 5. Google Analytics (gtag.js) Injection
    if (globalSeo?.googleAnalyticsId) {
      const gaId = globalSeo.googleAnalyticsId.trim();
      if (gaId && !document.getElementById('stak-ga-script')) {
        const gaScript = document.createElement('script');
        gaScript.id = 'stak-ga-script';
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
        document.head.appendChild(gaScript);

        const gaInitScript = document.createElement('script');
        gaInitScript.id = 'stak-ga-init';
        gaInitScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { page_path: window.location.pathname + window.location.hash });
        `;
        document.head.appendChild(gaInitScript);
      } else if (gaId && typeof (window as any).gtag === 'function') {
        (window as any).gtag('config', gaId, {
          page_path: window.location.pathname + window.location.hash,
        });
      }
    }

    // 6. Google Tag Manager Injection
    if (globalSeo?.googleTagManagerId) {
      const gtmId = globalSeo.googleTagManagerId.trim();
      if (gtmId && !document.getElementById('stak-gtm-script')) {
        const gtmScript = document.createElement('script');
        gtmScript.id = 'stak-gtm-script';
        gtmScript.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `;
        document.head.appendChild(gtmScript);
      }
    }

    // 7. JSON-LD Structured Data Schema Markup
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'ProfessionalService'],
      name: atelierInfo?.name || 'STAK Arquitectura & Design de Interiores',
      alternateName: 'STAK Arquitectura',
      url: DEFAULT_DOMAIN,
      logo: atelierInfo?.logoLight || `${DEFAULT_DOMAIN}/img/logo.png`,
      image: ogImg,
      description:
        atelierInfo?.brandTagline ||
        'Gabinete de arquitectura de autor e design de interiores sediado em Luanda, Angola.',
      telephone: atelierInfo?.phone || '+244 923 000 000',
      email: atelierInfo?.email || 'geral@stakarquitectura.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: atelierInfo?.locationAddress || 'Edifício Luanda Ocean Tower, Piso 8',
        addressLocality: atelierInfo?.city || 'Luanda',
        addressCountry: atelierInfo?.country || 'Angola',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -8.8383,
        longitude: 13.2344,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:30',
          closes: '18:00',
        },
      ],
      sameAs: [
        atelierInfo?.instagram ? `https://instagram.com/${atelierInfo.instagram.replace('@', '')}` : '',
        atelierInfo?.linkedin || '',
        atelierInfo?.facebook || '',
      ].filter(Boolean),
      creator: {
        '@type': 'Organization',
        name: 'Denvitic Tecnologias',
        url: 'https://www.denvitic.com',
      },
    };

    // BreadcrumbList Schema
    const breadcrumbListSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: `${DEFAULT_DOMAIN}/`,
        },
        ...(currentPage !== 'inicio'
          ? [
              {
                '@type': 'ListItem',
                position: 2,
                name: pageLabel,
                item: `${DEFAULT_DOMAIN}${pagePath}`,
              },
            ]
          : []),
        ...(selectedProject
          ? [
              {
                '@type': 'ListItem',
                position: 3,
                name: selectedProject.title,
                item: canonical,
              },
            ]
          : []),
      ],
    };

    // Optional Page-Specific Schemas
    let specificSchema: any = null;

    if (selectedProject) {
      specificSchema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: selectedProject.title,
        headline: selectedProject.subtitle,
        description: selectedProject.description,
        image: selectedProject.coverImage,
        author: {
          '@type': 'Organization',
          name: atelierInfo?.name || 'STAK Arquitectura',
        },
        genre: selectedProject.categoryLabel,
        locationCreated: {
          '@type': 'Place',
          name: selectedProject.fichaTecnica?.localizacao || 'Luanda, Angola',
        },
      };
    } else if (currentPage === 'servicos' && Array.isArray(services)) {
      specificSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Serviços Especializados de Arquitectura e Construção',
        itemListElement: services.map((s, idx) => ({
          '@type': 'Service',
          position: idx + 1,
          name: s.title,
          description: s.description,
          provider: {
            '@type': 'Organization',
            name: atelierInfo?.name || 'STAK Arquitectura',
          },
        })),
      };
    } else if (currentPage === 'artigos' && Array.isArray(articles)) {
      specificSchema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'STAK Architectural Journal',
        description: 'Artigos, tendências e ensaios sobre arquitectura moderna e design em Angola.',
        blogPost: articles.map((art) => ({
          '@type': 'BlogPosting',
          headline: art.title,
          description: art.excerpt,
          image: art.image,
          datePublished: art.date,
          author: {
            '@type': 'Person',
            name: art.author,
          },
        })),
      };
    }

    // Embed JSON-LD script tags
    const injectLdJson = (id: string, data: object) => {
      let script = document.getElementById(id) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(data);
    };

    injectLdJson('stak-org-ldjson', organizationSchema);
    injectLdJson('stak-bc-ldjson', breadcrumbListSchema);
    if (specificSchema) {
      injectLdJson('stak-specific-ldjson', specificSchema);
    } else {
      const oldSpecific = document.getElementById('stak-specific-ldjson');
      if (oldSpecific) oldSpecific.remove();
    }
  }, [
    currentPage,
    selectedProject,
    pagesContent,
    atelierInfo,
    services,
    articles,
  ]);

  return null;
};
