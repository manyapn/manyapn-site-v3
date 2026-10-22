import TierTabs from "@/components/post/TierTabs";

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer">{children}</a>
);

const acceptanceStats = [
  { value: "100%", label: "Safety", sub: "3/3", color: "var(--current)" },
  { value: "87.5%", label: "Target", sub: "7/8", color: "var(--link)" },
  { value: "60%", label: "Reach", sub: "3/5", color: "var(--heading-accent)" },
  { value: "14%", label: "Lottery", sub: "2/14", color: "var(--muted)" },
];


export default function ChapterBuildingACollegeList() {
  return (
    <>
      <h2 id="types-of-schools">Types of schools</h2>
      <p>
        Colleges fall under many categories. Here is a good breakdown:{" "}
        <A href="https://bigfuture.collegeboard.org/explore-careers/college/types-of-colleges-key-differences">
          Understanding the Different Types of Colleges (BigFuture)
        </A>
        . In this document, I&apos;ll mostly refer to public and private schools, since those are
        the types of schools I applied to.
      </p>

      <h2 id="safety-target-reach">Safety / Target / Reach / Lottery</h2>
      <p>A good college list spans all four categories. Click each to learn more:</p>
      <TierTabs />
      <p>
        Remember that <strong>a school that is a safety for one person is a target/reach for
        another.</strong>{" "}
        <A href="https://www.deweysmart.com/the-college-list/">
          The College List: Good Targets, Reaches, and Safeties | Dewey Smart
        </A>
      </p>
      <p>
        <strong>Note:</strong> If you&apos;re applying to an impacted major, a school that looks
        safe overall could, in fact, be a lot less guaranteed (Purdue CS is NOT a safety). Same
        for international applicants: schools that are "safeties" for citizens might be reaches
        for you, as many colleges have quotas for international students, ESPECIALLY if they ask
        for aid.
      </p>

      <h2 id="how-many">How many / what kind of schools should I apply to?</h2>
      <p>
        If your goal is to just get into college, a couple of safeties and targets are the way to
        go. Add in a reach or lottery school for variety.
      </p>
      <p>
        If your goal is to land a reach/lottery school, unless you are an insane applicant who
        will get in everywhere — shotgun, shotgun, shotgun. Apply to as many top schools as you
        can.
      </p>
      <p>
        I know it&apos;s expensive and a lot of work. Why do this? Because{" "}
        <strong>college applications are a numbers game.</strong> There is an element of randomness
        to decisions: maybe too many kids got in ED from your school. Maybe they already had
        someone with your "story" and didn&apos;t want another. Maybe the admissions officer was
        in a bad mood while reviewing your application. You don&apos;t know.
      </p>
      <p>For reference, one person I know had a 4.0 UW at a competitive public HS, 1550+ SAT superscore, 10+ AP classes. They ended up getting:</p>

      <div className="stat-pair-grid">
        {acceptanceStats.map((s) => (
          <div key={s.label} className="stat-pair">
            <span className="stat-pair-value" style={{ color: s.color }}>{s.value}</span>
            <span className="stat-pair-label">{s.label}</span>
            <span className="stat-pair-sub">{s.sub} schools</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginTop: "-0.5rem" }}>
        30 schools total. most people apply 7–25.
      </p>

      <p>
        <strong>It only takes one YES.</strong> The best way to secure that "one" is to shotgun
        as much as you can without compromising the strength of your application. The worst
        outcome is being blindsided by many rejections and ending up with nowhere to go.
      </p>

      <h2 id="what-do-you-want">What do I "want" in a school?</h2>
      <p>
        People are always like, "oh, only apply to schools where you&apos;d actually go." But
        let me tell you, this piece of advice NEVER helped me, because how do you figure out
        what you want in a school when you&apos;ve never… been in college?
      </p>
      <p>Here are some criteria to think through — organized by category:</p>

      <div style={{ margin: "1.25rem 0", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <span className="criteria-label">Academic</span>
          <ul>
            <li>Does the school have your major?</li>
            <li><strong>Restricted vs. Open Majors:</strong> Some schools (ex: UC Berkeley CS in L&amp;S) let you declare later, while others (ex: CMU SCS, GT CS, UIUC CS) require direct admission</li>
            <li><strong>Ease of Switching Majors:</strong> Some schools allow major changes easily, while others (like most UC campuses and top CS/Business programs) make it nearly impossible.</li>
            <li><strong>How good is my major at XYZ school?</strong> Schools like UIUC and UW, while being solid overall, are phenomenal T10 CS programs.</li>
            <li><strong>Credit Transfer:</strong> Some schools take lots of AP/DE credits, others don&apos;t</li>
          </ul>
        </div>

        <div>
          <span className="criteria-label">Campus life</span>
          <ul>
            <li><strong>Size:</strong> A large state school like UW, UCLA, etc. have tens of thousands of students — great for variety but bad for small classes and professor access. Meanwhile, LACs like Williams are so small that dinner with professors is common, but a bad rep lasts four years.</li>
            <li><strong>Location:</strong> Urban vs. rural? If you go to Berkeley you&apos;ll probably settle in the Bay. If you go to Northwestern, there&apos;s a good chance you&apos;ll head to Chicago. See where graduates of your school end up.</li>
            <li><strong>Culture:</strong> Not quantifiable, but talk to current students. Workload, Greek life, gender ratio, school spirit — all of it shapes your experience.</li>
            <li><strong>Workload:</strong> CMU, Cornell, Hopkins, MIT, GT pride themselves on difficulty and grade deflation. UCLA, UMich, USC, Duke are very "work hard, play hard." Brown doesn&apos;t even give an official GPA.</li>
            <li><strong>School Focus:</strong> At a LAC like Reed or Yale, you&apos;ll be exposed to a very intellectual/humanities culture. At Penn/Stanford, entrepreneurial and business-minded. Hopkins, Caltech are research heavy. Schools like GT, RIT, Purdue are engineer-dominated.</li>
          </ul>
        </div>

        <div>
          <span className="criteria-label">Career</span>
          <ul>
            <li><strong>Co-ops/Internships:</strong> Schools like NEU, GT, Waterloo, UW are known for their industry connections — great if you&apos;re pursuing a career that values hands-on experience during college</li>
            <li><strong>Research Opportunities:</strong> If you want to pursue a masters/PhD, research opportunities are a big deal. Hopkins is known for many undergrad research opportunities. Some colleges, like UMD, have honors-type research programs like FIRE.</li>
            <li><strong>Honors Programs:</strong> Not all are built the same. Some require applications (UW Interdisciplinary Honors, UMich LSA Honors, ASU Honors). Others give it to you based on your application (UMD, UMass, UMN). UT Turing Scholars is a recruiting pipeline; GT&apos;s Honors Program may actually make your experience MORE miserable for little benefit.</li>
          </ul>
        </div>

        <div>
          <span className="criteria-label">Logistics</span>
          <ul>
            <li><strong>Housing &amp; Cost of Living:</strong> Some schools (like UChicago) require students to live on campus for a couple of years, while others (like UCLA) struggle with housing shortages. If you&apos;re considering NYC, SF, Boston, or LA, keep in mind that living costs will be high.</li>
            <li><strong>Unique Factors:</strong> NYU&apos;s lack of campus contributes to both its opportunity and its community struggles. Some schools have excellent study abroad programs (NYU, USC, Georgetown) or unique programs like NEU&apos;s co-op or Brown&apos;s Open Curriculum.</li>
            <li><strong>Community Building:</strong> Some colleges really value this and use systems like residential colleges to create deep connections between people.</li>
          </ul>
        </div>
      </div>

      <p>
        This is just an initial list, and you might not have all the answers right now. That&apos;s
        okay! I would caution you on not applying to schools that fit EVERY one of your criteria.
        Some of my top/favorite schools at the end of the process are schools that weren&apos;t
        even on my college list initially.
      </p>
      <p>
        In my opinion,{" "}
        <strong>it&apos;s worse to regret not applying to a college than to regret applying.</strong>{" "}
        (As long as your overall application strength doesn&apos;t suffer). Other people have
        different takes!
      </p>

      <h2 id="application-types">EA, REA, RD, ED — what do they all mean?</h2>
      <div className="post-table-wrap">
        <table className="post-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>What it means</th>
              <th>Deadline</th>
              <th>Decision</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Rolling</strong></td>
              <td>Applications reviewed as they arrive. Apply early; later means less space. (ASU, UMN, etc.)</td>
              <td>ASAP</td>
              <td>Ongoing</td>
            </tr>
            <tr>
              <td><strong>Early Action (EA)</strong></td>
              <td>Apply early, non-binding decision. Some schools fill most capacity with EA (Purdue). USC requires EA for major scholarships. State schools, USC, MIT all offer EA.</td>
              <td>Oct–Nov</td>
              <td>January</td>
            </tr>
            <tr>
              <td><strong>Restricted Early Action (REA)</strong></td>
              <td>Apply early, but can&apos;t apply to other schools early (some state school exceptions). Stanford, Yale, Harvard, Princeton, Caltech. No acceptance rate bump — just earlier decision. NOTE: your early apps will rarely be as polished as your RD apps.</td>
              <td>Nov 1</td>
              <td>December</td>
            </tr>
            <tr>
              <td><strong>Regular Decision (RD)</strong></td>
              <td>The standard round. Some schools ONLY offer RD and have earlier-than-January deadlines (UW is Nov 15, UCs are early December).</td>
              <td>Jan 1</td>
              <td>March</td>
            </tr>
            <tr>
              <td><strong>Early Decision (ED / EDII)</strong></td>
              <td>Binding — if you get in, you go. Brown, Penn, Cornell, Columbia, CMU, Northwestern, Duke, Hopkins, NEU, NYU, UVA. EDII is a second binding round. Common EDII schools: Hopkins, NYU, WashU.</td>
              <td>Nov 1 (EDI) / Jan (EDII)</td>
              <td>Dec / Feb</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="ed-dilemma">To ED or not to ED</h2>
      <div className="post-table-wrap">
        <table className="post-table">
          <thead>
            <tr>
              <th>Consider ED if…</th>
              <th>Skip ED if…</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>You have a dream school</td>
              <td>You want to go to a public school like UCLA, Berkeley, Mich, GT</td>
            </tr>
            <tr>
              <td>You like commitment</td>
              <td>You don&apos;t really know what you want in a school</td>
            </tr>
            <tr>
              <td>You&apos;re applying to a very selective program (M&amp;T, Huntsman, etc.)</td>
              <td>You haven&apos;t visited the school you&apos;re planning on ED-ing</td>
            </tr>
            <tr>
              <td>The school has an ED benefit (ex: Duke, Barnard)</td>
              <td>You&apos;re worried about the financial commitment</td>
            </tr>
            <tr>
              <td>You have slightly lower grades and want a boost</td>
              <td>You aren&apos;t confident in your application yet</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        If you want to ED, consider building your college list earlier and touring colleges the
        summer before senior year. Your thoughts and feelings about a college might shift a lot
        after you&apos;re actually on campus!
      </p>

      <h2 id="portals">Application portals</h2>
      <p>
        The most common application platform is the{" "}
        <A href="https://www.commonapp.org/">Common Application</A>. You can upload your personal
        statement, courseload, 10 ECs and 5 awards, LORs, test scores, etc. all on one platform,
        and fill out supplemental essays for individual schools. Max 20 colleges, 1000+ universities.
      </p>
      <p>Other portals:</p>
      <ul>
        <li><A href="https://scoir.com/">Coalition App / Scoir</A>: no college limit, but fewer colleges</li>
        <li><A href="https://apply.universityofcalifornia.edu/">UC Application</A>: separate app for all 8 UCs. 4 essays, 20 ECs/awards.</li>
        <li><A href="https://www.calstate.edu/apply">Cal State Apply</A>: CSUs only, totally transcript-based</li>
        <li>School-specific portals: ex{" "}
          <A href="https://admission.asu.edu/apply">ASU</A>,{" "}
          <A href="https://apply.mit.edu/">MIT</A>,{" "}
          <A href="https://uadmissions.georgetown.edu/">Georgetown</A> — if you apply here, make sure your counselor and recommenders also upload to these platforms!</li>
      </ul>
      <p>My breakdown: 20 Common App · 2 External · 6 UC Portal · 2 CSU Portal</p>

      <h2 id="finances">Finances</h2>
      <ul>
        <li>Out of state tuition is EXPENSIVE, but varies. GT ~$55k/yr. Berkeley ~$85k/yr. Ivies ~$85-95k/yr.</li>
        <li><strong>Need-based vs. merit scholarships:</strong> Ivies only offer need-based. USC, Northeastern, some public flagships have merit scholarships. Check before assuming.</li>
        <li><strong>Net Price Calculator (NPC):</strong> Every college website has one. Run NPCs before finalizing your list!</li>
        <li><strong>Reciprocity agreements:</strong> WUE for Western states, Midwest Student Exchange, etc. can reduce out-of-state tuition.</li>
        <li>If application fees are a barrier, look for <strong>application fee waivers</strong> (check your email — schools like NEU and UMN send them!)</li>
      </ul>
    </>
  );
}
