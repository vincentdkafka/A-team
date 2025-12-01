export const N8N_BASE_URL = process.env.N8N_BASE_URL || 'http://localhost:5678';

export async function proxyJson(req: any, path: string, init?: RequestInit) {
  const url = `${N8N_BASE_URL}${path}`;
  const method = init?.method || req.method || 'GET';
  const headers = { 'Content-Type': 'application/json', ...(init?.headers || {}) } as Record<string, string>;
  const body = init?.body ?? (req.body ? JSON.stringify(req.body) : undefined);
  const res = await fetch(url, { method, headers, body });
  const text = await res.text();
  return text;
}

