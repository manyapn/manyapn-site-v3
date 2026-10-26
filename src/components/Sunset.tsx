"use client";

import { useEffect, useState } from "react";
import { notifySunset, restoreSunset, sunsetOn, toggleSunset, useSunset } from "@/lib/sunsetStore";

const WORD = "sunset";

/**
 * Puts the sunset flag on <html> so the paper warms and the paintings repaint.
 * Golden hour in ithaca turns it on by itself; the nav toggle or typing
 * "sunset" flips it the rest of the day.
 */
export default function Sunset() {
  const on = useSunset();
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    restoreSunset();
    const id = setInterval(notifySunset, 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (on) document.documentElement.dataset.sunset = "";
    else delete document.documentElement.dataset.sunset;
  }, [on]);

  useEffect(() => {
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey) return;
      typed = (typed + e.key.toLowerCase()).slice(-WORD.length);
      if (typed !== WORD) return;
      typed = "";
      toggleSunset();
      setNote(sunsetOn() ? "golden hour in ithaca" : "and the sun's back up");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!note) return;
    const t = setTimeout(() => setNote(null), 2600);
    return () => clearTimeout(t);
  }, [note]);

  if (!note) return null;
  return (
    <div className="toast pixel" aria-live="polite">
      {note}
    </div>
  );
}
