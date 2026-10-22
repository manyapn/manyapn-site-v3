const USERNAME = "manyapn";

const UA = "Mozilla/5.0 (compatible; manyapn.com/1.0)";

export type LatestPush = {
  /** Full name, e.g. "manyapn/me.json". */
  repo: string;
  url: string;
};

/**
 * Most recently pushed-to public repo, from the public events API.
 *
 * Only public activity shows up here, and the feed covers roughly the last
 * 90 days. Returns null if there's nothing to show or the request fails, and
 * the caller hides the line rather than printing something stale.
 *
 * Note: PushEvent payloads don't reliably include `size`, so don't try to
 * derive a commit count from this feed.
 *
 * Fetched at build time. Do not add `cache: "no-store"` — it marks the fetch
 * dynamic, which `output: "export"` rejects.
 */
export async function getLatestPush(): Promise<LatestPush | null> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/events/public?per_page=100`,
      {
        headers: {
          "User-Agent": UA,
          Accept: "application/vnd.github+json",
          // CI passes the workflow token to dodge the 60/hr anonymous limit.
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    if (!res.ok) return null;

    const events: unknown = await res.json();
    if (!Array.isArray(events)) return null;

    const push = events.find(
      (e) => e?.type === "PushEvent" && typeof e?.repo?.name === "string"
    );
    if (!push) return null;

    return {
      repo: push.repo.name,
      url: `https://github.com/${push.repo.name}`,
    };
  } catch {
    return null;
  }
}
