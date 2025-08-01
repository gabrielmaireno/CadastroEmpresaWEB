"use client";

import { useState } from "react";
import { buscarEmpresaReceita, salvarEmpresa } from "@/lib/api";
import Link from "next/link";

export default function CadastrarEmpresa() {
  const [cnpj, setCnpj] = useState("");
  const [empresa, setEmpresa] = useState<any>(null);
  const [mensagem, setMensagem] = useState("");

  const handleBuscar = async () => {
    try {
      const dados = await buscarEmpresaReceita(cnpj);
      setEmpresa(dados);
      setMensagem("");
    } catch {
      setMensagem("Erro ao buscar empresa");
    }
  };

  const handleSalvar = async () => {
    try {
      await salvarEmpresa(empresa);
      setMensagem("Empresa salva com sucesso!");
    } catch {
      setMensagem("Erro ao salvar empresa");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Cadastrar Empresa</h1>
        <Link
          href="/empresa/listar"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          Ver Empresas Cadastradas
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          className="flex-1 border rounded p-2"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="Digite o CNPJ"
        />
        <button
          onClick={handleBuscar}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {empresa && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Empresa encontrada:</h2>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-64">
            {JSON.stringify(empresa, null, 2)}
          </pre>
          <button
            onClick={handleSalvar}
            className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Salvar Empresa
          </button>
        </div>
      )}

      {mensagem && (
        <p className="text-sm text-center mt-4 text-blue-600">{mensagem}</p>
      )}
    </div>
  );
}
