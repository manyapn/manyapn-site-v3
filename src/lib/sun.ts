/**
 * When the sun sets at a given spot on a given day, from the sunrise equation
 * (the NOAA form). No network, accurate to a few minutes, which is all the
 * sunset wash needs.
 */
const rad = Math.PI / 180;
const J2000 = 2451545;
const MS_PER_DAY = 86400000;
/** Unix epoch as a julian day. */
const JULIAN_EPOCH = 2440587.5;

export function sunset(date: Date, lat: number, lon: number): Date {
  const julian = date.getTime() / MS_PER_DAY + JULIAN_EPOCH;
  const n = Math.ceil(julian - J2000 + 0.0008);
  const meanSolar = n - lon / 360;
  const anomaly = (357.5291 + 0.98560028 * meanSolar) % 360;
  const center =
    1.9148 * Math.sin(anomaly * rad) + 0.02 * Math.sin(2 * anomaly * rad) + 0.0003 * Math.sin(3 * anomaly * rad);
  const longitude = (anomaly + center + 180 + 102.9372) % 360;
  const transit = J2000 + meanSolar + 0.0053 * Math.sin(anomaly * rad) - 0.0069 * Math.sin(2 * longitude * rad);
  const declination = Math.asin(Math.sin(longitude * rad) * Math.sin(23.4397 * rad));
  const hourAngle = Math.acos(
    (Math.sin(-0.833 * rad) - Math.sin(lat * rad) * Math.sin(declination)) / (Math.cos(lat * rad) * Math.cos(declination)),
  );
  const set = transit + hourAngle / (2 * Math.PI);
  return new Date((set - JULIAN_EPOCH) * MS_PER_DAY);
}

/** Ithaca, where the site lives during the school year. */
export const HOME = { lat: 42.444, lon: -76.502 };

/** The golden stretch: a bit before the sun goes down, a bit of afterglow. */
const BEFORE_MS = 40 * 60000;
const AFTER_MS = 30 * 60000;

export function isGoldenHour(now = new Date()): boolean {
  const set = sunset(now, HOME.lat, HOME.lon).getTime();
  if (Number.isNaN(set)) return false;
  const t = now.getTime();
  // the equation gives the set nearest the date's noon, so also try the day before and after
  return [set - MS_PER_DAY, set, set + MS_PER_DAY].some((s) => t >= s - BEFORE_MS && t <= s + AFTER_MS);
}
