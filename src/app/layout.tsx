"use client";

import "./globals.css";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logado } = useAuth();

  function logout() {
    localStorage.removeItem("auth_session");
    document.cookie = "access_token=; Max-Age=0; path=/;";
    window.location.href = "/login";
  }

  if (logado === null) {
    return (
      <html>
        <body></body>
      </html>
    );
  }

  return (
    <html lang="pt-br">
      <head></head>
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="font-bold text-xl">Cadastro Empresas</h1>
            <nav className="flex gap-4 items-center">
              {!logado && (
                <>
                  <Link href="/login" className="hover:underline">
                    Login
                  </Link>
                  <Link href="/registrar" className="hover:underline">
                    Registrar
                  </Link>
                </>
              )}

              {logado && (
                <>
                  <Link href="/empresa/cadastrar" className="hover:underline">
                    Cadastrar Empresa
                  </Link>
                  <Link href="/empresa/listar" className="hover:underline">
                    Listar Empresas
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white"
                  >
                    Sair
                  </button>
                </>
              )}
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
