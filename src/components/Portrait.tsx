"use client";

import { useEffect, useRef, useState } from "react";

/** How wide, in pixels, the pixelated version is. */
const PIXELS = 96;

/** My photo on a canvas: pixelated until you press it, the plain photo after. */
export default function Portrait({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [clear, setClear] = useState(false);

  const draw = (pixelated: boolean) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !img || !ctx) return;
    if (!pixelated) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return;
    }
    const h = Math.max(1, Math.round((img.naturalHeight * PIXELS) / img.naturalWidth));
    const off = document.createElement("canvas");
    off.width = PIXELS;
    off.height = h;
    const octx = off.getContext("2d");
    if (!octx) return;
    octx.imageSmoothingEnabled = true;
    octx.drawImage(img, 0, 0, PIXELS, h);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const img = new Image();
    img.src = src;
    imgRef.current = img;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      draw(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    if (imgRef.current?.complete) draw(!clear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clear]);

  return (
    <button
      type="button"
      className="portrait"
      aria-pressed={clear}
      aria-label={clear ? `${alt}. press to pixelate` : `${alt}, in pixels. press to see the photo`}
      onClick={() => setClear((c) => !c)}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="portrait-hint pixel">{clear ? "press to pixelate" : "press to clarify"}</span>
    </button>
  );
}
