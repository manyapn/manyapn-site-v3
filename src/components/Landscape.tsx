"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { pxSrc, wcSrc, type Landscape as Land } from "@/data/landscapes";

/** Image widths the painting passes through while it develops, in px. */
const DEVELOP_STEPS = [10, 20, 40, 80, 160];
const STEP_MS = 85;
const LENS_RADIUS = 150;

type Props = { land: Land; children?: React.ReactNode };

/**
 * The pixel-watercolor hero.
 *
 * Two layers: a canvas holding the pixel painting, and the smooth watercolor
 * on top, masked to a circle that follows the pointer. On load the canvas
 * "develops" from a handful of blocks to the full 240 px in five steps. Move
 * the pointer over it and a drop of water reveals the painting underneath.
 */
export default function Landscape({ land, children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const r = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 320, damping: 32, mass: 0.6 });
  const y = useSpring(my, { stiffness: 320, damping: 32, mass: 0.6 });
  const radius = useSpring(r, { stiffness: 220, damping: 28 });
  const mask = useMotionTemplate`radial-gradient(circle ${radius}px at ${x}px ${y}px, #000 0, #000 55%, transparent 100%)`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = land.width;
    canvas.height = land.height;

    const img = new Image();
    img.src = pxSrc(land);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const drawAt = (w: number) => {
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
    const drawFinal = () => {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0);
    };

    img.onload = () => {
      if (reduced) return drawFinal();
      DEVELOP_STEPS.forEach((w, i) => timers.push(setTimeout(() => drawAt(w), i * STEP_MS)));
      timers.push(setTimeout(drawFinal, DEVELOP_STEPS.length * STEP_MS));
    };
    return () => timers.forEach(clearTimeout);
  }, [land]);

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
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />
      {children}
    </div>
  );
}
