const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer">{children}</a>
);

export default function ChapterBuildingYourApplication() {
  return (
    <>
      <p>
        Look, I&apos;m not exactly sure what makes a "good" vs "great" application (I do think I
        can tell when an application is "bad" though). There&apos;s a reason this industry is so
        profitable, and there&apos;s a reason that there are SO many resources online to create an
        application.
      </p>

      <h2 id="organization">Organization</h2>
      <p>
        If you have a lot of colleges to apply to (or even if you don&apos;t),{" "}
        <strong>I&apos;d STRONGLY encourage you to have an application tracker.</strong> Track
        things like how many LORs you need, whether official test scores are required, what the
        deadlines are, what major you&apos;re applying for at what school, etc.
      </p>
      <p>Some tracker templates:</p>
      <ul>
        <li><A href="https://docs.google.com/spreadsheets/d/12h6FU2Wi5b2KNUvzzn5E4Av53ZVjHPlplYoP5kvsT3Y/edit">College mapping spreadsheet</A></li>
        <li><A href="https://spreadsheetpoint.com/college-application-spreadsheet-template/">College Application Spreadsheet (Spreadsheet Point)</A></li>
        <li>Search r/ApplyingToCollege for the latest community-built trackers</li>
      </ul>
      <p>
        Also: create/use a personal professional email (NOT school email) for the college app
        process. you will get a LOT of emails.
      </p>

      <h2 id="parts">Parts of an application</h2>
      <p>Most colleges have some, but not all, of these:</p>
      <ul>
        <li>School Profile (your counselor uploads this)</li>
        <li>Courseload / Transcript</li>
        <li>Standardized Test Scores (SAT/ACT/AP)</li>
        <li>Activities List + Awards</li>
        <li>Personal Statement</li>
        <li>Supplemental Essays</li>
        <li>Letters of Recommendation</li>
        <li>Additional Information</li>
        <li>Resume</li>
        <li>Demonstrated Interest</li>
      </ul>
      <p>Some programs also ask for: video introductions, arts/maker portfolios, research supplements, graded written work, peer recommendation letters. <strong>Be sure you know ALL requirements of what a college requires.</strong></p>
      <p>
        <strong>Quick notes:</strong> Add your counselor to the Common App early so they can
        attach the school profile. Double, triple, quadruple check your grades. this is SO
        important, ESPECIALLY for the UCs. For standardized test scores:{" "}
        <strong>send official scores at least 2 weeks in advance</strong> so you don&apos;t pay
        for express shipping.
      </p>
      <p>
        The <strong>Additional Information</strong> section is for extra context that doesn&apos;t
        fit anywhere else. use it for serious personal circumstances, unusual course scheduling, clarification
        on activities. Don&apos;t use it as a second personal statement.
      </p>
      <p>
        For <strong>resume</strong>: one page, easy to skim. Main benefit is more space than the
        activities list. Don&apos;t rely on it to carry your application. AOs may or may not read
        it. If you do submit one, I like{" "}
        <A href="https://github.com/jakegut/resume">Jake&apos;s LaTeX resume</A>.
      </p>

      <h2 id="story">Building your story</h2>
      <p>
        What sets "top" applicants apart is <strong>having a story</strong>. Your application is
        meant to <strong>build a narrative about you that is cohesive and understandable to
        admissions officers</strong>. Each part should contribute something different to this
        story: ECs, essays, course selections, even recommendations.
      </p>
      <p>
        Some people have stories that come very naturally together. Most high schoolers are not
        like this. That&apos;s okay! It just means finding a way to simply explain how the
        different things you&apos;ve done naturally lead into what you want to do in college and
        the world. (This is basically what people are talking about when they talk about a "spike.")
      </p>
      <ul>
        <li><A href="https://www.collegeessayguy.com/">The Power of Your Story (College Essay Guy)</A></li>
        <li>You Don&apos;t Have to be Spiky, but Please Don&apos;t be Well-rounded (College With Mattie) <em>(search this title, highly recommended!)</em></li>
      </ul>

      <h2 id="activities">Activities list + awards</h2>
      <div className="post-table-wrap">
        <table className="post-table">
          <thead>
            <tr>
              <th></th>
              <th>Common App</th>
              <th>UC Application</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>EC slots</strong></td>
              <td>10</td>
              <td>20</td>
            </tr>
            <tr>
              <td><strong>Description</strong></td>
              <td>150 chars</td>
              <td>~300 chars</td>
            </tr>
            <tr>
              <td><strong>Awards</strong></td>
              <td>5 in separate Honors section</td>
              <td>Included in 20 slots</td>
            </tr>
            <tr>
              <td><strong>Tip</strong></td>
              <td colSpan={2}>Write your UC list first — longer descriptions let you find your strongest framing, then condense for Common App.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The way you write your activities list can mean the difference between acceptance and
        rejection:
        <strong>the AO can&apos;t understand how impactful/interesting your ECs are unless you
        TELL THEM.</strong>
      </p>
      <ul>
        <li><A href="https://www.collegeessayguy.com/">How to Write a Successful Common App Activities List (College Essay Guy)</A></li>
        <li>Novembrr&apos;s activities list guide, search r/ApplyingToCollege</li>
        <li>Activities list tips (2022 Updates), search r/ApplyingToCollege</li>
      </ul>

      <div className="callout">
        <p>
          I know some of you are reading this before you have to apply. Defining yourself by your
          ECs and activities list might get you into a top college, but it might also wreck your
          mental health in the process.
        </p>
        <p>
          Please don&apos;t push yourself past the point of burnout.{" "}
          <A href="https://mitadmissions.org/blogs/entry/applying_sideways/">Applying Sideways | MIT Admissions</A> is one of the best things I&apos;ve read on this. Also:{" "}
          <A href="https://www.admissionsmom.com/blog/">Let&apos;s Talk about Activities and Extracurriculars (AdmissionsMom)</A>.
        </p>
        <p>
          At the same time, if you&apos;re in a competitive area, everybody around you is working
          really, really hard, and there is ALWAYS someone working harder than you.{" "}
          <strong>Find YOUR balance.</strong>
        </p>
      </div>

      <h2 id="personal-statement">Personal statement</h2>
      <p>
        This is definitely the part of the application I struggled with most, like a lot. I
        actually submitted two different personal statements: one for my EA schools and one for my
        RD schools. After truly endless hours of brainstorming, revising, editing, crying, I can
        confidently tell you…
      </p>
      <p>I don&apos;t like either of them. Unfortunately. Yeah.</p>
      <p>
        The personal statement is a story/narrative about you: who you are as a person, what you
        care about, and an implicit argument about why a college should take you, no matter what
        prompt you choose. That&apos;s a whole lot to ask of 650 words.
      </p>
      <p>
        Things I WISH I had done to make this easier:
      </p>
      <ul>
        <li><strong>START EARLY</strong>, and early means earlier than your friends. I started in July and it was not soon enough. Both of my essays went through 5-8 drafts.</li>
        <li><strong>Brainstorm a lot.</strong> What do you want to communicate to colleges? You don&apos;t have to say EVERYTHING, just something compelling. Anything can inspire essays: your bookshelf, science class, candy, a philosophy you have.</li>
        <li><strong>REACH OUT FOR ADVICE.</strong> Essay counselors, parents, teachers, senior friends, even trusted friends. You need to know how your statement lands.</li>
        <li><strong>READ.</strong> good writers tend to read a lot, and not just college essays.</li>
        <li>If you don&apos;t know what to write about, <strong>start with your supplemental essays!</strong> An idea might emerge there.</li>
        <li><strong>Know when to stop.</strong> If you&apos;re spending hours changing minor sentence fragments, you might be sacrificing time for supplemental essays.</li>
      </ul>
      <ul>
        <li><A href="https://www.collegeessayguy.com/blog/personal-statement-tips">Personal Statement Tips (College Essay Guy)</A></li>
        <li><A href="https://apply.jhu.edu/application-process/essays-that-worked/">Essays That Worked | Johns Hopkins Admissions</A></li>
        <li>10 Successful Harvard Application Essays | 2024, search Harvard Crimson or similar</li>
      </ul>

      <h2 id="supplementals">Supplemental essays</h2>
      <p>
        Beyond the Personal Statement, selective schools will require supplemental essays. These
        gain a deeper understanding of you, what you value, and whether you fit the
        college&apos;s environment.
      </p>
      <p>Supplementals can range from 50 to 650 words. Common prompt types:</p>

      <div className="essay-type-grid">
        {[
          { name: "Why School?", desc: "What specifically about this school, and how will you contribute?" },
          { name: "Why Major?", desc: "Why do you want to study what you want to study?" },
          { name: "Diversity", desc: "What makes you unique? (likely renamed post-DEI laws)" },
          { name: "Leadership", desc: "How have you shown initiative in your community?" },
          { name: "Challenge", desc: "How do you overcome disagreement or adversity?" },
          { name: "Extracurricular", desc: "What EC do you care about most, and why?" },
          { name: "Personality", desc: "What brings you joy, three words to describe you, etc." },
          { name: "Major / Honors", desc: "Program-specific questions, honors supplements, etc." },
        ].map((t) => (
          <div key={t.name} className="essay-type-cell">
            <span className="essay-type-name">{t.name}</span>
            <span className="essay-type-desc">{t.desc}</span>
          </div>
        ))}
      </div>
      <p>
        Between EA and RD, I wrote around 70 supplemental essays.{" "}
        <strong>However, because you can group supplemental essays into categories, in reality
        you&apos;re only crafting around 5-8 essays about you.</strong> Some friends grouped
        schools with similar prompts and answered them all at once.
      </p>
      <ul>
        <li><A href="https://www.youtube.com/watch?v=D3QPz2kC-PU&list=PL6kAlDuzWEqZdBiNfVndYm5IZr3uwOtE7">ElevatedSchool: supplemental essay approaches (YouTube)</A></li>
        <li><A href="https://www.youtube.com/watch?v=G69BckBLHC4&list=PL6kAlDuzWEqYX_uuNAQT_QzQGDEPHtwby">ElevatedSchool: incorporating college values (YouTube)</A></li>
        <li><A href="https://www.collegeessayguy.com/blog/supplemental-essays">Learn How to Write Great Supplemental Essays (College Essay Guy)</A></li>
        <li>Half-Ideas: How to Create Original Essay Topics (College With Mattie) <em>(search this title)</em></li>
      </ul>
      <p>
        The big thing to do with supplementals is to use each one to reveal a different part of
        you. College apps are NOT a resume dump. being more accomplished on paper doesn&apos;t
        guarantee anything. Colleges in the US are <em>communities</em>, not awards shows.
        How do you add to them?
      </p>

      <h2 id="lors">Letters of recommendation</h2>
      <p>
        Hopefully, you built great relationships with your teachers. If you didn&apos;t, well,
        find the ones that hate you the least.
      </p>
      <p>
        Generally, you want around <strong>3-4 LORs: 2 from teachers (1 STEM, 1 Humanities), 1
        from an external source (professor, coach, job supervisor), and one extra if you want.</strong>{" "}
        Reach out around May-June of junior year (the latest being September of senior year).
      </p>
      <p>
        If you go to a large public school,{" "}
        <strong>figure out when you need to submit your LOR form early. counselor deadlines tend
        to be firm.</strong>
      </p>
      <p>
        <strong>Strike a balance between reminding your recommender and remembering they have a
        life outside of your college apps.</strong> There tends to be an unofficial grace period
        for recommenders. And be very grateful. maybe give a gift, write a nice card.
      </p>
      <ul>
        <li><A href="https://bigfuture.collegeboard.org/">How to Get a Glowing Letter of Recommendation | BigFuture</A></li>
        <li>Letters of Recommendation 101, search r/ApplyingToCollege</li>
      </ul>

      <h2 id="demonstrated-interest">Demonstrated interest</h2>
      <p>
        Many schools publish their <strong>Common Data Set</strong>, where we can see what they
        value. One factor is "demonstrated interest": how much you&apos;ve shown the school
        that, if admitted, you will attend. Schools can track this through: mentioning specific
        programs, meeting admissions officers at events, emailing your regional AO, requesting
        optional interviews, attending info sessions and tours, attending a summer program.
      </p>
      <p>
        I can&apos;t really speak to this because it was one thing I never really did. However,
        schools like{" "}
        <A href="https://barnard.edu/">Barnard</A>,{" "}
        <A href="https://www.northwestern.edu/">Northwestern</A>, and{" "}
        <A href="https://www.rice.edu/">Rice</A> all consider it at least a little. These are
        also likely to be schools that take many people ED.
      </p>
      <p>
        <A href="https://www.collegeessayguy.com/blog/demonstrated-interest">
          6 Things to Know About Demonstrated Interest (College Essay Guy)
        </A>
      </p>
    </>
  );
}
