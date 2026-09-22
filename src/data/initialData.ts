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
  locationAddress: 'Luanda, Angola',
  city: 'Luanda',
  country: 'Angola',
  phone: '+244 937 826 963',
  whatsapp: '+244 937 826 963',
  email: 'geral@stakarquitectura.com',
  instagram: '@stak.arquitectura',
  linkedin: 'https://www.linkedin.com/company/stak-arquitectura',
  facebook: 'https://www.facebook.com/stak.arquitectura',
  workingHours: 'Segunda a Sexta: 08:30 – 18:00',
  stats: {
    yearsOfExperience: '9+',
    completedProjects: '20+',
    designedArea: '140.000 m²',
    architecturalAwards: '2',
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
    "id": "proj-1789791971269",
    "title": "Terraço Bioclimático com Spa Exterior",
    "subtitle": "Área de Lazer e Cozinha Exterior Integrada",
    "slug": "terraco-bioclimatico-com-spa-exterior",
    "category": "residencial",
    "categoryLabel": "Residencial",
    "coverImage": "/img/projects/proj-1789791971269-cover.jpg",
    "beforeImage": "/img/projects/proj-1789791971269-before.jpg",
    "beforeLabel": "Fase Inicial de Estruturas",
    "afterLabel": "Conclusão STAK",
    "featuredInBeforeAfter": true,
    "videoUrl": "/videos/projects/proj-1789791971269.mp4",
    "galleryImages": [
      "/img/projects/proj-1789791971269-gallery-0.jpg",
      "/img/projects/proj-1789791971269-gallery-1.jpg"
    ],
    "description": "Espaço social exterior organizado em torno de uma cozinha em ilha com churrasqueira, bancada bar e sala de jantar semi-coberta, complementado por um spa exterior integrado na relva através de um percurso em lajes de pedra. Iluminação indirecta e vegetação ornamental reforçam o carácter contemplativo do espaço ao entardecer.",
    "architecturalConcept": "Extensão da vida interior para o exterior, através de uma cobertura contínua que une cozinha, sala de jantar e zona de spa num único gesto arquitectónico voltado ao jardim.",
    "fichaTecnica": {
      "ano": "2026",
      "area": "120 m²",
      "cliente": "Privado",
      "tipologia": "Moradia Contemporânea",
      "estadoObra": "Concluído",
      "localizacao": "Talatona, Luanda • Angola",
      "especialidades": [
        "Arquitectura",
        "Paisagismo",
        "Gestão de Obra"
      ]
    },
    "featured": true
  },
  {
    "id": "proj-2",
    "title": "Edifício Sede Baía Corporate",
    "subtitle": "Edifício Institucional de Escritórios com Fachada Bioclimática",
    "slug": "edificio-baia-corporate",
    "category": "comercial",
    "categoryLabel": "Comercial & Corporativo",
    "coverImage": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
    "beforeImage": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    "beforeLabel": "Piso Comercial em Tosco",
    "afterLabel": "Átrio Corporativo Entregue",
    "featuredInBeforeAfter": false,
    "galleryImages": [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85"
    ],
    "description": "Sede corporativa concebida para albergar instituições financeiras e multinacionais, combinando eficiência espacial e identidade visual arrojada.",
    "architecturalConcept": "A envoltória exterior é equipada com brise-soleils verticais em alumínio anodizado dourado-champagne que reduzem o ganho térmico solar em 42%, enquanto preservam a vista panorâmica para o porto de Luanda.",
    "fichaTecnica": {
      "localizacao": "Baía de Luanda, Angola",
      "ano": "2024",
      "area": "3.800 m²",
      "tipologia": "Edifício Corporativo",
      "estadoObra": "Concluído",
      "cliente": "Privado",
      "especialidades": [
        "Arquitectura",
        "Estruturas",
        "Eficiência Energética",
        "Fiscalização"
      ]
    },
    "featured": false
  },
  {
    "id": "proj-1789792290924",
    "title": "Cozinha Gourmet em Ilha Central",
    "subtitle": "Cozinha Residencial de Alto Padrão",
    "slug": "cozinha-gourmet-em-ilha-central",
    "category": "interiores",
    "categoryLabel": "Interiores",
    "coverImage": "/img/projects/proj-1789792290924-cover.jpg",
    "beforeImage": "/img/projects/proj-1789792290924-before.jpg",
    "beforeLabel": "Fase Inicial de Estruturas",
    "afterLabel": "Conclusão STAK",
    "featuredInBeforeAfter": true,
    "galleryImages": [
      "/img/projects/proj-1789792290924-gallery-0.jpg",
      "/img/projects/proj-1789792290924-gallery-1.jpg"
    ],
    "description": "Cozinha ampla equipada com fornos duplos, dois exaustores piramidais em aço inoxidável e frigorífico americano de grandes dimensões. A ilha central em granito serve simultaneamente de bancada de trabalho e ponto de encontro informal, enquanto as bancadas perimetrais garantem armazenamento generoso.",
    "architecturalConcept": "Organização funcional em torno de uma grande ilha central, conjugando bancadas em pedra natural, equipamento profissional embutido e luz natural abundante vinda de uma janela em arco.",
    "fichaTecnica": {
      "ano": "2026",
      "area": "42 m²",
      "cliente": "Privado",
      "tipologia": "Moradia Contemporânea",
      "estadoObra": "Concluído",
      "localizacao": "Miraflores, Luanda - Angola",
      "especialidades": [
        "Arquitectura",
        "Paisagismo",
        "Gestão de Obra"
      ]
    },
    "featured": true
  },
  {
    "id": "proj-1789793105941",
    "title": "Sala de Estar Minimalista",
    "subtitle": "Apartamento Residencial - Zona Social",
    "slug": "sala-de-estar-minimalista",
    "category": "residencial",
    "categoryLabel": "Residencial",
    "coverImage": "/img/projects/proj-1789793105941-cover.jpg",
    "beforeImage": "/img/projects/proj-1789793105941-before.jpg",
    "beforeLabel": "Fase Inicial de Estruturas",
    "afterLabel": "Conclusão STAK",
    "featuredInBeforeAfter": false,
    "galleryImages": [
      "/img/projects/proj-1789793105941-gallery-0.jpg",
      "/img/projects/proj-1789793105941-gallery-1.jpg"
    ],
    "description": "Sala de estar com sofá amplo em tom cinza, mesas de centro em madeira clara sobrepostas e tapete neutro a delimitar a zona de convívio. Um candeeiro suspenso em metal cria um ponto focal central, enquanto o pavimento em madeira e as paredes brancas ampliam a percepção de espaço, com a zona de jantar integrada ao fundo.",
    "architecturalConcept": "Composição de linhas limpas e paleta neutra, onde o mobiliário de escala reduzida e a iluminação escultural criam um ambiente funcional sem comprometer a amplitude visual do espaço.",
    "fichaTecnica": {
      "ano": "2026",
      "area": "28 m²",
      "cliente": "Privado",
      "tipologia": "Moradia Contemporânea",
      "estadoObra": "Concluído",
      "localizacao": "Talatona, Luanda • Angola",
      "especialidades": [
        "Arquitectura",
        "Paisagismo",
        "Gestão de Obra"
      ]
    },
    "featured": true
  },
  {
    "id": "proj-1789793742761",
    "title": "Sala Integrada com Lareira e Cozinha Aberta",
    "subtitle": "Sala de Estar, Jantar e Cozinha em Conceito Aberto",
    "slug": "sala-integrada-com-lareira-e-cozinha-aberta",
    "category": "interiores",
    "categoryLabel": "Interiores",
    "coverImage": "/img/projects/proj-1789793742761-cover.jpg",
    "beforeImage": "/img/projects/proj-1789793742761-before.jpg",
    "beforeLabel": "Fase Inicial de Estruturas",
    "afterLabel": "Conclusão STAK",
    "beforeDescription": "Espaço social contínuo que articula sala de estar, cozinha e varanda através de grandes portas de vidro deslizantes, com uma parede central em pedra e lareira a marcar a transição entre zonas, e um painel em madeira que confere calor visual ao ambiente.",
    "featuredInBeforeAfter": false,
    "galleryImages": [
      "/img/projects/proj-1789793742761-gallery-0.jpg",
      "/img/projects/proj-1789793742761-gallery-1.jpg"
    ],
    "description": "Sala de estar ampla com sofá modular cinzento e mesas de centro em mármore e metal, voltada para uma cozinha em ilha com armários brancos e de madeira natural, iluminada por candeeiros pendentes pretos. A lareira revestida a pedra em espinha divide visualmente o espaço social do banco de estar suspenso, integrado numa parede de madeira com obra de arte em destaque. Portas envidraçadas de piso a tecto ligam o interior a uma varanda exterior com zona de refeições.",
    "architecturalConcept": "Espaço social contínuo que articula sala de estar, cozinha e varanda através de grandes portas de vidro deslizantes, com uma parede central em pedra e lareira a marcar a transição entre zonas, e um painel em madeira que confere calor visual ao ambiente.",
    "fichaTecnica": {
      "ano": "2026",
      "area": "65 m²",
      "cliente": "Privado",
      "tipologia": "Moradia Contemporânea",
      "estadoObra": "Concluído",
      "localizacao": "Talatona, Luanda • Angola",
      "especialidades": [
        "Arquitectura",
        "Paisagismo",
        "Gestão de Obra"
      ]
    },
    "featured": true
  },
  {
    "id": "proj-1789792789842",
    "title": "Cozinha em Arco com Bancada Bar",
    "subtitle": "Remodelação de Cozinha Contemporânea",
    "slug": "cozinha-em-arco-com-bancada-bar",
    "category": "interiores",
    "categoryLabel": "Interiores",
    "coverImage": "/img/projects/proj-1789792789842-cover.jpg",
    "beforeImage": "/img/projects/proj-1789792789842-before.jpg",
    "beforeLabel": "Fase Inicial de Estruturas",
    "afterLabel": "Conclusão STAK",
    "beforeDescription": "Uso de uma moldura arqueada em madeira para delimitar a cozinha sem a isolar dos espaços sociais adjacentes, criando continuidade visual e uma transição suave de materiais e luz.",
    "featuredInBeforeAfter": true,
    "galleryImages": [
      "/img/projects/proj-1789792789842-gallery-0.jpg",
      "/img/projects/proj-1789792789842-gallery-1.jpg"
    ],
    "description": "Cozinha em formato de U com armários em tom cinza-acastanhado, iluminação LED integrada sob os móveis e prateleiras abertas iluminadas. A bancada em pedra clara prolonga-se numa zona de bar com bancos estofados, iluminada por candeeiros pendentes esféricos que reforçam o ambiente contemporâneo.",
    "architecturalConcept": "Uso de uma moldura arqueada em madeira para delimitar a cozinha sem a isolar dos espaços sociais adjacentes, criando continuidade visual e uma transição suave de materiais e luz.",
    "fichaTecnica": {
      "ano": "2026",
      "area": "18 m²",
      "cliente": "Privado",
      "tipologia": "Moradia Contemporânea",
      "estadoObra": "Concluído",
      "localizacao": "Talatona, Luanda • Angola",
      "especialidades": [
        "Arquitectura",
        "Paisagismo",
        "Gestão de Obra"
      ]
    },
    "featured": true
  }
];

export const initialServices: ServiceItem[] = [
  {
    "id": "serv-1",
    "code": "01",
    "title": "Projectos de Arquitectura",
    "tagline": "Habitação Unifamiliar, Colectiva e Sedes Corporativas",
    "description": "Desenvolvimento integral do conceito espacial, desde o estudo prévio volumétrico, anteprojecto e projecto de execução detalhado com modelação 3D BIM.",
    "deliverables": [
      "Estudo Prévio e Análise de Ocupação de Terreno",
      "Anteprojecto e Modelação 3D Hiper-realista",
      "Projecto de Execução com Pormenorização 1:20 e 1:5",
      "Caderno de Encargos e Mapa de Quantidades",
      "Compatibilização com todas as Especialidades de Engenharia"
    ],
    "ctaLabel": "Solicitar Projecto de Arquitectura",
    "ctaAction": "briefing",
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "typicalDuration": "8 a 16 semanas",
    "icon": "solar:buildings-3-linear"
  },
  {
    "id": "serv-2",
    "code": "02",
    "title": "Design de Interiores & Mobiliário ",
    "tagline": "Espaços Sofisticados, Conforto Táctil e Curadoria Exclusiva",
    "description": "Transformação de ambientes residenciais e comerciais com desenho de marcenaria por medida, selecção de pedras nobres, iluminação cénica e mobiliário de autor.",
    "deliverables": [
      "Layout Espacial e Zonamento Funcional",
      "Desenho de Marcenaria Detalhada (Cozinhas, Closets, Painéis)",
      "Projecto Luminotécnico e Cenários de Luz",
      "Curadoria e Especificação de Mobiliário e Obras de Arte",
      "Acompanhamento de Produção e Montagem em Obra"
    ],
    "ctaLabel": "Solicitar Design de Interiores",
    "ctaAction": "briefing",
    "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    "typicalDuration": "6 a 12 semanas",
    "icon": "solar:palette-round-linear"
  },
  {
    "id": "serv-3",
    "code": "03",
    "title": "Arquitectura Comercial & Corporativa",
    "tagline": "Projectos Corporativos e comerciais",
    "description": "Projectos de escritórios, lojas, espaços comerciais, empresariais e institucionais.",
    "deliverables": [
      "Montagem de Processo Técnico de Licenciamento",
      "Termos de Responsabilidade Técnica de Arquitecto e Engenheiros",
      "Compatibilização com o Plano Director de Luanda",
      "Acompanhamento Presencial nas Comissões de Apreciação",
      "Obtenção do Alvará de Construção Definitivo"
    ],
    "ctaLabel": "Consultar Assessoria de Licenciamento",
    "ctaAction": "briefing",
    "image": "https://fxdcearoepqdhycfwtcq.supabase.co/storage/v1/object/public/stak-media/imagens/1790031620738-Penthouse-Antes.jpg",
    "typicalDuration": "4 a 12 semanas",
    "icon": "solar:document-text-linear"
  },
  {
    "id": "serv-4",
    "code": "04",
    "title": "Fiscalização e Direcção de Obra",
    "tagline": "Rigor Construtivo, Controlo de Custos e Cumprimento de Prazos",
    "description": "Acompanhamento permanente no estaleiro de obras por arquitectos e engenheiros residentes, assegurando que a execução segue rigorosamente o caderno de encargos.",
    "deliverables": [
      "Vistorias Semanais e Auditoria de Qualidade de Materiais",
      "Autos de Medição e Validação de Facturas de Empreiteiro",
      "Resolução Imediata de Dúvidas Técnicas em Estaleiro",
      "Relatórios Fotográficos Quinzenais para o Dono de Obra",
      "Vistoria Final e Recepção Provisória/Definitiva da Empreitada"
    ],
    "ctaLabel": "Solicitar Fiscalização de Obra",
    "ctaAction": "briefing",
    "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    "typicalDuration": "Duração da Empreitada",
    "icon": "solar:shield-check-linear"
  },
  {
    "id": "serv-5",
    "code": "05",
    "title": "Urbanismo & Paisagismo",
    "tagline": "Planeamento urbano, implantação, estudos de organização...",
    "description": "Planeamento urbano, implantação, estudos de organização espacial, desenvolvimento de espaços exteriores, paisagismo e soluções de integração com o território.",
    "deliverables": [
      "Cálculo e Dimensionamento de Estruturas de Betão e Metálicas",
      "Projecto de Distribuição de Água e Drenagem de Esgotos",
      "Redes Eléctricas, Postos de Transformação e Geradores",
      "Projecto de Climatização (AVAC) Central e Ventilação",
      "Segurança Contra Incêndios e Saídas de Emergência"
    ],
    "ctaLabel": "Solicitar Projectos de Especialidades",
    "ctaAction": "briefing",
    "image": "https://fxdcearoepqdhycfwtcq.supabase.co/storage/v1/object/public/stak-media/imagens/1790067854702-Praca-1-.jpg",
    "typicalDuration": "6 a 10 semanas",
    "icon": "solar:tuning-square-linear"
  },
  {
    "id": "serv-6",
    "code": "06",
    "title": "Consultoria e Avaliação de Terrenos",
    "tagline": "Estudos de Viabilidade Urbanística e Rentabilidade Imobiliária",
    "description": "Análise técnica antes da aquisição de terrenos ou edifícios para reabilitação em Luanda, avaliando índices de ocupação, infraestruturas e riscos geológicos.",
    "deliverables": [
      "Levantamento Topográfico e Sondagens Geotécnicas",
      "Verificação de Índices Urbanísticos e Alinhamentos",
      "Estudo Volumétrico de Aproveitamento Máximo de Área",
      "Estimativa Orçamental Preliminar de Construção",
      "Parecer Técnico Fundamentado para Decisão de Investimento"
    ],
    "ctaLabel": "Solicitar Avaliação de Terreno",
    "ctaAction": "briefing",
    "image": "https://fxdcearoepqdhycfwtcq.supabase.co/storage/v1/object/public/stak-media/imagens/1790068051252-images-1-.jpg",
    "typicalDuration": "2 a 4 semanas",
    "icon": "solar:chart-square-linear"
  }
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
      'A equipa da STAK compreendeu desde o primeiro dia a nossa exigência de conciliar sobriedade com conforto térmico no Miramar. O acompanhamento em obra foi implacável com os acabamentos.',
    rating: 5,
    year: '2024',
  },
  {
    id: 'test-2',
    author: 'Dra. Luísa van-Dúnem',
    role: 'Directora Financeira',
    location: 'Talatona, Luanda',
    projectType: 'Design de Interiores & Cozinha Gourmet',
    quote:
      'A transformação da nossa zona social e cozinha gourmet foi impecável. A elegância dos materiais e o aproveitamento da luz transformaram totalmente a vivência da casa.',
    rating: 5,
    year: '2025',
  },
  {
    id: 'test-3',
    author: 'Dr. Sebastião Gaspar',
    role: 'Promotor Imobiliário',
    location: 'Baía de Luanda',
    projectType: 'Edifício Corporativo',
    quote:
      'O rigor no cumprimento de prazos de projecto de execução e a gestão do licenciamento municipal junto do GPL foram exemplares. Recomendo sem hesitação.',
    rating: 5,
    year: '2024',
  },
];

export const initialAssurances: GuaranteePillar[] = [
  {
    id: 'assure-1',
    title: 'Rigor Orçamental Sem Desvios',
    description: 'Mapas de quantidades exaustivos e controlo permanente de custos em todas as fases.',
    icon: 'solar:dollar-minimalistic-linear',
  },
  {
    id: 'assure-2',
    title: 'Conformidade GPL Garantida',
    description: 'Todos os projectos cumprem integralmente as exigências urbanísticas de Luanda.',
    icon: 'solar:shield-check-linear',
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
      'Pode preencher o nosso formulário de Briefing Online na página de Contactos, enviar os dados do terreno por WhatsApp (+244 937 826 963) ou agendar uma reunião técnica.',
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
      whatsapp: '+244 937 826 963',
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
    "id": "art-1789798008535",
    "title": "Trinta e dois arquitectos escolhidos para requalificar cidades de Angola",
    "category": "Arquitectura & Cidade",
    "date": "19/09/2026",
    "readTime": "5 min",
    "excerpt": "Trinta e dois arquitectos escolhidos para requalificar cidades de Angola",
    "content": [
      "Trinta e dois profissionais altamente especializados nas mais diversas vertentes da arquitetura, do urbanismo e do planeamento territorial foram rigorosamente selecionados para integrar o ambicioso e transformador projeto nacional de requalificação e reconstrução das cidades em Angola.",
      "Idealizada e promovida centralmente pelo Executivo, esta iniciativa de grande escala visa reestruturar a malha urbana do país, otimizar a mobilidade e modernizar as infraestruturas públicas. O objetivo fundamental da intervenção vai além do aspeto estético: procura conferir maior viabilidade económica e funcional às centralidades locais, garantindo a criação de espaços públicos integrados, seguros e inclusivos. Desta forma, o projeto pretende assegurar um ambiente de convivência verdadeiramente salutar, equilibrado e propício ao bem-estar e ao desenvolvimento de todas as famílias angolanas.",
      "Para compreender os detalhes desta estratégia, o cronograma das obras e as expetativas de impacto socioeconómico nas várias províncias, clique no áudio abaixo e acompanhe a reportagem completa com o jornalista Martinho."
    ],
    "image": "/img/articles/art-1789798008535.jpg",
    "author": "Atelier STAK"
  },
  {
    "id": "art-1789798784087",
    "title": "Angola reforça protagonismo no maior congresso mundial de arquitectura",
    "category": "Arquitectura & Cidade",
    "date": "19/09/2026",
    "readTime": "5 min",
    "excerpt": "A participação da Ordem dos Arquitectos de Angola (OA) no Congresso Mundial da União Internacional dos Arquitectos (UIA 2026), realizado em Barcelona, Reino de Espanha, ficou marcada pelo reforço da presença e influência do país na maior plataforma internacional dedicada à arquitectura e ao urbanismo.",
    "content": [
      "Ao longo do evento, a delegação angolana desenvolveu uma intensa agenda institucional e diplomática, acompanhada pela Missão Diplomática de Angola em Espanha, consolidando a projeção da arquitectura nacional e fortalecendo a cooperação com representantes de organizações e ordens profissionais de vários continentes.",
      "Um dos marcos da participação angolana foi a instalação, pela primeira vez, de um pavilhão próprio no Disseny Hub Barcelona, onde foram apresentados projectos, experiências e o potencial técnico dos arquitectos nacionais perante milhares de participantes do congresso.",
      "A presença de uma delegação superior a 500 profissionais constituiu igualmente um feito inédito para a classe, evidenciando o crescente interesse dos arquitectos angolanos pelos grandes debates internacionais sobre cidades sustentáveis, inovação, património, alterações climáticas e desenvolvimento urbano.",
      "Durante a Assembleia Geral da UIA, o bastonário da Ordem dos Arquitectos de Angola, Vity Claude Nsalambi, candidatou-se à presidência da organização, obtendo o segundo maior número de votos entre os candidatos.",
      "A Ordem considera que o resultado traduz o reconhecimento do trabalho desenvolvido por Angola e pelo continente africano no seio da organização internacional.",
      "A agenda incluiu ainda a participação em cerimónias institucionais de elevado nível e encontros com dirigentes da UIA e representantes governamentais, reforçando o posicionamento de Angola nos principais espaços de decisão da arquitectura mundial."
    ],
    "image": "/img/articles/art-1789798784087.jpg",
    "author": "Atelier STAK"
  },
  {
    "id": "art-1789799013683",
    "title": "Angola candidata-se à liderança da União Internacional dos Arquitectos para 2026-2029",
    "category": "Arquitectura & Cidade",
    "date": "19/09/2026",
    "readTime": "5 min",
    "excerpt": "O país vai candidatar-se à presidência da União Internacional dos Arquitectos (UIA) para o mandato 2026–2029, anunciou a Ordem dos Arquitectos de Angola (OAA), em comunicado.",
    "content": [
      "Para concorrer ao cargo está nomeado, o actual vice-presidente da UIA para a região africana, Vity Claude Nsalambi, segundo uma nota enviada ao JA Online.",
      "A cerimónia de eleição do mais alto cargo da Organização Mundial dos Arquitectos terá lugar durante a Assembleia Geral da UIA, a decorrer entre os dias 2 e 4 do mês em curso, na cidade de Barcelona, Espanha.\n“A candidatura representa um momento de grande relevância para Angola e para a arquitectura africana, reforçando o posicionamento do país nas principais instâncias internacionais da profissão”, lê-se no documento.",
      "De acordo com a mesma fonte, este marco histórico coincide com uma participação inédita de Angola no Congresso Mundial de Arquitectos e nas actividades da Barcelona Capital Mundial da Arquitectura (UNESCO-UIA).",
      "Angola candidata-se à presidência da União Internacional dos Arquitectos",
      "Angola vai candidatar-se à presidência da União Internacional dos Arquitectos para o mandato 2026–2029, anunciou a Ordem dos Arquitectos de Angola, em comunicado.",
      "Para o cargo foi indicado o actual vice-presidente da UIA para a região africana, Vity Claude Nsalambi, segundo uma nota enviada ao JA Online.",
      "A eleição para a presidência da organização mundial dos arquitectos decorrerá durante a Assembleia Geral da UIA, marcada para os dias 2 a 4 de Julho, na Barcelona, em Espanha.",
      "Segundo a Ordem dos Arquitectos de Angola, a candidatura representa um momento de grande relevância para o país e para a arquitectura africana, reforçando o posicionamento de Angola nas principais instâncias internacionais da profissão.",
      "O comunicado destaca, ainda, que este marco histórico coincide com a participação inédita de Angola no Congresso Mundial de Arquitectos e nas actividades da Barcelona Capital Mundial da Arquitectura, iniciativa promovida pela UNESCO e pela UIA."
    ],
    "image": "/img/articles/art-1789799013683.jpg",
    "author": "Atelier STAK"
  }
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
  "enabled": true,
  "badgeTag": "Atelier de Arquitectura & Design de Interiores | Luanda, Angola",
  "videoUrl": "/videos/hero-interior-living.mp4",
  "mediaType": "video",
  "titleLine1": "O rigor da estrutura.",
  "description": "Desenvolvemos projectos residenciais de luxo, sedes corporativas de prestígio e interiores de autor. Soluções completas desde o estudo prévio ao licenciamento e fiscalização presencial de obra em Luanda. ",
  "videoPoster": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
  "ctaPrimaryLabel": "Explorar Obras & Projectos",
  "slideshowImages": [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=85"
  ],
  "titleLine2Italic": "A nobreza do",
  "ctaSecondaryLabel": "Solicitar Estudo Prévio",
  "titleLine2Gradient": "espaço habitado."
},
    sections: {
      synthesis: {
  "tag": "Identidade & Rigor / O Atelier",
  "image": "https://fxdcearoepqdhycfwtcq.supabase.co/storage/v1/object/public/stak-media/imagens/1790031630753-Cozinha-2.jpg",
  "title": "Espaços desenhados para perdurar. Precisão geométrica aliada à alma de Luanda.",
  "enabled": true,
  "buttonLabel": "Conhecer o Atelier & Filosofia",
  "description": "A STAK Arquitectura & Designer de Interiores é um gabinete independente sediado em Luanda, fundado na convicção de que a arquitectura deve transcender a forma passageira. Procuramos uma relação profunda com a luz natural de Angola, a eficiência térmica e o rigor de execução.",
  "feature1Desc": "Ventilação cruzada, brises de sombreamento e isolamento térmico estudados para o clima tropical costeiro.",
  "feature2Desc": "Acompanhamento de estaleiro e controlo de qualidade que asseguram que a obra física coincide com o projecto.",
  "imageCaption": "Projecto de Referência: Moradia Miramar Contemporary",
  "feature1Title": "Sustentabilidade Bioclimática",
  "feature2Title": "Fiscalização & Conformidade"
},
      featuredProjects: {
  "tag": "Catálogo Seleccionado / Obras Emblemáticas",
  "title": "Projectos que moldam a nova paisagem de Luanda.",
  "enabled": true,
  "buttonLabel": "Ver Todos os Projectos",
  "description": "Conheça a selecção de residências unifamiliares de alto padrão, sedes corporativas e edifícios em execução assinados pelo atelier."
},
      materials: {
  "tag": "Tectónica & Autenticidade",
  "items": [
    {
      "id": "betao",
      "tag": "Tectónica & Massa Térmica",
      "name": "Betão Aparente Estrutural",
      "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "properties": [
        "Elevada Inércia Térmica",
        "Resistência ao Ar Marítimo",
        "Estética Brutalista Nobre"
      ],
      "description": "Trabalhado com cofragem ripada de madeira nobre que imprime veios naturais na sua superfície. Garante inércia térmica indispensável para regular as temperaturas no clima costeiro de Luanda, dispensando revestimentos efémeros."
    },
    {
      "id": "madeira",
      "tag": "Conforto Táctil & Protecção Solar",
      "name": "Madeiras Nobres Tropicais",
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "properties": [
        "Origem Certificada",
        "Tratamento UV & Fungicida",
        "Regulação Térmica Passiva"
      ],
      "description": "Iroko, Teca e Pau-Rosa seleccionados e tratados com óleos naturais repelentes de humidade. Aplicados em pérgolas, brise-soleils dinâmicos, painéis de ripado e decks que conectam as áreas sociais aos jardins e piscinas."
    },
    {
      "id": "rochas",
      "tag": "Autenticidade Geológica",
      "name": "Rochas Ornamentais & Mármores de Angola",
      "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "properties": [
        "Extracção Sustentável",
        "Polimento Mate ou Flamejado",
        "Durabilidade Perpétua"
      ],
      "description": "Valorização do património mineral angolano. Mármores claros do Namibe e granitos negros da Huíla paginados com precisão milimétrica em ilhas de cozinha, banhos suite e planos de água."
    },
    {
      "id": "vidro",
      "tag": "Luminosidade & Eficiência Energética",
      "name": "Vidros de Alta Eficiência & Brises",
      "image": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "properties": [
        "Controlo Solar Low-E",
        "Atenuação Acústica 42dB",
        "Pérdida de Calor Minimizada"
      ],
      "description": "Panos de vidro duplo com corte térmico e factor solar optimizado. Permitem banhar os interiores com a extraordinária luz natural de Luanda enquanto barram mais de 72% da radiação térmica directa."
    }
  ],
  "title": "Matéria, texturas e atmosfera construtiva.",
  "enabled": true,
  "description": "Seleccionamos matérias-primas nobres com elevada inércia térmica e resistência comprovada ao clima costeiro de Luanda."
},
      specialties: {
  "tag": "Disciplinas & Especialidades Técnicas",
  "title": "Do estudo de viabilidade à fiscalização em estaleiro.",
  "enabled": true,
  "description": "Capacidade técnica integrada para responder a todas as exigências do investimento imobiliário em Angola."
},
      beforeAfter: {
  "tag": "Transformação & Reabilitação",
  "title": "Do estaleiro bruto à perfeição do espaço habitado.",
  "enabled": true,
  "description": "Veja o rigor do processo construtivo da STAK e a evolução real das nossas obras em Luanda."
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
  "tag": "Inicie a Sua Obra",
  "title": "Pronto para materializar a sua visão arquitectónica?",
  "enabled": true,
  "buttonLabel": "Iniciar Briefing de Projecto",
  "description": "Agende uma sessão técnica presencial no nosso atelier ou submeta o seu briefing online.",
  "secondaryButtonLabel": "Falar pelo WhatsApp"
},
    },
  },
  atelier: {
    hero: {
  "badge": "Início / O Atelier",
  "title": "A arquitectura como síntese de rigor, proporção e identidade espacial.",
  "bgImage": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85",
  "enabled": true,
  "description": "Fundado em Luanda, o atelier STAK desenvolve intervenções que combinam a autenticidade dos materiais angolanos com as mais elevadas exigências de conforto contemporâneo e engenharia de detalhe."
},
    sections: {
      manifesto: {
  "tag": "Filosofia & Rigor Espacial",
  "title": "Manifesto Arquitectónico",
  "content": "Concebemos espaços onde a luz tropical de Angola, a pureza geométrica e os materiais nobres dialogam em perfeita harmonia. Da residência unifamiliar de luxo à sede corporativa contemporânea, cada projecto é uma resposta singular à paisagem, ao clima e à identidade de quem o habita.",
  "enabled": false,
  "sideImage": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  "sideImageCaption": "Atelier STAK — Estudo de Maquetes e Amostras de Materiais em Luanda"
},
      pillars: {
  "tag": "Pilares Estruturantes",
  "items": [
    {
      "desc": "Desenvolver projectos de arquitectura e design de interiores que conciliem estética, funcionalidade, técnica e identidade, transformando necessidades em espaços de qualidade",
      "title": "Missão"
    },
    {
      "desc": "Tornar a STAK uma referência em arquitectura e design de interiores em Angola, com capacidade de desenvolver projectos contemporâneos e alcançar uma presença internacional.",
      "title": "Visão"
    },
    {
      "desc": "Criamos projetos arquitetônicos inovadores e funcionais, unindo precisão, qualidade e compromisso total com a identidade de cada cliente.",
      "title": "Valores"
    },
    {
      "desc": "Na STAK, cada projecto é desenvolvido a partir da relação entre forma, função, contexto e identidade. A nossa abordagem combina arquitectura, design de interiores, tecnologia de representação e atenção ao detalhe.",
      "title": "Filosofia"
    }
  ],
  "title": "Os 4 Princípios da Nossa Prática",
  "enabled": true,
  "description": "Conjunto de diretrizes que definem a nossa identidade, propósito e a cultura da nossa empresa."
},
      history: {
  "tag": "Origens & Evolução",
  "title": "Uma Trajectória Dedicada à Excelência Construtiva",
  "content": "A STAK nasce como uma marca dedicada à arquitectura e ao design de interiores, com uma abordagem contemporânea, funcional e orientada para a criação de espaços com identidade.\nO atelier pretende integrar arquitectura, interiores, representação visual, soluções técnicas e acompanhamento de projecto, desenvolvendo soluções personalizadas para clientes residenciais e empresariais.\nA STAK encontra-se em processo de consolidação da sua identidade como estúdio de arquitectura e design de interiores com posicionamento premium e visão contemporânea\n",
  "enabled": true,
  "timeline": [
    {
      "desc": "Início da atividade com foco em habitações unifamiliares e consultoria técnica independente.",
      "year": "2010",
      "title": "Fundação do Atelier em Luanda"
    },
    {
      "desc": "Primeiros grandes concursos ganhos para sedes empresariais e centros logísticos na província de Luanda.",
      "year": "2015",
      "title": "Expansão para Edifícios Corporativos"
    },
    {
      "desc": "Criação de equipa residente para auditoria e fiscalização permanente de estaleiro.",
      "year": "2019",
      "title": "Consolidação do Departamento de Fiscalização"
    },
    {
      "desc": "Consolidação de mais de 85 projectos executados e distinções de arquitectura sustentável em Angola.",
      "year": "2024",
      "title": "Reconhecimento & Prática Bioclimática de Ponta"
    }
  ]
},
      methodology: {
        enabled: true,
        tag: 'Processo & Metodologia',
        title: 'Como Trabalhamos: Do Croquis à Chave na Mão',
        description: 'Um método em 4 etapas rigorosas para assegurar controlo orçamental e excelência construtiva.',
        steps: initialMethodology,
      },
      bioclimatic: {
  "tag": "Sustentabilidade & Resiliência",
  "image": "https://fxdcearoepqdhycfwtcq.supabase.co/storage/v1/object/public/stak-media/imagens/1790067371755-Model-1.webp",
  "title": "Arquitectura Bioclimática Tropical em Luanda",
  "enabled": true,
  "features": [
    {
      "desc": "Brise-soleils exteriores e beirais calculados para cortar o sol nascente e poente sem roubar a luz difusa.",
      "title": "Protecção Solar Dinâmica"
    },
    {
      "desc": "Aberturas orientadas para captar a brisa marítima do Atlântico e evacuar o ar quente pelo efeito chaminé.",
      "title": "Ventilação Cruzada Passiva"
    },
    {
      "desc": "Betão aparente e paredes duplas que estabilizam a temperatura interior durante as horas de pico térmico.",
      "title": "Inércia Térmica & Sombreamento"
    }
  ],
  "description": "Respostas técnicas inteligentes concebidas para o clima tropical costeiro de Angola."
},
      team: {
  "tag": "A Nossa Equipa",
  "title": "Liderança & Coordenação Técnica",
  "enabled": true,
  "members": [
    {
      "bio": "Arquitecto e urbanista, com formação em Arquitectura e Urbanismo pela Faculdade de Engenharia da Universidade Agostinho Neto e formação técnica em Construção Civil / Desenhador Projectista.",
      "name": "Kuamina Stanie",
      "role": "Fundador & Arquitecto Principal",
      "image": "https://fxdcearoepqdhycfwtcq.supabase.co/storage/v1/object/public/stak-media/imagens/1790067096827-Kuamina-Stanie-1-.png"
    }
  ],
  "description": "Arquitectos, designers de interiores e coordenadores de obra dedicados à precisão de cada projecto."
},
      cta: {
  "tag": "Atendimento Personalizado",
  "title": "Agende uma Reunião Técnica no Nosso Atelier",
  "enabled": true,
  "buttonLabel": "Agendar Sessão Presencial",
  "description": "Venha conhecer o nosso espaço de trabalho, maquetes físicas e amostras de materiais em Luanda.",
  "secondaryButtonLabel": "Enviar Mensagem WhatsApp"
},
    },
  },
  projects: {
    hero: {
  "badge": "Início / Portfólio",
  "title": "Obras & Projectos de Arquitectura",
  "bgImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
  "enabled": true,
  "description": "Residências unifamiliares de luxo, edifícios corporativos e intervenções de interior concebidos com rigor técnico, volumetria arrojada e atenção minuciosa ao detalhe construtivo."
},
    sections: {
      catalogIntro: {
  "tag": "Filtragem por Tipologia",
  "title": "Portfólio Seleccionado",
  "enabled": true,
  "description": "Explore as nossas intervenções por categoria: habitação de alto padrão, sedes empresariais, design de interiores, planeamento urbanístico e obras em execução."
},
      cta: {
  "tag": "Estudo de Viabilidade",
  "title": "Tem um terreno ou imóvel para desenvolver em Angola?",
  "enabled": true,
  "buttonLabel": "Solicitar Avaliação de Terreno",
  "description": "A nossa equipa realiza a análise preliminar de ocupação, parâmetros urbanísticos do GPL e estudo volumétrico de rentabilidade."
},
    },
  },
  services: {
    hero: {
  "badge": "Início / Serviços",
  "title": "Soluções Integradas de Arquitectura e Engenharia",
  "bgImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85",
  "enabled": true,
  "tagPills": [
    "Arquitectura Residencial V3-V6",
    "Sedes Corporativas & Escritórios",
    "Design de Interiores & Marcenaria",
    "Licenciamento Municipal GPL",
    "Fiscalização Permanente de Obra",
    "Masterplans & Urbanismo"
  ],
  "description": "Acompanhamento rigoroso em todas as fases: do primeiro croquis à entrega das chaves da obra concluída."
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
  "tag": "Áreas de Actuação",
  "title": "As Nossas Especialidades Técnicas",
  "enabled": true,
  "description": "Conheça em pormenor o alcance dos nossos serviços, desde habitação unifamiliar a licenciamento municipal."
},
      faq: {
        enabled: true,
        tag: 'Esclarecimentos & FAQs',
        title: 'Perguntas Frequentes sobre os Nossos Serviços',
        description: 'Tire as suas dúvidas sobre processos de licenciamento, prazos, orçamentos e fiscalização de obra.',
        items: initialFaqs,
      },
      cta: {
  "title": "Precisa de uma proposta técnica ou assessoria para a sua obra?",
  "enabled": true,
  "buttonLabel": "Agendar Consulta de Projecto",
  "description": "Entre em contacto com a nossa equipa de coordenação para avaliarmos os requisitos do seu investimento."
},
    },
  },
  articles: {
    hero: {
  "badge": "Início / Publicações",
  "title": "Caderno Técnico & Publicações do Atelier",
  "bgImage": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85",
  "enabled": true,
  "description": "Reflexões sobre arquitectura bioclimática, materiais de construção, diários de obra e tendências de design em Angola."
},
    sections: {
      editorialIntro: {
  "tag": "Conhecimento Partilhado",
  "title": "Artigos Recentes & Diários de Obra",
  "enabled": true,
  "description": "Documentamos a nossa experiência prática de estaleiro e pesquisa teórica."
},
      newsletter: {
  "title": "Subscreva as Nossas Publicações Técnicas",
  "enabled": true,
  "buttonLabel": "Subscrever Caderno",
  "description": "Receba trimestralmente no seu e-mail análises arquitectónicas e novidades do atelier."
},
    },
  },
  contacts: {
    hero: {
  "badge": "Início / Contactos",
  "title": "Inicie o Seu Projecto Connosco",
  "bgImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
  "enabled": true,
  "description": "Visite o nosso atelier na Av. 4 de Fevereiro ou agende uma reunião preliminar com a nossa equipa."
},
    sections: {
      info: {
        enabled: true,
        tag: 'Atendimento & Localização',
        title: 'O Nosso Gabinete em Luanda',
        description: 'Estamos localizados em Luanda, Angola.',
        address: 'Luanda, Angola',
        phone: '+244 937 826 963',
        whatsapp: '+244 937 826 963',
        email: 'geral@stakarquitectura.com',
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
    url: '/videos/hero-interior-kitchen.mp4',
    type: 'video',
    size: '3.5 MB',
    uploadedAt: '2026-03-10',
    category: 'Vídeos Hero',
  },
];

export const initialUsers: AtelierUser[] = [
  {
    id: 'user-admin-master',
    name: 'Administrador STAK',
    email: 'stak@denvitic.com',
    role: 'super_admin',
    roleLabel: 'Super Administrador',
    status: 'Activo',
    phone: '+244 937 826 963',
    department: 'Direcção Geral & Coordenação',
    createdAt: '2025-01-10',
    lastLogin: 'Hoje',
    avatar: '',
  },
];
