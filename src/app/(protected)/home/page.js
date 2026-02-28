'use client'
import { useState, useEffect } from 'react';
import StatusBox from '@/components/StatusBox';
import { getTareas } from '../../utils/api/getTareas';
import { getUsuario } from '../../utils/api/getUsuario';
import { getEventos } from '../../utils/api/getEventos';
import createTarea from '../../utils/api/createTarea';
import createEvento from '../../utils/api/createEvento';
import changeHecho from '@/app/utils/api/changeHecho';
import {Calendar, dayjsLocalizer} from 'react-big-calendar';
import dayjs from 'dayjs';

export default function Home() {

  const [tareas, setTareas] = useState([]);
  const [usuario, setUsuario] = useState();
  const [eventos, setEventos] = useState([]);
  const [openPopup, setOpenPopout] = useState(false)
  const [openPopup2, setOpenPopout2] = useState(false)

  const [nombre, setNombre] = useState('');
  const [fecha_inicio, setFechaInicio] = useState('');
  const [fecha_finalizacion, setFechaFinal] = useState('');
  const [categoria, setCategoria] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const localizer = dayjsLocalizer(dayjs);

  // GET info
  useEffect(() => {
    async function cargarDatos() {
        const tareasData = await getTareas();
        const eventosData = await getEventos();
        const userData = await getUsuario();
        setTareas(tareasData);
        setEventos(eventosData);
        setUsuario(userData.nombre);
    }
    cargarDatos();
  }, []);

  // Guarda las tareas para el calendario
  const pendientes = tareas?.map(tarea => ({
    title: tarea.nombre,
    start: new Date( tarea.fecha_finalizacion ),
    end: new Date( tarea.fecha_finalizacion ),
    resource: tarea,
    tipo: 'Tarea'
  }));

  // Guarda los eventos para el calendario 
  const appointments = eventos?.map(evento => ({
    title: evento.nombre,
    start: new Date( evento.fecha_inicio ), 
    end: new Date( evento.fecha_finalizacion ), 
    resource: evento,
    tipo: 'Evento'
  })) || [];

  // Juntamos ambos tipos de datos
  const todosEventos = [...appointments, ...pendientes]

  function validarTareas() {
    if ( !nombre.trim()) return 'Nombre requerido';
    if ( !fecha_finalizacion.trim() ) return 'Fecha inválida';
    if ( !categoria.trim() ) return 'Categoria inválida';
    return '';
  }

  const crearTarea = async (ev) => {
    ev.preventDefault();
    setError('');
    setSuccess('');

    const v = validarTareas();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {

      await createTarea({ nombre: nombre, categoria:categoria, fecha_finalizacion:fecha_finalizacion});
      const nuevasTareas = await getTareas();
      setTareas(nuevasTareas);

      setSuccess('Tarea creada correctamente');
      setNombre('');
      setCategoria('');
      setFechaFinal('');
      
      setTimeout(() => {
        setOpenPopout(false);
        setSuccess('');
      }, 3000)
      
    } catch (error) {
      if (error.status === 401) {
        clearToken();
        router.replace('/login');
        return;
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function validarEvento() {
    if ( !nombre.trim() ) return 'Nombre requerido';
    if ( !fecha_inicio.trim() ) return 'Fecha inválida';
    if ( !fecha_finalizacion.trim() ) return 'Fecha inválida';
    return '';
  }

  const crearEvento = async (ev) => {
    ev.preventDefault();
    setError('');
    setSuccess('');

    const v = validarEvento();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {

      await createEvento({ nombre: nombre, fecha_inicio:fecha_inicio, fecha_finalizacion:fecha_finalizacion});
      const nuevosEventos = await getEventos();
      setEventos(nuevosEventos);

      setSuccess('Evento creada correctamente');
      setNombre('');
      setFechaInicio('');
      setFechaFinal('');
      setTimeout(() => {
        setOpenPopout2(false);
        setSuccess('Tarea creada correctamente');
      }, 3000)
    } catch (error) {
      if (error.status === 401) {
        clearToken();
        router.replace('/login');
        return;
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

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
    <section className="min-h-screen bg-gray-100 p-6">
        <div className=" grid grid-cols-12 gap-6 ">

            <div className="col-span-12 lg:col-span-8 ">

                <div>
                    <h2 className="text-indigo-900 text-2xl font-semibold text-center mb-5
                    ">Bienvenida { usuario }!</h2>
                </div>

                <div className='flex flex-col gap-6'>
                    <div className="bg-white rounded-xl shadow p-6 hidden md:block">
                        <div className="">
                            <div className='calendarioSemanal'> 
                                
                                <Calendar 
                                localizer={ localizer } 
                                views={['week']}
                                view='week'
                                toolbar={ false }
                                events={ todosEventos }
                                startAccessor="start"
                                endAccessor="end"
                                />
                                
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="">
                            <div className="flex justify-between items-center">
                                <h4 className="text-indigo-900 text-2xl font font-bold">Por hacer...</h4>
                            
                                <button className="bg-indigo-900 rounded-full
                                py-2 px-10
                                text-white font-semibold
                                hover:scale-110 transition-all" 
                                onClick={() => setOpenPopout(true)}
                                >Agregar Tarea</button>
                                
                            </div>

                            {
                                openPopup && 
                                <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
                                    <div className='rounded-lg p-6 bg-white w-2xl flex flex-col gap-4'>
                                        <div className='flex flex-row justify-between '>
                                            <h2 className='text-indigo-900 text-2xl font-semibold'>Agregar Tarea</h2>
                                            <button onClick={() => setOpenPopout(false)}
                                            className='text-gray-600 border border-gray-300 shadow rounded-lg px-3'
                                            >x</button>
                                        </div>
                                        <form onSubmit={crearTarea} className='flex flex-col gap-4'>
                                            <input placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}
                                            className='border border-gray-300 rounded-lg
                                            px-3 py-2
                                            text-gray-400'
                                            /> 

                                            <input placeholder='Categoría' value={categoria} onChange={(e) => setCategoria(e.target.value)}
                                            className='border border-gray-300 rounded-lg
                                            px-3 py-2
                                            text-gray-400'/>

                                            <input type='date' placeholder='Fecha de entrega (YYYY-MM-DD)' value={fecha_finalizacion} onChange={(e) => setFechaFinal(e.target.value)}
                                            className='border border-gray-300 rounded-lg
                                            px-3 py-2
                                            text-gray-400'/>

                                            <button type='submit' disabled={loading} className="bg-indigo-900 rounded-full
                                            py-2 px-10
                                            text-white font-semibold
                                            hover:scale-105 transition-all"
                                            >{loading ? 'Creando...' : 'Crear Tarea'}</button>
                                            <StatusBox loading={loading} error={error} success={success} />
                                        </form>
                                        
                                    </div>
                                </div>
                            }

                        
                            <div>
                                <ul>
                                    {tareas.map((tarea) => (
                                        <li key={tarea.id}
                                        className='flex justify-between
                                        border border-gray-300 rounded-lg
                                        py-3 px-3 my-4
                                        text-gray-600'>
                                            {tarea.nombre} 
                                            <span>{tarea.fecha_finalizacion}</span> 
                                            <span>{tarea.categoria} </span>
                                            <button onClick={() => toggleTarea(tarea)}
                                            className={`
                                                rounded-xl cursor-pointer px-2 text-white transition-all hover:scale-105
                                                ${tarea.hecha ? "bg-green-500" : "bg-red-500"}`}
                                            >{tarea.hecha ? "✔" : "Pendiente"}</button>
                                        </li>
                                        
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <aside className="col-span-12 lg:col-span-4 bg-white p-7 rounded-xl shadow h-full">
                <div className='flex flex-col gap-6'>
                    <div className="flex flex-col gap-6">
                        <h4 className="text-center text-indigo-900 text-2xl font font-bold">Calendario</h4>
                        <div className='h-75 calendarioMensual'> 
                            <Calendar 
                            localizer={ localizer }
                            defaultView='month'
                            toolbar={ false }
                            events={ todosEventos }
                            startAccessor="start"
                            endAccessor="end"
                            />
                        </div>
                        <button
                        onClick={() => setOpenPopout2(true)}
                        className='bg-indigo-900 rounded-full
                        py-2 px-10
                        text-white font-semibold
                        hover:scale-110 transition-all'
                        >Agregar evento</button>

                        {
                            openPopup2 && 
                            <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
                                <div className='rounded-lg p-6 bg-white w-2xl flex flex-col gap-4'>
                                    <div className='flex flex-row justify-between '>
                                        <h2 className='text-indigo-900 text-2xl font-semibold'>Agregar Evento</h2>
                                        <button onClick={() => setOpenPopout2(false)}
                                        className='text-gray-600 border border-gray-300 shadow rounded-lg px-3'
                                        >x</button>
                                    </div>
                                    <form onSubmit={crearEvento} className='flex flex-col gap-4'>
                                        <input placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}
                                        className='border border-gray-300 rounded-lg
                                        px-3 py-2
                                        text-gray-400'
                                        /> 

                                        <input type='date' placeholder='Fecha de Inicio (YYYY-MM-DD)' value={fecha_inicio} onChange={(e) => setFechaInicio(e.target.value)}
                                        className='border border-gray-300 rounded-lg
                                        px-3 py-2
                                        text-gray-400'/>

                                        <input type='date' placeholder='Fecha de entrega (YYYY-MM-DD)' value={fecha_finalizacion} onChange={(e) => setFechaFinal(e.target.value)}
                                        className='border border-gray-300 rounded-lg
                                        px-3 py-2
                                        text-gray-400'/>

                                        <button type='submit' disabled={loading} className="bg-indigo-900 rounded-full
                                        py-2 px-10
                                        text-white font-semibold
                                        hover:scale-105 transition-all"
                                        >{loading ? 'Creando...' : 'Crear Evento'}</button>
                                        <StatusBox loading={loading} error={error} success={success} />
                                    </form>
                                    
                                </div>
                            </div>
                        }
                    </div>
                    <div className="">
                        <h4 className="text-center text-indigo-950 text-2xl font font-bold">Rutina</h4>
                        <p className="text-gray-400">Proximamente...</p>
                    </div>

                    <ul></ul>
                </div>
            </aside>

        </div>
    </section>
  );
}
