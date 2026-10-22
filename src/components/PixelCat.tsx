"use client";

import { useEffect, useState } from "react";

/** 14 × 12 sprite. k = ink, w = paper (eyes), . = empty. */
const ROWS = [
  ".k....k.......",
  ".kk..kk.......",
  ".kkkkkk.......",
  ".kwkkwk.......",
  ".kkkkkk.......",
  "..kkkk........",
  "..kkkkkkkk....",
  "..kkkkkkkkk.k.",
  "..kkkkkkkkk.k.",
  "..kkkkkkkkkkk.",
  "..kk.kk.kkk...",
  "..kk.kk.......",
];

const W = 14;
const H = 12;

/**
 * The cat from the old site, redrawn as 168 pixels. It blinks every so often,
 * and that is the only thing on the page that moves on its own.
 */
export default function PixelCat({ size = 28, className = "" }: { size?: number; className?: string }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let close: ReturnType<typeof setTimeout>;
    let open: ReturnType<typeof setTimeout>;
    const schedule = () => {
      close = setTimeout(() => {
        setBlink(true);
        open = setTimeout(() => {
          setBlink(false);
          schedule();
        }, 140);
      }, 4000 + Math.random() * 4000);
    };
    schedule();
    return () => {
      clearTimeout(close);
      clearTimeout(open);
    };
  }, []);

  const px = size / W;
  const rects: React.ReactNode[] = [];
  ROWS.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c === ".") return;
      const eye = c === "w" && !blink;
      rects.push(
        <rect
          key={`${x}-${y}`}
          x={x * px}
          y={y * px}
          width={px}
          height={px}
          fill={eye ? "var(--paper)" : "currentColor"}
        />
      );
    });
  });

  return (
    <svg
      className={`cat ${className}`}
      width={size}
      height={(size * H) / W}
      viewBox={`0 0 ${size} ${(size * H) / W}`}
      role="img"
      aria-label="a small pixel cat"
    >
      {rects}
    </svg>
  );
}
