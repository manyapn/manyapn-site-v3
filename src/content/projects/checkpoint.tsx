export default function CheckpointWriteup() {
  return (
    <>
      <p>
        I built Checkpoint in July and August. The problem it solves is that when an agent edits a
        project for hours, git can&apos;t tell its edits from mine inside one working tree, and a
        file the agent created and deleted between commits never shows up anywhere. So Checkpoint
        keeps a second history underneath git. It records every file write as it happens,
        remembers who made it, and cuts a checkpoint at the end of every agent turn.
      </p>

      <p>
        It&apos;s a Go daemon that only runs on Linux, because it depends on fanotify, the
        kernel&apos;s file event API. fanotify tells it two things, that a file was closed after
        writing and that a name was created, deleted, or renamed. For each write it stores the
        bytes by hash (in the same loose-object format git uses), figures out whether the writing
        process was the agent or me by walking the process tree, and appends one line to a write
        log with the path, the content ref, and the author. A checkpoint is then just a manifest
        of every path in the tree with its hash. The whole store lives outside the project in{" "}
        <code>~/.local/share</code>, so <code>rm -rf</code> on the project can&apos;t take the
        history with it.
      </p>

      <pre>{`kernel: file closed after write      -> watch.Writes
kernel: name created/deleted/renamed -> watch.Changes
                      |
                      v
            daemon.recorder.write()
      +---------------+---------------+
      v               v               v
 objects.Put     lineage.Who     writelog.Append
 bytes by hash   agent | human   one line per write
                      |
 turn ends / save ----+
                      v
            daemon.server.cut() -> checkpoints/N.json
                      |
    history - status - restore - undo - recover`}</pre>

      <p>
        There are three commands. <code>undo</code> puts back only what the agent changed and
        leaves my edits alone, <code>restore</code> rebuilds the project byte-exact from any
        checkpoint (modes and symlinks included), and <code>recover</code> returns files that were
        created and deleted inside one turn and never made it into a checkpoint.
      </p>

      <h2>The hard parts</h2>

      <p>
        The first was telling the agent&apos;s writes from mine. I didn&apos;t want a time window,
        since I edit files while the agent is working too, so a write counts as the agent&apos;s
        only if the process that wrote it descends from the process <code>checkpoint run</code>{" "}
        started. The catch is that short-lived writers like <code>rm</code> are gone before you can
        ask who their parent was, so the daemon keeps a two-second cache of /proc&apos;s parent
        table while a session is running.
      </p>

      <p>
        The second was getting deleted files back. fanotify&apos;s close-after-write event comes
        with an open file descriptor, and reading through it still works if the file was unlinked
        a microsecond earlier. That&apos;s how <code>recover</code> works.
      </p>

      <p>
        The third was testing from a Mac. Everything interesting happens in the kernel, so the
        kernel tests run in a privileged Docker container on a loopback ext4 filesystem. I also
        found out that a folder shared from macOS into Docker accepts fanotify watches and then
        never delivers an event, which is now the first thing <code>doctor</code> checks. On top of
        the 203 unit and integration tests, <code>selftest</code> drives the real binary through
        seven scenarios (rm -rf and restore, agent undo with human edits mixed in, secrets never
        captured, etc.) and checks the bytes on disk afterward. Undo comes in at 23 ms median.
      </p>

      <p>
        Undo also never merges, if we both touched a file it&apos;s a conflict and it says so. I
        wrote the code with AI assistance, but every claim about fanotify is backed by a test on a
        real kernel. Known gaps: mmap writes without a close, no power-loss durability, and editors
        that write a temp file and rename it (<code>sed -i</code>) show up as a new file. That last
        one is what I want to fix next.
      </p>
    </>
  );
}
