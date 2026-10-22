"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import PixelCat from "@/components/PixelCat";

const links = [
  { href: "/", label: "home" },
  { href: "/now", label: "now" },
  { href: "/experiences", label: "experiences" },
  { href: "/projects", label: "projects" },
  { href: "/2cents", label: "2cents" },
];

export default function Nav() {
  const pathname = usePathname();

  useEffect(() => {
    console.log(
      "%c  /\\_/\\ \n ( o.o )  made by manya. built with claude code.\n  > ^ <",
      "color:#4a5b6b;font-family:monospace;font-size:11px;line-height:1.3;"
    );
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="frame nav" aria-label="Main navigation">
      <Link href="/" className="nav-brand bare">
        <PixelCat size={26} />
        <span>manya pradeep narayan</span>
      </Link>

      <ul className="nav-links pixel">
        {links.map((link) => {
          const active = isActive(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link bare"
                aria-current={active ? "page" : undefined}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-dot"
                    className="nav-dot"
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
    </nav>
  );
}
