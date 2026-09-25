import { processBriefingNotification } from '../src/lib/briefingMailer';

export default async function handler(req: any, res: any) {
  // CORS support
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      service: 'STAK Briefing Email Dispatcher',
      resendConfigured: !!process.env.RESEND_API_KEY,
      sender: process.env.RESEND_FROM_EMAIL || 'STAK Arquitectura <onboarding@resend.dev>',
      recipient: process.env.COMPANY_NOTIFICATION_EMAIL || 'geral@stakarquitectura.com',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Utilize POST.' });
  }

  try {
    let payload = req.body;
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch {
        return res.status(400).json({ error: 'Corpo do pedido em formato JSON inválido.' });
      }
    }

    const result = await processBriefingNotification(payload || {});
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Erro na função send-briefing:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Erro interno no processamento do briefing.',
    });
  }
}
