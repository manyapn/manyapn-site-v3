"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { FunPhoto } from "@/data/fun";
import thumbs from "@/data/thumbs-fun.json";

type Props = { photo: FunPhoto; size: [number, number]; width: number; alt: string };

/** One tile: pixels by default, the real photo after a click, pixels again on the next. */
export default function Snap({ photo, size: [w, h], width, alt }: Props) {
  const [clear, setClear] = useState(false);
  const [px, setPx] = useState(`/fun/${photo.id}.png`);
  const [noClear, setNoClear] = useState(false);
  return (
    <figure className="snap" style={{ width }}>
      <button
        type="button"
        className="snap-btn"
        aria-pressed={clear}
        aria-label={clear ? `${alt}: pixelate again` : `${alt}: unpixelate`}
        onClick={() => setClear((c) => !c)}
        disabled={noClear}
      >
        <img
          className="snap-px"
          src={px}
          width={w}
          height={h}
          alt=""
          loading="lazy"
          onError={() => setPx(thumbs[photo.id as keyof typeof thumbs])}
        />
        <motion.img
          className="snap-clear"
          src={`/fun/${photo.id}.jpg`}
          alt=""
          loading="lazy"
          onError={() => setNoClear(true)}
          draggable={false}
          initial={false}
          animate={{ opacity: clear ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </button>
      {photo.caption && <figcaption className="pixel">{photo.caption}</figcaption>}
    </figure>
  );
}
