import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { chapters } from "@/data/chapters";

export const dynamic = "force-static";

const BASE = "https://manyapn.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1 },
    { url: `${BASE}/now`, priority: 0.9 },
    { url: `${BASE}/experiences`, priority: 0.8 },
    { url: `${BASE}/projects`, priority: 0.8 },
    { url: `${BASE}/2cents`, priority: 0.8 },
  ];
  const postPages = posts.map((p) => ({ url: `${BASE}/2cents/${p.slug}`, priority: 0.7 }));
  const chapterPages = chapters
    .filter((c) => chapters.filter((s) => s.postSlug === c.postSlug).length > 1)
    .map((c) => ({ url: `${BASE}/2cents/${c.postSlug}/${c.slug}`, priority: 0.6 }));
  return [...pages, ...postPages, ...chapterPages];
}
