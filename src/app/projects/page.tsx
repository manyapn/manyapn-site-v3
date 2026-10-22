import Page from "@/components/Page";
import PageHead from "@/components/PageHead";
import PaintChips from "@/components/PaintChips";
import { landscapes } from "@/data/landscapes";
import { projects } from "@/data/projects";
import { personal } from "@/data/personal";
import { ArrowUpRightIcon } from "@/icons";

export const metadata = {
  title: "projects | manya pradeep narayan",
  description:
    "things manya has built: ai habit coaches, zine makers, generative mobile apps, symbolic math engines, and data investigations.",
};

export default function ProjectsPage() {
  const land = landscapes.diablo;
  return (
    <Page land={land}>
      <PageHead land={land} title="projects" aside={`${projects.length} chips`} />
      <div className="wrap-wide enter-2">
        <p className="muted">
          a fan deck of things i&apos;ve built. pull a chip to read about it.
        </p>
        <PaintChips projects={projects} />
        <p className="deck-more pixel">
          <a href={personal.githubUrl} target="_blank" rel="noreferrer">
            more on {personal.github} <ArrowUpRightIcon size={13} />
          </a>
        </p>
      </div>
    </Page>
  );
}
