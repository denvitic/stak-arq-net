# STAK Arquitectura & Design de Interiores

Plataforma digital integrada e portfólio visual de alto padrão para gabinete de arquitectura e design de ambientes sediado em Luanda, Angola, acompanhado por um sistema CMS administrativo completo (*STAK Dashboard*).

> 📘 **Documentação Técnica Completa:** Consulte o ficheiro [**ARQUITETURA.md**](./ARQUITETURA.md) para a descrição exaustiva das tecnologias, da arquitectura do sistema, do fluxo de dados, do motor de SEO e do guia para manutenção e *vibecoding*.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18+ recomendada)
- **npm** ou gerenciador compatível

### Passos de Instalação

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   Copie o modelo de variáveis de exemplo:
   ```bash
   cp .env.example .env
   ```
   *(Preencha os dados do Supabase e chave da API do Resend se desejar testar a persistência remota e envio de e-mails de briefing).*

3. **Iniciar servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Aceda a `http://localhost:3000` no seu navegador.

---

## 🛠️ Scripts Principais

- `npm run dev`: Inicia o servidor local Vite na porta 3000.
- `npm run build`: Compila o bundle otimizado com *code-splitting* para produção em `/dist`.
- `npm run lint`: Executa a verificação estática de tipos TypeScript (`tsc --noEmit`).
- `npm run preview`: Pré-visualiza localmente os ficheiros de produção compilados.

---

## 🏛️ Estrutura Resumida

- **Website Público**: Portfólio de projectos com filtros e visualização em grelha/lista, dossier técnico com galeria em alta resolução, serviços e metodologia, ensaios editoriais (*Journal*), formulário inteligente de briefing com envio por e-mail e botão flutuante WhatsApp.
- **Painel CMS Admin (`/admin`)**: Gestão de páginas (`FrontwebManager`), projectos, artigos com slugs amigáveis, alt text para SEO, biblioteca de média, leads de clientes e configurações globais de SEO / sitemap / robots.txt.
- **Resiliência Offline (Local-First)**: Fallback transparente para `localStorage` e dados padrão pré-carregados caso o Supabase não esteja configurado.
