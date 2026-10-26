/**
 * One landscape per page: a pixel-watercolor png, 1920 px wide, that the
 * hero pixelates further on a canvas at whatever level the viewer picks. The
 * commons photos are fetched by scripts/fetch-photos.py; montroyal is my own;
 * scripts/landscapes.py paints and quantizes both kinds.
 *
 * Accents are hand-picked pigments from each painting, so every page's links
 * and washes are tinted by its own landscape.
 */
export type Landscape = {
  key: string;
  place: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position, so the focal point survives narrow screens. */
  focus: string;
  pigment: string;
  accent: string;
  /** Where the photo came from. Left out when it's one of mine. */
  credit?: { artist: string; license: string; licenseUrl?: string; page: string };
};

export const landscapes = {
  rainier: {
    key: "rainier",
    place: "paradise, mt. rainier",
    alt: "A gravel trail through pink wildflowers at Paradise, with the Tatoosh range behind, painted in pixels",
    width: 1920,
    height: 872,
    focus: "55% 30%",
    pigment: "rose madder",
    accent: "#b25e7e",
    credit: {
      artist: "Mount Rainier NPS",
      license: "public domain",
      page: "https://commons.wikimedia.org/wiki/File:Paradise_Wildflowers_(53046019806).jpg",
    },
  },
  kerry: {
    key: "kerry",
    place: "seattle from kerry park",
    alt: "The Seattle skyline and Space Needle from Kerry Park, painted in pixels",
    width: 1920,
    height: 872,
    focus: "20% 50%",
    pigment: "lavender",
    accent: "#7a81b6",
    credit: {
      artist: "Ron Clausen",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Seattle_Space_Needle_UW_Kerry_Park.jpg",
    },
  },
  everest: {
    key: "everest",
    place: "everest from kala patthar",
    alt: "Everest and Nuptse under a cobalt sky, painted in pixels",
    width: 1920,
    height: 872,
    focus: "50% 50%",
    pigment: "cobalt",
    accent: "#3a6fa6",
    credit: {
      artist: "Vyacheslav Argenberg",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Mount_Everest,_Himalayas.jpg",
    },
  },
  diablo: {
    key: "diablo",
    place: "diablo lake, north cascades",
    alt: "The teal water of Diablo Lake between forested ridges, painted in pixels",
    width: 1920,
    height: 872,
    focus: "50% 60%",
    pigment: "viridian",
    accent: "#3f8f98",
    credit: {
      artist: "Ron Clausen",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Davis_Peak_seen_from_Diablo_Lake_Overlook_in_the_North_Cascades.jpg",
    },
  },
  palouse: {
    key: "palouse",
    place: "the palouse from steptoe butte",
    alt: "Rolling wheat hills of the Palouse at sunrise, painted in pixels",
    width: 1920,
    height: 872,
    focus: "50% 70%",
    pigment: "yellow ochre",
    accent: "#b08a3a",
    credit: {
      artist: "Caleb Riston",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      page: "https://commons.wikimedia.org/wiki/File:PalouseFromSteptoeButteMay2023-1.jpg",
    },
  },
  gorge: {
    key: "gorge",
    place: "cascadilla gorge, ithaca",
    alt: "A trail through the green of Cascadilla Gorge, painted in pixels",
    width: 1920,
    height: 872,
    focus: "50% 50%",
    pigment: "sap green",
    accent: "#5f8f45",
    credit: {
      artist: "P. Hughes",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Ithaca_-_Cascadilla_Gorge_Trail.jpg",
    },
  },
  pike: {
    key: "pike",
    place: "pike place market, seattle",
    alt: "The Public Market neon sign at Pike Place, painted in pixels",
    width: 1920,
    height: 1280,
    focus: "50% 30%",
    pigment: "alizarin",
    accent: "#9c3b47",
    credit: {
      artist: "Madi Fawcett",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      page: "https://commons.wikimedia.org/wiki/File:Public_Market_sign_at_Pike_Place_Market,_2017.jpg",
    },
  },
  montroyal: {
    key: "montroyal",
    place: "mont royal, montréal",
    alt: "The Montréal skyline from Mont Royal over red autumn leaves, painted in pixels",
    width: 1920,
    height: 872,
    focus: "50% 55%",
    pigment: "rust",
    accent: "#a24a3e",
  },
} satisfies Record<string, Landscape>;

export type LandscapeKey = keyof typeof landscapes;

export const landscapeList: Landscape[] = Object.values(landscapes);

export const pxSrc = (l: Landscape) => `/land/${l.key}.png`;
