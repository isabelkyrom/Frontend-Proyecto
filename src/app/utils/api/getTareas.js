
import { apiFetch } from '@/lib/api';

export async function getTareas() {
  
  return await apiFetch('/tareas/noHechas');

}

export async function getAllTareas() {
  return await apiFetch('/tareas');
}

export async function paginacionTareas(page) {
  const res = await apiFetch(`/tareas/paginadas?page=${page}&limit=5`);
  return res;
}