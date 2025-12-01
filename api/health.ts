import type { VercelRequest, VercelResponse } from '@vercel/node';
import { N8N_BASE_URL } from './_utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const r = await fetch(`${N8N_BASE_URL}/webhook-test/health`, { headers: { Accept: 'application/json' } });
    const json = await r.json();
    res.status(200).json(json);
  } catch (e) {
    res.status(200).json({});
  }
}

