type Pigment = "rose" | "cobalt" | "viridian" | "ochre" | "lavender" | "sap";

/** A mildliner stroke under a phrase, in one of the site's pigments. */
export default function Wash({ children, pigment }: { children: React.ReactNode; pigment: Pigment }) {
  return <mark className={`wash-${pigment}`}>{children}</mark>;
}
