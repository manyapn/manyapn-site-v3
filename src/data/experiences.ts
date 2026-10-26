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
    id: "finmd",
    period: "jun '26 – now",
    start: "2026-06",
    end: null,
    role: "Software Engineering Intern, Data, Platform & Product",
    org: "FinMD",
    short: "FinMD",
    orgUrl: "https://www.finmd.com/",
    description:
      "building data products for a healthcare lending platform.",
    category: "internship",
    current: true,
  },
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
      "researching commercial browser agent susceptibility to deceptive web design.",
    category: "research",
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
      "building an llm pipeline that finds accessibility issues in android talkback traces.",
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
      "backend developer for ithaca reuse's inventory, donation, and sales apis.",
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
      "narrative geography data and annotation guidelines for computational humanities research.",
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
      "built engagify, an ai lesson revision tool with a rag backend.",
    category: "internship",
    current: false,
  },
  {
    id: "deca",
    period: "mar '23 – apr '25",
    start: "2023-03",
    end: "2025-04",
    role: "State President",
    org: "Washington DECA",
    short: "WA DECA",
    orgUrl: "https://wadeca.org/",
    description:
      "led a statewide student org of 17,000+ members across 165+ chapters.",
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
