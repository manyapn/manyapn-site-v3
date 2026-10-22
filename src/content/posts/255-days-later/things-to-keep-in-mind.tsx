const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer">{children}</a>
);

const competitiveMajors = [
  "Computer Science",
  "Engineering (BME, EE, CompE, MechE, Aerospace, ChemE…)",
  "Business",
  "Architecture",
  "Nursing",
  "Psychology",
  "Biology / Chemistry (pre-med)",
  "Political Science",
];

export default function ChapterThingsToKeepInMind() {
  return (
    <>
      <p>There&apos;s a lot, but here are a few notes before we get into it!</p>

      <h2 id="major-choice">Major choice is VERY important</h2>
      <p>
        Especially if you&apos;re applying to an <strong>impacted/competitive major</strong>:
      </p>

      <div className="tag-chips">
        {competitiveMajors.map((m) => (
          <span key={m} className="tag-chip">{m}</span>
        ))}
      </div>

      <p>
        I know from personal experience that computer science admissions are especially difficult.
        At a school like UIUC, for example, the overall acceptance rate is ~45%. The computer
        science acceptance rate is 5%.
      </p>
      <p>
        That&apos;s why, if you don&apos;t have much interest/experience in CS, when applying
        to direct-to-major schools, <strong>I&apos;d suggest applying for adjacent fields</strong>,
        like data science, informatics, human-centered design, or even CompE. These aren&apos;t
        easy programs, by any means — but are they easier to get into than CS? Generally, yes.
        (If you&apos;re set on CS though, apply CS. At many schools, you can&apos;t switch into
        a CS major during college.) (If you&apos;re applying to a school that lets you switch
        majors at will, it is totally fine to "apply" to a major that isn&apos;t CS and relates
        better to your profile.)
      </p>
      <p>
        <strong>One thing I would NOT suggest is trying to get into an "easier" major that
        doesn&apos;t relate to your profile.</strong> If you&apos;re president of CS club, teach
        coding to kids every week, have taken all the CS classes at your school and have won many
        hackathons, no admissions officer is going to believe you&apos;re REALLY a history major.
      </p>
      <p>
        If you don&apos;t know what major you want to apply for, though,{" "}
        <strong>I&apos;d suggest examining your EC list and what you&apos;ve done throughout
        high school and finding a major that fits into your "story" as an applicant.</strong>{" "}
        It&apos;s also okay to apply to different majors at different schools — it&apos;s just
        hard because you&apos;ll have to write so many more essays.
      </p>
    </>
  );
}
