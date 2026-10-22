import Link from "next/link";
import Page from "@/components/Page";
import PageHead from "@/components/PageHead";
import { landscapes } from "@/data/landscapes";

export const metadata = { title: "404 | manya pradeep narayan" };

export default function NotFound() {
  const land = landscapes.gorge;
  return (
    <Page land={land}>
      <PageHead land={land} title="404" aside="nothing here" />
      <div className="wrap enter-2">
        <p>
          this trail doesn&apos;t go anywhere. <Link href="/">head home</Link>.
        </p>
      </div>
    </Page>
  );
}
