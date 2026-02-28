
import { apiFetch } from '@/lib/api';

export async function getUsers() {
  
  return await apiFetch('/users');

}