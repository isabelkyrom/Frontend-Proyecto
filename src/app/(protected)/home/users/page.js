'use client'
import { useState, useEffect } from 'react';
import { getUsers } from '../../../utils/api/getUsers';
import { getUsuario } from '../../../utils/api/getUsuario';

export default function TareasEventos() {

    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    
    async function datosUsuario() {
        try {
            const data = await getUsers();
            const usuario = await getUsuario();
            setUsers(data);
            setUser(usuario.role);

        } catch (err) {
            setError('Error al obtener los usuarios')
        }
    }

    useEffect(() => {
        const cargar = async () => {
        await datosUsuario();
    };
    cargar();
    }, []);


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-lg p-6 h-full">
                <h2 className="text-center text-2xl text-indigo-900 font-semibold">Usuarios</h2>
                {error && <p className="text-red-500">{error}</p>}
                <ul>
                    {users.map(user => (
                        <li key={user.id} className='flex justify-between border border-gray-300 rounded-lg py-3 px-3 my-4 text-gray-600'>
                            <span className='font-semibold'>{user.nombre} </span>
                            <span className='text-amber-800 font-semibold'>{user.role}</span>
                            <span>{user.email}</span>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}