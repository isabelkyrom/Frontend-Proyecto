import Link from "next/link";

export default function Page() {
    return(
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
            <div className="">
                <div className=" bg-white p-6 rounded-lg shadow flex flex-col gap-6">
                    <h1 className=" text-center text-3xl text-indigo-900 font-semibold">Bienvenido a tu Organizador Personal!</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center items-center">

                        <div className="border  border-gray-300 rounded-lg shadow p-6">
                            <div className="flex flex-col gap-3">
                                <h4 className="text-gray-600 text-center font-semibold">Si ya tienes cuenta</h4>
                                <Link href={'/login'} className="bg-indigo-900 rounded-full
                                py-2 px-10
                                text-white font-semibold text-center
                                hover:scale-110 transition-all"
                                >Login</Link>
                            </div>
                        </div>

                        <div className="border  border-gray-300 rounded-lg shadow p-6">
                            <div className="flex flex-col gap-3">
                                <h4 className="text-gray-600 text-center font-semibold">Eres nuevo?</h4>
                                <Link href={'/registrar'} className="bg-indigo-900 rounded-full
                                py-2 px-10
                                text-white font-semibold text-center
                                hover:scale-110 transition-all"
                                >Registrarse</Link>
                            </div>
                        </div>

                        <div className="border  border-gray-300 rounded-lg shadow p-6">
                            <div className="flex flex-col gap-3">
                                <h4 className="text-gray-600 text-center font-semibold">Administrador</h4>
                                <Link href={'/admin'} className="bg-indigo-900 rounded-full
                                py-2 px-10
                                text-white font-semibold text-center
                                hover:scale-110 transition-all"
                                >Entrar</Link>
                            </div>
                        </div>                        

                    </div>
                    
                </div>
            </div>
        </div>
    );
}
/*
<div className="bg-white p-6 rounded-lg shadow mt-5 flex flex-col gap-6">
                    <h4 className="text-indigo-950 font-bold text-2xl text-center">Información de versión</h4>
                    <p> Esta es la primera versión de la aplicación web, por lo que contara con funciones limitadas.</p>
                    <h5 className="font-semibold">Funcionalidades</h5>
                    <ul>
                        <li>Tareas: Se pueden agregar tareas en la pagina de home, y tambien se pueden marcar como completadas.
                        </li>
                        <li>Eventos: Se pueden agregar eventos en la pagina de home y se pueden visualizar en dos formas, semanal y mensual.
                        </li>
                    </ul>
                </div>
*/