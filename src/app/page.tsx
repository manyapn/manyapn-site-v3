import Link from "next/link";
import EmailLink from "@/components/EmailLink";
import Portrait from "@/components/Portrait";
import Page from "@/components/Page";
import PageHead from "@/components/PageHead";
import Tip from "@/components/Tip";
import Wash from "@/components/Wash";
import { landscapes } from "@/data/landscapes";
import { personal } from "@/data/personal";
import { GithubBrandIcon, LinkedinBrandIcon } from "@/icons";

export const metadata = {
  title: { absolute: "manya pradeep narayan" },
  description: "manya pradeep narayan: cs + ai student at cornell, from seattle. agentic systems, human-ai interaction, and software that feels personal. projects, experience, writing, and a pixel travel map.",
};

export default function Home() {
  const land = landscapes.rainier;
  return (
    <Page land={land} className="page-home">
      <PageHead land={land} title={<>hi, i&apos;m manya!</>} />

      <div className="wrap-wide enter-2 home-grid">
        <Portrait src="/manya.jpg" alt="me in a green sweater by the water" />
        <div className="home-text">
        <p className="lede">
          i&apos;m from <Wash pigment="rose">seattle</Wash>, and i&apos;m studying{" "}
          <Wash pigment="cobalt">cs + ai</Wash>{" "}at cornell university. lately, i&apos;ve been
          interested in <Wash pigment="lavender">agentic systems</Wash>,{" "}
          <Wash pigment="viridian">human-ai interaction</Wash>, and what makes software feel{" "}
          <Wash pigment="ochre">reliable, useful, and personal</Wash>.
        </p>

        <p>
          outside of work, some things that make me happy are trying new cafes and restaurants,
          68°F weather, social logging apps &amp; micro-communities{" "}
          <em>
            (<a href="https://retro.app/" target="_blank" rel="noopener noreferrer">loving retro right now</a>)
          </em>
          , reading, collecting home depot paint chips, <Tip text="(mine is the canon powershot elph 340 hs)">digi cams</Tip>, <Link href="/fun">traveling</Link>, trip planning,
          watching movies, and spending lots of time with friends and family.
        </p>

        <p>
          i&apos;d love to chat! reach me at <EmailLink email={personal.email} />.
        </p>

        <p className="contact-row pixel">
          <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="bare muted">
            <GithubBrandIcon size={14} /> {personal.github}
          </a>
          <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="bare muted">
            <LinkedinBrandIcon size={14} /> {personal.linkedin}
          </a>
        </p>
        </div>
      </div>
    </Page>
  );
}
