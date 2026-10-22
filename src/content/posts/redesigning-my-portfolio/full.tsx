import Highlight from "@/components/Highlight";

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function PageRef({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} className="page-ref">{children}</a>;
}

const palette = [
  { color: "#2d5a73", label: "heading" },
  { color: "#4f6f8f", label: "link" },
  { color: "#a8afd3", label: "lavender" },
  { color: "#8bb6c7", label: "teal" },
  { color: "#c9b06d", label: "gold" },
];

export default function RedesigningMyPortfolioFull() {
  return (
    <>
      <p>
        I just redesigned my personal site, and a few people asked how I did it! So here&apos;s
        the process I used, plus some tips. I&apos;m not a designer at all, so a lot of this is
        me figuring it out as I went.
      </p>

      <h2>Why have a portfolio?</h2>

      <p>A few reasons I think it&apos;s worth it:</p>

      <ul>
        <li>
          You get to control how you show up on the Internet, instead of letting a random search
          result do it for you.
        </li>
        <li>
          You can speak directly to people and share your personality in a way a resume can&apos;t.
        </li>
        <li>
          You can host and own your own content, instead of relying on platforms that can change
          their rules or disappear.
        </li>
        <li>It&apos;s fun!</li>
      </ul>

      <p>
        Especially with{" "}
        <Highlight variant="green">vibe-coding tools</Highlight>{" "}
        now, building a personal site is easier than ever. This isn&apos;t really going to go into
        how to use{" "}
        <A href="https://www.claude.com/product/claude-code">Claude Code</A>,{" "}
        <A href="https://openai.com/codex/">Codex</A>,{" "}
        <A href="https://cursor.com/">Cursor</A>,{" "}
        etc., but even if you&apos;re not experienced with or interested in CS/SWE I&apos;d highly recommend you
        check them out. Plus, building your own site is a great first project to get familiar with
        AI tools!
      </p>

      <h2>Ideation + themes</h2>

      <p>
        I knew from the start I was drawn to really simple, tasteful designs. I found a site
        called{" "}
        <A href="https://deadsimplesites.com/">deadsimplesites.com</A>{" "}
        that hosts a ton of websites in that style, and it was a great starting point. I&apos;d
        recommend finding these kinds of website archives so you can look at a lot of sites at
        once; for example, if you want the opposite vibe (more maximalist / y2k), check out{" "}
        <A href="https://neocities.org/">neocities.org</A>{" "}
        instead. So many sites to look at!
      </p>

      <p>Pull inspo from everywhere, not just other portfolios:</p>

      <ul>
        <li>
          I really like{" "}
          <A href="https://www.uniqlo.com/">UNIQLO</A>&apos;s design language, so I leaned into
          that. I used{" "}
          <A href="https://chatgpt.com/">ChatGPT</A>{" "}
          to help me find fonts that matched the &ldquo;vibe fit&rdquo; I wanted, then manually
          picked the ones I actually liked
        </li>
        <li>
          This is also how I landed on the{" "}
          <Highlight variant="blue">ascii cat</Highlight>
          <pre className="blog-cat" aria-hidden="true">{`_._     _,-'""\`-._\n(,-.\`._,'(       |\\\`-/|\n    \`-.-' \\ )-\`( , o o)\n          \`-    \\\`_\`"'-`}</pre>
          <span style={{ fontSize: "0.9rem", color: "var(--muted)", display: "block", marginTop: "0.35rem" }}>
            (I went down a rabbit hole looking at sites with ascii images, which led me to emojis, etc.)
          </span>
        </li>
        <li>
          I pulled the highlighter style from{" "}
          <Highlight variant="gold">Zebra Mildliners</Highlight>,{" "}
          because I&apos;m a big stationery person :)
        </li>
      </ul>

      <div className="post-key">
        <p>
          Take notes on what you like as you go. You can also ask something like{" "}
          <A href="https://chatgpt.com/">ChatGPT</A>{" "}
          to look at a site or multiple sites you love and name the specific elements that create
          the feeling you&apos;re after, or point out common patterns. Since I&apos;m not a
          designer, I used these tools to figure out what I actually liked and what tools +
          techniques they used, so I could recreate that same feeling in mine.
        </p>
      </div>

      <p>
        For example: I liked sites where you got a sense of the person outside their work. So I
        built that into my bio and made a{" "}
        <PageRef href="/now">/now</PageRef>{" "}
        page where I share the last movie I watched, what I&apos;m reading, etc. I also liked
        sites where you got a sense of how a person thinks, which is why I wanted a section for
        my own writing as well.
      </p>

      <p>
        Looking at a lot of references also helps you notice what you{" "}
        <em>don&apos;t</em>{" "}want.
        I realized that many of the sites I was saving had a pretty mature, masculine energy.
        That wasn&apos;t really reflective of who I am, so I consciously tried to bring in a
        little more color and personality through the font choices and highlight colors, aiming
        for something younger and a bit more feminine or androgynous.
      </p>

      <div className="post-key">
        <p>
          Another tip: use photos to build your color palette. I pulled a bunch of images I liked
          from my camera roll and online, and used them to develop my colors.
        </p>
        <div className="palette-row">
          {palette.map(({ color, label }) => (
            <div key={color} className="palette-swatch">
              <div className="palette-dot" style={{ background: color }} />
              <span className="palette-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <details className="further-reading">
        <summary>
          <span aria-hidden="true" style={{ color: "var(--link)" }}>+</span>
          further reading: colors, fonts &amp; site inspo
        </summary>
        <div className="further-reading-grid">
          <div className="further-reading-group">
            <span className="further-reading-label">colors</span>
            <ul>
              <li><A href="https://coolors.co">Coolors</A></li>
              <li><A href="https://realtimecolors.com">Realtime Colors</A></li>
              <li><A href="https://www.happyhues.co">Happy Hues</A></li>
              <li><A href="https://color.adobe.com">Adobe Color</A></li>
            </ul>
          </div>
          <div className="further-reading-group">
            <span className="further-reading-label">fonts</span>
            <ul>
              <li><A href="https://fonts.google.com">Google Fonts</A></li>
              <li><A href="https://www.fontshare.com">Fontshare</A></li>
              <li><A href="https://uncut.wtf">Uncut.wtf</A></li>
              <li><A href="https://fontesk.com">Fontesk</A></li>
            </ul>
          </div>
          <div className="further-reading-group">
            <span className="further-reading-label">sites &amp; archives</span>
            <ul>
              <li><A href="https://www.awwwards.com">Awwwards</A></li>
              <li><A href="https://godly.website">Godly</A></li>
              <li><A href="https://www.lapa.ninja">Lapa Ninja</A></li>
              <li><A href="https://land-book.com">Land-book</A></li>
              <li><A href="https://minimal.gallery">Minimal Gallery</A></li>
            </ul>
          </div>
        </div>
      </details>

      <h2>Build process</h2>

      <p>Once you get a sense of what you like, build the site! Here was my general process:</p>

      <ol className="build-steps">
        <li>
          I started with writing a doc containing all the info I wanted on the site, as well as my
          goals with the site and strategy to reach those goals, organized into pages. That way{" "}
          <Highlight variant="lavender">the content drove the design</Highlight>
        </li>
        <li>
          I used{" "}
          <A href="https://chatgpt.com/">ChatGPT</A>{" "}
          to generate a PRD from my inspo + info, and revised it until I was happy
        </li>
        <li>
          I used AI design tools to generate mock ups of this site, which helped me refine my color
          palette and font choices (important for this small, text-driven website).
          <ol>
            <li>
              I personally used{" "}
              <A href="https://stitch.withgoogle.com/">Gemini Stitch</A>,{" "}
              which I found was good to see the &ldquo;vibe&rdquo; of the site - less good in
              terms of accurately representing all my information from the get go - but any design
              tool would work (
              <A href="https://www.figma.com/make/">Figma Make</A>,{" "}
              <A href="https://claude.com/product/claude-design">Claude Design</A>, etc)
            </li>
          </ol>
        </li>
        <li>
          I iterated on Stitch, had it also generate a PRD for me, and consolidated it with the
          original ChatGPT PRD
        </li>
        <li>
          I used Claude (planning mode) to build out an initial outline of the site. To stay away
          from{" "}
          <Highlight variant="lavender">AI slop</Highlight>,{" "}
          I clearly defined fonts, color palette, etc. up front in the PRD I wrote with ChatGPT
          and Stitch, as well as the tech stack, libraries, structure of the website, etc.
        </li>
        <li>Once I was happy with the plan, I handed it to Claude to build</li>
        <li>
          I used Claude skills to refine the website after building the first version out.{" "}
          <A href="https://github.com/pbakaus/impeccable">Impeccable</A>{" "}
          was great here since it has a lot of anti-slop checks built in. The ones I liked:
          <ul>
            <li>
              <code>/impeccable delight</code>{" "}for interaction design
            </li>
            <li>
              <code>/impeccable typography</code>{" "}to cut down on cognitive overload and keep
              things easy to read
            </li>
            <li>
              <code>/impeccable critique</code>{" "}to run the site through a few sample user studies
            </li>
            <li>
              <code>/impeccable colorize</code>{" "}to bring color in where you wouldn&apos;t
              expect it
            </li>
          </ul>
        </li>
        <li>I stepped away for a couple days, came back with fresh eyes, and did my own revisions.</li>
        <li>Repeat steps 7 and 8 until you&apos;re happy with it!</li>
      </ol>

      {/* Site screenshot — the finished result */}
      <img
        src="/blog/site-preview.png"
        alt="the finished site: home page with ascii cat, mildliner highlights, and teal color scheme"
        className="blog-image"
      />
      <p className="blog-image-caption">the finished site</p>

      <h2>Why this tech stack</h2>

      <p>
        I built the site with{" "}
        <A href="https://nextjs.org/">Next.js</A>{" "}
        (App Router),{" "}
        <A href="https://tailwindcss.com/">Tailwind CSS</A>,{" "}
        and{" "}
        <A href="https://www.framer.com/motion/">Framer Motion</A>,{" "}
        all in TypeScript. Some thoughts:
      </p>

      <ul>
        <li>
          <strong>Next.js</strong>: I wanted separate pages ({" "}
          <PageRef href="/now">/now</PageRef>,{" "}
          <PageRef href="/experiences">/experiences</PageRef>,{" "}
          <PageRef href="/projects">/projects</PageRef>,{" "}
          <PageRef href="/2cents">/2cents</PageRef>), not one giant scroll. The App Router makes that clean, and it exports to plain
          static files, which is exactly what GitHub Pages (where I wanted to deploy the site)
          wants.
        </li>
        <li>
          <strong>Framer Motion</strong>: the microinteractions were a big part of the{" "}
          <Highlight variant="gold">&ldquo;fun but tasteful&rdquo;</Highlight>{" "}
          feeling I was after. Framer made the little hovers and transitions easy without writing
          animation logic by hand.
        </li>
      </ul>

      <p>
        Honestly the stack is probably heavier than a personal site needs, but it gave me room to
        do the interactions I cared about.
      </p>

      <h2>Deploy</h2>

      <p>
        I used GitHub Pages, since my old site already lived at that domain and other pages on the
        web link to it.
      </p>

      <p>
        One thing to know: GitHub Pages only serves static files, so Next.js doesn&apos;t just
        work if you push it. You have to tell Next.js to do a static export (
        <code>output: &apos;export&apos;</code>{" "}
        in{" "}
        <code>next.config.ts</code>), then deploy the built files. I have a GitHub Actions
        workflow in the repo that builds and deploys automatically every time I push to main, so I
        never have to do it by hand.
      </p>

      <p>
        If you want to deploy your site on GitHub Pages, here&apos;s some more info.
      </p>

      <ul>
        <li>
          <A href="https://docs.github.com/en/pages">GitHub Pages docs</A>: the basics of how
          Pages works, user vs project sites, custom domains
        </li>
        <li>
          <A href="https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site">
            Configuring a publishing source with GitHub Actions
          </A>: for the auto-deploy-on-push setup
        </li>
      </ul>

      <hr className="divider" />

      <p>
        That&apos;s it! If you&apos;re putting your own site together, the biggest thing I&apos;d
        say is let what you want to share drive the design, and don&apos;t be afraid to borrow
        taste from places that have nothing to do with portfolios.
      </p>
    </>
  );
}
