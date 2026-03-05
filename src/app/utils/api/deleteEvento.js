import { apiFetch } from "@/lib/api";

export const deleteEvento = async (id) => {
    try {
        const res = await apiFetch(`/eventos/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error('Error eliminando evento');
        }

    } catch (error) {
        throw error;
    }
}