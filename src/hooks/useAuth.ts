"use client";
import { useEffect, useState } from "react";

export function useAuth() {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const sessionStr = localStorage.getItem("auth_session");
    if (!sessionStr) {
      setLogado(false);
      return;
    }

    try {
      const session = JSON.parse(sessionStr);
      if (session.logado && session.expiraEm > Date.now()) {
        setLogado(true);
      } else {
        setLogado(false);
        localStorage.removeItem("auth_session"); // sessão expirada
      }
    } catch {
      setLogado(false);
      localStorage.removeItem("auth_session"); // dados inválidos
    }
  }, []);

  return { logado };
}
