import Page from "@/components/Page";
import PageHead from "@/components/PageHead";
import Projects from "@/components/Projects";
import { landscapes } from "@/data/landscapes";
import { projects } from "@/data/projects";
import { personal } from "@/data/personal";
import { ArrowUpRightIcon } from "@/icons";

export const metadata = {
  title: "projects",
  description:
    "things manya has built: checkpoint, tandem, me.json, ithaca reuse, and a shelf of smaller experiments.",
};

export default function ProjectsPage() {
  const land = landscapes.diablo;
  return (
    <Page land={land}>
      <PageHead land={land} title="projects" aside={`${projects.filter((p) => p.tier === "featured").length} featured · ${projects.length} total`} />
      <div className="wrap enter-2">
        <Projects projects={projects} />
        <p className="deck-more pixel">
          <a href={personal.githubUrl} target="_blank" rel="noreferrer">
            everything else on {personal.github} <ArrowUpRightIcon size={13} />
          </a>
        </p>
      </div>
    </Page>
  );
}
