export type ProjectLink = { label: string; url: string };

export type Project = {
  id: string;
  title: string;
  /** One line, in her voice. */
  description: string;
  tech: string;
  when: string;
  /** featured: resume-level work with real outcomes. more: smaller builds, class and hackathon work. writing: data stories and essays. */
  tier: "featured" | "more" | "writing";
  /** Short, true, specific. Shown only on featured strips. */
  facts?: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "checkpoint",
    title: "Checkpoint",
    description:
      "automatic version control for ai coding sessions. it records every file write as it happens, remembers who made it, and lets you undo an agent's turn without touching your own edits.",
    tech: "go · linux · fanotify",
    when: "jul – aug 2026",
    tier: "featured",
    facts: ["23 ms median undo", "203 adversarial, integration, and kernel-level tests", "byte-exact restore after rm -rf"],
    links: [{ label: "github", url: "https://github.com/manyapn/checkpoint-public" }],
  },
  {
    id: "tandem",
    title: "Tandem",
    description:
      "a text-based navigation app for people with accessibility concerns. it scores routes with claude vision over openstreetmap data and recommends the best one with photo evidence.",
    tech: "typescript · sqlite · claude api · google maps api",
    when: "oct 2026",
    tier: "featured",
    facts: ["2nd place, big red hacks design track", "multimodal route-scoring pipeline"],
    // add the repo or devpost link here when it's public
    links: [],
  },
  {
    id: "me-json",
    title: "me.json",
    description:
      "an open-source npm toolkit that turns a personal website into a small programmable place: visit it from a terminal, or connect an agent over mcp.",
    tech: "typescript · next.js · mcp",
    when: "jul 2026",
    tier: "featured",
    facts: ["one runtime, four surfaces: mcp, rest, tui, sdk", "policy-scoped actions the owner controls"],
    links: [{ label: "github", url: "https://github.com/manyapn/me.json" }],
  },
  {
    id: "ithaca-reuse",
    title: "Ithaca ReUse App",
    description:
      "rest apis powering the donation and sales workflows for ithaca reuse, a nonprofit that moves 800k+ items a year.",
    tech: "node.js · express · postgresql",
    when: "nov 2025 – now",
    tier: "featured",
    facts: ["92% line coverage", "scenario-based jest tests over endpoints, queries, auth, and failure paths"],
    links: [],
  },
  {
    id: "paperdiff",
    title: "PaperDiff",
    description:
      "two papers, two headlines, one apparent contradiction. paperdiff reads both primary sources and shows where the disagreement is real and where it's just scope.",
    tech: "javascript · llm pipeline",
    when: "jul 2026",
    tier: "more",
    links: [{ label: "github", url: "https://github.com/manyapn/paperdiff" }],
  },
  {
    id: "symbolic-equation-solver",
    title: "Symbolic Equation Solver",
    description:
      "an ocaml symbolic math engine with a latex lexer, a recursive-descent parser, an evaluator, and a two-player math race over tcp. written for cs 3110.",
    tech: "ocaml",
    when: "spring 2026",
    tier: "more",
    links: [{ label: "github", url: "https://github.com/manyapn/symbolic-equation-solver" }],
  },
  {
    id: "tiny-habit-coach",
    title: "Tiny Habit Coach",
    description:
      "an ai habit coach that helps you redesign a habit after a missed day instead of just counting streaks.",
    tech: "react · flask · claude api",
    when: "apr 2026",
    tier: "more",
    links: [
      { label: "live", url: "https://tiny-habit-coach.vercel.app/" },
      { label: "github", url: "https://github.com/manyapn/tiny-habit-coach" },
    ],
  },
  {
    id: "unofficial-cs-guide",
    title: "The Unofficial Cornell CS Guide",
    description:
      "a rag system for cs degree planning that pulls the course roster, requirements, cureviews, and ratemyprofessors into one place.",
    tech: "python · rag",
    when: "spring 2026",
    tier: "more",
    links: [{ label: "github", url: "https://github.com/manyapn/ai201-project1-unofficial-guide" }],
  },
  {
    id: "nanobanana",
    title: "NanoBanana",
    description: "an ios app for ai photo style transfer, built with a team at the cornell appdev hack challenge.",
    tech: "swift · node.js · postgresql · xai api",
    when: "spring 2026",
    tier: "more",
    links: [{ label: "github", url: "https://github.com/benyadabest/hackchallenge" }],
  },
  {
    id: "magicfold",
    title: "MagicFold",
    description: "a zine maker: design 8 panels, preview the flip book, download a print-ready pdf with fold guides.",
    tech: "next.js · fabric.js",
    when: "jan 2026",
    tier: "more",
    links: [{ label: "live", url: "https://magic-fold.vercel.app/" }],
  },
  {
    id: "sudoku-solver",
    title: "Sudoku Solver",
    description: "watch a backtracking solver work through a puzzle step by step.",
    tech: "flask · javascript",
    when: "jan 2026",
    tier: "more",
    links: [{ label: "live", url: "https://sudoku-solver-sable.vercel.app/" }],
  },
  {
    id: "boxer-analysis",
    title: "The Myth of the Undefeated Boxer",
    description: "a cornell data journal story analyzing 4,500+ boxing matches across 60 years.",
    tech: "python · pandas · beautifulsoup",
    when: "2025",
    tier: "writing",
    links: [
      {
        label: "read",
        url: "https://drive.google.com/file/d/1AklK5eIyK92vlWpr6OAhOCkkg2isP6X9/view?usp=sharing",
      },
    ],
  },
  {
    id: "brave-new-world",
    title: "Brave New World, a computational reading",
    description: "a computational humanities reading of huxley's novel through power, identity, and surveillance.",
    tech: "nlp · corpus analysis",
    when: "2026",
    tier: "writing",
    links: [
      {
        label: "read",
        url: "https://gracorossanigo.github.io/classic_novels_website/articles/brave-new-world.html",
      },
    ],
  },
];
