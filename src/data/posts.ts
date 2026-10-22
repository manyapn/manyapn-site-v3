export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  year: number;
  tags: string[];
  description: string;
  readTime: string;
};

export const posts: Post[] = [
  {
    slug: "claude-voice-skill",
    title: "I Built a Claude Skill Trained on My Own Voice",
    subtitle: "writing · jun 16, 2026",
    date: "2026-06-16",
    year: 2026,
    tags: ["writing", "ai"],
    description: "I kept asking Claude to write things in my voice, and it kept getting close but not quite there. Here's how I built a skill to fix that.",
    readTime: "1 chapter",
  },
  {
    slug: "redesigning-my-portfolio",
    title: "Redesigning My Portfolio: Process + Tips",
    subtitle: "how i built this site",
    date: "2026-06-04",
    year: 2026,
    tags: ["design"],
    description: "I'm not a designer at all, so a lot of this is me figuring it out as I went! Here's the process I used, plus some tips.",
    readTime: "1 chapter",
  },
  {
    slug: "255-days-later",
    title: "255 Days Later...",
    subtitle: "A College Application Journey",
    date: "2025-03-31",
    year: 2025,
    tags: ["college", "advice"],
    description: "I started my college apps on July 17th, 2024. I'm writing this on March 31, 2025, and I just received my final decision. Here's everything I wish I'd known.",
    readTime: "6 chapters",
  },
];

export const allTags = ["all", "college", "advice", "design", "writing", "ai"] as const;
export type TagFilter = (typeof allTags)[number];
