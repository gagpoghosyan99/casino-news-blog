import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "zb_session";

/** Strip query strings from /contact; require session cookie for /account. */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/contact" && search) {
    return NextResponse.redirect(new URL("/contact", request.url), 308);
  }

  if (pathname === "/account" || pathname.startsWith("/account/")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      const login = new URL("/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/contact", "/account", "/account/:path*"],
};
