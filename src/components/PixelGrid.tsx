"use client";

import { useEffect, useRef, useState } from "react";
import Snap from "@/components/Snap";
import type { FunPhoto } from "@/data/fun";
import sizes from "../../public/fun/sizes.json";

const pxSize = sizes as unknown as Record<string, [number, number]>;

export type GridCard = { title: string; when?: string; meta: string[] };

const GAP = 8;
const TARGET_WIDE = 220;
const TARGET_NARROW = 150;
/** The card is between square and a bit over twice as wide as tall; it takes whatever its row has left. */
const CARD_AR = { min: 1, max: 2.3 };

type Row = { idx: number[]; h: number; cardW?: number };

/**
 * Justified rows: every photo keeps its own aspect ratio and every tile in a
 * row shares the row's height, so nothing is cropped and rows run edge to
 * edge. The place card leads the first row and stretches to fill it, which
 * keeps that row at a normal height. Rows are chosen all at once (a small
 * dynamic program) so the last row doesn't end up alone or towering.
 * Index 0 is the card; the rest are photos.
 */
function layout(ars: number[], width: number): Row[] {
  const n = ars.length;
  const TARGET = width < 520 ? TARGET_NARROW : TARGET_WIDE;
  const fit = (from: number, to: number): { h: number; cardW?: number } | null => {
    const inner = width - GAP * (to - from - 1);
    if (from === 0) {
      let sum = 0;
      for (let i = 1; i < to; i++) sum += ars[i];
      if (to === 1) return n === 1 ? { h: TARGET, cardW: width } : null;
      const lo = inner / (sum + CARD_AR.max);
      const hi = inner / (sum + CARD_AR.min);
      if (lo > hi) return null;
      const h = Math.min(hi, Math.max(lo, TARGET));
      return { h, cardW: inner - sum * h };
    }
    let sum = 0;
    for (let i = from; i < to; i++) sum += ars[i];
    return { h: inner / sum };
  };
  const cost = (from: number, to: number) => {
    const f = fit(from, to);
    if (!f) return 1e9;
    let c = (f.h - TARGET) ** 2;
    if (f.h > TARGET * 1.5) c += 1e6;
    if (to - from === 1 && from > 0) c += 1e6;
    return c;
  };
  const best = new Array(n + 1).fill(Infinity);
  const cut = new Array(n + 1).fill(0);
  best[0] = 0;
  for (let to = 1; to <= n; to++) {
    for (let from = Math.max(0, to - 6); from < to; from++) {
      const c = best[from] + cost(from, to);
      if (c < best[to]) {
        best[to] = c;
        cut[to] = from;
      }
    }
  }
  const rows: Row[] = [];
  for (let to = n; to > 0; to = cut[to]) {
    const from = cut[to];
    const f = fit(from, to) ?? { h: TARGET };
    const idx = [];
    for (let i = from; i < to; i++) idx.push(i);
    rows.unshift({ idx, h: Math.min(f.h, TARGET * 1.5), cardW: f.cardW });
  }
  return rows;
}

export default function PixelGrid({ card, photos }: { card: GridCard; photos: FunPhoto[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(680);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const tiles = photos.map((ph) => {
    const [w, h] = pxSize[ph.id] ?? [84, 63];
    return { ph, w, h, ar: w / h };
  });
  const rows = layout([1, ...tiles.map((t) => t.ar)], width);

  return (
    <div className="snaps" ref={ref}>
      {rows.map((row, r) => (
        <div className="snap-row" key={r} style={{ height: row.h }}>
          {row.idx.map((i) =>
            i === 0 ? (
              <div className="snap-card" key="card" style={{ width: row.cardW ?? row.h }}>
                <h2>{card.title}</h2>
                <div className="snap-card-foot">
                  {card.when && <span className="pixel snap-when">{card.when}</span>}
                  <span className="pixel snap-meta">{card.meta.join(" · ")}</span>
                </div>
              </div>
            ) : (
              <Snap
                key={tiles[i - 1].ph.id}
                photo={tiles[i - 1].ph}
                size={[tiles[i - 1].w, tiles[i - 1].h]}
                width={tiles[i - 1].ar * row.h}
                alt={tiles[i - 1].ph.caption ?? card.title}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
}
