"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/** 14 × 12 sprite. k = ink, w = paper (eyes), . = empty. */
const HEAD = [
  ".k....k.......",
  ".kk..kk.......",
  ".kkkkkk.......",
  ".kwkkwk.......",
  ".kkkkkk.......",
  "..kkkk........",
  "..kkkkkkkk....",
];
/** Eyes one column to the right: looking where the page went. */
const HEAD_LOOK = [...HEAD.slice(0, 3), ".kkwkkw.......", ...HEAD.slice(4)];
/** One ear flicks. */
const HEAD_TWITCH = [".k............", ...HEAD.slice(1)];
/** Tail up, mid, down, mid: a slow sway. */
const BODY = [
  ["..kkkkkkkkk.k.", "..kkkkkkkkk.k.", "..kkkkkkkkkkk.", "..kk.kk.kkk...", "..kk.kk......."],
  ["..kkkkkkkkk...", "..kkkkkkkkk.k.", "..kkkkkkkkkkk.", "..kk.kk.kkk...", "..kk.kk......."],
  ["..kkkkkkkkk...", "..kkkkkkkkk...", "..kkkkkkkkkkk.", "..kk.kk.kkk.k.", "..kk.kk......."],
  ["..kkkkkkkkk...", "..kkkkkkkkk.k.", "..kkkkkkkkkkk.", "..kk.kk.kkk...", "..kk.kk......."],
];
const WORDS = ["mrrp", "meow", ":3", "prrr", "mew"];

const W = 14;
const H = 12;

/**
 * The cat from the old site, redrawn as pixels. Its tail sways, it blinks,
 * an ear flicks now and then, it wags faster when you hover, says something
 * and hops when you tap it, and looks around when you change pages. Still,
 * with reduced motion on.
 */
export default function PixelCat({ size = 28, className = "" }: { size?: number; className?: string }) {
  const [blink, setBlink] = useState(false);
  const [twitch, setTwitch] = useState(false);
  const [look, setLook] = useState(false);
  const [frame, setFrame] = useState(0);
  const [excited, setExcited] = useState(false);
  const [word, setWord] = useState<string | null>(null);
  const [hop, setHop] = useState(0);
  const pathname = usePathname();
  const firstPath = useRef(true);
  const still = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (still()) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
    const blinkLoop = () =>
      later(() => {
        setBlink(true);
        later(() => {
          setBlink(false);
          blinkLoop();
        }, 140);
      }, 4000 + Math.random() * 4000);
    const earLoop = () =>
      later(() => {
        setTwitch(true);
        later(() => {
          setTwitch(false);
          earLoop();
        }, 120);
      }, 7000 + Math.random() * 9000);
    blinkLoop();
    earLoop();
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (still()) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % BODY.length), excited ? 130 : 560);
    return () => clearInterval(id);
  }, [excited]);

  // A new page: glance to the side, then back.
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    if (still()) return;
    setLook(true);
    setHop((h) => h + 1);
    const t = setTimeout(() => setLook(false), 900);
    return () => clearTimeout(t);
  }, [pathname]);

  const tap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setHop((h) => h + 1);
    setExcited(true);
    setTimeout(() => {
      setWord(null);
      setExcited(false);
    }, 1100);
  };

  const head = twitch ? HEAD_TWITCH : look ? HEAD_LOOK : HEAD;
  const rows = [...head, ...BODY[frame]];
  const px = size / W;
  const rects: React.ReactNode[] = [];
  rows.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c === ".") return;
      const eye = c === "w" && !blink;
      rects.push(
        <rect key={`${x}-${y}`} x={x * px} y={y * px} width={px} height={px} fill={eye ? "var(--paper)" : "currentColor"} />
      );
    });
  });

  return (
    <span className="cat-wrap" onMouseEnter={() => setExcited(true)} onMouseLeave={() => !word && setExcited(false)}>
      <motion.svg
        key={hop}
        className={`cat ${className}`}
        width={size}
        height={(size * H) / W}
        viewBox={`0 0 ${size} ${(size * H) / W}`}
        role="img"
        aria-label="a small pixel cat (tap it)"
        onClick={tap}
        initial={hop ? { y: -5 } : false}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 14 }}
      >
        {rects}
      </motion.svg>
      {word && (
        <motion.span
          className="cat-word pixel"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          aria-live="polite"
        >
          {word}
        </motion.span>
      )}
    </span>
  );
}
