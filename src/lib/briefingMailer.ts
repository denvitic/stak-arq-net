// Serviço de processamento e envio de notificações de briefing por e-mail (Resend)
// Utilizado em desenvolvimento local (Vite middleware), na Vercel (/api/send-briefing.ts)
// e na Netlify (netlify/functions/send-briefing.js).

export interface BriefingNotificationPayload {
  clientName: string;
  clientEmail?: string;
  clientPhone: string;
  projectType?: string;
  location?: string;
  estimatedArea?: string;
  budgetRange?: string;
  timeline?: string;
  description?: string;
  recipientEmail?: string;
}

export interface BriefingNotificationResult {
  success: boolean;
  delivered: boolean;
  message: string;
  error?: string;
  details?: unknown;
}

const esc = (v: unknown): string =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const row = (label: string, value?: string): string =>
  `<tr>
    <td style="padding:8px 12px 8px 0;font-weight:600;width:150px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">${esc(label)}</td>
    <td style="padding:8px 0;color:#111827;font-size:14px;border-bottom:1px solid #f3f4f6;">${esc(value || '—')}</td>
  </tr>`;

export const generateBriefingHtml = (payload: BriefingNotificationPayload): string => {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
      <div style="background:#111318;padding:28px 32px;border-bottom:3px solid #c6a87c;">
        <span style="color:#c6a87c;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;font-family:monospace;">STAK Arquitectura</span>
        <h1 style="color:#ffffff;font-size:22px;margin:6px 0 0 0;font-weight:700;">Novo Pedido de Briefing Técnico</h1>
      </div>
      
      <div style="padding:32px;">
        <p style="margin:0 0 20px 0;color:#4b5563;font-size:14px;line-height:1.6;">
          Foi submetido um novo formulário de proposta ou pedido de consulta no website oficial do atelier.
        </p>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          ${row('Nome do Cliente', payload.clientName)}
          ${row('Telefone / WhatsApp', payload.clientPhone)}
          ${row('Endereço E-mail', payload.clientEmail)}
          ${row('Tipo de Obra', payload.projectType)}
          ${row('Localização', payload.location)}
          ${row('Área Estimada', payload.estimatedArea)}
          ${row('Orçamento Estimado', payload.budgetRange)}
          ${row('Prazo Pretendido', payload.timeline)}
        </table>

        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin-bottom:24px;">
          <strong style="display:block;color:#374151;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
            Descrição do Projecto & Necessidades:
          </strong>
          <div style="white-space:pre-wrap;color:#111827;font-size:14px;line-height:1.6;">
            ${esc(payload.description) || 'Sem descrição adicional fornecida.'}
          </div>
        </div>

        <div style="padding-top:16px;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:12px;display:flex;justify-content:space-between;">
          <span>Data: ${new Date().toLocaleString('pt-PT')}</span>
          <span style="color:#c6a87c;font-weight:600;">Registo automático no CMS do Atelier</span>
        </div>
      </div>
    </div>
  `;
};

export async function processBriefingNotification(
  payload: BriefingNotificationPayload,
  envOverride?: {
    apiKey?: string;
    fromEmail?: string;
    companyEmail?: string;
  }
): Promise<BriefingNotificationResult> {
  if (!payload.clientName || !payload.clientPhone) {
    return {
      success: false,
      delivered: false,
      message: 'Nome e telefone são obrigatórios para processar o briefing.',
    };
  }

  const apiKey =
    envOverride?.apiKey ||
    (typeof process !== 'undefined' ? process.env?.RESEND_API_KEY : undefined);

  const fromEmail =
    envOverride?.fromEmail ||
    (typeof process !== 'undefined' ? process.env?.RESEND_FROM_EMAIL : undefined) ||
    'STAK Arquitectura <onboarding@resend.dev>';

  const companyEmail =
    payload.recipientEmail ||
    envOverride?.companyEmail ||
    (typeof process !== 'undefined' ? process.env?.COMPANY_NOTIFICATION_EMAIL : undefined) ||
    'geral@stakarquitectura.com';

  // Se a chave do Resend não estiver configurada no ambiente
  if (!apiKey) {
    console.info(
      `[Briefing Mailer] Briefing de "${payload.clientName}" (${payload.clientPhone}) registado com sucesso no CMS. (Serviço de e-mail: RESEND_API_KEY não definida no .env)`
    );
    return {
      success: true,
      delivered: false,
      message:
        'Briefing registado com sucesso no painel administrativo! (Para receber também por e-mail, adicione RESEND_API_KEY no ficheiro .env)',
    };
  }

  try {
    const html = generateBriefingHtml(payload);
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [companyEmail],
        reply_to: payload.clientEmail || undefined,
        subject: `Novo Briefing Técnico: ${payload.clientName} — ${payload.projectType || 'Projecto'}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.warn('[Briefing Mailer] Resend API retorno com aviso:', errText);
      return {
        success: true,
        delivered: false,
        message:
          'Briefing gravado no CMS com sucesso! Aviso no envio de e-mail pelo Resend.',
        details: errText,
      };
    }

    const data = await resendRes.json().catch(() => ({}));
    console.info('[Briefing Mailer] E-mail de notificação enviado via Resend:', data);
    return {
      success: true,
      delivered: true,
      message: `Notificação por e-mail enviada com sucesso para ${companyEmail}!`,
      details: data,
    };
  } catch (err: any) {
    console.error('[Briefing Mailer] Erro de rede ou comunicação com o Resend:', err);
    return {
      success: true,
      delivered: false,
      message:
        'Briefing gravado no painel administrativo com sucesso! (Erro temporário na comunicação com o serviço de e-mail)',
      error: err?.message,
    };
  }
}
