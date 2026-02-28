'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API } from '@/config'
import { setToken } from "@/lib/auth";
import StatusBox from "@/components/StatusBox";

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function validar() {
        if ( !email.trim() ) return 'Ingrese email';
        if( !password.trim() ) return 'Ingrese contraseña';
    }

    const login = async (ev) => {
        ev.preventDefault();
        setError('');
        setSuccess('');
        
        const v = validar();
        if ( v ) {
            setError(v);
            return;
        }
        setLoading(true);
        
        try {
            const res = await fetch(`${API}/users/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json().catch(()=>({}));

        if (!res.ok) {
            setError(data.error || 'Credenciales incorrectas');
            return;
            }
            setToken(data.token);
            setSuccess('Login Correcto');
            router.replace('/home');
        } catch (err) {
            setError('Error de red / API no disponible');
        } finally {
            setLoading(false);
        }
    }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-3 rounded-xl shadow w-5/6 md:w-2/5 ">

            <div className="flex flex-col justify-center items-center">
                <h1 className="mt-4 font-semibold text-center text-3xl text-indigo-900">Login</h1>

                <form className="flex flex-col gap-1 my-5 w-4/5" onSubmit={login}>
                    <input 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className=" border border-gray-300 rounded-lg 
                    w-full p-1 mt-3
                    text-lg text-gray-600"
                    placeholder="Email"></input>

                    <input 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg 
                    w-full p-1 mt-5
                    text-lg text-gray-600"
                    placeholder="Contraseña"></input>

                    <button type="submit" 
                    className=" bg-indigo-900 rounded-full
                    py-2 px-10 mt-5
                    text-white font-semibold
                    hover:scale-110 transition-all
                    ">{ loading ? 'Entrando...' : 'Entrar' }</button>
                </form>

                <Link
                href="/"
                className="
                py-2 px-10 mb-2
                text-gray-500 font-medium
                hover:scale-110 transition-all
                ">Regresar</Link>


                 <div className='mt-3'>
                    <StatusBox loading={loading} error={error} success={success} />
                </div>
                
            </div>
        </div>
    </section>
  );
}
