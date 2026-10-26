"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PixelCat from "@/components/PixelCat";

const IDLE_MS = 20000;
const SIZE = 42;
/** Where it settles, as a share of the hero's width in from the right edge. */
const REST = 0.22;

type Mood = "away" | "arriving" | "sitting" | "leaving";

/**
 * Leave the page alone for a while and the cat wanders along the bottom of
 * the painting and sits down. Move the mouse and it slips off again, unless
 * it's sunset, when it stays to watch.
 */
export default function IdleCat() {
  const stage = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<Mood>("away");
  const [rest, setRest] = useState(0);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 700px)").matches;
    if (narrow) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const arrive = () => {
      const w = stage.current?.offsetWidth ?? 0;
      if (!w) return;
      setRest(-(w * REST));
      setMood(still ? "sitting" : "arriving");
    };
    const arm = () => {
      clearTimeout(timer);
      timer = setTimeout(arrive, IDLE_MS);
    };
    const poke = () => {
      setMood((m) => {
        if (m === "away" || m === "leaving") return m;
        if ("sunset" in document.documentElement.dataset) return m;
        return still ? "away" : "leaving";
      });
      arm();
    };

    arm();
    const events = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, poke, { passive: true }));
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, poke));
    };
  }, []);

  const visible = mood !== "away";
  const target = mood === "arriving" || mood === "sitting" ? rest : SIZE * 2;

  return (
    <div ref={stage} className="idle-stage" aria-hidden="true">
      {visible && (
        <motion.div
          className="idle-cat"
          initial={{ x: SIZE * 2 }}
          animate={{ x: target }}
          transition={{
            duration: mood === "leaving" ? 1.6 : 7,
            ease: "linear",
          }}
          onAnimationComplete={() => {
            if (mood === "arriving") setMood("sitting");
            if (mood === "leaving") setMood("away");
          }}
        >
          <motion.div
            animate={mood === "arriving" || mood === "leaving" ? { y: [0, -2, 0] } : { y: 0 }}
            transition={{ duration: 0.36, repeat: Infinity, ease: "linear" }}
          >
            <PixelCat size={SIZE} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
