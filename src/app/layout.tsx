"use client";

import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head></head>
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="font-bold text-xl">Cadastro Empresas</h1>
            <nav className="flex gap-4 items-center">
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/registrar" className="hover:underline">
                Registrar
              </Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto mt-8 px-4 flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}