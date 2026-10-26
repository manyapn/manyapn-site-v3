import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "manya pradeep narayan";

export default async function Image() {
  const png = await readFile(join(process.cwd(), "public/land/rainier-og.png"));
  const src = `data:image/png;base64,${png.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f5f3ee" }}>
        <img src={src} width={1200} height={545} style={{ objectFit: "cover", height: 470, width: 1200 }} alt="" />
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 64px", marginTop: -52 }}>
          <div
            style={{
              background: "#f5f3ee",
              boxShadow: "10px 10px 0 #b25e7e",
              padding: "22px 30px",
              fontSize: 60,
              color: "#23303a",
              fontWeight: 500,
              letterSpacing: -1,
              display: "flex",
            }}
          >
            manya pradeep narayan
          </div>
          <div style={{ fontSize: 24, color: "#535e67", paddingBottom: 10, display: "flex" }}>manyapn.github.io</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
