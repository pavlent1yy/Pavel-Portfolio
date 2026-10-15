import { site } from "@/config/site";

export const revalidate = 60;

const AWAY_MINUTES = 20;

type Marketplace = (typeof site.marketplaces)[number];

function minutesAgo(text: string | undefined) {
  if (text && /сек|только что/.test(text)) return 0;
  const match = text?.match(/(\d+)?\s*минут/);
  return match ? Number(match[1] ?? 1) : Infinity;
}

const checks: Partial<Record<Marketplace, (html: string) => boolean>> = {
  kwork: (html) =>
    html.includes('"isOnline":true') ||
    minutesAgo(html.match(/"lastOnlineAsString":"([^"]*)"/)?.[1]) <= AWAY_MINUTES,
  fl: (html) =>
    html.includes("profile_header--online") || minutesAgo(html.match(/заходила?\s+([^)]*)назад/)?.[1]) <= AWAY_MINUTES,
};

async function isOnline(id: Marketplace) {
  const check = checks[id];
  if (!check) return false;
  try {
    const response = await fetch(site.contacts[id].url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36" },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 60 },
    });
    return response.ok && check(await response.text());
  } catch {
    return false;
  }
}

export async function GET() {
  const online = await Promise.all(site.marketplaces.map(async (id) => ((await isOnline(id)) ? id : null)));
  return Response.json({ online: online.filter(Boolean) });
}
