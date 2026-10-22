export type Experience = {
  id: string;
  /** Human-readable range shown in the entry. */
  period: string;
  /** "YYYY-MM" start, used to position the bar on the time axis. */
  start: string;
  /** "YYYY-MM" end, or null when the role is ongoing. */
  end: string | null;
  role: string;
  org: string;
  /** Compact label for the chart's row gutter. */
  short: string;
  orgUrl?: string;
  description: string;
  collaborator?: { name: string; url: string };
  category: "research" | "internship" | "club";
  current: boolean;
};

/** Ordered newest first. Split into "currently" / "previously" by `current`. */
export const experiences: Experience[] = [
  {
    id: "uw-security",
    period: "jun '26 – now",
    start: "2026-06",
    end: null,
    role: "Research Intern",
    org: "UW Security & Privacy Lab",
    short: "UW Security",
    orgUrl: "https://www.franziroesner.com/students.html",
    description:
      "leading an nsf-funded, first-author study on how browser agents hold up against deceptive web design. built three playwright/cdp harnesses and crash-safe experiment infrastructure for unattended runs, and found scaffold failure modes in comet, claude-in-chrome, and others.",
    category: "research",
    current: true,
  },
  {
    id: "finmd",
    period: "jun '26 – now",
    start: "2026-06",
    end: null,
    role: "Software Engineering Intern, Data & Product",
    org: "FinMD",
    short: "FinMD",
    orgUrl: "https://www.finmd.com/",
    description:
      "built terrain end to end, a national risk map of housing and physician data for a $35b bank demo. also a scrapy crawler enriching a 1.1m-physician registry, and an llm pipeline that writes talking points for bankers with 97.2% grounding across 250 held-out cases.",
    category: "internship",
    current: true,
  },
  {
    id: "uw-ra",
    period: "apr '26 – now",
    start: "2026-04",
    end: null,
    role: "Research Assistant",
    org: "UW Human-Computer Interaction Lab",
    short: "UW HCI",
    description:
      "built a reusable llm pipeline analyzing android talkback traces for accessibility issues affecting blind users. cut token spend 67–81% by compacting view trees, and found 5 new failures across 9 task traces.",
    collaborator: { name: "mingyuan zhong", url: "https://mingyuanz.com/" },
    category: "research",
    current: true,
  },
  {
    id: "ewb",
    period: "nov '25 – now",
    start: "2025-11",
    end: null,
    role: "Backend Developer",
    org: "Cornell Engineers Without Borders",
    short: "EWB",
    orgUrl: "https://www.ewbcornell.org/software-development",
    description:
      "building node/express rest apis for the inventory, donation, and sales workflows behind ithaca reuse, a nonprofit moving 800k+ items a year.",
    category: "club",
    current: true,
  },
  {
    id: "cornell-c2l",
    period: "jan – may '26",
    start: "2026-01",
    end: "2026-05",
    role: "Undergraduate Research Assistant",
    org: "Cornell Culture & Computation Lab",
    short: "Cornell C2L",
    orgUrl: "https://c2l.infosci.cornell.edu/",
    description:
      "worked on narrative geography data, annotation guidelines, and computational humanities research.",
    category: "research",
    current: false,
  },
  {
    id: "lessonloop",
    period: "sep '25 – apr '26",
    start: "2025-09",
    end: "2026-04",
    role: "Software Engineering Intern",
    org: "LessonLoop",
    short: "LessonLoop",
    orgUrl: "https://lessonloop.org/our-platform/",
    description:
      "built engagify (vue/nuxt, node.js, aws bedrock), an ai lesson revision tool that raised student engagement 17%, with a rag backend over a 2,500+ item knowledge base.",
    category: "internship",
    current: false,
  },
  {
    id: "deca",
    period: "mar '24 – apr '25",
    start: "2024-03",
    end: "2025-04",
    role: "State President",
    org: "Washington DECA",
    short: "WA DECA",
    orgUrl: "https://wadeca.org/",
    description:
      "led a statewide student organization of 17,000+ members across 165+ chapters.",
    category: "club",
    current: false,
  },
];

export type ClubMention = {
  org: string;
  role: string;
  url?: string;
};

/** Smaller campus involvements, shown as one grouped line rather than entries. */
export const cornellClubs: ClubMention[] = [
  {
    org: "Kappa Theta Pi",
    role: "vp marketing",
    url: "https://www.ktpcornell.com/",
  },
  { org: "Women in Computing", role: "technical committee" },
  // CDJ has no author pages, so this points at her own work instead.
  { org: "Cornell Data Journal", role: "analyst", url: "/projects" },
];
