"use client";

import { useEffect, useState } from "react";
import { listarEmpresas } from "@/lib/api";
import Link from "next/link";

export default function MinhasEmpresasPage() {
  const [empresas, setEmpresas] = useState<any[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const data = await listarEmpresas();
        setEmpresas(data);
      } catch {
        setErro("Erro ao buscar suas empresas");
      }
    }
    carregar();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 border rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Minhas Empresas</h1>
        <Link
          href="/empresa/cadastrar"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          Cadastrar Nova Empresa
        </Link>
      </div>

      {erro && <p className="text-red-600 mb-4">{erro}</p>}

      {empresas.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">
            Você ainda não cadastrou nenhuma empresa.
          </p>
          <Link
            href="/empresa/cadastrar"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Cadastrar Primeira Empresa
          </Link>
        </div>
      ) : (
        <div className="space-y-6 max-h-[700px] overflow-y-auto">
          {empresas.map((empresa, index) => (
            <div
              key={index}
              className="border p-4 rounded-md bg-gray-50 shadow-sm text-sm"
            >
              <h2 className="font-semibold text-lg text-blue-700 mb-2">
                {empresa.nomeFantasia || empresa.nomeEmpresa}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <p>
                  <span className="font-semibold">CNPJ:</span> {empresa.cnpj}
                </p>
                <p>
                  <span className="font-semibold">Situação:</span>{" "}
                  {empresa.situacao}
                </p>
                <p>
                  <span className="font-semibold">Abertura:</span>{" "}
                  {empresa.abertura}
                </p>
                <p>
                  <span className="font-semibold">Tipo:</span> {empresa.tipo}
                </p>
                <p>
                  <span className="font-semibold">Natureza Política:</span>{" "}
                  {empresa.naturezaPolitica}
                </p>
                <p>
                  <span className="font-semibold">Atividade Principal:</span>{" "}
                  {empresa.atividadePrincipal}
                </p>
                <p>
                  <span className="font-semibold">Logradouro:</span>{" "}
                  {empresa.logradouro}
                </p>
                <p>
                  <span className="font-semibold">Número:</span>{" "}
                  {empresa.numero}
                </p>
                <p>
                  <span className="font-semibold">Complemento:</span>{" "}
                  {empresa.complemento || "-"}
                </p>
                <p>
                  <span className="font-semibold">Bairro:</span>{" "}
                  {empresa.bairro}
                </p>
                <p>
                  <span className="font-semibold">Município:</span>{" "}
                  {empresa.municipio}
                </p>
                <p>
                  <span className="font-semibold">UF:</span> {empresa.uf}
                </p>
                <p>
                  <span className="font-semibold">CEP:</span> {empresa.cep}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
