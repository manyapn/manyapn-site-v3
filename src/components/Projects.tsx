import type { Project } from "@/data/projects";
import { ArrowUpRightIcon } from "@/icons";

const PIGMENTS = ["var(--cobalt)", "var(--rose)", "var(--viridian)", "var(--ochre)", "var(--lavender)", "var(--sienna)", "var(--sap)", "var(--payne)", "var(--cerulean)"];

function Links({ links }: { links: Project["links"] }) {
  if (links.length === 0) return null;
  return (
    <span className="proj-links pixel">
      {links.map((l) => (
        <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
          {l.label} <ArrowUpRightIcon size={12} />
        </a>
      ))}
    </span>
  );
}

/** A vertical paint strip: the project's pigment in three tints with dithered steps. */
function Strip({ color }: { color: string }) {
  return (
    <span className="strip" style={{ "--c": color } as React.CSSProperties} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((b) => <span key={b} className="chip-band" />)}
    </span>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.tier === "featured");
  const more = projects.filter((p) => p.tier === "more");
  const writing = projects.filter((p) => p.tier === "writing");

  return (
    <>
      <ol className="featured" role="list">
        {featured.map((p, i) => (
          <li key={p.id} className="feat">
            <Strip color={PIGMENTS[i % PIGMENTS.length]} />
            <div className="feat-body">
              <div className="feat-head">
                <h2 className="feat-title">{p.title}</h2>
                <span className="feat-when pixel">{p.when}</span>
              </div>
              <p className="feat-desc">{p.description}</p>
              {p.facts && (
                <ul className="facts" role="list">
                  {p.facts.map((f) => <li key={f}>{f}</li>)}
                </ul>
              )}
              <div className="feat-foot pixel">
                <span className="muted">{p.tech}</span>
                <Links links={p.links} />
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section className="more-section">
        <h2 className="section-title">smaller things, class work, hackathons</h2>
        <ul className="more" role="list">
          {more.map((p, i) => (
            <li key={p.id} className="more-item">
              <span className="more-dot" style={{ background: PIGMENTS[(i + 4) % PIGMENTS.length] }} aria-hidden="true" />
              <div>
                <p className="more-title">
                  {p.title} <span className="more-tech pixel">{p.tech}</span>
                </p>
                <p className="more-desc">{p.description}</p>
                <Links links={p.links} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="more-section">
        <h2 className="section-title">data stories and essays</h2>
        <ul className="more" role="list">
          {writing.map((p, i) => (
            <li key={p.id} className="more-item">
              <span className="more-dot" style={{ background: PIGMENTS[(i + 7) % PIGMENTS.length] }} aria-hidden="true" />
              <div>
                <p className="more-title">
                  {p.title} <span className="more-tech pixel">{p.tech}</span>
                </p>
                <p className="more-desc">{p.description}</p>
                <Links links={p.links} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
