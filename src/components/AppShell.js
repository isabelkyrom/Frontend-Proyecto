'use client'
import Navbar from "./NavBar";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar /> 
      <main>
        {children}
      </main>
    </div>
  );
}