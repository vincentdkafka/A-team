import type { VercelRequest, VercelResponse } from '@vercel/node';
import { N8N_BASE_URL } from './_utils';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const r = await fetch(`${N8N_BASE_URL}/webhook/practitioner`, { headers: { Accept: 'application/json' } });
    const json = await r.json().catch(() => ({}));
    res.status(200).json(json);
  } catch (e) {
    res.status(200).json([]);
  }
}

