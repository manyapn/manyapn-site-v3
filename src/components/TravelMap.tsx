"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import PixelGrid from "@/components/PixelGrid";
import { ClearAll } from "@/components/Snap";
import { funPlaces, pins, regions, type FunPlace, type Pin } from "@/data/fun";
import thumbs from "@/data/thumbs-site.json";

/** The map png covers every longitude and latitudes 75°N to 56°S, one degree per pixel. */
const MAP = { w: 360, h: 131, top: 75 };
const ZOOMS = [1, 2, 3.5];

const at = (p: { lat: number; lon: number }) => ({ x: (p.lon + 180) / 360, y: (MAP.top - p.lat) / MAP.h });

const coords = (p: { lat: number; lon: number }) =>
  `${Math.abs(p.lat).toFixed(1)}°${p.lat < 0 ? "s" : "n"} ${Math.abs(p.lon).toFixed(1)}°${p.lon < 0 ? "w" : "e"}`;

const spring = { type: "spring", stiffness: 300, damping: 32 } as const;

type TripProps = { place: FunPlace; city: string | null; onCity: (c: string) => void };

/** One place's photos, one city at a time when the country has several. */
function Trip({ place, city, onCity }: TripProps) {
  const cities = place.cities ?? [];
  const spot = cities.find((c) => c.name === city);
  const here = spot ?? place;
  const when = spot?.when ?? place.when;
  const photos = city ? place.photos.filter((ph) => ph.city === city) : place.photos;
  const label = (n: number) => `${n} ${n === 1 ? "photo" : "photos"}`;
  return (
    <>
      {cities.length > 1 && (
        <div className="city-tabs pixel" role="tablist" aria-label={`${place.name} by city`}>
          {cities.map((c) => (
            <button type="button" role="tab" className="tag" key={c.name} aria-selected={city === c.name} aria-pressed={city === c.name} onClick={() => onCity(c.name)}>
              {c.name}
            </button>
          ))}
        </div>
      )}
      {place.note && <p>{place.note}</p>}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={city ?? place.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
          <PixelGrid
            card={{ title: place.name, when: [city, when].filter(Boolean).join(" · "), meta: [coords(here), label(photos.length)] }}
            photos={photos}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

/**
 * A pixel world map with a pin per city (or per place) and the countries
 * listed by region underneath. Picking either shows those photos and glides
 * the map there. The map zooms (buttons, double click) and drags when zoomed;
 * pins keep their size. The chosen place goes in the url hash so a trip can
 * be linked.
 */
export default function TravelMap() {
  const [active, setActive] = useState(funPlaces[0].key);
  const [city, setCity] = useState<string | null>(funPlaces[0].cities?.[0]?.name ?? null);
  const [hot, setHot] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const frame = useRef<HTMLDivElement>(null);

  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const inverse = useTransform(scale, (s) => 1 / s);

  const place = funPlaces.find((p) => p.key === active) ?? funPlaces[0];
  const here = place.cities?.find((c) => c.name === city) ?? place;

  /**
   * The box can be taller than the map itself (phones use a square box), so the
   * map sits centered inside it, `y0` down from the top. Everything here is in
   * map coordinates: W × H is the map at zoom 1, Hb the box height.
   */
  const geometry = () => {
    const el = frame.current;
    if (!el) return null;
    const { width: W, height: Hb } = el.getBoundingClientRect();
    const H = (W * MAP.h) / MAP.w;
    return { W, H, Hb, y0: (Hb - H) / 2 };
  };

  /** Where the map may sit at zoom `s` so it still covers the box (or is centered when it can't). */
  const bounds = (s: number) => {
    const g = geometry();
    if (!g) return { left: 0, right: 0, top: 0, bottom: 0 };
    const { W, H, y0 } = g;
    const top = H + y0 - H * s;
    const bottom = -y0;
    return top <= bottom
      ? { left: W - W * s, right: 0, top, bottom }
      : { left: W - W * s, right: 0, top: (H - H * s) / 2, bottom: (H - H * s) / 2 };
  };

  /** Move the map so `spot` sits in the middle of the box, at zoom `s`, within bounds. */
  const glideTo = (spot: { lat: number; lon: number }, s: number) => {
    const g = geometry();
    if (!g) return;
    const { W, H } = g;
    const { x: px, y: py } = at(spot);
    const b = bounds(s);
    animate(scale, s, spring);
    animate(x, Math.min(b.right, Math.max(b.left, W / 2 - px * W * s)), spring);
    animate(y, Math.min(b.bottom, Math.max(b.top, H / 2 - py * H * s)), spring);
    setZoom(s);
  };

  const pick = (key: string, cityName?: string) => {
    const p = funPlaces.find((q) => q.key === key);
    if (!p) return;
    const c = cityName ?? p.cities?.[0]?.name ?? null;
    setActive(key);
    setCity(c);
    window.history.replaceState(null, "", `#${key}`);
    if (zoom > 1) glideTo(p.cities?.find((q) => q.name === c) ?? p, zoom);
  };

  useEffect(() => {
    const fromHash = () => {
      const key = window.location.hash.slice(1);
      const p = funPlaces.find((q) => q.key === key);
      if (p) {
        setActive(key);
        setCity(p.cities?.[0]?.name ?? null);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  // On a phone the whole world is only ~350px wide, so start at 2× on the chosen place.
  useEffect(() => {
    if (window.innerWidth < 600) {
      const p = funPlaces.find((q) => q.key === active) ?? funPlaces[0];
      const t = setTimeout(() => glideTo(p.cities?.[0] ?? p, 2.5), 350);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setZoomTo = (s: number) => glideTo(here, s);
  const zoomIn = () => setZoomTo(ZOOMS.find((z) => z > zoom + 0.01) ?? ZOOMS[ZOOMS.length - 1]);
  const zoomOut = () => setZoomTo([...ZOOMS].reverse().find((z) => z < zoom - 0.01) ?? 1);

  const hover = (key: string | null) => ({
    onMouseEnter: () => setHot(key),
    onMouseLeave: () => setHot(null),
    onFocus: () => setHot(key),
    onBlur: () => setHot(null),
  });

  const isOn = (pin: Pin) => pin.place.key === active && (pin.city ?? null) === city;
  const pinId = (pin: Pin) => (pin.city ? `${pin.place.key}/${pin.city}` : pin.place.key);
  const countFor = (pin: Pin) => (pin.city ? pin.place.photos.filter((ph) => ph.city === pin.city).length : pin.place.photos.length);
  const onPin = pins.find(isOn);
  const [allClear, setAllClear] = useState(false);


  return (
    <>
      <div className="map-scroll">
        <div className="map" ref={frame} role="group" aria-label="places i've been" onDoubleClick={() => (zoom > 1 ? setZoomTo(1) : setZoomTo(ZOOMS[1]))}>
          <div className="map-inner">
          <motion.div
            className="map-canvas"
            style={{ scale, x, y }}
            drag={zoom > 1}
            dragConstraints={bounds(zoom)}
            dragElastic={0.08}
            dragMomentum={false}
          >
            <img
              className="map-land"
              src="/fun/world.png"
              width={MAP.w}
              height={MAP.h}
              alt=""
              draggable={false}
              onError={(e) => {
                e.currentTarget.src = thumbs.world;
              }}
            />
            {pins.map((pin, i) => {
              const n = countFor(pin);
              const name = pin.city ?? pin.place.name;
              return (
                <motion.button
                  key={pinId(pin)}
                  type="button"
                  className="pin"
                  style={{ left: `${at(pin).x * 100}%`, top: `${at(pin).y * 100}%`, scale: inverse, ...({ "--n": Math.min(n, 8) } as React.CSSProperties) }}
                  data-on={isOn(pin) || undefined}
                  data-hot={pin.place.key === hot || undefined}
                  aria-pressed={isOn(pin)}
                  onClick={() => pick(pin.place.key, pin.city)}
                  {...hover(pin.place.key)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.02 }}
                >
                  <span className="pin-tag pixel">{name}</span>
                  <span className="sr-only">{pin.city ? `${pin.city}, ${pin.place.name}` : name}</span>
                </motion.button>
              );
            })}
            {onPin && (
              <motion.span
                className="pin-ring"
                style={{ scale: inverse, ...({ "--n": Math.min(countFor(onPin), 8) } as React.CSSProperties) }}
                initial={false}
                animate={{ left: `${at(onPin).x * 100}%`, top: `${at(onPin).y * 100}%` }}
                transition={spring}
                aria-hidden="true"
              />
            )}
          </motion.div>
          </div>

          <div className="map-zoom pixel" role="group" aria-label="zoom">
            <button type="button" onClick={zoomOut} disabled={zoom <= 1} aria-label="zoom out">−</button>
            <span>{zoom === 1 ? "world" : `${zoom}×`}</span>
            <button type="button" onClick={zoomIn} disabled={zoom >= ZOOMS[ZOOMS.length - 1]} aria-label="zoom in">+</button>
          </div>
        </div>
      </div>

      <div className="regions pixel">
        {regions.map((r) => (
          <div className="region" key={r.key}>
            <h3>{r.label}</h3>
            <ul>
              {funPlaces
                .filter((p) => p.region === r.key)
                .map((p) => (
                  <li key={p.key}>
                    <button type="button" className="tag" aria-pressed={p.key === active} onClick={() => pick(p.key)} {...hover(p.key)}>
                      {p.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="snaps-bar pixel">
        <span className="snaps-hint">click any photo to unpixelate it</span>
        <button type="button" className="tag" aria-pressed={allClear} onClick={() => setAllClear((a) => !a)}>
          {allClear ? "pixelate all" : "unpixelate all"}
        </button>
      </div>

      <ClearAll.Provider value={allClear}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.section
          key={place.key}
          className="trip"
          aria-live="polite"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <Trip place={place} city={city} onCity={(c) => pick(place.key, c)} />
        </motion.section>
      </AnimatePresence>
      </ClearAll.Provider>
    </>
  );
}
