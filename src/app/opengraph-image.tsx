import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Arxia — Technology to transform nations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Inline a subtle blueprint-grid SVG as the background to stay on-brand
  // without needing an external asset.
  const gridDataUrl =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>
        <path d='M 100 0 L 0 0 0 100' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1'/>
      </svg>`
    );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0D1520",
          backgroundImage: `url("${gridDataUrl}")`,
          backgroundSize: "100px 100px",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 24,
            letterSpacing: "0.2em",
            color: "#A0AEC0",
            textTransform: "uppercase",
          }}
        >
          ARXIA
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              color: "#FFFFFF",
            }}
          >
            Technology
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              color: "#FFFFFF",
            }}
          >
            to transform nations
          </div>
          <div
            style={{
              width: 64,
              height: 4,
              background: "#ED1C24",
              marginTop: 32,
            }}
          />
          <div
            style={{
              fontSize: 26,
              color: "#A0AEC0",
              marginTop: 28,
              maxWidth: 880,
              lineHeight: 1.4,
            }}
          >
            Digital transformation and Digital Public Infrastructure for governments,
            industries, and ecosystems.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: 18,
            color: "#A0AEC0",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          arxia.com
        </div>
      </div>
    ),
    { ...size }
  );
}
