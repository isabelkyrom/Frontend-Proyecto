'use client'
import { useState, useEffect } from 'react';
import { getUsuario } from '../../utils/api/getUsuario';
import { paginacionTareas } from '@/app/utils/api/getTareas';
import changeHecho from '@/app/utils/api/changeHecho';

export default function TareasEventos() {

    const [tareas, setTareas] = useState([]);
    const [usuario, setUsuario] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');

    async function getTareas() {
        try {
            const data = await paginacionTareas(page);
            setTareas(data?.data || []);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error("Error al obtener tareas:", err);
        }
    }
    
    async function datosUsuario() {
        const data = await getUsuario();
        setUsuario(data.nombre);
    }

    useEffect(() => {
        const fetchData = async () => {
        await getTareas();  
        await datosUsuario();
    }
    fetchData();
    }, [page]);

    const toggleTarea = async (tarea) => {
        try {
            await changeHecho(tarea.id, !tarea.hecha);
    
            const nuevasTareas = await getTareas();
            setTareas(nuevasTareas);
    
            setSuccess[`${tarea.nombre} cambiado a Hecha`]
    
        } catch (error) {
            setError("No se pudo actualizar el estado");
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-lg p-6 h-full">
                <h2 className="text-center text-2xl text-indigo-900 font-semibold">Tareas</h2>
                {error && <p className="text-red-500">{error}</p>}
                <ul>
                    {tareas.map(t => (
                        <li key={t.id} className='flex justify-between border border-gray-300 rounded-lg py-3 px-3 my-4 text-gray-600'>
                            {t.nombre} 
                            <span>{t.fecha_finalizacion}</span>
                            <span>{t.categoria}</span>
                            <button onClick={() => toggleTarea(t)}
                            className={`
                            rounded-xl cursor-pointer px-2 text-white transition-all hover:scale-105
                            ${t.hecha ? "bg-green-500" : "bg-red-500"}`}
                            >{t.hecha ? "✔" : "Pendiente"}</button>
                        </li>
                    ))}
                </ul>

                {/* Botones de paginación */}
                <div className="flex justify-center gap-2 mt-4">
                    <button onClick={() => setPage(p => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-1 bg-gray-300 rounded hover:scale-105">
                        Anterior
                    </button>

                    <span className="px-2 py-1">{page} / {totalPages}</span>

                    <button onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-3 py-1 bg-gray-300 rounded hover:scale-105">
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}