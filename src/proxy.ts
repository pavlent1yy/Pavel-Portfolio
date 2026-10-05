import { NextResponse, type NextRequest } from "next/server";
import { cisCountries, cisLanguages, defaultLocale, hasLocale, locales, type Locale } from "@/i18n/config";

function pickLocale(request: NextRequest): Locale {
  const saved = request.cookies.get("lang")?.value;
  if (saved && hasLocale(saved)) return saved;

  const country =
    request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry");
  if (country && country !== "XX") {
    return cisCountries.includes(country.toUpperCase()) ? "ru" : "en";
  }

  const primary = request.headers
    .get("accept-language")
    ?.split(",")[0]
    ?.trim()
    .slice(0, 2)
    .toLowerCase();
  if (primary && !cisLanguages.includes(primary)) return "en";

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasPrefix) return;

  request.nextUrl.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|fonts|images|.*\\..*).*)"],
};
