// Função Netlify — envia uma notificação por e-mail à equipa STAK sempre que
// um novo briefing é submetido no website, usando a API do Resend.
//
// O pedido em si já fica sempre guardado no painel administrativo (Supabase),
// independentemente desta função funcionar ou não — este e-mail é apenas um
// canal adicional de notificação imediata para a equipa.
//
// Variáveis de ambiente necessárias (Netlify: Site settings > Environment
// variables — NUNCA com o prefixo VITE_, para não serem expostas ao browser):
//   RESEND_API_KEY             -> chave da API do Resend (https://resend.com)
//   RESEND_FROM_EMAIL          -> opcional. Ex: "STAK Arquitectura <geral@stakarquitectura.com>"
//                                  (requer domínio verificado no Resend; sem isto
//                                  usa-se o domínio de testes onboarding@resend.dev)
//   COMPANY_NOTIFICATION_EMAIL -> opcional. E-mail que recebe as notificações
//                                  (por omissão: geral@stakarquitectura.com)

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const row = (label, value) =>
  `<tr><td style="padding:6px 10px 6px 0;font-weight:bold;width:160px;color:#555;">${esc(label)}</td><td style="padding:6px 0;color:#1a1a1a;">${esc(value || '-')}</td></tr>`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método não permitido.' }) };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'STAK Arquitectura <onboarding@resend.dev>';
  const COMPANY_EMAIL = process.env.COMPANY_NOTIFICATION_EMAIL || 'geral@stakarquitectura.com';

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY não está configurada nas variáveis de ambiente do servidor.');
    return { statusCode: 500, body: JSON.stringify({ error: 'Serviço de e-mail não configurado no servidor.' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Corpo do pedido inválido.' }) };
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
  } = payload;

  if (!clientName || !clientPhone) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Nome e telefone são obrigatórios.' }) };
  }

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#c6a87c;border-bottom:2px solid #c6a87c;padding-bottom:10px;">
        Novo Pedido de Briefing — STAK Arquitectura
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${row('Nome', clientName)}
        ${row('Telefone', clientPhone)}
        ${row('E-mail', clientEmail)}
        ${row('Tipo de Obra', projectType)}
        ${row('Localização', location)}
        ${row('Área Estimada', estimatedArea)}
        ${row('Orçamento', budgetRange)}
        ${row('Prazo Pretendido', timeline)}
      </table>
      <p style="margin-top:18px;font-weight:bold;color:#555;">Descrição do Projecto:</p>
      <p style="white-space:pre-wrap;background:#f7f5f2;padding:14px;border-radius:8px;font-size:14px;color:#1a1a1a;">
        ${esc(description) || 'Sem descrição adicional.'}
      </p>
      <p style="margin-top:24px;font-size:12px;color:#999;">
        Este pedido já foi automaticamente registado no Painel Administrativo do CMS.
      </p>
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
        to: [COMPANY_EMAIL],
        reply_to: clientEmail || undefined,
        subject: `Novo Briefing: ${clientName} — ${projectType || 'Projecto'}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Erro do Resend:', errText);
      return { statusCode: 502, body: JSON.stringify({ error: 'Falha ao enviar e-mail via Resend.', details: errText }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('Erro ao contactar o Resend:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err?.message || 'Erro interno ao enviar e-mail.' }) };
  }
};
