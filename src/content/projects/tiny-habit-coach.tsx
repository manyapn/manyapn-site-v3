export default function TinyHabitCoachWriteup() {
  return (
    <>
      <p>
        Tiny Habit Coach tracks one habit at a time, based on the frameworks from{" "}
        <em>Atomic Habits</em>. The AI helps you design the habit, checks in when you miss a day,
        and reviews your week. I built it in April and it&apos;s live at{" "}
        <a href="https://tiny-habit-coach.vercel.app/" target="_blank" rel="noreferrer">
          tiny-habit-coach.vercel.app
        </a>
        .
      </p>

      <p>
        Onboarding is a conversation that ends in an implementation intention, &ldquo;I will
        [habit] at [time] in [location],&rdquo; plus a two-minute version of the habit and your
        reason for it. After that you mark each day done or not, and if you miss you can say why.
        The missed-day prompt reads that and decides whether to encourage you or redesign the
        habit, and the weekly prompt looks at your completion rate and streak and comments on your
        actual numbers.
      </p>

      <p>
        The frontend is React on Vercel, the backend is Flask on Railway, the database is Postgres
        through Supabase, and Claude is called from the backend so the key never goes to the
        browser. In the backend there&apos;s a routes folder (users, habits, checkins, stats, ai),
        a prompts folder (onboarding, missed day, weekly, and a shared context every prompt gets),
        and a small db layer with the schema and queries.
      </p>

      <p>
        A few choices I made on purpose. One habit per user, because adding too much at once is
        how most habit apps fail. The AI never brings up willpower or motivation, only your
        environment and schedule. And every redesign is saved to its own table so you can see how
        the habit changed over time.
      </p>

      <p>
        Next I want to let a second habit in once the first one is established, and add friends so
        you can see each other&apos;s progress.
      </p>
    </>
  );
}
