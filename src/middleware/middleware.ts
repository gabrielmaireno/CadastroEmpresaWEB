import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value; // pega token do cookie

  // Se a rota começar com /empresa e não tiver token -> redireciona para login
  if (req.nextUrl.pathname.startsWith("/empresa") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/empresa/:path*"], // middleware roda em todas as rotas dentro de /empresa
};
