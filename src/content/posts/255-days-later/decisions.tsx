const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer">{children}</a>
);

export default function ChapterDecisions() {
  return (
    <>
      <p>So, now you&apos;re getting some decisions. Let&apos;s talk about it.</p>

      <h2 id="rejection">Rejection</h2>
      <p>
        First: that sucks. And it&apos;s okay to take time and feel a little down about it,
        especially if it was your dream school. But consider:
      </p>
      <ul>
        <li>There are other ways you can still study at the school with higher education pathways. you can still get your masters, MBA, PhD, etc.</li>
        <li>Depending on the school, there are ways to get in through appeal. I know people who&apos;ve gotten into{" "}
          <A href="https://www.washington.edu/">UW</A>,{" "}
          <A href="https://www.usc.edu/">USC</A>,{" "}
          <A href="https://illinois.edu/">UIUC</A>, etc. through this pathway!</li>
        <li>You can still transfer to your dream school (but honestly, give the school you&apos;re at a real chance; it might be great for you!)</li>
        <li>It&apos;s easy to romanticize a school, but all schools are just schools. And you don&apos;t really know what environment will be the perfect fit for you, even if you THINK you do!</li>
        <li>I know this SUCKS to hear, but it is so true: rejection is redirection. you will find what you&apos;re looking for somewhere else.</li>
      </ul>
      <p>
        A rejection at one school is not necessarily an indication that you&apos;ll be rejected
        at another. I know people rejected from Purdue who got into UT Austin Engineering OOS!
        Sometimes, it just means you didn&apos;t fit into the version of the class they were
        building. That&apos;s just luck!
      </p>

      <h2 id="deferral">Deferral</h2>
      <p>
        A deferral means the college is not accepting or rejecting you yet. They are moving your
        application into the regular decision pool and will look at it again later.
      </p>
      <p>
        This can feel really frustrating because it is basically the admissions version of
        "we&apos;ll get back to you." But it is not a rejection. Some colleges accept most of
        their students after deferring them (ex, USC)!
      </p>
      <p>
        If you get deferred, check whether the college allows or asks for a{" "}
        <strong>Letter of Continued Interest (LOCI)</strong>. Some schools want one. Some
        schools specifically do not. Follow the college&apos;s instructions.
      </p>
      <p>A good LOCI usually includes: a short thank you, confirmation that you&apos;re still interested, any meaningful updates since you applied, and maybe one or two specific reasons the school is still a strong fit.</p>
      <p>
        Make sure you send one to all schools that ask for one or are neutral, as sometimes,
        this becomes a filtering point for applicants!
      </p>

      <h2 id="waitlists">Waitlists</h2>
      <p>
        A waitlist means the college might admit you later if they have space, but you should
        not count on it.
      </p>
      <p>
        If you are waitlisted somewhere you still really care about,{" "}
        <strong>accept your spot on the waitlist and follow their instructions</strong>. If they
        allow a LOCI, send one. If they ask for updates, send meaningful updates. If they say
        not to send extra materials, do not send extra materials.
      </p>
      <p>
        The most important thing is that you should{" "}
        <strong>emotionally and practically commit to one of the schools that actually accepted
        you</strong>. Put down a deposit somewhere you would be happy to attend. You can still
        hope for the waitlist, but do not let it stop you from getting excited about your real options.
      </p>

      <h2 id="alternate-pathways">Alternate pathways</h2>
      <p>
        Some colleges offer alternate pathways, like spring admission, first-semester-abroad
        programs, guaranteed transfer options, or other special entry plans.
      </p>
      <p>These can be great opportunities, but read the details carefully. Ask: When would I actually start on campus? Would I graduate on time? Would I be in my intended major? Would housing, financial aid, or course registration work differently?</p>
      <p>
        Do NOT treat these programs as "lesser" automatically. Some people end up loving them!
        Just make sure you understand what you are agreeing to.
      </p>

      <h2 id="acceptances">Acceptances</h2>
      <p>First of all: <strong>congratulations!! You made it!</strong></p>
      <p>Once you have your options, try to <strong>compare them using things that will actually affect your life:</strong> cost, program strength, major flexibility, location, academic environment, career opportunities, social fit, housing, distance from home, and, genuinely, whether you can picture yourself there on a random Tuesday.</p>
      <p>
        If possible, visit before committing. Talk to current students (I literally reached out
        to random people I followed on Instagram if I didn&apos;t know anyone). Watch Youtube
        videos or TikToks from the college. Look beyond admitted student marketing (lol). And
        pat yourself on the back :)
      </p>
      <p>
        <strong>NOTE:</strong> If cost is a concern, reach out to the financial aid offices at
        your accepted universities. You might be able to negotiate a higher aid package!
      </p>
    </>
  );
}
