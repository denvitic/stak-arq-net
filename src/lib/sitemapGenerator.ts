import { Project, Article, SitePagesContent } from '../types';

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export function generateSitemapXml(
  origin: string = 'https://stakarquitectura.com',
  projects: Project[] = [],
  articles: Article[] = [],
  pagesContent?: SitePagesContent
): string {
  const cleanOrigin = origin.replace(/\/+$/, '');
  const today = new Date().toISOString().split('T')[0];

  const entries: SitemapEntry[] = [
    // Main Landing / Home
    {
      loc: pagesContent?.home?.seo?.canonicalUrl || `${cleanOrigin}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 1.0,
    },
    // Projects Portfolio Page
    {
      loc: pagesContent?.projects?.seo?.canonicalUrl || `${cleanOrigin}/#projectos`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9,
    },
    // Services Page
    {
      loc: pagesContent?.services?.seo?.canonicalUrl || `${cleanOrigin}/#servicos`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8,
    },
    // Atelier & Manifesto Page
    {
      loc: pagesContent?.atelier?.seo?.canonicalUrl || `${cleanOrigin}/#sobre-nos`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8,
    },
    // Articles & Journal Page
    {
      loc: pagesContent?.articles?.seo?.canonicalUrl || `${cleanOrigin}/#artigos`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
    },
    // Contacts & Briefing Page
    {
      loc: pagesContent?.contacts?.seo?.canonicalUrl || `${cleanOrigin}/#contactos`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7,
    },
  ];

  // Add individual projects if not noIndex
  if (Array.isArray(projects)) {
    projects.forEach((proj) => {
      const slug = proj.slug || proj.id;
      entries.push({
        loc: `${cleanOrigin}/#projectos/${encodeURIComponent(slug)}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: proj.featured ? 0.85 : 0.75,
      });
    });
  }

  // Add individual articles
  if (Array.isArray(articles)) {
    articles.forEach((art) => {
      const slug = art.slug || art.id;
      entries.push({
        loc: `${cleanOrigin}/#artigos/${encodeURIComponent(slug)}`,
        lastmod: art.date ? new Date(art.date).toISOString().split('T')[0] : today,
        changefreq: 'monthly',
        priority: 0.7,
      });
    });
  }

  const xmlEntries = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated automatically by STAK Arquitectura CMS Dynamic Sitemap Engine -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '\'':
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}
