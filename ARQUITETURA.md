# Guia de Arquitectura, Tecnologias e Funcionamento — STAK Arquitectura

Este documento foi elaborado para servir como referência técnica completa do projecto **STAK Arquitectura & Design de Interiores**. Destina-se a programadores, mantenedores e sessões de desenvolvimento contínuo (*vibecoding*), detalhando a lógica do sistema, organização de ficheiros, decisões arquitecturais e boas práticas.

---

## 1. Visão Geral da Plataforma

A plataforma da **STAK Arquitectura** combina dois ecossistemas numa única aplicação moderna e reactiva:

1. **Website Público de Alto Padrão**: Apresentação institucional e portfólio visual imersivo de um atelier de arquitectura e design de interiores sediado em Luanda, Angola. Conta com modo escuro/claro, galeria de projectos em alta resolução, fichas técnicas completas, ensaios editoriais, formulário de briefing dinâmico e SEO técnico avançado.
2. **Painel de Gestão Administrativa (STAK Dashboard / CMS)**: Sistema interno de gestão de conteúdos sem código para os administradores do gabinete editarem páginas, projectos, fotografias, textos alternativos (alt text), slugs, briefings de clientes, configurações de e-mail e metatags de motores de busca.

---

## 2. Stack Tecnológica (Tech Stack)

### Core Frontend & Runtime
- **React 19** (`react`, `react-dom`): Versão mais recente do React com suporte nativo a Suspense, renderização eficiente e hooks modernos.
- **TypeScript 5.x**: Tipagem estática rigorosa em todo o código (`src/types.ts`), assegurando fiabilidade nas interfaces e modelos de dados.
- **Vite 6** (`vite`, `@vitejs/plugin-react`): Bundler ultrarrápido com Hot Module Replacement (HMR) e compilação otimizada via Rollup.

### Estilização & UI
- **Tailwind CSS v4** (`@tailwindcss/vite`): Motor de estilos utilitários integrado como plugin nativo do Vite (`@import "tailwindcss";`), com variáveis de tema e suporte a transições suaves.
- **Radix UI Primitives**: Componentes acessíveis e sem estilos pré-definidos (Accordions, Dialogs, Dropdowns, Tabs, Tooltips, Switches, etc.) utilizados no painel administrativo.
- **Motion (Framer Motion)**: Biblioteca de animações fluídas para micro-interacções e transições de interface.

### Ícones & Gráficos
- **Iconify (`@iconify/react`)**: Sistema unificado de ícones vetoriais com suporte a conjuntos modernos (`solar`, `lucide`, `carbon`, etc.).
- **Lucide React & Tabler Icons**: Conjuntos complementares para componentes de interface.
- **ApexCharts & React ApexCharts**: Visualização de métricas e estatísticas no dashboard.

### Base de Dados, Autenticação & Armazenamento
- **Supabase (`@supabase/supabase-js`)**:
  - **PostgreSQL**: Tabelas relacionais para conteúdos (`stak_site_content`), projectos (`stak_projects`), serviços (`stak_services`), artigos (`stak_articles`), briefings (`stak_briefings`) e definições do atelier (`stak_atelier_info`).
  - **Supabase Auth**: Autenticação de administradores via e-mail e palavra-passe.
  - **Supabase Storage**: Bucket de média para fotografias e ficheiros.
- **Arquitectura de Fallback Resiliente (Local-First)**: Se o Supabase estiver indisponível ou as chaves não estiverem configuradas, o sistema recorre de imediato ao `localStorage` com dados padrão predefinidos (`src/data/initialData.ts`). O website e o painel **nunca quebram** em modo offline.

### E-mail & Notificações de Briefing
- **Resend API**: Serviço transacional para entrega instantânea das notificações de novos pedidos de orçamento/briefing para o e-mail do atelier (`geral@stakarquitectura.com`).
- **Ambiente Duplo de Execução**:
  - **Desenvolvimento local**: Middleware customizado do Vite (`briefingApiPlugin` em `vite.config.ts`) que atende o endpoint `/api/send-briefing`.
  - **Produção (Netlify / Vercel)**: Netlify Serverless Function (`netlify/functions/send-briefing.js`) configurada via `netlify.toml` e reescrita de rotas.

---

## 3. Arquitectura do Sistema e Estrutura de Diretórios

```
/
├── public/                     # Ficheiros estáticos públicos
│   ├── favicon.svg             # Ícone do navegador
│   ├── robots.txt              # Regras para motores de busca e bots de IA
│   ├── sitemap.xml             # Mapa do site indexável
│   └── _redirects              # Regras de roteamento para Netlify
│
├── src/
│   ├── main.tsx                # Ponto de entrada React (renderiza App em #root)
│   ├── index.css               # Import global do Tailwind CSS e estilos base
│   ├── types.ts                # Definições centrais de tipos TypeScript
│   ├── App.tsx                 # Roteador mestre, layout principal e lazy loading
│   │
│   ├── context/                # Gestão de Estado Global (React Context)
│   │   ├── ThemeContext.tsx    # Tema claro/escuro com persistência
│   │   ├── AuthContext.tsx     # Sessão admin, login Supabase e modo demo
│   │   └── CmsContext.tsx      # Hidratação, CRUD de conteúdos, sincronização
│   │
│   ├── data/
│   │   └── initialData.ts      # Dados padrão completos (backup offline de luxo)
│   │
│   ├── components/             # Componentes do Website Público
│   │   ├── Navbar.tsx          # Barra de navegação responsiva com links e CTA
│   │   ├── Footer.tsx          # Rodapé com mapa de links e acesso admin discreto
│   │   ├── Hero.tsx            # Cabeçalho com vídeo de fundo e badge interactivo
│   │   ├── ProjectModal.tsx    # Dossier técnico de projecto (galeria + ficha)
│   │   ├── Breadcrumbs.tsx     # Trilha de navegação com Schema.org
│   │   ├── SeoHeadManager.tsx  # Injeção dinâmica de metatags, OG e JSON-LD
│   │   ├── FloatingWhatsApp.tsx# Botão flutuante de contacto directo
│   │   ├── ThemeToggle.tsx     # Alternador de tema claro/escuro
│   │   └── AdminLogin.tsx      # Ecrã de login do painel administrativo
│   │
│   ├── pages/                  # Páginas Principais do Website
│   │   ├── HomePage.tsx        # Página inicial com destaques, métricas e teaser
│   │   ├── AtelierPage.tsx     # História, equipa, filosofia e marcos
│   │   ├── ProjectsPage.tsx    # Portfólio filtrável (grelha / lista)
│   │   ├── ServicesPage.tsx    # Catálogo de especialidades e metodologia
│   │   ├── ArticlesPage.tsx    # Journal / blog de ensaios arquitectónicos
│   │   ├── ContactsPage.tsx    # Contactos físicos e formulário de briefing
│   │   └── NotFoundPage.tsx    # Página 404 personalizada alinhada à marca
│   │
│   ├── dashboard/              # Painel de Controlo Administrativo Completo
│   │   └── src/
│   │       ├── App.tsx         # Ponto de entrada do dashboard
│   │       ├── components/     # Componentes partilhados (PageSeoEditor, ImagePickerInput)
│   │       └── views/stak/     # Módulos de gestão:
│   │           ├── FrontwebManager.tsx      # Edição de conteúdos das 6 páginas
│   │           ├── ProjectsManager.tsx      # CRUD de projectos e fotos
│   │           ├── ArticlesManager.tsx      # CRUD de artigos e publicações
│   │           ├── ServicesManager.tsx      # Gestão de serviços e etapas
│   │           ├── BriefingsManager.tsx     # Visualizador de leads e orçamentos
│   │           ├── MediaLibraryManager.tsx  # Biblioteca de ficheiros e uploads
│   │           ├── UsersManager.tsx         # Gestão de utilizadores
│   │           └── SettingsManager.tsx      # SEO global, tracking, sitemap e e-mail
│   │
│   └── lib/                    # Utilitários e Integrações
│       ├── supabase.ts         # Cliente oficial Supabase (@supabase/supabase-js)
│       ├── briefingMailer.ts   # Processador e despachante de e-mails com Resend
│       └── sitemapGenerator.ts # Gerador dinâmico de sitemap XML
│
├── netlify/
│   └── functions/
│       └── send-briefing.js    # Netlify Serverless Function para envio de e-mails
│
├── vercel.json                 # Cabeçalhos de segurança, cache e rotas para Vercel
├── netlify.toml                # Cabeçalhos e configurações de deploy para Netlify
├── vite.config.ts              # Configuração Vite (plugins, aliases, manualChunks)
└── package.json                # Dependências e scripts de automação
```

---

## 4. Fluxo de Dados e Gestão de Estado

### 1. `ThemeContext` (`src/context/ThemeContext.tsx`)
- Controla o tema (`dark` ou `light`).
- O tema é persistido em `localStorage` sob a chave `stak_theme`.
- Ao entrar no painel administrativo (`/admin`), a classe CSS `admin-view` é aplicada no elemento raiz `<html>`, garantindo que o painel mantém uma legibilidade de estilo claro e limpo para dashboards de produtividade.

### 2. `AuthContext` (`src/context/AuthContext.tsx`)
- Gere o estado de autenticação do utilizador (`isAuthenticated`, `user`, `role`).
- Comunica com o `supabase.auth.signInWithPassword()` e `supabase.auth.signOut()`.
- **Modo Demonstração Instantâneo**: Permite autenticação rápida em modo de desenvolvimento ou caso a base de dados ainda não tenha utilizadores criados, persistindo a sessão em `localStorage` (`stak_admin_demo_session`).

### 3. `CmsContext` (`src/context/CmsContext.tsx`)
É o coração de dados da aplicação. Gere:
- `atelierInfo`: Dados do atelier (nome, morada, telefone, e-mail, redes sociais, SEO global).
- `pagesContent`: Conteúdos detalhados de cada página (`home`, `atelier`, `projects`, `services`, `articles`, `contacts`) e os seus respectivos objectos `seo`.
- `projects`: Lista de projectos arquitectónicos.
- `services`: Lista de serviços prestados.
- `articles`: Lista de publicações do Journal.
- `briefings`: Pedidos de orçamento recebidos de clientes.
- `mediaItems`: Ficheiros multimédia carregados.

**Ciclo de Hidratação Inteligente**:
1. No carregamento inicial, lê dados em cache do `localStorage`. Se não existirem, recorre aos dados ricos de `initialData.ts`.
2. Em segundo plano, tenta sincronizar com as tabelas do **Supabase**. Se o Supabase responder com sucesso, hidrata o estado e atualiza o `localStorage`.
3. Ao guardar qualquer alteração no painel administrativo, o `CmsContext` persiste imediatamente no `localStorage` e envia a mutação para o Supabase (estratégia *Optimistic UI*).

---

## 5. Roteamento SPA Híbrido e Otimização de Performance

### Roteamento Baseado em Âncoras e Histórico
A aplicação é uma Single Page Application (SPA) que suporta navegação por hash amigável e histórico do navegador (`window.history.pushState`):
- `/#inicio` ou `/`: Página Inicial.
- `/#sobre-nos`: O Atelier, Filosofia e Equipa.
- `/#projectos`: Portfólio de Arquitectura e Interiores.
- `/#servicos`: Especialidades e Metodologia.
- `/#artigos`: Architectural Journal.
- `/#contactos`: Morada, Telefones e Formulário de Briefing.
- `/#admin` ou `/admin`: Painel de Gestão Administrativa.
- Qualquer rota inexistente activa a visualização da página **404 (`NotFoundPage`)**.

### Code-Splitting e Otimização de Bundle (*Zero-Slop Loading*)
Para garantir tempos de carregamento instantâneos aos visitantes do website público:
1. **Lazy Loading do Dashboard**: O componente `DashboardApp` é importado exclusivamente sob demanda via `React.lazy(() => import('./dashboard/src/App'))`. Um visitante comum do site **nunca descarrega** os scripts do painel administrativo.
2. **Manual Chunks no Vite**: Em `vite.config.ts`, as bibliotecas de terceiros são separadas por domínio:
   - `vendor-react`: React e React-DOM (~131 kB gzip).
   - `vendor-supabase`: Cliente Supabase (~59 kB gzip).
   - `vendor-radix`: Primitivas de interface Radix UI (~31 kB gzip).
   - `vendor-icons`: Motores de renderização de ícones (~13 kB gzip).
   - `App.js`: Código público da aplicação (~33 kB gzip).
3. **Imagens com `loading="lazy"`**: Reduz drasticamente a quantidade de requisições concorrentes na primeira pintura de ecrã.

---

## 6. Funcionalidades do Website Público

### Hero Section (`src/components/Hero.tsx`)
- Vídeo de fundo com looping subtil de arquitectura moderna.
- Overlay gradiente com contraste apurado para leitura perfeita.
- Título principal semântico `<h1>`, subtítulo e botão de ação rápida para preenchimento de briefing.
- Métricas de destaque (anos de experiência, obras concluídas, prémios).

### Portfólio & Dossier de Projecto (`src/pages/ProjectsPage.tsx` e `ProjectModal.tsx`)
- Visualização em **Grelha Fotográfica** ou **Lista Técnica**.
- Filtro dinâmico por categoria (Residencial, Comercial, Interiores, Reabilitação).
- Pesquisa em tempo real por título, cliente ou localização.
- Ao clicar num projecto, abre o **Modal de Dossier Técnico**:
  - Galeria em alta definição com navegação em carrossel e miniaturas clicáveis.
  - Ficha técnica completa (Ano, Área em m², Localização, Estado da Obra, Equipa de Projectistas).
  - Descrição conceptual arquitectónica.
  - Botão directo "Solicitar Projecto Semelhante", que pré-seleciona a tipologia no formulário de briefing.

### Formulário de Briefing Inteligente (`src/pages/ContactsPage.tsx`)
- Permite ao cliente potencial especificar o tipo de intervenção (Moradia Nova, Remodelação, Design de Interiores, Edifício Corporativo).
- Seleção de escala/dimensão da área e orçamento estimado.
- Envio instantâneo via `/api/send-briefing`:
  - Regista o pedido no Supabase (`stak_briefings`).
  - Dispara notificação com layout profissional em HTML para o e-mail do atelier via **Resend**.

---

## 7. Motor de SEO Técnico e Metadados

### Gestor Dinâmico de `<head>` (`src/components/SeoHeadManager.tsx`)
Actualiza em tempo real os metadados do documento sempre que o utilizador navega ou abre um dossier de projecto:
1. **Title & Description**: Título semântico por secção com separadores de autoridade.
2. **Canonical Link**: `<link rel="canonical" href="...">` atualizado de forma dinâmica.
3. **Directiva Robots**: `index, follow` para páginas públicas e `noindex, nofollow` para ecrãs 404 e `/admin`.
4. **Open Graph & Twitter Cards**: Título, descrição, tipo e imagem de partilha para WhatsApp, Facebook, LinkedIn e Twitter.
5. **Google Analytics & GTM**: Injeção assíncrona dos scripts do Google Analytics 4 (`gtag.js`) e Google Tag Manager a partir das configurações salvas no painel admin.

### Dados Estruturados Schema.org (JSON-LD)
Gera blocos `<script type="application/ld+json">` dinâmicos:
- `Organization` & `ProfessionalService`: Identidade da empresa, coordenadas geográficas de Luanda (-8.8383, 13.2344), horários de funcionamento, telefone e redes sociais.
- `BreadcrumbList`: Migalhas de pão estruturadas para o Google apresentar a hierarquia da página nos resultados de pesquisa.
- `CreativeWork`: Criado automaticamente ao abrir um projecto, detalhando autor, categoria e localização.
- `ItemList` / `Service`: Lista os serviços prestados.
- `Blog` / `BlogPosting`: Estrutura as publicações do Journal.

---

## 8. Guia Prático para Manutenção e "Vibecoding"

### Comandos Essenciais no Terminal

```bash
# Instalar todas as dependências
npm install

# Iniciar o servidor de desenvolvimento local (Porta 3000)
npm run dev

# Verificar erros de tipagem TypeScript sem gerar ficheiros
npm run lint

# Gerar o bundle de produção otimizado na pasta /dist
npm run build

# Pré-visualizar localmente a versão final gerada em /dist
npm run preview
```

### Configuração de Variáveis de Ambiente (`.env`)

Crie um ficheiro `.env` na raiz do projecto tomando como modelo o `.env.example`:

```env
# Supabase (necessário para persistência remota e autenticação)
VITE_SUPABASE_URL=https://sua-instancia.supabase.co
VITE_SUPABASE_ANON_KEY=seu-anon-key-aqui

# Resend API (para envio de e-mails do formulário de briefing)
# Nota: Variáveis sem o prefixo VITE_ rodam apenas no backend/função serverless
RESEND_API_KEY=re_seu_token_resend
RESEND_FROM_EMAIL=STAK Arquitectura <notificacoes@seudominio.com>
COMPANY_NOTIFICATION_EMAIL=geral@stakarquitectura.com
```

### Dicas de Ouro para Vibecoding & Expansão

1. **Adicionar um Novo Campo a uma Página do CMS**:
   - Abra `src/types.ts` e declare a nova propriedade na interface correspondente (ex: `HomePageContent` ou `PageSeoSettings`).
   - Adicione o valor padrão em `src/data/initialData.ts`.
   - Adicione o campo de formulário correspondente no editor em `src/dashboard/src/views/stak/FrontwebManager.tsx`.
   - Utilize a nova propriedade no componente público correspondente (ex: `src/pages/HomePage.tsx`).

2. **Criar um Novo Componente com Alt Text Otimizado**:
   - Use sempre a tag `<img loading="lazy" alt={item.altText || item.title} referrerPolicy="no-referrer" />`.
   - Para inputs de imagem no painel admin, use o componente partilhado `<ImagePickerInput label="..." value={...} onChange={...} altText={...} onAltChange={...} />`.

3. **Deploy em Produção**:
   - **Vercel**: O ficheiro `vercel.json` já contém todas as reescritas SPA e cabeçalhos de segurança. Basta ligar o repositório Git e definir as variáveis de ambiente.
   - **Netlify**: O ficheiro `netlify.toml` e `public/_redirects` já encaminham `/api/*` para as funções serverless e `/*` para `index.html`.

---

*Documento concebido e mantido pela equipa de engenharia de software da Denvitic Tecnologias para a STAK Arquitectura.*
