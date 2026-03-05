import { Geist, Geist_Mono } from "next/font/google";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "./globals.css";
import AppShell from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gestión Personal",
  description: "Aplicación web para poder gestionar tareas y eventos v1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <AppShell>
        {children}
      </AppShell>
      </body>
    </html>
  );
}
