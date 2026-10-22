"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { ArrowUpRightIcon } from "@/icons";

/** Each chip gets a pigment, in order, like a strip from the paint aisle. */
const PIGMENTS = [
  { name: "cobalt blue", value: "var(--cobalt)" },
  { name: "rose madder", value: "var(--rose)" },
  { name: "viridian", value: "var(--viridian)" },
  { name: "yellow ochre", value: "var(--ochre)" },
  { name: "lavender", value: "var(--lavender)" },
  { name: "burnt sienna", value: "var(--sienna)" },
  { name: "sap green", value: "var(--sap)" },
  { name: "payne's grey", value: "var(--payne)" },
  { name: "cerulean", value: "var(--cerulean)" },
];

const TILTS = [-1.5, 1, -0.6, 1.4, -1.1, 0.8, -1.3, 0.5, -0.8];

const pigmentFor = (i: number) => PIGMENTS[i % PIGMENTS.length];

export default function PaintChips({ projects }: { projects: Project[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [cols, setCols] = useState(1);
  const gridRef = useRef<HTMLUListElement>(null);

  // The detail panel slots in after the row holding the open chip, so it
  // appears right under what you clicked instead of at the bottom of the deck.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const measure = () =>
      setCols(getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length || 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);

  const openIndex = projects.findIndex((p) => p.id === openId);
  const open = openIndex >= 0 ? projects[openIndex] : null;
  const rowEnd =
    openIndex >= 0 ? Math.min(projects.length - 1, Math.floor(openIndex / cols) * cols + cols - 1) : -1;

  return (
    <ul className="deck" role="list" ref={gridRef}>
      {projects.map((p, i) => {
        const pig = pigmentFor(i);
        const expanded = openId === p.id;
        return (
          <Fragment key={p.id}>
            <li
              className="chip"
              style={{ "--chip": pig.value, "--tilt": `${TILTS[i % TILTS.length]}deg` } as React.CSSProperties}
            >
              <button
                className="chip-face"
                aria-expanded={expanded}
                aria-controls="chip-detail"
                onClick={() => setOpenId(expanded ? null : p.id)}
              >
                <span className="chip-swatch" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((b) => <span key={b} className="chip-band" />)}
                </span>
                <span className="chip-text">
                  <span className="chip-name">{p.title}</span>
                  <span className="chip-code">{pig.name} · {String(i + 1).padStart(2, "0")}</span>
                </span>
              </button>
            </li>

            {i === rowEnd && open && (
              <li className="chip-detail-slot" aria-live="polite">
                <AnimatePresence initial={false} mode="wait">
                  <motion.section
                    key={open.id}
                    id="chip-detail"
                    className="chip-detail"
                    style={{ "--chip": pigmentFor(openIndex).value } as React.CSSProperties}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="chip-detail-inner">
                      <h2>{open.title}</h2>
                      <span className="chip-code">{open.tech}</span>
                      <p>{open.description}</p>
                      {open.links.length > 0 && (
                        <div className="chip-links">
                          {open.links.map((l) => (
                            <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                              {l.label} <ArrowUpRightIcon size={13} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.section>
                </AnimatePresence>
              </li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
}
