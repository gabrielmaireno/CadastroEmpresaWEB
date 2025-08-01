"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login as apiLogin } from "@/lib/api"; // renomeado para evitar conflito

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    try {
      await apiLogin(email, senha);
      router.push("/empresa/listar");
    } catch {
      setErro("Email ou senha inválidos");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Entrar
        </button>
      </form>
      {erro && <p className="text-red-600 mt-2 text-center">{erro}</p>}
    </div>
  );
}
