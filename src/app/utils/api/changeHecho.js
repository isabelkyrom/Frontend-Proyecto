import { apiFetch } from "@/lib/api";

export default async function changeHecho( id, hecha ) {
  return await apiFetch(`/tareas/${id}`, {
    method: "PUT",
    body: JSON.stringify({ hecha })
  });
}