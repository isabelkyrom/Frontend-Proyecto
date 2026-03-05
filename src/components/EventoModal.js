'use client'
import { useState, useEffect } from 'react';

export default function EventoModal({ 
    isOpen, 
    onClose, 
    event, 
    onSave,
    onDelete 
}) {


    const [formData, setFormData] = useState({
        title: '',
        start: '',
        end: ''
    });

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title,
                start: event.start,
                end: event.end
            });
        }
    }, [event]);

    if (!isOpen) return null;

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        onSave({
            ...event,
            ...formData
        });
        onClose();
    };

    const handleDelete = () => {
        onDelete(event.id);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-2xl shadow-xl">

                <h2 className="text-xl font-semibold mb-4">
                    Editar Evento
                </h2>



                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full border p-2 rounded mb-3"
                />

                <input
                    type="datetime-local"
                    value={formatDateForInput(formData.start)}
                    onChange={(e) => handleChange("start", new Date(e.target.value))}
                    className="w-full border p-2 rounded mb-3"
                />

                <input
                    type="datetime-local"
                    value={formatDateForInput(formData.end)}
                    onChange={(e) => handleChange("end", new Date(e.target.value))}
                    className="w-full border p-2 rounded mb-4"
                />

                <div className="flex justify-between items-center">

                    {/* Botón eliminar */}
                    <button
                        onClick={handleDelete}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:scale-105 transition"
                    >
                        Eliminar
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-1 bg-gray-400 rounded text-white"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="px-4 py-1 bg-indigo-600 rounded text-white hover:scale-105 transition"
                        >
                            Guardar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

function formatDateForInput(date) {
    if (!date) return '';
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
}