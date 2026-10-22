"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Group = {
  label: string;
  links: { text: string; href: string }[];
};

export default function FurtherReading({
  summary,
  groups,
}: {
  summary: string;
  groups: Group[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="further-reading">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="further-reading-summary"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="minus"
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-block", color: "var(--link)" }}
              aria-hidden="true"
            >
              −
            </motion.span>
          ) : (
            <motion.span
              key="plus"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-block", color: "var(--link)" }}
              aria-hidden="true"
            >
              +
            </motion.span>
          )}
        </AnimatePresence>
        {summary}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="further-reading-grid" style={{ paddingTop: "1rem" }}>
              {groups.map((g) => (
                <div key={g.label} className="further-reading-group">
                  <span className="further-reading-label">{g.label}</span>
                  <ul>
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} target="_blank" rel="noreferrer">
                          {l.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
