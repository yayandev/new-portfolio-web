import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["id", "en"] as const;
const DEFAULT_LOCALE = "id";

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  const acceptLang = request.headers.get("Accept-Language") || "";
  const preferred = acceptLang.split(",")[0]?.split("-")[0]?.toLowerCase();
  if (preferred && LOCALES.includes(preferred as any)) {
    return preferred;
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.searchParams.toString();

  const response = NextResponse.redirect(newUrl);
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
