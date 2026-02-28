import { apiFetch } from "@/lib/api";

export default async function createTarea({ nombre, fecha_finalizacion, categoria }) {
    return await apiFetch('/tareas', {
        method: 'POST',
        body: JSON.stringify({ nombre, fecha_finalizacion, categoria })
    });
}