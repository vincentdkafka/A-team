import type { VercelRequest, VercelResponse } from '@vercel/node';
import { proxyJson } from './_utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  try {
    const reply = await proxyJson(req, '/webhook/chat');
    res.status(200).send(reply);
  } catch (e: any) {
    res.status(500).send('Error contacting bot');
  }
}

