import {
  Project,
  ServiceItem,
  MethodologyStep,
  Article,
  AtelierInfo,
  BriefingSubmission,
  SitePagesContent,
  MediaItem,
  TestimonialItem,
  GuaranteePillar,
  FaqItem,
  SiteNavigationContent,
  AtelierUser,
} from '../types';

export const initialAtelierInfo: AtelierInfo = {
  name: 'STAK Arquitectura & Designer de Interiores',
  brandTagline: 'Sobriedade Espacial, Rigor Construtivo e Distinção Arquitectónica',
  manifesto:
    'Concebemos espaços onde a luz tropical de Angola, a pureza geométrica e os materiais nobres dialogam em perfeita harmonia. Da residência unifamiliar de luxo à sede corporativa contemporânea, cada projecto é uma resposta singular à paisagem, ao clima e à identidade de quem o habita.',
  history:
    'Fundado em Luanda, o atelier STAK consolidou-se como uma referência de excelência no panorama arquitectónico angolano. Aliando pesquisa conceitual avançada a um controlo rigoroso de execução, oferecemos soluções integradas desde o primeiro traço do estudo prévio até à entrega final da obra licenciada.',
  locationAddress: 'Edifício Kilamba Executivo, 4º Andar, Av. 4 de Fevereiro',
  city: 'Luanda',
  country: 'Angola',
  phone: '+244 928 058 840',
  whatsapp: '+244928058840',
  email: 'geral@stak.ao',
  instagram: '@stak.arquitectura',
  linkedin: 'https://www.linkedin.com/company/stak-arquitectura',
  facebook: 'https://www.facebook.com/stak.arquitectura',
  workingHours: 'Segunda a Sexta: 08:30 – 18:00',
  stats: {
    yearsOfExperience: '14+',
    completedProjects: '85+',
    designedArea: '140.000 m²',
    architecturalAwards: '6',
  },
  heroMediaType: 'video',
  heroVideoUrl: '/videos/hero-interior-living.mp4',
  heroVideoPoster: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85',
  heroVideoTitle: 'Design de Interiores & Arquitectura Residencial de Luxo',
  logoLight: '/img/Stak-Logo-black.svg',
  logoDark: '/img/Stak-Logo-White.svg',
  favicon: '/img/Stak-Logo-black.svg',
  seoMeta: {
    metaTitle: 'STAK Arquitectura & Designer de Interiores | Luanda, Angola',
    metaDescription:
      'Gabinete de arquitectura contemporânea e design de interiores em Luanda. Projectos residenciais de luxo, sedes corporativas, licenciamento municipal GPL e fiscalização de obras.',
    metaKeywords:
      'arquitectura luanda, arquitecto angola, projectos residenciais luxo, design de interiores talatona, licenciamento gpl, fiscalização de obras luanda',
    ogImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    canonicalUrl: 'https://stak.ao',
    author: 'STAK Arquitectura & Designer de Interiores',
  },
};

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Moradia Horizon Miramar',
    subtitle: 'Residência Unifamiliar de Alto Padrão com Vista para o Atlântico',
    slug: 'moradia-horizon-miramar',
    category: 'residencial',
    categoryLabel: 'Arquitectura Residencial',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    beforeImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85',
    beforeLabel: 'Fase Estrutural em Estaleiro',
    afterLabel: 'Obra Concluída & Entregue',
    beforeDescription: 'Cálculo de laje protendida com vãos contínuos de 11 metros sem pilares intermediários para integrar a sala à piscina com borda infinita.',
    featuredInBeforeAfter: true,
    videoUrl: '/videos/hero-interior-living.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    ],
    description:
      'Uma moradia escultural implantada na encosta nobre de Miramar, tirando partido da orografia natural e da orientação solar para ventilação cruzada contínua.',
    architecturalConcept:
      'A volumetria assenta sobre dois blocos perpendiculares de betão branco aparente e painéis de madeira teca tratada para o clima costeiro de Luanda. Amplos vãos envidraçados integram a sala de estar à piscina com borda infinita sobre a baía.',
    fichaTecnica: {
      localizacao: 'Miramar, Luanda - Angola',
      ano: '2024',
      area: '820 m²',
      tipologia: 'Moradia Unifamiliar Isolada V5',
      estadoObra: 'Concluído',
      cliente: 'Cliente Privado',
      especialidades: ['Arquitectura', 'Estruturas de Betão Armado', 'Projecto Luminotécnico', 'Paisagismo Tropical', 'Domótica'],
    },
    featured: true,
    highlightOrder: 1,
  },
  {
    id: 'proj-2',
    title: 'Edifício Sede Baía Corporate',
    subtitle: 'Edifício Institucional de Escritórios com Fachada Bioclimática',
    slug: 'edificio-baia-corporate',
    category: 'comercial',
    categoryLabel: 'Comercial & Corporativo',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    beforeLabel: 'Piso Comercial em Tosco',
    afterLabel: 'Átrio Corporativo Entregue',
    beforeDescription: 'Reconversão de um piso obsoleto num átrio monumental de pé-direito duplo com mármore branco do Namibe e granito negro da Huíla.',
    featuredInBeforeAfter: true,
    videoUrl: '/videos/hero-interior-dining.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
    ],
    description:
      'Sede corporativa concebida para albergar instituições financeiras e multinacionais, combinando eficiência espacial e identidade visual arrojada.',
    architecturalConcept:
      'A envoltória exterior é equipada com brise-soleils verticais em alumínio anodizado dourado-champagne que reduzem o ganho térmico solar em 42%, enquanto preservam a vista panorâmica para o porto de Luanda.',
    fichaTecnica: {
      localizacao: 'Avenida 4 de Fevereiro, Luanda',
      ano: '2023',
      area: '6.400 m²',
      tipologia: 'Edifício de Escritórios & Retail no Rés-do-chão',
      estadoObra: 'Concluído',
      cliente: 'Fundo Imobiliário Atlântico',
      especialidades: ['Arquitectura', 'Engenharia Estrutural', 'Sistemas de AVAC Central', 'Eficiência Energética', 'Segurança Contra Incêndios'],
    },
    featured: true,
    highlightOrder: 2,
  },
  {
    id: 'proj-3',
    title: 'Penthouse Terraza Talatona',
    subtitle: 'Design de Interiores & Arquitectura de Ambientes Exclusivos',
    slug: 'penthouse-terraza-talatona',
    category: 'interiores',
    categoryLabel: 'Design de Interiores',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=85',
    beforeLabel: 'Estado Tosco & Demolição',
    afterLabel: 'Interiores Concluídos STAK',
    beforeDescription: 'Substituição integral de alvenarias cegas por painéis em nogueira ripada e iluminação linear oculta em sanca de 2700K.',
    featuredInBeforeAfter: true,
    videoUrl: '/videos/hero-interior-kitchen.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=85',
    ],
    description:
      'Intervenção integral de interiores numa cobertura duplex em Talatona, com desenho à medida de toda a marcenaria, iluminação cénica e selecção de pedras naturais.',
    architecturalConcept:
      'Utilização de mármore Travertino Navona e painéis de nogueira escura ripada para unificar os espaços de convívio social. A iluminação indirecta integrada no gesso enfatiza as texturas e confere uma atmosfera acolhedora e sofisticada.',
    fichaTecnica: {
      localizacao: 'Condomínio Quinta dos Cedros, Talatona - Luanda',
      ano: '2024',
      area: '480 m²',
      tipologia: 'Cobertura Duplex Residencial',
      estadoObra: 'Concluído',
      cliente: 'Coleccionador de Arte Privado',
      especialidades: ['Design de Interiores', 'Marcenaria por Medida', 'Projecto Luminotécnico', 'Curadoria de Mobiliário', 'Climatização'],
    },
    featured: true,
    highlightOrder: 3,
  },
  {
    id: 'proj-4',
    title: 'Masterplan & Condomínio Palmeiras do Kwanza',
    subtitle: 'Planeamento Urbano, Loteamento e Lazer Integrado',
    slug: 'masterplan-palmeiras-kwanza',
    category: 'urbanismo',
    categoryLabel: 'Urbanismo & Masterplanning',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
    beforeImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=85',
    beforeLabel: 'Topografia Natural & Desmatação',
    afterLabel: 'Masterplan em Execução',
    beforeDescription: 'Organização territorial em anéis concêntricos que priorizam a mobilidade suave e uma praça cívica arborizada.',
    featuredInBeforeAfter: false,
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    ],
    description:
      'Projecto urbanístico abrangendo 42 moradias de luxo, clubhouse central, circuito pedonal contínuo e preservação da mata nativa adjacente.',
    architecturalConcept:
      'Organização territorial em anéis concêntricos que priorizam a mobilidade suave, segurança perimetral discreta e uma praça cívica arborizada com espelhos de água que atenuam a temperatura ambiente.',
    fichaTecnica: {
      localizacao: 'Via Expressa / Benfica Sul, Luanda',
      ano: '2023 - 2025',
      area: '85.000 m² de Terreno',
      tipologia: 'Loteamento Fechado & Espaço de Lazer Colectivo',
      estadoObra: 'Em Execução',
      cliente: 'Promotora Imobiliária Luanda Sul',
      especialidades: ['Masterplanning', 'Traçado Viário', 'Drenagem e Infraestruturas', 'Paisagismo Ambiental', 'Aprovação Governamental'],
    },
    featured: false,
  },
  {
    id: 'proj-5',
    title: 'Villa Belas Golf Bioclimática',
    subtitle: 'Habitação Unifamiliar Integrada no Campo de Golfe',
    slug: 'villa-belas-golf-bioclimatica',
    category: 'residencial',
    categoryLabel: 'Arquitectura Residencial',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    beforeImage: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1600&q=80',
    beforeLabel: 'Escavação & Fundações',
    afterLabel: 'Residência Entregue',
    featuredInBeforeAfter: false,
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
    ],
    description:
      'Concepção de moradia de linhas puras com grandes beirais de protecção solar, pátio central ajardinado e lâminas de água para refrigeração passiva.',
    architecturalConcept:
      'Abertura total da fachada poente para o campo de golfe, mediada por brise-soleils motorizados em madeira teca tratada.',
    fichaTecnica: {
      localizacao: 'Belas Clube de Campo, Luanda Sul',
      ano: '2024',
      area: '640 m²',
      tipologia: 'Moradia Unifamiliar V4',
      estadoObra: 'Concluído',
      cliente: 'Privado',
      especialidades: ['Arquitectura', 'Estruturas', 'Luminotecnia', 'AVAC', 'Piscina Biológica'],
    },
    featured: true,
    highlightOrder: 4,
  },
  {
    id: 'proj-6',
    title: 'Edifício Residencial Ilha de Luanda',
    subtitle: 'Apartamentos Premium com Fachada Náutica Ventilada',
    slug: 'edificio-residencial-ilha-luanda',
    category: 'em-construcao',
    categoryLabel: 'Em Construção',
    coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    ],
    description:
      'Edifício de 6 pisos com 8 fracções exclusivas viradas para a baía e o mar aberto, com materiais imunes à maresia de Luanda.',
    architecturalConcept:
      'Grelha estrutural em betão naval hidrofugado e painéis de alumínio compósito perfurado que filtram a luz oceânica.',
    fichaTecnica: {
      localizacao: 'Ilha do Cabo, Luanda',
      ano: '2024 - 2026',
      area: '3.200 m²',
      tipologia: 'Edifício Plurifamiliar T3 e T4 Duplex',
      estadoObra: 'Em Execução',
      cliente: 'Grupo Imobiliário Ilha Prime',
      especialidades: ['Projecto Geral', 'Engenharia Hidráulica', 'Fiscalização de Obra'],
    },
    featured: false,
  },
];

export const initialServices: ServiceItem[] = [
  {
    id: 'serv-1',
    code: '01',
    title: 'Projectos de Arquitectura',
    tagline: 'Habitação Unifamiliar, Colectiva e Sedes Corporativas',
    description:
      'Desenvolvimento integral do conceito espacial, desde o estudo prévio volumétrico, anteprojecto e projecto de execução detalhado com modelação 3D BIM.',
    deliverables: [
      'Estudo Prévio e Análise de Ocupação de Terreno',
      'Anteprojecto e Modelação 3D Hiper-realista',
      'Projecto de Execução com Pormenorização 1:20 e 1:5',
      'Caderno de Encargos e Mapa de Quantidades',
      'Compatibilização com todas as Especialidades de Engenharia',
    ],
    ctaLabel: 'Solicitar Projecto de Arquitectura',
    ctaAction: 'briefing',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '8 a 16 semanas',
    icon: 'solar:buildings-3-linear',
  },
  {
    id: 'serv-2',
    code: '02',
    title: 'Design de Interiores & Marcenaria',
    tagline: 'Espaços Sofisticados, Conforto Táctil e Curadoria Exclusiva',
    description:
      'Transformação de ambientes residenciais e comerciais com desenho de marcenaria por medida, selecção de pedras nobres, iluminação cénica e mobiliário de autor.',
    deliverables: [
      'Layout Espacial e Zonamento Funcional',
      'Desenho de Marcenaria Detalhada (Cozinhas, Closets, Painéis)',
      'Projecto Luminotécnico e Cenários de Luz',
      'Curadoria e Especificação de Mobiliário e Obras de Arte',
      'Acompanhamento de Produção e Montagem em Obra',
    ],
    ctaLabel: 'Solicitar Design de Interiores',
    ctaAction: 'briefing',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '6 a 12 semanas',
    icon: 'solar:palette-round-linear',
  },
  {
    id: 'serv-3',
    code: '03',
    title: 'Licenciamento Municipal (GPL)',
    tagline: 'Aprovação de Projectos junto do Governo Provincial de Luanda',
    description:
      'Tratamento completo da tramitação legal de projectos de arquitectura e engenharia junto das Administrações Municipais e GPL, garantindo total conformidade jurídica.',
    deliverables: [
      'Montagem de Processo Técnico de Licenciamento',
      'Termos de Responsabilidade Técnica de Arquitecto e Engenheiros',
      'Compatibilização com o Plano Director de Luanda',
      'Acompanhamento Presencial nas Comissões de Apreciação',
      'Obtenção do Alvará de Construção Definitivo',
    ],
    ctaLabel: 'Consultar Assessoria de Licenciamento',
    ctaAction: 'briefing',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '4 a 12 semanas',
    icon: 'solar:document-text-linear',
  },
  {
    id: 'serv-4',
    code: '04',
    title: 'Fiscalização e Direcção de Obra',
    tagline: 'Rigor Construtivo, Controlo de Custos e Cumprimento de Prazos',
    description:
      'Acompanhamento permanente no estaleiro de obras por arquitectos e engenheiros residentes, assegurando que a execução segue rigorosamente o caderno de encargos.',
    deliverables: [
      'Vistorias Semanais e Auditoria de Qualidade de Materiais',
      'Autos de Medição e Validação de Facturas de Empreiteiro',
      'Resolução Imediata de Dúvidas Técnicas em Estaleiro',
      'Relatórios Fotográficos Quinzenais para o Dono de Obra',
      'Vistoria Final e Recepção Provisória/Definitiva da Empreitada',
    ],
    ctaLabel: 'Solicitar Fiscalização de Obra',
    ctaAction: 'briefing',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: 'Duração da Empreitada',
    icon: 'solar:shield-check-linear',
  },
  {
    id: 'serv-5',
    code: '05',
    title: 'Engenharia & Especialidades Integradas',
    tagline: 'Cálculo Estrutural, Redes Hidráulicas, Electricidade e AVAC',
    description:
      'Coordenação global dos projectos complementares de engenharia civil, com cálculo sismorresistente e sistemas de eficiência energética adaptados a Luanda.',
    deliverables: [
      'Cálculo e Dimensionamento de Estruturas de Betão e Metálicas',
      'Projecto de Distribuição de Água e Drenagem de Esgotos',
      'Redes Eléctricas, Postos de Transformação e Geradores',
      'Projecto de Climatização (AVAC) Central e Ventilação',
      'Segurança Contra Incêndios e Saídas de Emergência',
    ],
    ctaLabel: 'Solicitar Projectos de Especialidades',
    ctaAction: 'briefing',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '6 a 10 semanas',
    icon: 'solar:tuning-square-linear',
  },
  {
    id: 'serv-6',
    code: '06',
    title: 'Consultoria e Avaliação de Terrenos',
    tagline: 'Estudos de Viabilidade Urbanística e Rentabilidade Imobiliária',
    description:
      'Análise técnica antes da aquisição de terrenos ou edifícios para reabilitação em Luanda, avaliando índices de ocupação, infraestruturas e riscos geológicos.',
    deliverables: [
      'Levantamento Topográfico e Sondagens Geotécnicas',
      'Verificação de Índices Urbanísticos e Alinhamentos',
      'Estudo Volumétrico de Aproveitamento Máximo de Área',
      'Estimativa Orçamental Preliminar de Construção',
      'Parecer Técnico Fundamentado para Decisão de Investimento',
    ],
    ctaLabel: 'Solicitar Avaliação de Terreno',
    ctaAction: 'briefing',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    typicalDuration: '2 a 4 semanas',
    icon: 'solar:chart-square-linear',
  },
];

export const initialMethodology: MethodologyStep[] = [
  {
    step: '01',
    title: 'Diagnóstico & Estudo Prévio',
    subtitle: 'Compreensão do Programa e Análise do Lugar',
    description:
      'Mapeamento rigoroso das necessidades da família ou empresa, levantamento do terreno, orientação solar e primeiras maquetes volumétricas 3D.',
    details: [
      'Entrevista de Briefing e Programa Funcional Detalhado',
      'Levantamento Cadastral e Topografia do Terreno em Luanda',
      'Estudos de Orientação Solar, Ventilação Cruzada e Vistas',
      'Apresentação de 2 Conceitos Espaciais e Maquete 3D Preliminar',
    ],
  },
  {
    step: '02',
    title: 'Anteprojecto & Licenciamento GPL',
    subtitle: 'Consolidação Formal e Conformidade Legal',
    description:
      'Definição exacta da geometria, materiais e montagem de todo o dossier técnico para aprovação municipal junto do Governo Provincial de Luanda.',
    details: [
      'Plantas, Cortes e Alçados na escala 1:100',
      'Imagens Fotorrealistas 3D de Interiores e Exteriores',
      'Montagem do Processo de Licenciamento Municipal',
      'Acompanhamento Presencial nas Comissões de Apreciação do GPL',
    ],
  },
  {
    step: '03',
    title: 'Projecto de Execução & Especialidades',
    subtitle: 'Rigor Técnico sem Margem para Imprevistos',
    description:
      'Desenho minucioso de cada detalhe construtivo (1:20 a 1:1), cálculo estrutural e compatibilização integral BIM com todas as engenharias.',
    details: [
      'Pormenores Construtivos de Fachada, Coberturas e Impermeabilização',
      'Desenho Integral de Marcenaria, Cozinhas e Casas de Banho',
      'Cálculo Estrutural, Redes Hidráulicas, Electricidade e AVAC',
      'Mapa de Quantidades de Trabalho e Caderno de Encargos para Concurso',
    ],
  },
  {
    step: '04',
    title: 'Acompanhamento & Fiscalização de Obra',
    subtitle: 'Da Estrutura Bruta à Entrega das Chaves',
    description:
      'Presença permanente de engenheiros e arquitectos da STAK no estaleiro para garantir qualidade máxima, respeito pelos custos e prazo rigoroso.',
    details: [
      'Apoio na Selecção do Empreiteiro e Análise de Propostas',
      'Vistorias Semanais de Qualidade de Materiais e Armaduras',
      'Validação de Autos de Medição Financeira',
      'Vistoria Final de Recepção de Obra e Entrega da Chave na Mão',
    ],
  },
];

export const initialTestimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    author: 'Eng.º Mateus Fernandes',
    role: 'Administrador de Empresa',
    location: 'Miramar, Luanda',
    projectType: 'Moradia Unifamiliar V5',
    quote:
      'A equipa da STAK transformou a nossa visão numa casa verdadeiramente extraordinária. O conforto térmico sem necessidade constante de ar condicionado e a precisão do betão aparente superaram todas as nossas expectativas.',
    rating: 5,
  },
  {
    id: 'test-2',
    author: 'Dra. Ana Paula Carvalho',
    role: 'Directora de Operações',
    location: 'Talatona, Luanda',
    projectType: 'Design de Interiores & Penthouse',
    quote:
      'O detalhe da marcenaria por medida e o estudo de iluminação indirecta deram à nossa cobertura uma elegância acolhedora. O rigor no cumprimento do orçamento foi exemplar.',
    rating: 5,
  },
  {
    id: 'test-3',
    author: 'Dr. Sebastião Luvumbo',
    role: 'Promotor Imobiliário',
    location: 'Avenida 4 de Fevereiro, Luanda',
    projectType: 'Sede Corporativa de Escritórios',
    quote:
      'A gestão do processo de licenciamento no GPL e a compatibilização 3D das especialidades evitaram custos imprevistos durante a fase de fundações e estrutura.',
    rating: 5,
  },
];

export const initialAssurances: GuaranteePillar[] = [
  {
    id: 'assure-1',
    title: '100% Conformidade no GPL',
    description: 'Processos instruídos com total rigor jurídico e técnico, garantindo aprovação municipal célere em Luanda.',
    icon: 'solar:shield-check-linear',
  },
  {
    id: 'assure-2',
    title: 'Rigor Orçamental & Medições',
    description: 'Mapas de quantidades exaustivos e cadernos de encargos que eliminam desvios de custo imprevistos.',
    icon: 'solar:calculator-linear',
  },
  {
    id: 'assure-3',
    title: 'Acompanhamento Permanente de Obra',
    description: 'Visitas técnicas e fiscalização no estaleiro para garantir que o construído coincide com o projectado.',
    icon: 'solar:buildings-2-linear',
  },
];

export const initialFaqs: FaqItem[] = [
  {
    id: 'faq-c1',
    question: 'Como funciona a primeira reunião no atelier STAK?',
    answer:
      'A primeira reunião serve para ouvir as aspirações do cliente, analisar a documentação topográfica ou predial do terreno e compreender as restrições regulamentares de Luanda. É uma reunião de diagnóstico sem custos.',
    category: 'Metodologia & Reuniões',
  },
  {
    id: 'faq-c2',
    question: 'O atelier STAK trata do licenciamento camarário no GPL?',
    answer:
      'Sim. Todos os nossos projectos de arquitectura são desenvolvidos de acordo com as normas municipais de Luanda e instruímos todo o processo de aprovação camarária e pedidos de viabilidade.',
    category: 'Licenciamento',
  },
  {
    id: 'faq-c3',
    question: 'Fazem acompanhamento e fiscalização de obra presencial?',
    answer:
      'Sim. A direcção técnica de estaleiro é um dos nossos maiores pontos fortes. Não entregamos apenas pranchas de desenho: asseguramos visitas regulares ou permanentes para controlo milimétrico de armaduras, betão e acabamentos.',
    category: 'Fiscalização',
  },
  {
    id: 'faq-c4',
    question: 'Desenvolvem projectos fora de Luanda?',
    answer:
      'Sim, realizamos obras e estudos em várias províncias de Angola (Huíla, Benguela, Cuanza Sul, Cabinda) e no exterior sob consulta prévia.',
    category: 'Âmbito Geográfico',
  },
  {
    id: 'faq-1',
    question: 'Quanto tempo demora o desenvolvimento de um projecto de arquitectura?',
    answer:
      'Um projecto de habitação unifamiliar de luxo demora tipicamente entre 8 a 14 semanas, dividido entre Estudo Prévio, Anteprojecto e Projecto de Execução com todas as especialidades de engenharia incluídas.',
    category: 'Prazos & Etapas',
  },
  {
    id: 'faq-2',
    question: 'A STAK trata de todo o processo de licenciamento junto do GPL?',
    answer:
      'Sim. O nosso gabinete assume a responsabilidade técnica integral, elaboração do dossier camarário, termos de responsabilidade e acompanhamento presencial junto das comissões técnicas das administrações municipais de Luanda.',
    category: 'Licenciamento',
  },
  {
    id: 'faq-3',
    question: 'É possível contratar apenas o serviço de Design de Interiores ou Fiscalização?',
    answer:
      'Sim. Embora ofereçamos o ciclo integrado completo (arquitectura + engenharias + interiores + fiscalização), os clientes podem contratar serviços modulares específicos de acordo com a fase em que a sua obra se encontra.',
    category: 'Serviços',
  },
  {
    id: 'faq-4',
    question: 'Como funciona a fiscalização de obras no estaleiro?',
    answer:
      'Realizamos vistorias periódicas (semanais ou com residente permanente), inspecções a armaduras antes das betonagens, testes de materiais, verificação de prumos e validação rigorosa dos autos de medição antes de qualquer pagamento ao empreiteiro.',
    category: 'Fiscalização',
  },
  {
    id: 'faq-5',
    question: 'Que medidas bioclimáticas são aplicadas para o clima de Luanda?',
    answer:
      'Privilegiamos a orientação do edifício em função dos ventos predominantes (SW-NE), brise-soleils exteriores, vãos envidraçados protegidos da radiação directa e inércia térmica do betão para minimizar os custos com climatização artificial.',
    category: 'Sustentabilidade',
  },
  {
    id: 'faq-6',
    question: 'Como posso solicitar uma reunião ou estimativa orçamental inicial?',
    answer:
      'Pode preencher o nosso formulário de Briefing Online na página de Contactos, enviar os dados do terreno por WhatsApp (+244 928 058 840) ou visitar o nosso atelier na Av. 4 de Fevereiro mediante marcação prévia.',
    category: 'Contactos',
  },
];

export const initialNavigation: SiteNavigationContent = {
  header: {
    items: [
      { id: 'nav-1', label: 'Início', page: 'inicio', enabled: true },
      { id: 'nav-2', label: 'O Atelier', page: 'sobre-nos', enabled: true },
      { id: 'nav-3', label: 'Projectos', page: 'projectos', enabled: true },
      { id: 'nav-4', label: 'Especialidades', page: 'servicos', enabled: true },
      { id: 'nav-5', label: 'Artigos', page: 'artigos', enabled: true },
      { id: 'nav-6', label: 'Contactos', page: 'contactos', enabled: true },
    ],
    ctaLabel: 'Iniciar Projecto',
    ctaPage: 'contactos',
    showThemeToggle: true,
  },
  footer: {
    manifesto:
      'Atelier de Arquitectura & Design de Interiores sediado em Luanda. Sobriedade espacial, rigor construtivo e respeito bioclimático.',
    socialLinks: {
      instagram: '@stak.arquitectura',
      whatsapp: '+244928058840',
      linkedin: 'https://www.linkedin.com/company/stak-arquitectura',
      facebook: 'https://www.facebook.com/stak.arquitectura',
    },
    navLinks: [
      { label: 'O Atelier & Equipa', page: 'sobre-nos' },
      { label: 'Portfólio de Obras', page: 'projectos' },
      { label: 'Serviços & Licenciamento', page: 'servicos' },
      { label: 'Caderno Técnico & Artigos', page: 'artigos' },
      { label: 'Contactos & Localização', page: 'contactos' },
    ],
    copyrightNotice: '© 2026 STAK Arquitectura & Designer de Interiores. Todos os direitos reservados.',
    showRestrictedArea: true,
  },
};

export const initialArticles: Article[] = [
  {
    id: 'art-1',
    title: 'A Arquitectura Bioclimática no Clima Tropical Costeiro de Luanda',
    category: 'Pesquisa & Sustentabilidade',
    date: '14 de Fevereiro, 2026',
    readTime: '6 min de leitura',
    excerpt:
      'Como a orientação solar, a ventilação cruzada passiva e o uso de brise-soleils reduzem o consumo energético em edifícios residenciais e corporativos na costa angolana.',
    content: [
      'Projetar em Luanda exige um entendimento profundo do microclima costeiro, caracterizado por temperaturas elevadas e humidade relativa considerável durante a estação das chuvas.',
      'A arquitectura não pode depender exclusivamente de sistemas mecânicos de ar condicionado. O uso criterioso de beirais, elementos de sombreamento dinâmico e paredes de betão com grande massa térmica permite criar microclimas interiores confortáveis.',
      'Neste artigo, apresentamos os cálculos de ganho térmico e as soluções passivas aplicadas na Moradia Horizon Miramar e no Edifício Baía Corporate.',
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    author: 'Arqt. Paulo Silveira & Arqt.ª Helena Van-Dúnem',
  },
  {
    id: 'art-2',
    title: 'O Betão Aparente como Linguagem Construtiva Contemporânea',
    category: 'Tectónica & Materiais',
    date: '28 de Janeiro, 2026',
    readTime: '5 min de leitura',
    excerpt:
      'A honestidade dos materiais na arquitectura do atelier STAK. O controlo da cofragem de madeira, a cura do cimento e a durabilidade face à maresia de Luanda.',
    content: [
      'O betão aparente é uma declaração de permanência. Ao contrário de revestimentos efémeros que se degradam com a humidade marítima, o betão bem dosado e tratado envelhece com nobreza.',
      'A escolha do tipo de cofragem — madeira ripada de tábuas estreitas ou painéis lisos fenólicos — define o carácter táctil das superfícies interiores e exteriores.',
    ],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    author: 'Arqt. Paulo Silveira',
  },
  {
    id: 'art-3',
    title: 'Licenciamento de Projectos em Luanda: Guia Prático para Promotores',
    category: 'Legislação & Prática',
    date: '10 de Janeiro, 2026',
    readTime: '8 min de leitura',
    excerpt:
      'As etapas indispensáveis para aprovação de projectos de arquitectura e especialidades de engenharia no Governo Provincial de Luanda (GPL).',
    content: [
      'A obtenção do Alvará de Construção em Luanda requer uma rigorosa instrução do processo técnico, incluindo estudos geológicos, cálculo sismo-resistente e conformidade com os regulamentos urbanísticos em vigor.',
      'A coordenação antecipada entre arquitectos e engenheiros evita atrasos administrativos e garante que a obra decorra sem embargos legais.',
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    author: 'Eng.º Manuel Kiala',
  },
];

export const initialBriefings: BriefingSubmission[] = [
  {
    id: 'brief-1',
    createdAt: '2026-03-01 14:30',
    clientName: 'Dr. António Manuel',
    clientEmail: 'antonio.manuel@exemplo.ao',
    clientPhone: '+244 923 111 222',
    projectType: 'Habitação Unifamiliar V5',
    location: 'Talatona, Condomínio Quinta dos Cedros',
    estimatedArea: '650 m²',
    budgetRange: 'Alto Padrão / Luxo',
    timeline: 'Início de obra previsto para o 3º Trimestre de 2026',
    description:
      'Pretendo construir uma moradia contemporânea de dois pisos com piscina de borda infinita, 5 suites, cinema privado e ampla área de lazer exterior.',
    status: 'Contactado',
  },
  {
    id: 'brief-2',
    createdAt: '2026-03-04 10:15',
    clientName: 'Sociedade Imobiliária Kilamba Sul',
    clientEmail: 'geral@kilambasul.ao',
    clientPhone: '+244 912 333 444',
    projectType: 'Edifício Comercial / Escritórios',
    location: 'Via Expressa / Talatona Norte',
    estimatedArea: '4.500 m²',
    budgetRange: 'Projecto Institucional',
    timeline: 'Estudo prévio para apresentação a investidores',
    description: 'Concepção arquitectónica de torre de 12 pisos com estacionamento subterrâneo e certificação ambiental.',
    status: 'Em Análise',
  },
];

export const initialPagesContent: SitePagesContent = {
  home: {
    hero: {
      enabled: true,
      badgeTag: 'Atelier de Arquitectura & Design de Interiores | Luanda, Angola',
      titleLine1: 'O rigor da estrutura.',
      titleLine2Italic: 'A nobreza do',
      titleLine2Gradient: 'espaço habitado.',
      description:
        'Desenvolvemos projectos residenciais de luxo, sedes corporativas de prestígio e interiores de autor. Soluções completas desde o estudo prévio ao licenciamento e fiscalização presencial de obra em Luanda.',
      ctaPrimaryLabel: 'Explorar Obras & Projectos',
      ctaSecondaryLabel: 'Solicitar Estudo Prévio',
      mediaType: 'video',
      videoUrl: '/videos/hero-interior-living.mp4',
      videoPoster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
      slideshowImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=85',
      ],
    },
    sections: {
      synthesis: {
        enabled: true,
        tag: 'Identidade & Rigor / O Atelier',
        title: 'Espaços desenhados para perdurar. Precisão geométrica aliada à alma de Luanda.',
        description:
          'A STAK Arquitectura & Designer de Interiores é um gabinete independente sediado em Luanda, fundado na convicção de que a arquitectura deve transcender a forma passageira. Procuramos uma relação profunda com a luz natural de Angola, a eficiência térmica e o rigor de execução.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        imageCaption: 'Projecto de Referência: Moradia Miramar Contemporary',
        feature1Title: 'Sustentabilidade Bioclimática',
        feature1Desc:
          'Ventilação cruzada, brises de sombreamento e isolamento térmico estudados para o clima tropical costeiro.',
        feature2Title: 'Fiscalização & Conformidade',
        feature2Desc:
          'Acompanhamento de estaleiro e controlo de qualidade que asseguram que a obra física coincide com o projecto.',
        buttonLabel: 'Conhecer o Atelier & Filosofia',
      },
      featuredProjects: {
        enabled: true,
        tag: 'Catálogo Seleccionado / Obras Emblemáticas',
        title: 'Projectos que moldam a nova paisagem de Luanda.',
        description:
          'Conheça a selecção de residências unifamiliares de alto padrão, sedes corporativas e edifícios em execução assinados pelo atelier.',
        buttonLabel: 'Ver Todos os Projectos',
      },
      materials: {
        enabled: true,
        tag: 'Tectónica & Autenticidade',
        title: 'Matéria, texturas e atmosfera construtiva.',
        description:
          'Seleccionamos matérias-primas nobres com elevada inércia térmica e resistência comprovada ao clima costeiro de Luanda.',
        items: [
          {
            id: 'betao',
            name: 'Betão Aparente Estrutural',
            tag: 'Tectónica & Massa Térmica',
            description:
              'Trabalhado com cofragem ripada de madeira nobre que imprime veios naturais na sua superfície. Garante inércia térmica indispensável para regular as temperaturas no clima costeiro de Luanda, dispensando revestimentos efémeros.',
            properties: ['Elevada Inércia Térmica', 'Resistência ao Ar Marítimo', 'Estética Brutalista Nobre'],
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
          },
          {
            id: 'madeira',
            name: 'Madeiras Nobres Tropicais',
            tag: 'Conforto Táctil & Protecção Solar',
            description:
              'Iroko, Teca e Pau-Rosa seleccionados e tratados com óleos naturais repelentes de humidade. Aplicados em pérgolas, brise-soleils dinâmicos, painéis de ripado e decks que conectam as áreas sociais aos jardins e piscinas.',
            properties: ['Origem Certificada', 'Tratamento UV & Fungicida', 'Regulação Térmica Passiva'],
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          },
          {
            id: 'rochas',
            name: 'Rochas Ornamentais & Mármores de Angola',
            tag: 'Autenticidade Geológica',
            description:
              'Valorização do património mineral angolano. Mármores claros do Namibe e granitos negros da Huíla paginados com precisão milimétrica em ilhas de cozinha, banhos suite e planos de água.',
            properties: ['Extracção Sustentável', 'Polimento Mate ou Flamejado', 'Durabilidade Perpétua'],
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
          },
          {
            id: 'vidro',
            name: 'Vidros de Alta Eficiência & Brises',
            tag: 'Luminosidade & Eficiência Energética',
            description:
              'Panos de vidro duplo com corte térmico e factor solar optimizado. Permitem banhar os interiores com a extraordinária luz natural de Luanda enquanto barram mais de 72% da radiação térmica directa.',
            properties: ['Controlo Solar Low-E', 'Atenuação Acústica 42dB', 'Pérdida de Calor Minimizada'],
            image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
          },
        ],
      },
      specialties: {
        enabled: true,
        tag: 'Disciplinas & Especialidades Técnicas',
        title: 'Do estudo de viabilidade à fiscalização em estaleiro.',
        description: 'Capacidade técnica integrada para responder a todas as exigências do investimento imobiliário em Angola.',
      },
      beforeAfter: {
        enabled: true,
        tag: 'Transformação & Reabilitação',
        title: 'Do estaleiro bruto à perfeição do espaço habitado.',
        description: 'Veja o rigor do processo construtivo da STAK e a evolução real das nossas obras em Luanda.',
      },
      testimonials: {
        enabled: true,
        tag: 'Testemunhos & Reconhecimento',
        title: 'A confiança depositada pelas famílias e empresas.',
        description: 'A voz de quem confiou ao atelier STAK a materialização dos seus lares e sedes corporativas.',
        items: initialTestimonials,
        assurances: initialAssurances,
      },
      cta: {
        enabled: true,
        tag: 'Inicie a Sua Obra',
        title: 'Pronto para materializar a sua visão arquitectónica?',
        description: 'Agende uma sessão técnica presencial no nosso atelier ou submeta o seu briefing online.',
        buttonLabel: 'Iniciar Briefing de Projecto',
        secondaryButtonLabel: 'Falar pelo WhatsApp',
      },
    },
  },
  atelier: {
    hero: {
      enabled: true,
      badge: 'Início / O Atelier',
      title: 'A arquitectura como síntese de rigor, proporção e identidade espacial.',
      description:
        'Fundado em Luanda, o atelier STAK desenvolve intervenções que combinam a autenticidade dos materiais angolanos com as mais elevadas exigências de conforto contemporâneo e engenharia de detalhe.',
      bgImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85',
    },
    sections: {
      manifesto: {
        enabled: true,
        tag: 'Filosofia & Rigor Espacial',
        title: 'Manifesto Arquitectónico',
        content:
          'Concebemos espaços onde a luz tropical de Angola, a pureza geométrica e os materiais nobres dialogam em perfeita harmonia. Da residência unifamiliar de luxo à sede corporativa contemporânea, cada projecto é uma resposta singular à paisagem, ao clima e à identidade de quem o habita.',
        sideImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
        sideImageCaption: 'Atelier STAK — Estudo de Maquetes e Amostras de Materiais em Luanda',
      },
      pillars: {
        enabled: true,
        tag: 'Pilares Estruturantes',
        title: 'Os 4 Princípios da Nossa Prática',
        description: 'Critérios indispensáveis que regem cada traço e cada decisão de projecto no gabinete.',
        items: [
          {
            title: 'Sobriedade & Clareza Geométrica',
            desc: 'Privilegiamos a volumetria pura, linhas horizontais expressivas e a eliminação de adornos supérfluos.',
          },
          {
            title: 'Arquitectura Bioclimática Tropical',
            desc: 'Em Luanda, a resposta climática é elementar. Projectamos protecções solares dinâmicas e ventilação cruzada.',
          },
          {
            title: 'Compatibilização & Rigor Construtivo',
            desc: 'A arquitectura só existe quando é construída com perfeição. Compatibilizamos minuciosamente todas as especialidades.',
          },
          {
            title: 'Curadoria de Materiais & Identidade',
            desc: 'Exploramos o contraste equilibrado entre betão aparente, pedras locais, madeiras nobres e amplos panos de vidro.',
          },
        ],
      },
      history: {
        enabled: true,
        tag: 'Origens & Evolução',
        title: 'Uma Trajectória Dedicada à Excelência Construtiva',
        content:
          'Desde a fundação na Baía de Luanda, o gabinete tem sido impulsionado pela paixão de construir obras que dignificam a paisagem urbana de Angola.',
        timeline: [
          {
            year: '2010',
            title: 'Fundação do Atelier em Luanda',
            desc: 'Início da atividade com foco em habitações unifamiliares e consultoria técnica independente.',
          },
          {
            year: '2015',
            title: 'Expansão para Edifícios Corporativos',
            desc: 'Primeiros grandes concursos ganhos para sedes empresariais e centros logísticos na província de Luanda.',
          },
          {
            year: '2019',
            title: 'Consolidação do Departamento de Fiscalização',
            desc: 'Criação de equipa residente para auditoria e fiscalização permanente de estaleiro.',
          },
          {
            year: '2024',
            title: 'Reconhecimento & Prática Bioclimática de Ponta',
            desc: 'Consolidação de mais de 85 projectos executados e distinções de arquitectura sustentável em Angola.',
          },
        ],
      },
      methodology: {
        enabled: true,
        tag: 'Processo & Metodologia',
        title: 'Como Trabalhamos: Do Croquis à Chave na Mão',
        description: 'Um método em 4 etapas rigorosas para assegurar controlo orçamental e excelência construtiva.',
        steps: initialMethodology,
      },
      bioclimatic: {
        enabled: true,
        tag: 'Sustentabilidade & Resiliência',
        title: 'Arquitectura Bioclimática Tropical em Luanda',
        description: 'Respostas técnicas inteligentes concebidas para o clima tropical costeiro de Angola.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        features: [
          {
            title: 'Protecção Solar Dinâmica',
            desc: 'Brise-soleils exteriores e beirais calculados para cortar o sol nascente e poente sem roubar a luz difusa.',
          },
          {
            title: 'Ventilação Cruzada Passiva',
            desc: 'Aberturas orientadas para captar a brisa marítima do Atlântico e evacuar o ar quente pelo efeito chaminé.',
          },
          {
            title: 'Inércia Térmica & Sombreamento',
            desc: 'Betão aparente e paredes duplas que estabilizam a temperatura interior durante as horas de pico térmico.',
          },
        ],
      },
      team: {
        enabled: true,
        tag: 'A Nossa Equipa',
        title: 'Liderança & Coordenação Técnica',
        description: 'Arquitectos, designers de interiores e coordenadores de obra dedicados à precisão de cada projecto.',
        members: [
          {
            name: 'Arqt. Paulo Silveira',
            role: 'Sócio-Fundador & Director Criativo',
            bio: 'Formado em Arquitectura com mais de 16 anos de experiência em Angola e Portugal. Especialista em volumetria contemporânea e bioclimática.',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
          },
          {
            name: 'Arqt.ª Helena Van-Dúnem',
            role: 'Directora de Projecto & Sustentabilidade',
            bio: 'Mestrado em Arquitectura Sustentável. Lidera a compatibilização técnica, certificação energética e soluções de ventilação passiva.',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
          },
          {
            name: 'Arqt. David Mbanza',
            role: 'Coordenador de Interiores & Marcenaria',
            bio: 'Com vasta experiência em arquitectura de interiores e mobiliário por medida, alia a sobriedade contemporânea ao conforto táctil.',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
          },
        ],
      },
      cta: {
        enabled: true,
        tag: 'Atendimento Personalizado',
        title: 'Agende uma Reunião Técnica no Nosso Atelier',
        description: 'Venha conhecer o nosso espaço de trabalho, maquetes físicas e amostras de materiais em Luanda.',
        buttonLabel: 'Agendar Sessão Presencial',
        secondaryButtonLabel: 'Enviar Mensagem WhatsApp',
      },
    },
  },
  projects: {
    hero: {
      enabled: true,
      badge: 'Início / Portfólio',
      title: 'Obras & Projectos de Arquitectura',
      description:
        'Residências unifamiliares de luxo, edifícios corporativos e intervenções de interior concebidos com rigor técnico, volumetria arrojada e atenção minuciosa ao detalhe construtivo.',
      bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    },
    sections: {
      catalogIntro: {
        enabled: true,
        tag: 'Filtragem por Tipologia',
        title: 'Portfólio Seleccionado',
        description:
          'Explore as nossas intervenções por categoria: habitação de alto padrão, sedes empresariais, design de interiores, planeamento urbanístico e obras em execução.',
      },
      cta: {
        enabled: true,
        tag: 'Estudo de Viabilidade',
        title: 'Tem um terreno ou imóvel para desenvolver em Angola?',
        description:
          'A nossa equipa realiza a análise preliminar de ocupação, parâmetros urbanísticos do GPL e estudo volumétrico de rentabilidade.',
        buttonLabel: 'Solicitar Avaliação de Terreno',
      },
    },
  },
  services: {
    hero: {
      enabled: true,
      badge: 'Início / Serviços',
      title: 'Soluções Integradas de Arquitectura e Engenharia',
      description:
        'Acompanhamento rigoroso em todas as fases: do primeiro croquis à entrega das chaves da obra concluída.',
      bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
      tagPills: [
        'Arquitectura Residencial V3-V6',
        'Sedes Corporativas & Escritórios',
        'Design de Interiores & Marcenaria',
        'Licenciamento Municipal GPL',
        'Fiscalização Permanente de Obra',
        'Masterplans & Urbanismo',
      ],
    },
    sections: {
      methodology: {
        enabled: true,
        tag: 'Processo Construtivo',
        title: 'Metodologia de Trabalho STAK',
        description:
          'Processo estruturado em 4 etapas para garantir rigor orçamental, cumprimento de prazos e fidelidade construtiva.',
        steps: initialMethodology,
      },
      servicesList: {
        enabled: true,
        tag: 'Áreas de Actuação',
        title: 'As Nossas Especialidades Técnicas',
        description:
          'Conheça em pormenor o alcance dos nossos serviços, desde habitação unifamiliar a licenciamento municipal.',
      },
      faq: {
        enabled: true,
        tag: 'Esclarecimentos & FAQs',
        title: 'Perguntas Frequentes sobre os Nossos Serviços',
        description: 'Tire as suas dúvidas sobre processos de licenciamento, prazos, orçamentos e fiscalização de obra.',
        items: initialFaqs,
      },
      cta: {
        enabled: true,
        title: 'Precisa de uma proposta técnica ou assessoria para a sua obra?',
        description: 'Entre em contacto com a nossa equipa de coordenação para avaliarmos os requisitos do seu investimento.',
        buttonLabel: 'Agendar Consulta de Projecto',
      },
    },
  },
  articles: {
    hero: {
      enabled: true,
      badge: 'Início / Publicações',
      title: 'Caderno Técnico & Publicações do Atelier',
      description:
        'Reflexões sobre arquitectura bioclimática, materiais de construção, diários de obra e tendências de design em Angola.',
      bgImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85',
    },
    sections: {
      editorialIntro: {
        enabled: true,
        tag: 'Conhecimento Partilhado',
        title: 'Artigos Recentes & Diários de Obra',
        description: 'Documentamos a nossa experiência prática de estaleiro e pesquisa teórica.',
      },
      newsletter: {
        enabled: true,
        title: 'Subscreva as Nossas Publicações Técnicas',
        description: 'Receba trimestralmente no seu e-mail análises arquitectónicas e novidades do atelier.',
        buttonLabel: 'Subscrever Caderno',
      },
    },
  },
  contacts: {
    hero: {
      enabled: true,
      badge: 'Início / Contactos',
      title: 'Inicie o Seu Projecto Connosco',
      description:
        'Visite o nosso atelier na Av. 4 de Fevereiro ou agende uma reunião preliminar com a nossa equipa.',
      bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    },
    sections: {
      info: {
        enabled: true,
        tag: 'Atendimento & Localização',
        title: 'O Nosso Gabinete em Luanda',
        description: 'Estamos localizados na marginal de Luanda, no Edifício Kilamba Executivo.',
        address: 'Edifício Kilamba Executivo, 4º Andar, Av. 4 de Fevereiro, Luanda, Angola',
        phone: '+244 928 058 840',
        whatsapp: '+244928058840',
        email: 'geral@stak.ao',
        workingHours: 'Segunda a Sexta: 08:30 – 18:00',
        receptionNotice: 'Reuniões presenciais sujeitas a agendamento prévio com a equipa técnica.',
      },
      briefingIntro: {
        enabled: true,
        tag: 'Briefing Online',
        title: 'Envie-nos os Dados do Seu Projecto',
        description:
          'Preencha o formulário detalhado para elaboração de uma proposta técnica e estimativa orçamental inicial.',
      },
    },
  },
  navigation: initialNavigation,
  faq: {
    enabled: true,
    tag: 'Perguntas Frequentes',
    title: 'Dúvidas Gerais sobre o Atelier STAK',
    description: 'Encontre respostas rápidas sobre a nossa actuação, métodos e processos de trabalho.',
    items: initialFaqs,
  },
};

export const initialMediaLibrary: MediaItem[] = [
  {
    id: 'media-vid-1',
    name: 'Vídeo Interior Living Luanda (MP4)',
    url: '/videos/hero-interior-living.mp4',
    type: 'video',
    size: '4.2 MB',
    uploadedAt: '2026-03-10',
    category: 'Vídeos Hero',
  },
  {
    id: 'media-vid-2',
    name: 'Vídeo Interior Dining & Lounge (MP4)',
    url: '/videos/hero-interior-dining.mp4',
    type: 'video',
    size: '3.8 MB',
    uploadedAt: '2026-03-10',
    category: 'Vídeos Hero',
  },
  {
    id: 'media-vid-3',
    name: 'Vídeo Master Suite & Varanda (MP4)',
    url: '/videos/hero-interior-suite.mp4',
    type: 'video',
    size: '3.5 MB',
    uploadedAt: '2026-03-10',
    category: 'Vídeos Hero',
  },
  {
    id: 'media-img-1',
    name: 'Moradia Miramar Contemporary - Fachada Poente',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    type: 'image',
    size: '1.4 MB',
    uploadedAt: '2026-03-05',
    category: 'Projectos Residenciais',
  },
  {
    id: 'media-img-2',
    name: 'Moradia Miramar - Terreno Inicial (Antes)',
    url: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    size: '890 KB',
    uploadedAt: '2026-03-05',
    category: 'Antes & Depois',
  },
  {
    id: 'media-img-3',
    name: 'Edifício Kilamba Prime Corporativo',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
    type: 'image',
    size: '1.8 MB',
    uploadedAt: '2026-03-02',
    category: 'Comercial & Escritórios',
  },
  {
    id: 'media-img-4',
    name: 'Penthouse Baía de Luanda - Sala Panorâmica',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
    type: 'image',
    size: '1.6 MB',
    uploadedAt: '2026-02-28',
    category: 'Design de Interiores',
  },
  {
    id: 'media-img-5',
    name: 'Villa Talatona Bioclimática - Fachada com Brises',
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=85',
    type: 'image',
    size: '1.2 MB',
    uploadedAt: '2026-02-24',
    category: 'Projectos Residenciais',
  },
  {
    id: 'media-img-6',
    name: 'Residência Belas Golf - Espelho de Água',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    type: 'image',
    size: '1.5 MB',
    uploadedAt: '2026-02-20',
    category: 'Projectos Residenciais',
  },
  {
    id: 'media-img-7',
    name: 'Sede Corporativa Baía - Fachada de Vidro',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85',
    type: 'image',
    size: '1.7 MB',
    uploadedAt: '2026-02-15',
    category: 'Comercial & Escritórios',
  },
  {
    id: 'media-img-8',
    name: 'Betão Aparente Estrutural - Textura Construtiva',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    type: 'image',
    size: '950 KB',
    uploadedAt: '2026-02-10',
    category: 'Materiais & Texturas',
  },
  {
    id: 'media-img-9',
    name: 'Arqa. Sofia de Castro - Fundadora & Directora de Projecto',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    size: '620 KB',
    uploadedAt: '2026-02-05',
    category: 'Equipa & Atelier',
  },
  {
    id: 'media-img-10',
    name: 'Eng.º Manuel Kiala - Director de Engenharia',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    size: '590 KB',
    uploadedAt: '2026-02-05',
    category: 'Equipa & Atelier',
  },
];

export const initialUsers: AtelierUser[] = [
  {
    id: 'user-admin-master',
    name: 'Administrador STAK',
    email: 'denvitic@gmail.com',
    role: 'super_admin',
    roleLabel: 'Super Administrador',
    status: 'Activo',
    phone: '+244 928 058 840',
    department: 'Direcção Geral & Coordenação',
    createdAt: '2025-01-10',
    lastLogin: 'Hoje, 10:25',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'user-manuel-costa',
    name: 'Arq. Manuel da Costa',
    email: 'm.costa@stak.ao',
    role: 'administrador',
    roleLabel: 'Arquitecto Sénior & Director Técnico',
    status: 'Activo',
    phone: '+244 923 112 334',
    department: 'Gabinete de Projectos & Urbanismo',
    createdAt: '2025-02-01',
    lastLogin: 'Ontem, 16:40',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'user-sofia-castro',
    name: 'Arqa. Sofia de Castro',
    email: 's.castro@stak.ao',
    role: 'arquitecto',
    roleLabel: 'Arquitecta de Interiores',
    status: 'Activo',
    phone: '+244 934 556 778',
    department: 'Design de Interiores & Paisagismo',
    createdAt: '2025-03-12',
    lastLogin: '16 Mar 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'user-teresa-bento',
    name: 'Dra. Teresa Bento',
    email: 'comunicacao@stak.ao',
    role: 'editor',
    roleLabel: 'Gestora Editorial & Comunicação',
    status: 'Activo',
    phone: '+244 921 998 877',
    department: 'Comunicação, Mídia & Notícias',
    createdAt: '2025-04-05',
    lastLogin: '14 Mar 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
];
