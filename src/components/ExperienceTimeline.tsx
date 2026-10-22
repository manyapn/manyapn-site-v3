"use client";

import { useMemo, useState } from "react";
import type { Experience, ClubMention } from "@/data/experiences";

type Props = {
  entries: Experience[];
  clubs: ClubMention[];
  /** "YYYY-MM" of the build, so ongoing bars end at the right place. */
  now: string;
};

type FilterId = "everything" | Experience["category"];

const filters: { id: FilterId; label: string }[] = [
  { id: "everything", label: "everything" },
  { id: "research", label: "research" },
  { id: "internship", label: "internships" },
  { id: "club", label: "clubs" },
];

const catColor: Record<Experience["category"], string> = {
  research: "var(--research)",
  internship: "var(--internship)",
  club: "var(--club)",
};

/** Months since epoch, so positioning is plain integer math. */
function toMonths(ym: string): number {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
}

function yearOf(months: number): number {
  return Math.floor(months / 12);
}

export default function ExperienceTimeline({ entries, clubs, now }: Props) {
  const [active, setActive] = useState<FilterId>("everything");
  const [hovered, setHovered] = useState<string | null>(null);

  const nowM = toMonths(now);

  /**
   * The chart covers current and recently-ended roles. Older one-offs would
   * stretch the axis and leave most of it empty; they still appear in the
   * list below with their full dates.
   */
  const charted = useMemo(
    () => entries.filter((e) => e.end === null || nowM - toMonths(e.end) <= 12),
    [entries, nowM]
  );

  /** Axis spans every charted role, not just the filtered ones, so bars
   *  keep the same position when you switch filters. */
  const { min, span, yearTicks } = useMemo(() => {
    const starts = charted.map((e) => toMonths(e.start));
    const ends = charted.map((e) => (e.end ? toMonths(e.end) : nowM));
    // Pad a month either side so the first bar isn't flush against the axis.
    const min = Math.min(...starts) - 1;
    const max = Math.max(...ends, nowM) + 1;
    const span = max - min;

    const ticks: { year: number; pct: number }[] = [];
    for (let y = yearOf(min) + 1; y <= yearOf(max); y++) {
      ticks.push({ year: y, pct: ((y * 12 - min) / span) * 100 });
    }
    return { min, span, yearTicks: ticks };
  }, [charted, nowM]);

  const matches = (e: Experience) =>
    active === "everything" || e.category === active;

  const barGeom = (e: Experience) => {
    const s = toMonths(e.start);
    const en = e.end ? toMonths(e.end) : nowM;
    return {
      left: ((s - min) / span) * 100,
      // Floor the width so a one-month stint is still visibly a bar.
      width: Math.max(((en - s) / span) * 100, 2.5),
    };
  };

  const nowPct = ((nowM - min) / span) * 100;

  const shownBars = charted.filter(matches);
  const current = entries.filter((e) => e.current && matches(e));
  const past = entries.filter((e) => !e.current && matches(e));
  const showClubs = active === "everything" || active === "club";

  const renderEntry = (e: Experience) => (
    <li
      key={e.id}
      className="xp-entry"
      data-lit={hovered === e.id || undefined}
      onMouseEnter={() => setHovered(e.id)}
      onMouseLeave={() => setHovered(null)}
    >
      <span
        className="xp-entry-dot"
        style={{ background: catColor[e.category] }}
        aria-hidden="true"
      />
      <div className="xp-entry-body">
        <p className="xp-entry-head">
          <span className="xp-role">{e.role}</span>{" "}
          {e.orgUrl ? (
            <a href={e.orgUrl} target="_blank" rel="noreferrer">
              @ {e.org}
            </a>
          ) : (
            <span className="xp-org">@ {e.org}</span>
          )}
        </p>
        <p className="xp-period">{e.period}</p>
        <p className="xp-desc">
          {e.description}
          {e.collaborator && (
            <>
              {" "}
              assisting{" "}
              <a href={e.collaborator.url} target="_blank" rel="noreferrer">
                {e.collaborator.name}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </li>
  );

  return (
    <>
      {/* Filters */}
      <div className="xp-filters home-enter-delay">
        {filters.map((f, i) => (
          <span key={f.id} className="xp-filter-wrap">
            <button
              className="xp-filter"
              onClick={() => setActive(f.id)}
              aria-pressed={active === f.id}
              style={{
                color:
                  active === f.id
                    ? f.id === "everything"
                      ? "var(--ink)"
                      : catColor[f.id as Experience["category"]]
                    : "var(--muted)",
              }}
            >
              {f.label}
            </button>
            {i < filters.length - 1 && (
              <span className="xp-filter-sep" aria-hidden="true">
                ·
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Time axis */}
      <figure className="xp-chart-wrap home-enter-delay">
        <figcaption className="xp-chart-caption">timeline</figcaption>

        <div
          className="xp-chart"
          role="img"
          aria-label={`Timeline of ${charted.length} overlapping roles. All roles are listed in full below.`}
        >
          {/* Year + now markers, spanning only the track column */}
          <div className="xp-rules" aria-hidden="true">
            {yearTicks.map((t) => (
              <div key={t.year} className="xp-gridline" style={{ left: `${t.pct}%` }}>
                <span className="xp-gridline-label">{t.year}</span>
              </div>
            ))}
            <div className="xp-nowline" style={{ left: `${nowPct}%` }}>
              <span className="xp-nowline-label">now</span>
            </div>
          </div>

          {/* Rows. Keyed on the filter so the bars redraw when it changes. */}
          <div className="xp-rows" key={active}>
            {shownBars.map((e) => {
              const { left, width } = barGeom(e);
              return (
                <div
                  key={e.id}
                  className="xp-row"
                  data-lit={hovered === e.id || undefined}
                >
                  <span className="xp-row-label">{e.short}</span>
                  <span className="xp-track">
                    <button
                      className="xp-bar"
                      data-lit={hovered === e.id || undefined}
                      data-ongoing={e.end === null || undefined}
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        background: catColor[e.category],
                      }}
                      onMouseEnter={() => setHovered(e.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(e.id)}
                      onBlur={() => setHovered(null)}
                      aria-label={`${e.role} at ${e.org}, ${e.period}`}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </figure>

      {/* Entries */}
      {current.length > 0 && (
        <section className="xp-section home-enter-delay-2">
          <h2>currently</h2>
          <ul role="list" className="xp-list" key={`c-${active}`}>
            {current.map(renderEntry)}
          </ul>
        </section>
      )}

      {past.length > 0 && (
        <section className="xp-section home-enter-delay-2">
          <h2>previously</h2>
          <ul role="list" className="xp-list" key={`p-${active}`}>
            {past.map(renderEntry)}
          </ul>
        </section>
      )}

      {showClubs && (
        <section className="xp-section home-enter-delay-2">
          <h2>also at cornell</h2>
          <p className="xp-clubs">
            {clubs.map((c, i) => (
              <span key={c.org}>
                {c.url ? (
                  <a
                    href={c.url}
                    {...(c.url.startsWith("/")
                      ? {}
                      : { target: "_blank", rel: "noreferrer" })}
                  >
                    {c.org}
                  </a>
                ) : (
                  c.org
                )}
                <span className="xp-club-role"> ({c.role})</span>
                {i < clubs.length - 1 && (
                  <span className="xp-club-sep" aria-hidden="true">
                    {" · "}
                  </span>
                )}
              </span>
            ))}
          </p>
        </section>
      )}
    </>
  );
}
