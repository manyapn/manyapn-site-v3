"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { pxSrc, type Landscape as Land } from "@/data/landscapes";
import thumbs from "@/data/thumbs-site.json";

/** Pixel widths a viewer can choose. */
export const LEVELS = [30, 60, 120, 240, 480, 960, 1920] as const;
const DEFAULT_LEVEL = 3;
const STORAGE_KEY = "px-width";
/** Widths the painting passes through while it develops on first load. */
const DEVELOP_STEPS = [10, 20, 40, 80, 160, 320, 640, 1280];
const STEP_MS = 85;
const LENS_RADIUS = 150;
/** Width of the inline copy in thumbs-site.json; the backup when the png is slow or missing. */
const THUMB_W = 32;

type Props = { land: Land; children?: React.ReactNode };

function readLevel(): number {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    const i = LEVELS.findIndex((w) => String(w) === v);
    return i >= 0 ? i : DEFAULT_LEVEL;
  } catch {
    return DEFAULT_LEVEL;
  }
}

/**
 * The pixel-watercolor hero: a canvas holding the painting at the chosen
 * level, with a soft paper-coloured lens that follows the pointer and lifts
 * the pixels under it a few shades.
 * On load the canvas "develops" from a handful of blocks to the chosen level
 * step by step, and the viewer can pick how many pixels they want.
 */
export default function Landscape({ land, children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const r = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 320, damping: 32, mass: 0.6 });
  const y = useSpring(my, { stiffness: 320, damping: 32, mass: 0.6 });
  const radius = useSpring(r, { stiffness: 220, damping: 28 });
  const mask = useMotionTemplate`radial-gradient(circle ${radius}px at ${x}px ${y}px, #000 0, #000 55%, transparent 100%)`;

  const drawAt = (w: number, img = imgRef.current) => {
    const canvas = canvasRef.current;
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
    // Sample the palette pixels directly at the readable levels so each one stays crisp
    // and the steps look different; only the very coarse levels get averaged.
    octx.imageSmoothingEnabled = w < 240;
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
    // Phones stay at 240 wide: no control, and a saved desktop choice doesn't carry over.
    const saved = window.matchMedia("(max-width: 600px)").matches ? DEFAULT_LEVEL : readLevel();
    setLevel(saved);

    // The tiny inline copy goes up right away, so the hero is never blank.
    const thumb = new Image();
    thumb.src = thumbs[land.key as keyof typeof thumbs];
    let done = false;
    thumb.onload = () => {
      if (!done) drawAt(THUMB_W, thumb);
    };

    const img = new Image();
    img.src = pxSrc(land);
    imgRef.current = img;
    img.onerror = () => setFailed(true);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = Math.min(LEVELS[saved], land.width);

    img.onload = () => {
      done = true;
      setReady(true);
      if (reduced) return drawAt(target);
      const steps = DEVELOP_STEPS.filter((w) => w > THUMB_W && w < target);
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
      localStorage.setItem(STORAGE_KEY, String(LEVELS[level]));
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
        <motion.div className="land-lens" aria-hidden="true" style={{ maskImage: mask, WebkitMaskImage: mask }} />
        {children}
      </div>

      <div className="px-control pixel" role="radiogroup" aria-label="pixel level" hidden={failed}>
        <span className="px-control-label">pixels</span>
        {LEVELS.map((w, i) => (
          <button
            key={w}
            type="button"
            role="radio"
            aria-checked={level === i}
            aria-label={`${w} pixels wide`}
            className="px-step"
            data-on={i <= level || undefined}
            onClick={() => setLevel(i)}
          />
        ))}
        <span className="px-control-value">{LEVELS[level]} wide</span>
      </div>
    </>
  );
}
