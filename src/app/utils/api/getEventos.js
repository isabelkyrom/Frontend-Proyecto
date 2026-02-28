
import { apiFetch } from '@/lib/api';

export async function getEventos() {
  
  return await apiFetch('/eventos');

}