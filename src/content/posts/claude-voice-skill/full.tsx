import Highlight from "@/components/Highlight";

export default function ClaudeVoiceSkillFull() {
  return (
    <>
      <p>
        I kept asking Claude to write things in my voice, and it kept getting close but not quite
        there. Instead of fixing the same stuff by hand every time, I figured I&apos;d write down
        what &ldquo;sounds like me&rdquo; actually means, once, and turn it into a Claude skill.
      </p>

      <div className="callout">
        <p>
          For those of you who don&apos;t know, a skill is just a folder of instructions Claude
          reads before it starts a task (I love the Impeccable skills for this, they have anti-slop
          checks built in so the output doesn&apos;t read like a chatbot). A voice skill is the same
          idea, just pointed at how one specific person writes.
        </p>
      </div>

      <h2>How I built it</h2>

      <p>The process was pretty straightforward:</p>

      <ol className="build-steps">
        <li>
          I collected a big pile of my writing, the polished stuff but also old school papers, a
          speech, my college supplements, project writeups, even DMs. The wider the range, the
          easier it is to see what you actually do.
        </li>
        <li>
          I read all of it at once and tried to name my habits, which is the hard part, because you
          can&apos;t see your own voice.
        </li>
        <li>
          I wrote the rules down as plainly as I could, stuff like{" "}
          <code>never use an em-dash</code>,{" "}
          <code>open on a little scene and circle back to it at the end</code>, and{" "}
          <code>write what you did, not what the thing is</code>.
        </li>
        <li>
          I tested it constantly, drafting something and then looking for the exact spot where it
          stopped sounding like me. Every miss became a new rule.
        </li>
        <li>
          I marked which habits to keep and which to fix, because (this surprised me) it copies all
          your bad ones too.
        </li>
      </ol>

      <p>
        Then I just kept testing and adding rules until the drafts stopped being so obviously AI and
        so obviously corny.
      </p>

      <h2>What surprised me</h2>

      <p>
        Mostly, how many tics I have that I never noticed. I open paragraphs with{" "}
        <Highlight variant="lavender">&ldquo;So&rdquo;</Highlight> and{" "}
        <Highlight variant="lavender">&ldquo;Through this experience.&rdquo;</Highlight> I end on
        an exclamation mark instead of a period, because a period feels too cold to me. I bookend
        almost everything. I stretch letters out when I&apos;m excited (
        <Highlight variant="gold">tonsssss</Highlight>). I prefer a direct simple sentence over a
        flowery one, and I write directly to the audience.
      </p>

      <h2>Would I recommend it?</h2>

      <p>
        Maybe! I&apos;ve found you might be able to have AI do part of the writing, but without
        substance, it defaults to AI-slop pretty fast. Still, it&apos;s an interesting experiment
        regardless, and I&apos;m excited to see if it actually helps my writing time be used more
        efficiently.
      </p>
    </>
  );
}
