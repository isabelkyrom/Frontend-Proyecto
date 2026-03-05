'use client'
import { useState, useEffect } from 'react';
import EventoModal from '@/components/EventoModal';
import StatusBox from '@/components/StatusBox';
import { getTareas } from '../../utils/api/getTareas';
import { getEventos } from '../../utils/api/getEventos';
import { deleteEvento } from '@/app/utils/api/deleteEvento';
import {Calendar, dayjsLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';

export default function EventosPage() {

    const [tareas, setTareas] = useState([]);
    const [eventos, setEventos] = useState([]);
    const localizer = dayjsLocalizer(dayjs);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [error, setError] = useState('');

    // GET info
    useEffect(() => {
    async function cargarDatos() {
        const tareasData = await getTareas();
        const eventosData = await getEventos();

        setTareas(tareasData);
        setEventos(eventosData);
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
        id: evento.id,
        title: evento.nombre,
        start: new Date( evento.fecha_inicio ), 
        end: new Date( evento.fecha_finalizacion ), 
        resource: evento,
        tipo: 'Evento'
    })) || [];

    // Juntamos ambos tipos de datos
    const todosEventos = [...appointments, ...pendientes]

    const handleSave = async (updatedEvent) => {
        try {
            await updateEvento(updatedEvent.resource.id, updatedEvent.resource);

            setEventos(prev =>
                prev.map(ev =>
                    ev.id === updatedEvent.resource.id
                        ? updatedEvent.resource
                        : ev
                )
            );


        } catch (error) {
            setError("Error al modificar el evento", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEvento(id);

            setEventos(prev =>
                prev.filter(ev => ev.id !== id)
            );

        } catch (error) {
            setError("Error al intentar eliminar evento", error);
            setTimeout(() => setError(''), 3000)
        }
    };

    return(
        <div className='min-h-screen bg-gray-100 p-6'>
            <div className=' bg-white p-2 md:p-6 rounded-lg shadow flex flex-col gap-6 justify-center items-center'>
                <h1 className='text-indigo-900 font-semibold text-2xl text-center'>Calendario</h1>
                <StatusBox error={error}/>
                <div className='calendarioMensual h-150 w-full md:w-4/5'>
                    <Calendar
                    localizer={localizer}
                    events={todosEventos}
                    views={['month', 'week', 'day', 'agenda']}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    onSelectEvent={(event) => {
                        setSelectedEvent(event);
                        setIsModalOpen(true);
                    }}
                    />
                    <EventoModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    event={selectedEvent}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
}