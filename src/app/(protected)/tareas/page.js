'use client'
import { useState, useEffect } from 'react';
import StatusBox from '@/components/StatusBox';
import deleteTarea from '@/app/utils/api/deleteTarea';
import { getUsuario } from '../../utils/api/getUsuario';
import { paginacionTareas } from '@/app/utils/api/getTareas';
import changeHecho from '@/app/utils/api/changeHecho';

export default function TareasEventos() {

    const [tareas, setTareas] = useState([]);
    const [usuario, setUsuario] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    async function getTareas() {
        try {
            const data = await paginacionTareas(page);
            setTareas(data?.data || []);
            setTotalPages(data.totalPages);
            return data?.data || [];
        } catch (err) {
            setError("Error al obtener datos", err);
        }
    }

    useEffect(() => {
        async function cargarDatos() {
            try {
                await getTareas();
                const userData = await getUsuario();
                setUsuario(userData.nombre);
            } catch (error) {
                setError("No se pudo actualizar el estado");
                setTimeout(() => setError(''), 3000);
            }
            
        }
        cargarDatos();
      }, [page]);



    const toggleTarea = async (tarea) => {
        try {
            await changeHecho(tarea.id, !tarea.hecha);
    
            const nuevasTareas = await getTareas();
            setTareas(nuevasTareas);
    
            setSuccess(`${tarea.nombre} cambiado a Hecha`);
            setTimeout(() => setSuccess(''), 3000);
    
        } catch (error) {
            setError("No se pudo actualizar el estado");
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleDelete = async (id, nombre) => {
        try {
            await deleteTarea(id);

            setTareas(prev => prev.filter(t => t.id !== id));

            setSuccess(`${nombre} eliminada correctamente`);
            setTimeout(() => setSuccess(''), 3000);

        } catch (error) {
            setError("No se pudo eliminar la tarea");
            setTimeout(() => setError(''), 3000);
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-lg p-6 h-full">
                <h2 className="text-center text-2xl text-indigo-900 font-semibold">Tareas</h2>
                <StatusBox error={error} success={success}/>
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
                            <button
                            onClick={() => handleDelete(t.id, t.nombre)}
                            className="bg-gray-800 text-white px-2 rounded-xl hover:scale-105 transition-all"
                            >Eliminar
                            </button>
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