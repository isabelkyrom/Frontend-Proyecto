'use client';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { apiFetch } from '@/lib/api';
import StatusBox from '@/components/StatusBox';

export default function Registro() {

    const router = useRouter();

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function validar() {
        if( !nombre.trim() ) return 'Nombre requerido';
        if ( nombre.length < 4 ) return 'Nombre debe contenera más de 3 caracteres';
        if ( typeof email !== 'string' || !email.includes('@') || !email.includes('.') ) return 'Email inválido';
        if( !password.trim() ) return 'Contraseña requerido';

    }

    const create = async (ev) => {
        ev.preventDefault();
        setSuccess('');

        const v = validar();
        if ( v ) {
            setError(v);
            return;
        }

        setLoading(true);

        try {
            
            await apiFetch('/users/create', {
                method: 'POST',
                body: JSON.stringify({ nombre: nombre.trim(), email: email.trim(), password: password.trim() })
            })
            
            setSuccess('Usuario creado correctamente. Redirigiendo...');
            setNombre('');
            setEmail('');
            setPassword('');

            setTimeout(() => {
                router.replace('/login');
            }, 4000)

        } catch (error) {
            setError(error.message);
            
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-3 rounded-xl shadow w-5/6 md:w-2/5 ">

            <div className="flex flex-col justify-center items-center">
                <h1 className="mt-4 font-semibold text-center text-3xl text-indigo-900">Crear cuenta</h1>

                <form onSubmit={ create } 
                className="flex flex-col gap-5 my-5 w-4/5">

                    <input  
                    value={ nombre }
                    onChange={( e ) => setNombre( e.target.value )}
                    className=" border border-gray-300 rounded-lg 
                    w-full p-1
                    text-lg text-gray-600"
                    placeholder="Nombre de usuario"></input>

                    <input 
                    value={ email }
                    onChange={( e ) => setEmail( e.target.value )}
                    className="border border-gray-300 rounded-lg 
                    w-full p-1
                    text-lg text-gray-600"
                    placeholder="Email"></input>

                    <input 
                    value={ password }
                    onChange={( e ) => setPassword( e.target.value )}
                    className="border border-gray-300 rounded-lg 
                    w-full p-1
                    text-lg text-gray-600"
                    placeholder="Contraseña"></input>

                    <button type="submit" 
                    disabled={loading}
                    className=" bg-indigo-900 rounded-full
                    py-2 px-10 mt-2
                    text-white font-semibold
                    hover:scale-110 transition-all
                    ">{loading ? 'Entrando...' : 'Entrar'}</button>

                </form>

                <Link
                href="/"
                className="
                py-2 px-10 mb-2
                text-gray-500 font-medium
                hover:scale-110 transition-all
                ">Regresar</Link>

                <StatusBox loading={loading} error={error} success={success} />
                
            </div>


        </div>
    </section>
    );
}