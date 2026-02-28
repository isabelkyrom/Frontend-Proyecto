import { apiFetch } from "@/lib/api";

export default async function createTarea({ nombre, fecha_inicio, fecha_finalizacion }) {
    return await apiFetch('/eventos', {
        method: 'POST',
        body: JSON.stringify({ nombre, fecha_inicio, fecha_finalizacion })
    });
}