import Link from "next/link";
import type { Project } from "@/data/projects";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/icons";

const PIGMENTS = ["var(--cobalt)", "var(--rose)", "var(--viridian)", "var(--ochre)", "var(--lavender)", "var(--sienna)", "var(--sap)", "var(--payne)", "var(--cerulean)"];

function Links({ project }: { project: Project }) {
  if (project.links.length === 0 && !project.writeup) return null;
  return (
    <span className="proj-links pixel">
      {project.writeup && (
        <Link href={`/projects/${project.id}`}>
          how it&apos;s built <ArrowRightIcon size={12} />
        </Link>
      )}
      {project.links.map((l) => (
        <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
          {l.label} <ArrowUpRightIcon size={12} />
        </a>
      ))}
    </span>
  );
}

/** Titles link to the write-up when there is one. */
function Title({ project, className }: { project: Project; className: string }) {
  if (!project.writeup) return <>{project.title}</>;
  return (
    <Link href={`/projects/${project.id}`} className={className}>
      {project.title}
    </Link>
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
                <h2 className="feat-title"><Title project={p} className="title-link" /></h2>
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
                <Links project={p} />
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
                  <Title project={p} className="title-link" />{" "}
                  <span className="more-tech pixel">{p.tech}</span>
                </p>
                <p className="more-desc">{p.description}</p>
                <Links project={p} />
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
                  <Title project={p} className="title-link" />{" "}
                  <span className="more-tech pixel">{p.tech}</span>
                </p>
                <p className="more-desc">{p.description}</p>
                <Links project={p} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
