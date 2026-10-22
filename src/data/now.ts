export type NowData = {
  lastUpdated: string;
  reading: string;
  beliUrl: string;
  /** Used only if Letterboxd is unreachable at build time. */
  fallbackMovie: string;
  fallbackFilmCount: number;
};

export const nowData: NowData = {
  lastUpdated: "august 2026",
  reading: "the alignment problem, brian christian",
  beliUrl: "https://beliapp.co/app/manyapn",
  fallbackMovie: "Obsession",
  fallbackFilmCount: 168,
};
