import type { Landscape } from "@/data/landscapes";

/** Tints the whole page with its landscape's pigment. */
export default function Page({ land, children }: { land: Landscape; children: React.ReactNode }) {
  return (
    <div className="page" style={{ "--accent": land.accent } as React.CSSProperties}>
      {children}
    </div>
  );
}
