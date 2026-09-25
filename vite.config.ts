import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import { processBriefingNotification } from './src/lib/briefingMailer';

function briefingApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'stak-briefing-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        if (url === '/api/send-briefing' || url === '/api/send-briefing/status') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            res.end();
            return;
          }

          if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(
              JSON.stringify({
                status: 'ok',
                service: 'STAK Briefing Email Dispatcher (Local Dev Server)',
                resendConfigured: Boolean(env.RESEND_API_KEY || process.env.RESEND_API_KEY),
                sender:
                  env.RESEND_FROM_EMAIL ||
                  process.env.RESEND_FROM_EMAIL ||
                  'STAK Arquitectura <onboarding@resend.dev>',
                recipient:
                  env.COMPANY_NOTIFICATION_EMAIL ||
                  process.env.COMPANY_NOTIFICATION_EMAIL ||
                  'geral@stakarquitectura.com',
              })
            );
            return;
          }

          if (req.method === 'POST') {
            let bodyStr = '';
            req.on('data', (chunk) => {
              bodyStr += chunk;
            });
            req.on('end', async () => {
              try {
                const payload = bodyStr ? JSON.parse(bodyStr) : {};
                const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
                const fromEmail =
                  env.RESEND_FROM_EMAIL ||
                  process.env.RESEND_FROM_EMAIL ||
                  'STAK Arquitectura <onboarding@resend.dev>';
                const companyEmail =
                  payload.recipientEmail ||
                  env.COMPANY_NOTIFICATION_EMAIL ||
                  process.env.COMPANY_NOTIFICATION_EMAIL ||
                  'geral@stakarquitectura.com';

                const result = await processBriefingNotification(payload, {
                  apiKey,
                  fromEmail,
                  companyEmail,
                });

                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify(result));
              } catch (err: any) {
                console.error('[API Middleware] Erro no endpoint /api/send-briefing:', err);
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 500;
                res.end(
                  JSON.stringify({
                    success: false,
                    error: err?.message || 'Erro interno no processamento do briefing.',
                  })
                );
              }
            });
            return;
          }
        }

        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), briefingApiPlugin(env)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'src': path.resolve(__dirname, 'src/dashboard/src'),
      },
    },
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/apexcharts') || id.includes('node_modules/react-apexcharts')) {
              return 'vendor-charts';
            }
            if (id.includes('node_modules/@supabase')) {
              return 'vendor-supabase';
            }
            if (
              id.includes('node_modules/@iconify') ||
              id.includes('node_modules/lucide-react') ||
              id.includes('node_modules/@tabler') ||
              id.includes('node_modules/react-icons')
            ) {
              return 'vendor-icons';
            }
            if (id.includes('node_modules/motion')) {
              return 'vendor-motion';
            }
            if (id.includes('node_modules/@radix-ui')) {
              return 'vendor-radix';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
