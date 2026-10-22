"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { posts, allTags, type TagFilter } from "@/data/posts";

export default function PostsArchive() {
  const [active, setActive] = useState<TagFilter>("all");

  const visible = active === "all" ? posts : posts.filter((p) => p.tags.includes(active));

  const byYear = visible.reduce<Record<number, typeof posts>>((acc, p) => {
    (acc[p.year] ??= []).push(p);
    return acc;
  }, {});
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  return (
    <>
      <div className="tags pixel" role="group" aria-label="filter by tag">
        {allTags.map((tag) => (
          <button
            key={tag}
            className="tag press"
            onClick={() => setActive(tag)}
            aria-pressed={active === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          {years.map((year) => (
            <section key={year}>
              {years.length > 1 && <h2 className="post-year">{year}</h2>}
              {byYear[year].map((post) => (
                <article key={post.slug} className="post-entry">
                  <span className="post-entry-dot" aria-hidden="true" />
                  <div>
                    <h3 className="post-title">
                      <Link href={`/2cents/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="post-meta pixel">
                      {post.tags.join(", ")} · {post.readTime}
                    </p>
                    <p className="post-desc">{post.description}</p>
                  </div>
                </article>
              ))}
            </section>
          ))}
          {visible.length === 0 && <p className="muted">nothing here yet.</p>}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
