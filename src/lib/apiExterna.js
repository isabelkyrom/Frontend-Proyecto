import { API2 } from '@/config';

export async function apiFetch(path, options = {}) {
  if (!API2) throw new Error('Falta NEXT_PUBLIC_API_URL2');

  const res = await fetch(`${API2}${path}`, {
    ...options
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(data?.error || `Error HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  
  return data;
}