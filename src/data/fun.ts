/**
 * Places for /fun. Every photo lives in public/fun as <id>.png (pixels) and
 * <id>.jpg (the real photo, shown on click), both written by
 * scripts/fun-photos.py, which also writes sizes.json with the pixel sizes.
 *
 * To add a trip: put the photos in the drive folder, add them under a place
 * key in PICKS in the script, run it, then add the place below. A place with
 * photos in two or more cities gets city tabs (then every photo needs a city). `note` is for your own words
 * and is left out until there's something to say.
 */
export type FunPhoto = { id: string; caption?: string; city?: string };

/** A city inside a country: its own pin on the map and its own tab. */
export type FunCity = { name: string; lat: number; lon: number; when?: string };

export type Region = "west" | "east" | "northsouth" | "europe" | "asia";

/** Listed under the map, in this order, each roughly north to south / west to east. */
export const regions: { key: Region; label: string }[] = [
  { key: "west", label: "west coast" },
  { key: "east", label: "east coast" },
  { key: "northsouth", label: "north america" },
  { key: "europe", label: "europe" },
  { key: "asia", label: "asia" },
];

export type FunPlace = {
  key: string;
  name: string;
  region: Region;
  /** Where the pin goes when there are no cities. */
  lat: number;
  lon: number;
  /** Shown on the place card: a month, or "home". */
  when?: string;
  note?: string;
  /** Countries and states list their cities; each gets a pin, and every photo names one. */
  cities?: FunCity[];
  photos: FunPhoto[];
};

export const funPlaces: FunPlace[] = [
  // west coast
  {
    key: "washington",
    name: "washington",
    region: "west",
    lat: 47.61,
    lon: -122.33,
    when: "home",
    cities: [
      { name: "seattle", lat: 47.61, lon: -122.33 },
      { name: "snoqualmie", lat: 47.54, lon: -121.84, when: "jun '26" },
    ],
    photos: [
      { id: "seattle-1", city: "seattle", caption: "gas works park" },
      { id: "seattle-2", city: "seattle", caption: "the waterfront at night" },
      { id: "seattle-3", city: "seattle", caption: "capitol hill" },
      { id: "seattle-4", city: "seattle", caption: "gas works park" },
      { id: "seattle-6", city: "seattle" },
      { id: "seattle-7", city: "seattle" },
      { id: "seattle-8", city: "seattle" },
      { id: "seattle-5", city: "snoqualmie", caption: "snoqualmie falls" },
    ],
  },
  {
    key: "oregon",
    name: "oregon",
    region: "west",
    lat: 45.3,
    lon: -123.3,
    when: "may '25",
    cities: [
      { name: "the coast", lat: 45.0, lon: -124.0 },
      { name: "portland", lat: 45.52, lon: -122.68 },
    ],
    photos: [
      { id: "oregon-1", city: "the coast" },
      { id: "oregon-2", city: "the coast" },
      { id: "oregon-3", city: "the coast", caption: "sunset" },
      { id: "oregon-4", city: "the coast" },
      { id: "oregon-5", city: "the coast" },
      { id: "oregon-6", city: "the coast", caption: "lincoln city" },
      { id: "oregon-7", city: "portland", caption: "powell's" },
    ],
  },
  {
    key: "california",
    name: "california",
    region: "west",
    lat: 36.5,
    lon: -120.5,
    when: "apr '24 · jul '26",
    cities: [
      { name: "san francisco", lat: 37.77, lon: -122.42 },
      { name: "los angeles", lat: 34.05, lon: -118.24 },
    ],
    photos: [
      { id: "california-1", city: "san francisco", caption: "baker beach" },
      { id: "california-2", city: "san francisco", caption: "chinatown" },
      { id: "california-3", city: "los angeles", caption: "santa monica" },
      { id: "california-4", city: "los angeles", caption: "pixar pier" },
      { id: "california-5", city: "los angeles", caption: "california adventure" },
    ],
  },
  {
    key: "hawaii",
    name: "hawaii",
    region: "west",
    lat: 20.8,
    lon: -156.3,
    photos: [{ id: "hawaii-1" }],
  },
  // east coast
  {
    key: "new-york",
    name: "new york",
    region: "east",
    lat: 42.44,
    lon: -76.5,
    cities: [
      { name: "ithaca", lat: 42.44, lon: -76.5, when: "school" },
      { name: "watkins glen", lat: 42.37, lon: -76.88, when: "oct '26" },
      { name: "new york city", lat: 40.71, lon: -74.01, when: "oct '25 · dec '22" },
    ],
    photos: [
      { id: "ithaca-1", city: "ithaca", caption: "the arts quad in january" },
      { id: "ithaca-2", city: "ithaca", caption: "libe slope, golden hour" },
      { id: "ithaca-3", city: "ithaca", caption: "libe slope" },
      { id: "ithaca-4", city: "ithaca", caption: "out on the lake" },
      { id: "ithaca-5", city: "ithaca", caption: "campus" },
      { id: "ithaca-6", city: "ithaca", caption: "sunset from the slope" },
      { id: "ithaca-8", city: "ithaca" },
      { id: "ithaca-9", city: "ithaca", caption: "somewhere upstate" },
      { id: "ithaca-7", city: "watkins glen", caption: "the gorge trail" },
      { id: "nyc-1", city: "new york city", caption: "radio city" },
      { id: "nyc-2", city: "new york city", caption: "liberty island" },
      { id: "nyc-3", city: "new york city" },
    ],
  },
  {
    key: "pennsylvania",
    name: "pennsylvania",
    region: "east",
    lat: 40.57,
    lon: -75.56,
    when: "feb '26",
    photos: [{ id: "pennsylvania-1", caption: "somewhere in pennsylvania" }],
  },
  {
    key: "north-carolina",
    name: "north carolina",
    region: "east",
    lat: 36.0,
    lon: -78.94,
    when: "apr '25",
    cities: [{ name: "durham", lat: 36.0, lon: -78.94 }],
    photos: [{ id: "durham-1", city: "durham", caption: "duke chapel" }],
  },
  {
    key: "tennessee",
    name: "tennessee",
    region: "east",
    lat: 36.16,
    lon: -86.78,
    when: "jul '24",
    cities: [{ name: "nashville", lat: 36.16, lon: -86.78 }],
    photos: [{ id: "nashville-1", city: "nashville", caption: "broadway" }],
  },
  {
    key: "georgia",
    name: "georgia",
    region: "east",
    lat: 33.76,
    lon: -84.39,
    when: "apr '22",
    cities: [{ name: "atlanta", lat: 33.76, lon: -84.39 }],
    photos: [{ id: "atlanta-1", city: "atlanta", caption: "the georgia aquarium" }],
  },
  {
    key: "florida",
    name: "florida",
    region: "east",
    lat: 27.97,
    lon: -82.8,
    photos: [{ id: "florida-1", caption: "the pier" }],
  },
  // canada & mexico
  {
    key: "canada",
    name: "canada",
    region: "northsouth",
    lat: 53.5,
    lon: -98.0,
    when: "dec '25 · oct '26",
    cities: [
      { name: "whistler", lat: 50.12, lon: -122.98 },
      { name: "montréal", lat: 45.5, lon: -73.57 },
    ],
    photos: [
      { id: "canada-1", city: "whistler" },
      { id: "canada-2", city: "whistler", caption: "blue hour" },
      { id: "canada-3", city: "montréal", caption: "from mont royal" },
      { id: "canada-4", city: "montréal", caption: "notre-dame basilica" },
      { id: "canada-5", city: "montréal", caption: "old montréal" },
      { id: "canada-6", city: "montréal", caption: "old montréal" },
      { id: "canada-7", city: "montréal" },
      { id: "canada-8", city: "montréal" },
      { id: "canada-9", city: "montréal" },
      { id: "canada-10", city: "montréal" },
    ],
  },
  {
    key: "mexico",
    name: "mexico",
    region: "northsouth",
    lat: 21.11,
    lon: -86.76,
    when: "dec '23",
    cities: [
      { name: "cancún", lat: 21.16, lon: -86.85 },
    ],
    photos: [
      { id: "cancun-1", city: "cancún", caption: "sunrise" },
      { id: "cancun-2", city: "cancún" },
    ],
  },
  // europe
  {
    key: "england",
    name: "england",
    region: "europe",
    lat: 51.51,
    lon: -0.13,
    when: "jun '24",
    cities: [
      { name: "london", lat: 51.51, lon: -0.13 },
    ],
    photos: [
      { id: "london-1", city: "london", caption: "tower bridge" },
      { id: "london-2", city: "london", caption: "st paul's" },
      { id: "london-3", city: "london", caption: "westminster abbey" },
      { id: "london-4", city: "london", caption: "the lady chapel" },
      { id: "london-5", city: "london", caption: "the round pond" },
    ],
  },
  {
    key: "france",
    name: "france",
    region: "europe",
    lat: 48.86,
    lon: 2.35,
    when: "jun '24",
    cities: [
      { name: "paris", lat: 48.86, lon: 2.35 },
      { name: "versailles", lat: 48.8, lon: 2.13 },
    ],
    photos: [
      { id: "paris-1", city: "paris", caption: "the eiffel tower" },
      { id: "paris-2", city: "paris", caption: "from the top" },
      { id: "paris-3", city: "paris", caption: "sainte-chapelle" },
      { id: "paris-4", city: "paris", caption: "winged victory, the louvre" },
      { id: "paris-5", city: "paris", caption: "breakfast at carette" },
      { id: "paris-6", city: "versailles" },
    ],
  },
  {
    key: "switzerland",
    name: "switzerland",
    region: "europe",
    lat: 46.62,
    lon: 8.04,
    when: "jun '24",
    cities: [
      { name: "the alps", lat: 46.6, lon: 8.0 },
      { name: "zürich", lat: 47.37, lon: 8.54 },
    ],
    photos: [
      { id: "switzerland-1", city: "the alps", caption: "jungfraujoch" },
      { id: "switzerland-2", city: "the alps", caption: "first, grindelwald" },
      { id: "switzerland-3", city: "zürich" },
    ],
  },
  {
    key: "italy",
    name: "italy",
    region: "europe",
    lat: 45.7,
    lon: 10.6,
    when: "aug '26",
    cities: [
      { name: "milan", lat: 45.46, lon: 9.19 },
      { name: "lake como", lat: 45.98, lon: 9.26 },
      { name: "the dolomites", lat: 46.6, lon: 11.7 },
      { name: "venice", lat: 45.44, lon: 12.33 },
    ],
    photos: [
      { id: "italy-1", city: "milan", caption: "on the roof of the duomo" },
      { id: "italy-17", city: "milan", caption: "leonardo's flying machine" },
      { id: "italy-18", city: "milan", caption: "breakfast" },
      { id: "italy-2", city: "lake como", caption: "varenna" },
      { id: "italy-3", city: "lake como", caption: "villa melzi, bellagio" },
      { id: "italy-4", city: "lake como" },
      { id: "italy-5", city: "lake como", caption: "varenna from the water" },
      { id: "italy-6", city: "lake como", caption: "bellagio" },
      { id: "italy-7", city: "lake como", caption: "gelato" },
      { id: "italy-8", city: "the dolomites", caption: "seceda" },
      { id: "italy-9", city: "the dolomites", caption: "seceda" },
      { id: "italy-10", city: "the dolomites", caption: "bolzano" },
      { id: "italy-11", city: "the dolomites" },
      { id: "italy-12", city: "venice", caption: "sunset" },
      { id: "italy-13", city: "venice" },
      { id: "italy-14", city: "venice", caption: "the horses of st mark's" },
      { id: "italy-15", city: "venice", caption: "the doge's palace" },
      { id: "italy-16", city: "venice", caption: "the grand canal" },
    ],
  },
  {
    key: "spain",
    name: "spain",
    region: "europe",
    lat: 41.39,
    lon: 2.17,
    when: "jul '24",
    cities: [
      { name: "barcelona", lat: 41.39, lon: 2.17 },
    ],
    photos: [
      { id: "barcelona-1", city: "barcelona", caption: "sagrada família" },
      { id: "barcelona-2", city: "barcelona", caption: "inside" },
      { id: "barcelona-3", city: "barcelona", caption: "parc de la ciutadella" },
    ],
  },
  // asia
  {
    key: "india",
    name: "india",
    region: "asia",
    lat: 12.97,
    lon: 77.59,
    when: "jul '25",
    cities: [
      { name: "bengaluru", lat: 12.97, lon: 77.59 },
    ],
    photos: [
      { id: "india-1", city: "bengaluru", caption: "the flower market" },
      { id: "india-2", city: "bengaluru", caption: "gandhi bazaar" },
      { id: "india-3", city: "bengaluru" },
    ],
  },
];

/** Every pin on the map: one per city, or one for the place itself. */
export type Pin = { place: FunPlace; city?: string; lat: number; lon: number };
export const pins: Pin[] = funPlaces.flatMap((place) =>
  place.cities?.length ? place.cities.map((c) => ({ place, city: c.name, lat: c.lat, lon: c.lon })) : [{ place, lat: place.lat, lon: place.lon }]
);

export const funPhotoCount = funPlaces.reduce((n, p) => n + p.photos.length, 0);
