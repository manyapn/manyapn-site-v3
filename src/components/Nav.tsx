"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";
import PixelCat from "@/components/PixelCat";
import { landscapes } from "@/data/landscapes";

const links = [
  { href: "/", label: "home" },
  { href: "/now", label: "now" },
  { href: "/experiences", label: "experiences" },
  { href: "/projects", label: "projects" },
  { href: "/fun", label: "fun" },
  { href: "/2cents", label: "2cents" },
];

/** Each section's pigment, from its landscape, so the nav dot can match the page it's on. */
const accentFor = (pathname: string) => {
  if (pathname.startsWith("/now")) return landscapes.kerry.accent;
  if (pathname.startsWith("/experiences")) return landscapes.everest.accent;
  if (pathname.startsWith("/projects")) return landscapes.diablo.accent;
  if (pathname.startsWith("/fun")) return landscapes.montroyal.accent;
  if (pathname.startsWith("/2cents")) return landscapes.palouse.accent;
  return landscapes.rainier.accent;
};

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The dot slides between links (layoutId) and fades to the new section's pigment as it goes.
  const dotColor = useMotionValue(accentFor(pathname));
  useEffect(() => {
    const controls = animate(dotColor, accentFor(pathname), { duration: 0.45, ease: "easeInOut" });
    return () => controls.stop();
  }, [pathname, dotColor]);

  // The phone menu closes on navigation and on escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    console.log(
      "%c  /\\_/\\ \n ( o.o )  made by manya. built with claude code.\n  > ^ <",
      "color:#4a5b6b;font-family:monospace;font-size:11px;line-height:1.3;"
    );
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const current = links.find((l) => isActive(l.href)) ?? links[0];

  return (
    <nav className="frame nav" aria-label="Main navigation">
      <Link href="/" className="nav-brand bare">
        <PixelCat size={26} />
        <span>manya pradeep narayan</span>
      </Link>

      {/* phones: where you are, plus a pixel button that opens the list */}
      <button
        type="button"
        className="nav-menu-btn pixel"
        aria-expanded={open}
        aria-controls="nav-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <motion.span className="nav-dot" style={{ backgroundColor: dotColor }} aria-hidden="true" />
        <span>{open ? "close" : current.label}</span>
        <span className="nav-menu-icon" data-open={open || undefined} aria-hidden="true">
          <i /><i /><i /><i />
        </span>
      </button>

      <ul className="nav-links pixel">
        {links.map((link) => {
          const active = isActive(link.href);
          return (
            <li key={link.href}>
              <Link href={link.href} className="nav-link bare" aria-current={active ? "page" : undefined}>
                {active ? (
                  <motion.span
                    layoutId="nav-dot"
                    className="nav-dot"
                    style={{ backgroundColor: dotColor }}
                    transition={{ type: "spring", stiffness: 520, damping: 38 }}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="nav-dot-ghost" aria-hidden="true" />
                )}
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            className="nav-backdrop"
            aria-label="close menu"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
        {open && (
          <motion.ul
            id="nav-menu"
            className="nav-menu pixel"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {links.map((link, i) => {
              const active = isActive(link.href);
              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.16 }}
                >
                  <Link href={link.href} className="nav-menu-link bare" aria-current={active ? "page" : undefined}>
                    {active ? (
                      <motion.span className="nav-dot" style={{ backgroundColor: dotColor }} aria-hidden="true" />
                    ) : (
                      <span className="nav-dot-ghost" aria-hidden="true" />
                    )}
                    {link.label}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
