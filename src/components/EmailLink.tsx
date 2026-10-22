"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/icons";

export default function EmailLink({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      })
      .catch(() => {
        // mailto: still opens
      });
  };

  return (
    <a href={`mailto:${email}`} onClick={handleClick} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
      {email}
      <span aria-live="polite" style={{ display: "inline-flex", color: copied ? "var(--sap)" : "var(--muted)" }}>
        {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
      </span>
      <span className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {copied ? "copied" : ""}
      </span>
    </a>
  );
}
