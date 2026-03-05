import { apiFetch } from "@/lib/api";

export default async function deleteTarea(id) {
    return await apiFetch(`/tareas/${id}`, {
        method: 'DELETE',
    });
}