'use client';
import { useState, useEffect } from 'react';
import { clearToken, getToken } from '@/lib/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';


function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link 
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-slate-200 text-slate-900' : 'text-white font-semibold hover:bg-slate-100 hover:text-slate-900'}`}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setMounted(true);
    setToken(getToken()); // Solo se ejecuta en cliente
  }, []);
  
  const handleLogout = () => {
    clearToken();
    router.replace('/login');
    router.refresh();
  };

  return (
    <header className='bg-indigo-900 shadow'>
      <div className='container mx-auto flex items-center justify-between py-4 px-4'>
        <Link href="/home" className='text-xl font-bold text-white'>Gestión Personal</Link>
        <nav className='flex items-center gap-2'>
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/tareas">Tareas</NavLink>
          <NavLink href="/eventos">Eventos</NavLink>
          <NavLink href="/posts">Posts</NavLink>

          {mounted && ( // Renderiza solo después de montar
            token ? (
              <>
                <NavLink href="/">Administración</NavLink>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink href="/login">Login</NavLink>
            )
          )}

        </nav>
      </div>
    </header>
  );
}