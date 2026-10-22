import Link from "next/link";
import Page from "@/components/Page";
import PageHead from "@/components/PageHead";
import { posts } from "@/data/posts";
import { getChaptersForPost } from "@/data/chapters";
import { landscapes } from "@/data/landscapes";
import { contentMap } from "@/lib/contentMap";
import { ArrowLeftIcon } from "@/icons";

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  return `${months[month - 1]} ${day}, ${year}`;
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} | manya pradeep narayan` : "2 cents",
    description: post?.description,
  };
}

export default async function PostOverviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  const chs = getChaptersForPost(slug);
  const land = landscapes.palouse;

  if (!post) {
    return <div className="wrap"><p className="muted">post not found.</p></div>;
  }

  const isSingle = chs.length === 1;
  const FlatContent = isSingle ? contentMap[`${slug}/${chs[0].slug}`] : null;

  return (
    <Page land={land}>
      <PageHead
        land={land}
        title={post.title}
        aside={`${post.tags.join(", ")} · ${formatDate(post.date)}`}
      />

      <div className="wrap enter-2">
        <p className="back-link pixel">
          <Link href="/2cents" className="bare"><ArrowLeftIcon size={13} /> 2cents</Link>
        </p>

        {isSingle && FlatContent ? (
          <article className="post-content">
            <FlatContent />
          </article>
        ) : (
          <>
            <p style={{ marginBottom: "2.2rem" }}>{post.description}</p>

            <div>
              {chs.map((ch) => (
                <Link key={ch.slug} href={`/2cents/${slug}/${ch.slug}`} className="chapter-card bare">
                  <p className="chapter-card-title">{ch.title}</p>
                  <span className="ch-time">ch.{ch.number} · {ch.readTime}</span>
                </Link>
              ))}
            </div>

            {slug === "255-days-later" && (
              <p className="source-note">
                originally a google doc:{" "}
                <a
                  href="https://docs.google.com/document/d/1Yv_rJcpkVpOfpRSluLj3vYUa9_RiVFql5RZREyUksSY/edit?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                >
                  read it there if you prefer
                </a>
                . some links here may be broken, but they all work in the doc.
              </p>
            )}
          </>
        )}
      </div>
    </Page>
  );
}
