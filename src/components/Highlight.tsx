type Variant = "blue" | "green" | "lavender" | "gold";

/** Kept for the blog posts, which still use the old variant names. */
export default function Highlight({ children, variant }: { children: React.ReactNode; variant: Variant }) {
  return <mark className={`mark-${variant}`}>{children}</mark>;
}
