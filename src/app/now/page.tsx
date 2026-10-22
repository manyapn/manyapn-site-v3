import Page from "@/components/Page";
import PageHead from "@/components/PageHead";
import Wash from "@/components/Wash";
import { landscapes, pxSrc } from "@/data/landscapes";
import { nowData } from "@/data/now";
import { getLetterboxd, letterboxdUrl } from "@/lib/letterboxd";
import { getLatestPush } from "@/lib/github";

export const metadata = {
  title: "now | manya pradeep narayan",
  description:
    "what manya is up to right now: researching agentic browser security at uw, engineering at finmd, and spending the summer in seattle.",
};

export default async function NowPage() {
  const land = landscapes.kerry;
  const [{ latestFilm, filmCount }, latestPush] = await Promise.all([
    getLetterboxd({ film: nowData.fallbackMovie, filmCount: nowData.fallbackFilmCount }),
    getLatestPush(),
  ]);

  return (
    <Page land={land}>
      <PageHead land={land} title="now" aside={`last updated ${nowData.lastUpdated}`} />

      <div className="wrap enter-2">
        <p className="lede">
          this summer, i&apos;m back in <Wash pigment="lavender">seattle</Wash>!
        </p>

        <p className="muted" style={{ marginTop: "1.4rem" }}>i&apos;m currently:</p>
        <ul className="now-list" role="list">
          <li><span>researching <Wash pigment="lavender">agentic browser security</Wash> @ uw security &amp; privacy lab</span></li>
          <li><span>doing <Wash pigment="cobalt">full-stack/product engineering</Wash> @ finmd</span></li>
          <li><span>upskilling in <Wash pigment="viridian">ai engineering, ml</Wash>, etc etc</span></li>
          <li><span>hoping to attend cool events and meet cool people :)</span></li>
        </ul>

        <section className="notes" aria-label="other fun stuff">
          <div>
            <h2>other fun stuff</h2>
            <ul role="list">
              <li><span>reading <Wash pigment="ochre">{nowData.reading}</Wash></span></li>
              <li>
                continuing foodie adventures on{" "}
                <a href={nowData.beliUrl} target="_blank" rel="noreferrer">beli</a>
              </li>
              <li>
                <a href={letterboxdUrl} target="_blank" rel="noreferrer">
                  {filmCount === null ? "on letterboxd" : `logged ${filmCount} films on letterboxd`}
                </a>{" "}
                (last watched <em>{latestFilm}</em>)
              </li>
              {latestPush && (
                <li>
                  last pushed to{" "}
                  <a href={latestPush.url} target="_blank" rel="noreferrer">{latestPush.repo}</a>
                </li>
              )}
            </ul>
          </div>
          <figure className="notes-pic">
            <img
              src={pxSrc(landscapes.pike)}
              width={landscapes.pike.width}
              height={landscapes.pike.height}
              alt={landscapes.pike.alt}
            />
            <figcaption className="pixel">{landscapes.pike.place}</figcaption>
          </figure>
        </section>
      </div>
    </Page>
  );
}
