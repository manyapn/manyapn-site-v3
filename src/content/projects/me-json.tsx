export default function MeJsonWriteup() {
  return (
    <>
      <p>
        me.json is an npm toolkit that turns a personal website into something you can visit from
        a terminal or connect an agent to over MCP, with the owner deciding what&apos;s allowed.
        You run <code>npx me-json init .</code> in a Next.js site, answer four questions, and it
        writes a <code>me.config.ts</code> that&apos;s yours to edit, a vendored runtime, and the
        routes. I built it in July.
      </p>

      <h2>How it works</h2>

      <p>
        Everything comes from one file. <code>me.config.ts</code> calls <code>defineSite()</code>{" "}
        with a list of capabilities, and each capability declares its input once as JSON Schema.
        From there the manifest publishes it, the MCP endpoint registers it as a tool schema, the
        REST routes validate against it, and the terminal visitor renders it as a form. I did it
        this way so there&apos;s one definition and four surfaces, rather than four copies that
        slowly disagree with each other.
      </p>

      <p>
        Init was the hardest part, since every personal site is laid out differently. A site is
        really two kinds of thing, collections (projects, posts, roles) and pages (/now, /uses),
        and a page like /now isn&apos;t a list of anything, so init reads your nav and
        reconstructs the pages behind it into text. It only reads the repo you point it at, never
        the network, and it shows you everything it found before it writes a file. I tested
        extraction against about 70 open-source personal sites and templates, because my own site
        is the one case it was always going to handle.
      </p>

      <p>
        Static exports (like this site) can&apos;t serve dynamic routes, so init detects that,
        bakes a read-only manifest into <code>public/</code>, and tells you. Reads work anywhere,
        but the guestbook needs a server. When a site does have one, writes get validated against
        the schema, rate-limited, and queued, and the owner approves or rejects them from the
        console, so a capability only needs a handler. Entries an agent submitted are labeled as
        such in the same queue. A visitor never runs code from a site it visits, it only reads
        data and schemas.
      </p>

      <p>
        Storage is a JSON file right now, which works for a guestbook. A real storage adapter is
        the next thing.
      </p>
    </>
  );
}
