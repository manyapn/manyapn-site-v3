/**
 * Repaints a pixel painting as if at sunset: a gradient map from indigo
 * shadows through plum and rose to a pale gold, mixed with the original so the
 * painting is still itself, and the ground darkening into silhouette.
 */
type Rgb = [number, number, number];
const STOPS: [number, Rgb][] = [
  [0, [40, 30, 68]],
  [0.3, [124, 58, 96]],
  [0.55, [204, 92, 92]],
  [0.78, [236, 152, 90]],
  [1, [250, 222, 166]],
];
const KEEP = 0.28;

const lut: Rgb[] = Array.from({ length: 256 }, (_, i) => {
  const t = i / 255;
  let k = 0;
  while (k < STOPS.length - 2 && t > STOPS[k + 1][0]) k++;
  const [t0, a] = STOPS[k];
  const [t1, b] = STOPS[k + 1];
  const f = (t - t0) / (t1 - t0);
  return [0, 1, 2].map((c) => a[c] + (b[c] - a[c]) * f) as Rgb;
});

export function paintSunset(src: HTMLCanvasElement, dst: HTMLCanvasElement) {
  const { width: w, height: h } = src;
  const sctx = src.getContext("2d");
  const dctx = dst.getContext("2d");
  if (!sctx || !dctx || !w || !h) return;
  dst.width = w;
  dst.height = h;
  const img = sctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let y = 0; y < h; y++) {
    // the lower third sinks toward silhouette
    const ground = y / h;
    const dim = ground > 0.62 ? 1 - 0.32 * ((ground - 0.62) / 0.38) : 1;
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = d[i], g = d[i + 1], b = d[i + 2];
      const lum = Math.min(255, Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b));
      const m = lut[lum];
      d[i] = (r * KEEP + m[0] * (1 - KEEP)) * dim;
      d[i + 1] = (g * KEEP + m[1] * (1 - KEEP)) * dim;
      d[i + 2] = (b * KEEP + m[2] * (1 - KEEP)) * dim;
    }
  }
  dctx.putImageData(img, 0, 0);
}
