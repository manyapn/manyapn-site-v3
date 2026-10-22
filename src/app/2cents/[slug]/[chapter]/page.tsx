import Link from "next/link";
import Page from "@/components/Page";
import { chapters, getChaptersForPost } from "@/data/chapters";
import { posts } from "@/data/posts";
import { landscapes } from "@/data/landscapes";
import { contentMap } from "@/lib/contentMap";
import { ArrowLeftIcon } from "@/icons";

export function generateStaticParams() {
  return chapters.map((ch) => ({ slug: ch.postSlug, chapter: ch.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; chapter: string }> }) {
  const { slug, chapter } = await params;
  const post = posts.find((p) => p.slug === slug);
  const ch = chapters.find((c) => c.postSlug === slug && c.slug === chapter);
  return {
    title: ch ? `${ch.title} | ${post?.title ?? "2 cents"}` : "2 cents",
    description: ch?.description,
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string; chapter: string }> }) {
  const { slug, chapter } = await params;
  const post = posts.find((p) => p.slug === slug);
  const all = getChaptersForPost(slug);
  const idx = all.findIndex((c) => c.slug === chapter);
  const current = all[idx];
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;
  const Content = contentMap[`${slug}/${chapter}`];

  if (!post || !current || !Content) {
    return <div className="wrap"><p className="muted">chapter not found.</p></div>;
  }

  /* Chapters skip the landscape: readers came here for the text. */
  return (
    <Page land={landscapes.palouse}>
      <div className="wrap enter" style={{ paddingTop: "2.5rem" }}>
        <p className="back-link pixel">
          <Link href={`/2cents/${slug}`} className="bare"><ArrowLeftIcon size={13} /> {post.title}</Link>
        </p>

        <header style={{ marginBottom: "2.4rem" }}>
          <p className="ch-num" style={{ marginBottom: "0.6rem" }}>ch.{current.number} · {current.readTime}</p>
          <h1>{current.title}</h1>
        </header>

        <article className="post-content">
          <Content />
        </article>

        <nav className="chapter-nav" aria-label="Chapter navigation">
          <span>
            {prev && <Link href={`/2cents/${slug}/${prev.slug}`}>← ch.{prev.number} {prev.title}</Link>}
          </span>
          <span>
            {next && <Link href={`/2cents/${slug}/${next.slug}`}>ch.{next.number} {next.title} →</Link>}
          </span>
        </nav>
      </div>
    </Page>
  );
}
