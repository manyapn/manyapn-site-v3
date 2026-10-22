"use client";

import { useEffect, useState } from "react";
import PixelCat from "@/components/PixelCat";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function KonamiEgg() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === SEQUENCE[pos]) {
        pos++;
        if (pos === SEQUENCE.length) {
          setVisible(true);
          setTimeout(() => setVisible(false), 3500);
          pos = 0;
        }
      } else {
        pos = e.key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!visible) return null;

  return (
    <div className="toast pixel" aria-live="polite">
      <PixelCat size={28} />
      you found the secret!
    </div>
  );
}
