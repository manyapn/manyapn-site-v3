import Landscape from "@/components/Landscape";
import type { Landscape as Land } from "@/data/landscapes";

type Props = {
  land: Land;
  title: React.ReactNode;
  /** Shown under the painting on the right, e.g. a date or a read time. */
  aside?: React.ReactNode;
};

/**
 * Every page opens the same way: its landscape, a paper tag carrying the
 * title, and a small caption naming the place.
 */
export default function PageHead({ land, title, aside }: Props) {
  return (
    <header className="hero">
      <Landscape land={land} />
      <div className="wrap hero-label">
        <div className="hero-card">
          <h1>{title}</h1>
        </div>
        <div className="hero-meta pixel">
          <span>
            {land.place} · {land.width} × {land.height} px · {land.pigment}
          </span>
          {aside && <span>{aside}</span>}
        </div>
      </div>
    </header>
  );
}
