export type Chapter = {
  postSlug: string;
  slug: string;
  number: number;
  title: string;
  description: string;
  readTime: string;
  minutes: number;
};

export const chapters: Chapter[] = [
  {
    postSlug: "claude-voice-skill",
    slug: "full",
    number: 1,
    title: "I Built a Claude Skill Trained on My Own Voice",
    description: "Building a voice skill from scratch: collecting writing, naming habits, writing rules, and testing until it sounds right.",
    readTime: "~3 min",
    minutes: 3,
  },
  {
    postSlug: "redesigning-my-portfolio",
    slug: "full",
    number: 1,
    title: "Process + Tips",
    description: "Ideation, themes, build process, tech stack, and deploy.",
    readTime: "~8 min",
    minutes: 8,
  },
  {
    postSlug: "255-days-later",
    slug: "things-to-keep-in-mind",
    number: 1,
    title: "Things to Keep in Mind",
    description: "Major choice, competitive programs, and a few things to know before you start.",
    readTime: "~3 min",
    minutes: 3,
  },
  {
    postSlug: "255-days-later",
    slug: "building-a-college-list",
    number: 2,
    title: "Building a College List",
    description: "Safeties, reaches, lotteries, EA/ED/REA/RD explained, application portals, and finances.",
    readTime: "~12 min",
    minutes: 12,
  },
  {
    postSlug: "255-days-later",
    slug: "building-your-application",
    number: 3,
    title: "Building Your Application",
    description: "Organization, activities list, personal statement, supplementals, LORs, and demonstrated interest.",
    readTime: "~18 min",
    minutes: 18,
  },
  {
    postSlug: "255-days-later",
    slug: "after-you-submit",
    number: 4,
    title: "After You Submit",
    description: "Tracking your portals, navigating interviews, and surviving the wait.",
    readTime: "~6 min",
    minutes: 6,
  },
  {
    postSlug: "255-days-later",
    slug: "decisions",
    number: 5,
    title: "Decisions",
    description: "How to handle rejections, deferrals, waitlists, alternate pathways, and acceptances.",
    readTime: "~7 min",
    minutes: 7,
  },
  {
    postSlug: "255-days-later",
    slug: "and-its-over",
    number: 6,
    title: "Annnnnd it's over!",
    description: "Final checklist and what to actually do once you've committed.",
    readTime: "~2 min",
    minutes: 2,
  },
];

export function getChaptersForPost(postSlug: string): Chapter[] {
  return chapters.filter((c) => c.postSlug === postSlug);
}
