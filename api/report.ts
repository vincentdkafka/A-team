import type { VercelRequest, VercelResponse } from '@vercel/node';
import { N8N_BASE_URL } from './_utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  try {
    const r = await fetch(`${N8N_BASE_URL}/webhook/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(req.body || {}),
    });
    const json = await r.json().catch(() => ({}));
    res.status(200).json(json);
  } catch (e) {
    res.status(200).json({});
  }
}

