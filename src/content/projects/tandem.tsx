export default function TandemWriteup() {
  return (
    <>
      <p>
        Tandem was our Big Red Hacks project, built in a day by a team of four (we got 2nd in the
        design track!). It&apos;s an iMessage bot for people that turn-by-turn directions
        don&apos;t serve well, like wheelchair users, people pushing a stroller, or people walking
        alone at night. You text it a start and a destination, it walks the route in Street View
        first, and it texts back a map, the flagged photos, and the route it recommends. The demo
        route is Noyes to Goldwin Smith, where Google&apos;s 9-minute walk goes straight up a
        14-step staircase.
      </p>

      <h2>How a scout works</h2>

      <p>
        It starts by pulling every walking route from the Google Routes API. The first one is the
        one Google Maps would give you, so the final message is always a side-by-side of
        Google&apos;s route and ours. Then it samples each route every 15 m and grabs the nearest
        Street View panorama at each point, plus two extra views 45° left and right at every turn
        so the curb ramps are actually in frame. Those frames go to Claude five at a time with a
        persona-specific prompt and a Zod schema for the answer (issue, severity, confidence, a
        bounding box, and a one-line note). Anything between 0.4 and 0.7 confidence gets looked at
        again from two more angles before it counts.
      </p>

      <p>
        Street View in Ithaca is often several years old, so we also pull mapped stairs and curbs
        from OpenStreetMap, sample elevation every 20 m and flag grades above the ADA ramp
        thresholds (5%, 8.33%, 12%), and add in problems other users have reported nearby. Each
        route&apos;s score is the sum of severity squared times confidence, which means one
        staircase outweighs a bunch of small cracks, and the lowest score wins. For someone walking
        alone at night the scoring switches to lighting, blue-light phones, and what&apos;s open at
        that hour.
      </p>

      <pre>{`iMessage -> Claude agent (tool use) -> scoutRoute()
                          |
        +-----------------+-----------------+
        v                 v                 v
  Google Routes     Street View        OpenStreetMap
  walking routes    frames every 15 m  + elevation
                    + corner views
                          |
                          v
                 Claude vision, 5 frames
                 per call, 8 in parallel
                          |
   merge <- vision + OSM stairs/curbs + grades + reports
     |
     v
   score = sum(severity^2 x confidence)
     -> pick the route -> map, photos, GIF -> iMessage`}</pre>

      <p>
        A few things we decided early. The map, the captions, and the recommendation are written
        by our own TypeScript, and the model only gets a summary back so it can answer follow-ups
        like &ldquo;what about the steps?&rdquo; without re-running anything. That kept the wording
        predictable and the replies fast. The system prompt also isn&apos;t allowed to say
        &ldquo;safe&rdquo; or &ldquo;accessible,&rdquo; every photo comes with the date it was
        taken, and if there&apos;s a stretch with no coverage the bot says &ldquo;I couldn&apos;t
        see about 120 m of it&rdquo; rather than treating it as clear. Most of the camera tweaks
        came from looking at what the model got wrong, for example Street View&apos;s camera is on
        the road, so parked cars hide curbs until you pitch the camera down 15°.
      </p>

      <p>
        It runs on Bun with SQLite (no ORM), and iMessage goes through Photon. Every scout gets
        saved to a shared campus barrier map, and anyone can text back a problem it missed. The
        thing we designed but didn&apos;t get to is a re-check before you leave that only texts you
        if something on the route changed, so that&apos;s next.
      </p>
    </>
  );
}
