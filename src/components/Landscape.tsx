"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { pxSrc, wcSrc, type Landscape as Land } from "@/data/landscapes";

/** Pixel widths a viewer can choose. The last one is the smooth watercolor. */
export const LEVELS = [30, 60, 120, 240, Infinity] as const;
const DEFAULT_LEVEL = 3;
const STORAGE_KEY = "px-width";
/** Widths the painting passes through while it develops on first load. */
const DEVELOP_STEPS = [10, 20, 40, 80, 160];
const STEP_MS = 85;
const LENS_RADIUS = 150;

type Props = { land: Land; children?: React.ReactNode };

function readLevel(): number {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    const i = LEVELS.findIndex((w) => (w === Infinity ? "full" : String(w)) === v);
    return i >= 0 ? i : DEFAULT_LEVEL;
  } catch {
    return DEFAULT_LEVEL;
  }
}

/**
 * The pixel-watercolor hero.
 *
 * Two layers: a canvas holding the pixel painting, and the smooth watercolor
 * on top, masked to a circle that follows the pointer. On load the canvas
 * "develops" from a handful of blocks to the chosen level in five steps. The
 * viewer can pick how many pixels they want, from 12 wide to the full painting.
 */
export default function Landscape({ land, children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [ready, setReady] = useState(false);
  const full = LEVELS[level] === Infinity;

  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const r = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 320, damping: 32, mass: 0.6 });
  const y = useSpring(my, { stiffness: 320, damping: 32, mass: 0.6 });
  const radius = useSpring(r, { stiffness: 220, damping: 28 });
  const mask = useMotionTemplate`radial-gradient(circle ${radius}px at ${x}px ${y}px, #000 0, #000 55%, transparent 100%)`;

  const drawAt = (w: number) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !img || !ctx) return;
    if (w >= land.width) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0);
      return;
    }
    const h = Math.max(1, Math.round((land.height * w) / land.width));
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const octx = off.getContext("2d");
    if (!octx) return;
    octx.imageSmoothingEnabled = true;
    octx.drawImage(img, 0, 0, w, h);
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
  };

  // First load: develop up to the saved level.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = land.width;
    canvas.height = land.height;
    const saved = readLevel();
    setLevel(saved);

    const img = new Image();
    img.src = pxSrc(land);
    imgRef.current = img;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = Math.min(LEVELS[saved], land.width);

    img.onload = () => {
      setReady(true);
      if (reduced) return drawAt(target);
      const steps = DEVELOP_STEPS.filter((w) => w < target);
      steps.forEach((w, i) => timers.push(setTimeout(() => drawAt(w), i * STEP_MS)));
      timers.push(setTimeout(() => drawAt(target), steps.length * STEP_MS));
    };
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [land]);

  // Later changes: redraw at the chosen level and remember it.
  useEffect(() => {
    if (!ready) return;
    drawAt(Math.min(LEVELS[level], land.width));
    try {
      localStorage.setItem(STORAGE_KEY, LEVELS[level] === Infinity ? "full" : String(LEVELS[level]));
    } catch {
      // private mode; the choice just won't stick
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, ready]);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };
  const enter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.jump(e.clientX - rect.left);
    my.jump(e.clientY - rect.top);
    r.set(LENS_RADIUS);
  };
  const leave = () => r.set(0);

  return (
    <>
      <div
        className="land"
        style={{ "--focus": land.focus } as React.CSSProperties}
        onPointerMove={move}
        onPointerEnter={enter}
        onPointerLeave={leave}
      >
        <canvas ref={canvasRef} className="land-px" role="img" aria-label={land.alt} />
        <motion.img
          className="land-wc"
          src={wcSrc(land)}
          alt=""
          aria-hidden="true"
          draggable={false}
          style={full ? undefined : { maskImage: mask, WebkitMaskImage: mask }}
        />
        {children}
      </div>

      <div className="px-control pixel" role="radiogroup" aria-label="pixel level">
        <span className="px-control-label">pixels</span>
        {LEVELS.map((w, i) => (
          <button
            key={w}
            type="button"
            role="radio"
            aria-checked={level === i}
            aria-label={w === Infinity ? "no pixels, the full painting" : `${w} pixels wide`}
            className="px-step"
            data-on={i <= level || undefined}
            onClick={() => setLevel(i)}
          />
        ))}
        <span className="px-control-value">{full ? "painting" : `${LEVELS[level]} wide`}</span>
      </div>
    </>
  );
}
