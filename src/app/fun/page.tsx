import Page from "@/components/Page";
import PageHead from "@/components/PageHead";
import TravelMap from "@/components/TravelMap";
import { landscapes } from "@/data/landscapes";
import { funPhotoCount, funPlaces } from "@/data/fun";

export const metadata = {
  title: "fun",
  description: "a pixel map of places manya has been, with photos from each one.",
};

export default function FunPage() {
  const land = landscapes.montroyal;
  return (
    <Page land={land}>
      <PageHead land={land} title="fun" aside={`${funPlaces.length} places · ${funPhotoCount} photos`} />

      <div className="wrap enter-2">
        <p className="lede">
          i love traveling, and i love trip planning almost as much. here&apos;s everywhere i&apos;ve made it
          to so far, in pixels. click a pin (or a name under the map) for photos.
        </p>
        <TravelMap />
      </div>
    </Page>
  );
}
