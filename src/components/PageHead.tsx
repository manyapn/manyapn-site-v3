import Landscape from "@/components/Landscape";
import type { Landscape as Land } from "@/data/landscapes";

type Props = {
  land: Land;
  title: React.ReactNode;
  /** Shown under the painting on the right, e.g. a date or a count. */
  aside?: React.ReactNode;
};

/**
 * Every page opens the same way: its landscape, a paper tag carrying the
 * title, a caption naming the place and crediting the photo, and the pixel
 * control.
 */
export default function PageHead({ land, title, aside }: Props) {
  const c = land.credit;
  return (
    <header className="hero">
      <Landscape land={land} />
      <div className="wrap hero-label">
        <div className="hero-card">
          <h1>{title}</h1>
        </div>
        <div className="hero-meta pixel">
          <span>
            {land.place} · {land.pigment} · photo{" "}
            <a href={c.page} target="_blank" rel="noreferrer">{c.artist}</a>
            {c.licenseUrl ? (
              <>, <a href={c.licenseUrl} target="_blank" rel="noreferrer">{c.license}</a></>
            ) : (
              <>, {c.license}</>
            )}
          </span>
          {aside && <span>{aside}</span>}
        </div>
      </div>
    </header>
  );
}
