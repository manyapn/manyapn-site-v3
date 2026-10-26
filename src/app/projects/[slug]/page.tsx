import Link from "next/link";
import Page from "@/components/Page";
import PageHead from "@/components/PageHead";
import { landscapes } from "@/data/landscapes";
import { projects } from "@/data/projects";
import { projectMap } from "@/lib/projectMap";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/icons";

const written = projects.filter((p) => p.writeup);

export function generateStaticParams() {
  return written.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = written.find((p) => p.id === slug);
  return {
    title: project ? project.title : "projects",
    description: project?.description,
  };
}

export default async function ProjectWriteupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = written.find((p) => p.id === slug);
  const Content = projectMap[slug];
  const land = landscapes.diablo;

  if (!project || !Content) {
    return <div className="wrap"><p className="muted">project not found.</p></div>;
  }

  return (
    <Page land={land}>
      <PageHead land={land} title={project.title} aside={`${project.tech} · ${project.when}`} />

      <div className="wrap enter-2">
        <p className="back-link pixel">
          <Link href="/projects" className="bare"><ArrowLeftIcon size={13} /> projects</Link>
        </p>

        <article className="post-content">
          <Content />
        </article>

        {project.links.length > 0 && (
          <p className="writeup-links pixel">
            {project.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                {l.label} <ArrowUpRightIcon size={12} />
              </a>
            ))}
          </p>
        )}
      </div>
    </Page>
  );
}
