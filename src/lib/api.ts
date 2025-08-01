export async function login(email: string, senha: string) {
  const res = await fetch("https://localhost:7201/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!res.ok) throw new Error("Erro no login");
  return res.json();
}

export async function registrar(nome: string, email: string, senha: string) {
  const res = await fetch("https://localhost:7201/registrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  });

  if (!res.ok) throw new Error("Erro no registro");
  return res.json();
}

export async function buscarEmpresaReceita(cnpj: string) {
  const res = await fetch(`https://localhost:7201/receitaws/cnpj/${cnpj}`, {
    method: "GET",
  });

  return res.json();
}

export async function salvarEmpresa(empresa: any) {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];

  const res = await fetch("https://localhost:7201/empresas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(empresa),
  });

  return res.json();
}

export async function listarEmpresas() {
  const res = await fetch(`https://localhost:7201/minhas-empresas`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Erro ao buscar empresas");
  return res.json();
}
