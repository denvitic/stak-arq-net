// Função Netlify — envia uma notificação por e-mail à equipa STAK sempre que
// um novo briefing é submetido no website, usando a API do Resend.
//
// O pedido em si já fica sempre guardado no painel administrativo (Supabase),
// independentemente desta função funcionar ou não — este e-mail é um
// canal adicional de notificação imediata para a equipa.
//
// Variáveis de ambiente configuráveis no Netlify (Site configuration > Environment variables):
//   RESEND_API_KEY             -> chave da API do Resend (https://resend.com)
//   RESEND_FROM_EMAIL          -> opcional. Ex: "STAK Arquitectura <onboarding@resend.dev>"
//   COMPANY_NOTIFICATION_EMAIL -> opcional. E-mail padrão (por omissão: denvitc@gmail.com)

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const row = (label, value) =>
  `<tr>
    <td style="padding:8px 12px 8px 0;font-weight:600;width:150px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">${esc(label)}</td>
    <td style="padding:8px 0;color:#111827;font-size:14px;border-bottom:1px solid #f3f4f6;">${esc(value || '—')}</td>
  </tr>`;

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'STAK Arquitectura <onboarding@resend.dev>';
  const DEFAULT_COMPANY_EMAIL = process.env.COMPANY_NOTIFICATION_EMAIL || 'denvitc@gmail.com';

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        status: 'ok',
        service: 'STAK Briefing Email Dispatcher (Netlify Serverless)',
        resendConfigured: Boolean(RESEND_API_KEY),
        sender: FROM_EMAIL,
        recipient: DEFAULT_COMPANY_EMAIL,
      }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Método não permitido. Utilize POST.' }),
    };
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Corpo do pedido em formato JSON inválido.' }),
    };
  }

  const {
    clientName,
    clientEmail,
    clientPhone,
    projectType,
    location,
    estimatedArea,
    budgetRange,
    timeline,
    description,
    recipientEmail,
  } = payload;

  const targetEmail = recipientEmail || DEFAULT_COMPANY_EMAIL;

  if (!clientName || !clientPhone) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Nome e telefone são obrigatórios.' }),
    };
  }

  // Se a chave da API ainda não foi configurada nas variáveis da Netlify
  if (!RESEND_API_KEY) {
    console.info(
      `[Netlify Function] Briefing de "${clientName}" (${clientPhone}) recebido. E-mail não enviado: RESEND_API_KEY não definida nas variáveis de ambiente.`
    );
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        delivered: false,
        emailSent: false,
        message:
          'Briefing registado no CMS com sucesso! (Para receber também por e-mail, adicione RESEND_API_KEY no Netlify)',
      }),
    };
  }

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
      <div style="background:#111318;padding:28px 32px;border-bottom:3px solid #c6a87c;">
        <span style="color:#c6a87c;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;font-family:monospace;">STAK Arquitectura</span>
        <h1 style="color:#ffffff;font-size:22px;margin:6px 0 0 0;font-weight:700;">Novo Pedido de Briefing Técnico</h1>
      </div>
      
      <div style="padding:32px;">
        <p style="margin:0 0 20px 0;color:#4b5563;font-size:14px;line-height:1.6;">
          Foi submetido um novo formulário de proposta ou pedido de consulta no website oficial do atelier STAK.
        </p>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          ${row('Nome do Cliente', clientName)}
          ${row('Telefone / WhatsApp', clientPhone)}
          ${row('Endereço E-mail', clientEmail)}
          ${row('Tipo de Obra', projectType)}
          ${row('Localização', location)}
          ${row('Área Estimada', estimatedArea)}
          ${row('Orçamento Estimado', budgetRange)}
          ${row('Prazo Pretendido', timeline)}
        </table>

        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin-bottom:24px;">
          <strong style="display:block;color:#374151;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
            Descrição do Programa & Necessidades:
          </strong>
          <div style="white-space:pre-wrap;color:#111827;font-size:14px;line-height:1.6;">
            ${esc(description) || 'Sem descrição adicional fornecida.'}
          </div>
        </div>

        <div style="padding-top:16px;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:12px;display:flex;justify-content:space-between;">
          <span>Data: ${new Date().toLocaleString('pt-PT')}</span>
          <span style="color:#c6a87c;font-weight:600;">Registo automático no CMS do Atelier</span>
        </div>
      </div>
    </div>
  `;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [targetEmail],
        reply_to: clientEmail || undefined,
        subject: `Novo Briefing Técnico: ${clientName} — ${projectType || 'Projecto'}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.warn('[Netlify Function] Resend retorno com código não-200:', errText);
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: true,
          delivered: false,
          emailSent: false,
          message: 'Briefing gravado no CMS com sucesso! Aviso no envio de e-mail pelo Resend.',
          details: errText,
        }),
      };
    }

    const data = await resendRes.json().catch(() => ({}));
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        delivered: true,
        emailSent: true,
        message: `Notificação enviada com sucesso para ${targetEmail}!`,
        details: data,
      }),
    };
  } catch (err) {
    console.error('[Netlify Function] Erro de rede ou comunicação com o Resend:', err);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        delivered: false,
        emailSent: false,
        message: 'Briefing gravado no CMS com sucesso! (Erro de rede com o serviço de e-mail)',
        error: err?.message,
      }),
    };
  }
};
