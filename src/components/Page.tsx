import type { Landscape } from "@/data/landscapes";

/** Tints the whole page with its landscape's pigment. */
type Props = { land: Landscape; className?: string; children: React.ReactNode };

export default function Page({ land, className, children }: Props) {
  return (
    <div className={className ? `page ${className}` : "page"} style={{ "--accent": land.accent } as React.CSSProperties}>
      {children}
    </div>
  );
}
