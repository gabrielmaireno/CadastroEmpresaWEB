"use client"; // Adicione esta linha no topo para usar hooks do React

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página de login assim que o componente é montado
    router.push("/login");
  }, [router]);

  // Retorna null ou um componente de loading muito breve
  return null;
}
