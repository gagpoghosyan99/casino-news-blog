import { NextResponse } from "next/server";
import { getCasinoBySlug } from "@/data/casinos";
import { buildReferralRedirectUrl } from "@/lib/referral";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

const GO_ROBOTS_HEADER = "noindex, nofollow";

function goRedirectResponse(url: URL | string, status = 307): NextResponse {
  const response = NextResponse.redirect(url, status);
  response.headers.set("X-Robots-Tag", GO_ROBOTS_HEADER);
  return response;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const casino = getCasinoBySlug(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!casino) {
    return goRedirectResponse(new URL("/casinos", siteUrl));
  }

  const redirectUrl = buildReferralRedirectUrl(casino);

  if (redirectUrl.startsWith("http")) {
    return goRedirectResponse(redirectUrl);
  }

  return goRedirectResponse(new URL(redirectUrl, siteUrl));
}
