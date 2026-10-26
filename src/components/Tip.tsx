import type { ReactNode } from "react";

/** A word with a small paper tag that appears on hover or keyboard focus. */
export default function Tip({ text, children }: { text: string; children: ReactNode }) {
  return (
    <span className="tip" tabIndex={0}>
      {children}
      <span className="tip-tag pixel" role="tooltip">
        {text}
      </span>
    </span>
  );
}
