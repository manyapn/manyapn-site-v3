const USERNAME = "manyapn";

/** Letterboxd rejects the default runtime user-agent, so send a real one. */
const UA = "Mozilla/5.0 (compatible; manyapn.com/1.0)";

export const letterboxdUrl = `https://letterboxd.com/${USERNAME}/`;

export type LetterboxdData = {
  latestFilm: string;
  filmCount: number | null;
};

/** Most recently logged film, from the public RSS feed. */
async function fetchLatestFilm(fallback: string): Promise<string> {
  try {
    const res = await fetch(`https://letterboxd.com/${USERNAME}/rss/`, {
      headers: { "User-Agent": UA },
    });
    if (!res.ok) return fallback;
    const xml = await res.text();
    // <letterboxd:filmTitle> gives the plain title, no year or rating appended
    const match = xml.match(/<letterboxd:filmTitle>(.*?)<\/letterboxd:filmTitle>/);
    return match?.[1]?.trim() ?? fallback;
  } catch {
    return fallback;
  }
}

/** Total films watched, scraped from the profile stats block. */
async function fetchFilmCount(fallback: number | null): Promise<number | null> {
  try {
    const res = await fetch(letterboxdUrl, {
      headers: { "User-Agent": UA },
    });
    if (!res.ok) return fallback;
    const html = await res.text();
    const match = html.match(
      new RegExp(`href="/${USERNAME}/films/"[^>]*>\\s*<span class="value">([\\d,]+)</span>`)
    );
    if (!match) return fallback;
    const count = Number(match[1].replace(/,/g, ""));
    return Number.isFinite(count) ? count : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Fetched at build time. The site is a static export, so these values are
 * baked into the HTML. The daily GitHub Actions rebuild is what refreshes them.
 *
 * Don't add `cache: "no-store"` to the fetches above. It marks them dynamic,
 * which `output: "export"` rejects, and the thrown error gets swallowed by the
 * catch blocks so the page silently ships stale fallback data instead.
 * CI starts with an empty .next/cache each run, so the data is fresh anyway.
 */
export async function getLetterboxd(fallbacks: {
  film: string;
  filmCount: number | null;
}): Promise<LetterboxdData> {
  const [latestFilm, filmCount] = await Promise.all([
    fetchLatestFilm(fallbacks.film),
    fetchFilmCount(fallbacks.filmCount),
  ]);
  return { latestFilm, filmCount };
}
