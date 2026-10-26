"use client";

import { toggleSunset, useSunset } from "@/lib/sunsetStore";

/** 9 × 7 sprites: a sun up high, and the same sun half under the horizon. */
const DAY = [
  "....k....",
  ".k.....k.",
  "...kkk...",
  "k.kkkkk.k",
  "...kkk...",
  ".k.....k.",
  "....k....",
];
const DUSK = [
  ".........",
  "....k....",
  ".k.....k.",
  "...kkk...",
  "k.kkkkk.k",
  "kkkkkkkkk",
  ".........",
];

function Sprite({ rows }: { rows: string[] }) {
  const px = 2;
  return (
    <svg width={9 * px} height={7 * px} viewBox={`0 0 ${9 * px} ${7 * px}`} aria-hidden="true" shapeRendering="crispEdges">
      {rows.flatMap((row, y) =>
        [...row].map((c, x) => (c === "k" ? <rect key={`${x}-${y}`} x={x * px} y={y * px} width={px} height={px} fill="currentColor" /> : null)),
      )}
    </svg>
  );
}

/** The sun in the nav: press it and the site goes to sunset, press again for daylight. */
export default function SunsetToggle() {
  const on = useSunset();
  return (
    <button
      type="button"
      className="sunset-toggle pixel"
      aria-pressed={on}
      onClick={toggleSunset}
      title={on ? "back to daylight" : "sunset mode"}
    >
      <Sprite rows={on ? DUSK : DAY} />
      <span>{on ? "daylight" : "sunset"}</span>
    </button>
  );
}
