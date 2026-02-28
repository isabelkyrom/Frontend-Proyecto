
import { apiFetch } from '@/lib/api';

export async function getUsuario() {
  
  return await apiFetch('/users/me');

}