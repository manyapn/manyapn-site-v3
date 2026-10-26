export default function PaperDiffWriteup() {
  return (
    <>
      <p>
        PaperDiff is for the moment two papers seem to say opposite things. Usually they
        don&apos;t, they looked at different people, doses, outcomes, or time horizons. So it reads
        both primary sources, lines them up dimension by dimension (population, exposure, outcome,
        design), and shows which disagreements are real and which are just scope.
      </p>

      <p>
        There are two modes. Compare takes two claims or paper links, fetches both sources,
        extracts the comparable fields, and returns a verdict per dimension (grounded, qualified,
        or needs review) with the exact passage it came from. Challenge takes one claim and runs
        three live searches for the closest contradictory result, the best direct replication, and
        the most useful later reassessment, then ranks them by how well the methods line up rather
        than by text similarity.
      </p>

      <p>
        Provenance runs before anything else and it&apos;s deterministic. If a claim can&apos;t be
        traced to a span in the original paper, that dimension comes back Blocked, however
        confident the classifier is. After that gate, a small classifier sees the claim and the
        evidence passage and answers supports, contradicts, or insufficient, which map to grounded
        or qualified, flag for correction, and needs review. I didn&apos;t want it to ever sound
        sure about something it couldn&apos;t point to in the paper.
      </p>

      <h2>Layout</h2>

      <p>
        <code>apps/web</code> is a static Vite frontend. The compare and challenge pipelines run on
        RocketRide with Linkup for live retrieval, <code>packages/core</code> has the provenance
        gate and the rules that turn classifier output into what the UI shows, and the classifier
        was trained in a Colab notebook. There&apos;s no API server and no Docker, so secrets stay
        in the pipelines and the frontend is just static files. The production bundle has no
        paper, evidence, or verdict fixtures in it at all, so the loading animations only ever
        reflect a request in progress and results only ever come from a live response.
      </p>
    </>
  );
}
