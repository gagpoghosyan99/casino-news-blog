import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Strip query strings from /contact so referral fallbacks do not create indexable alternates. */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/contact" && search) {
    return NextResponse.redirect(new URL("/contact", request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/contact"],
};
