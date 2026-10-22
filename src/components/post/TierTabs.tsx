"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Tier = {
  id: string;
  label: string;
  tagline: string;
  body: React.ReactNode;
};

const tiers: Tier[] = [
  {
    id: "safety",
    label: "Safety",
    tagline: "Schools that will 100% take you.",
    body: (
      <>
        <p>
          Honestly, I don&apos;t consider a school a real "safety" until you&apos;ve gotten an
          acceptance letter. Apply to rolling admissions schools in early August to have a letter
          in hand by September, it also increases your chances!
        </p>
        <p>
          Great safety/target-type schools: ASU, UMN, Penn State, UPitt, UW Bothell, WWU, etc.
          For WA students:{" "}
          <a href="https://www.wagap.org/" target="_blank" rel="noreferrer">
            WAGAP (Washington Guaranteed Admission Program)
          </a>
          . Look for schools that also give good merit scholarships.
        </p>
      </>
    ),
  },
  {
    id: "target",
    label: "Target",
    tagline: "Schools that fit your stats range and will likely take you.",
    body: (
      <p>
        These are schools where your GPA, test scores, and profile are solidly within the
        admitted range. Apply to a good number of these; many students end up genuinely loving
        their target school.
      </p>
    ),
  },
  {
    id: "reach",
    label: "Reach",
    tagline: "Schools you can't expect to get into, but would love to attend.",
    body: (
      <p>
        Your stats might be in range, but these schools are selective enough that admission
        isn&apos;t predictable. Apply with strong essays and genuine interest, but don&apos;t
        build your plan around them.
      </p>
    ),
  },
  {
    id: "lottery",
    label: "Lottery",
    tagline: "Schools you most likely will not get into.",
    body: (
      <p>
        Acceptance rates under 10%, and the randomness is real. Two students with identical
        stats can get completely different outcomes. Apply if you&apos;re genuinely excited about
        them, but treat every result as a bonus, not a plan.
      </p>
    ),
  },
];

export default function TierTabs() {
  const [active, setActive] = useState(0);
  const tier = tiers[active];

  return (
    <div
      style={{
        border: "1px solid var(--line)",
        borderRadius: "8px",
        overflow: "hidden",
        margin: "1.25rem 0",
      }}
    >
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="College list categories"
        style={{
          display: "flex",
          borderBottom: "1px solid var(--line)",
          background: "var(--surface)",
        }}
      >
        {tiers.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            id={`tier-tab-${t.id}`}
            aria-selected={active === i}
            aria-controls={`tier-panel-${t.id}`}
            onClick={() => setActive(i)}
            style={{
              flex: 1,
              padding: "0.65rem 0.35rem",
              background: "none",
              border: "none",
              borderBottom: active === i ? "2px solid var(--ink)" : "2px solid transparent",
              cursor: "pointer",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.72rem",
              fontWeight: active === i ? "500" : "400",
              color: active === i ? "var(--ink)" : "var(--muted)",
              transition: "color 0.15s ease, border-color 0.15s ease",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tier.id}
          role="tabpanel"
          id={`tier-panel-${tier.id}`}
          aria-labelledby={`tier-tab-${tier.id}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: "1.25rem 1.25rem 1rem" }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.75rem",
              color: "var(--muted)",
              marginBottom: "0.75rem",
            }}
          >
            {tier.tagline}
          </p>
          <div style={{ fontSize: "0.95rem", lineHeight: "1.7" }}>{tier.body}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
