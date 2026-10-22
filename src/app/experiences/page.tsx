import ExperienceTimeline from "@/components/ExperienceTimeline";
import Page from "@/components/Page";
import PageHead from "@/components/PageHead";
import { experiences, cornellClubs } from "@/data/experiences";
import { landscapes } from "@/data/landscapes";
import { ArrowUpRightIcon } from "@/icons";

export const metadata = {
  title: "experiences | manya pradeep narayan",
  description:
    "manya's experience timeline: security research at uw, engineering at finmd, cornell research, ewb, and more.",
};

export default function ExperiencesPage() {
  const land = landscapes.everest;
  // Resolved at build time; the daily rebuild keeps the "now" marker honest.
  const d = new Date();
  const now = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;

  return (
    <Page land={land}>
      <PageHead land={land} title="experiences" />
      <div className="wrap enter-2">
        <p className="xp-resume">
          <a href="/manya-pradeep-narayan-resume.pdf" target="_blank" rel="noreferrer">
            resume <ArrowUpRightIcon size={14} />
          </a>
          <span className="xp-resume-note pixel">pdf, the formal version</span>
        </p>
        <ExperienceTimeline entries={experiences} clubs={cornellClubs} now={now} />
      </div>
    </Page>
  );
}
