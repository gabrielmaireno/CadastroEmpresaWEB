"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registrar } from "@/lib/api";
import { z } from "zod";

const schema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function RegistrarPage() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parse = schema.safeParse(form);

    if (!parse.success) {
      setErro(parse.error.issues[0].message);
      return;
    }

    try {
      await registrar(form.nome, form.email, form.senha);
      router.push("/login");
    } catch {
      setErro("Erro ao registrar");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Criar Conta</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="nome"
          placeholder="Nome"
          onChange={handleChange}
          value={form.nome}
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          className="w-full p-2 border rounded"
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          onChange={handleChange}
          value={form.senha}
          className="w-full p-2 border rounded"
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Registrar
        </button>
      </form>
      {erro && <p className="text-red-600 mt-2 text-center">{erro}</p>}
    </div>
  );
}
