export type ProjectLink = {
  label: string;
  url: string;
};

/**
 * Polaroid art. `ascii` ships today; swap a single project to `image` by
 * changing this one field (see scripts/image-to-ascii.mjs for converting
 * a generated image into the ascii form).
 */
export type ProjectArt =
  | { kind: "ascii"; value: string; alt: string }
  | { kind: "image"; src: string; alt: string };

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string;
  art: ProjectArt;
  links: ProjectLink[];
  /** Matches a command in the terminal playground, when one exists. */
  demo?: string;
};

export const projects: Project[] = [
  {
    id: "checkpoint",
    title: "Checkpoint",
    description:
      "automatic version control for ai coding sessions. it preserves the transient work agents throw away and lets you revert an agent independently of git.",
    tech: "go · linux · fanotify",
    art: {
      kind: "ascii",
      alt: "A commit line branching off into an undo arrow",
      value: String.raw`
  ●──●──●──●
           ╲
            ╲
             ↶
 ╌╌╌╌╌╌╌╌╌╌╌╌╌
   23ms undo
`,
    },
    links: [{ label: "github", url: "https://github.com/manyapn/checkpoint-public" }],
    demo: "checkpoint",
  },
  {
    id: "me-json",
    title: "me.json",
    description:
      "an open-source npm toolkit that turns a personal website into a small programmable place: visit it from a terminal, or connect an agent over mcp.",
    tech: "typescript · next.js · mcp",
    art: {
      kind: "ascii",
      alt: "A small terminal window containing a JSON object",
      value: String.raw`
  ╭───────────╮
  │ >_        │
  │           │
  │  { me }   │
  ╰───────────╯
   npx me-json
`,
    },
    links: [{ label: "github", url: "https://github.com/manyapn/me.json" }],
    demo: "me-json",
  },
  {
    id: "symbolic-equation-solver",
    title: "Symbolic Equation Solver",
    description:
      "a latex-based symbolic math engine with a lexer, parser, ast, and a two-player tcp game played over the terminal.",
    tech: "ocaml",
    art: {
      kind: "ascii",
      alt: "A quadratic expression being factored",
      value: String.raw`
   x² + 2x + 1
  ─────────────
        ↓
    (x + 1)²
`,
    },
    links: [
      {
        label: "github",
        url: "https://github.coecis.cornell.edu/bws72/3110-Team-Project",
      },
    ],
    demo: "solve",
  },
  {
    id: "ithaca-reuse",
    title: "Ithaca ReUse App",
    description:
      "rest apis powering the donation and sales workflows for ithaca reuse, a nonprofit that moves 800k+ items a year. jest tests cover endpoints, queries, auth, and failure paths at 92% line coverage.",
    tech: "node.js · express · postgresql",
    art: {
      kind: "ascii",
      alt: "A recycling loop above an item count",
      value: String.raw`
    ╭──→──╮
    ↑     ↓
    ╰──←──╯
  800k+ items
     a year
`,
    },
    links: [],
    demo: "reuse",
  },
  {
    id: "tiny-habit-coach",
    title: "Tiny Habit Coach",
    description:
      "an ai habit coach that helps people redesign habits after missed days, instead of just tracking streaks.",
    tech: "react · flask · claude api",
    art: {
      kind: "ascii",
      alt: "A row of habit dots with one missed day",
      value: String.raw`
  ● ● ● ○ ● ●
        ╷
     missed
  ╌╌╌╌╌╌╌╌╌╌╌
   start again
`,
    },
    links: [
      { label: "live", url: "https://tiny-habit-coach.vercel.app/" },
      { label: "github", url: "https://github.com/manyapn/tiny-habit-coach" },
    ],
  },
  {
    id: "magicfold",
    title: "MagicFold",
    description:
      "a web-based zine maker for designing 8-panel digital zines, previewing them as flip books, and downloading print-ready pdfs.",
    tech: "react · next.js · typescript",
    art: {
      kind: "ascii",
      alt: "An eight-panel zine grid",
      value: String.raw`
  ┌──┬──┬──┬──┐
  │  │  │  │  │
  ├──┼──┼──┼──┤
  │  │  │  │  │
  └──┴──┴──┴──┘
     fold ×3
`,
    },
    links: [{ label: "live", url: "https://magic-fold.vercel.app/" }],
  },
  {
    id: "sudoku-solver",
    title: "Sudoku Solver",
    description:
      "a sudoku visualizer that shows a backtracking algorithm solving puzzles in real time.",
    tech: "flask · javascript",
    art: {
      kind: "ascii",
      alt: "A partially filled sudoku grid",
      value: String.raw`
  ┌───┬───┬───┐
  │ 5 │ 3 │ · │
  ├───┼───┼───┤
  │ · │ 7 │ · │
  ├───┼───┼───┤
  │ 6 │ · │ 1 │
  └───┴───┴───┘
`,
    },
    links: [{ label: "live", url: "https://sudoku-solver-sable.vercel.app/" }],
  },
  {
    id: "nanobanana",
    title: "NanoBanana",
    description:
      "a generative ai mobile app for real-time image creation and sharing, built at the cornell appdev hack challenge.",
    tech: "node.js · postgresql · swift · xai api",
    art: {
      kind: "ascii",
      alt: "A banana",
      value: String.raw`
      .-.
     (   '.
      '.   '.
        '.   )
          '-'
     generate
`,
    },
    links: [{ label: "github", url: "https://github.com/benyadabest/hackchallenge" }],
  },
  {
    id: "boxer-analysis",
    title: "The Myth of the Undefeated Boxer",
    description:
      "a cornell data journal story analyzing 4,500+ boxing matches across 60 years.",
    tech: "python · pandas · beautifulsoup",
    art: {
      kind: "ascii",
      alt: "A boxing glove above a match count",
      value: String.raw`

           *%+==%@+
     =##@*#@ +**@@@@*
    %=-#@*%@@@@@@@@@@@-
   -@=@@@+@@@@@@@@@@@@@#
   +@@@@@*@@@@@@@@@@@@@@-
   -@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@%
    #@@@@@@@@@@@@@@@%:
    @%##@@@@@@@@@@+
   @:=@@%##%@@%+.
  +#+@@@@@@@@
  =+*##%@@@@.
      -=+##:
`,
    },
    links: [
      {
        label: "read",
        url: "https://drive.google.com/file/d/1AklK5eIyK92vlWpr6OAhOCkkg2isP6X9/view?usp=sharing",
      },
    ],
  },
  {
    id: "brave-new-world",
    title: "Brave New World Computational Analysis",
    description:
      "a computational humanities reading of huxley's novel through power, identity, and surveillance.",
    tech: "nlp · corpus analysis",
    art: {
      kind: "ascii",
      alt: "An open book",
      value: String.raw`
    ______
   /|    |\
  / |    | \
 |  |    |  |
  \_|____|_/
`,
    },
    links: [
      {
        label: "read",
        url: "https://gracorossanigo.github.io/classic_novels_website/articles/brave-new-world.html",
      },
    ],
  },
];
