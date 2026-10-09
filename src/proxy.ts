import { NextResponse, type NextRequest } from "next/server";
import { cisCountries, cisLanguages, defaultLocale, enabledLocales, isEnabled, locales, type Locale } from "@/i18n/config";

const prefer = (locale: Locale): Locale => (isEnabled(locale) ? locale : defaultLocale);

function pickLocale(request: NextRequest): Locale {
  const saved = request.cookies.get("lang")?.value;
  if (saved && isEnabled(saved)) return saved;

  const country =
    request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry");
  if (country && country !== "XX") {
    return prefer(cisCountries.includes(country.toUpperCase()) ? "ru" : "en");
  }

  const primary = request.headers
    .get("accept-language")
    ?.split(",")[0]
    ?.trim()
    .slice(0, 2)
    .toLowerCase();
  if (primary && !cisLanguages.includes(primary)) return prefer("en");

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const prefix = locales.find((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (prefix && enabledLocales.includes(prefix)) return;

  const rest = prefix ? pathname.slice(prefix.length + 1) : pathname === "/" ? "" : pathname;
  request.nextUrl.pathname = `/${pickLocale(request)}${rest}`;
  return NextResponse.redirect(request.nextUrl, 307);
}

export const config = {
  matcher: ["/((?!_next|api|fonts|images|.*\..*).*)"],
};
