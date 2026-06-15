import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Y Viện Toplink — Dưỡng Thân · Tỉnh Thức";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#5f0c10",
          color: "#fff4df",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 130,
            height: 130,
            borderRadius: "9999px",
            border: "3px solid #d8aa4b",
            color: "#f3d27a",
            fontSize: 76,
            fontWeight: 700,
          }}
        >
          Y
        </div>
        <div style={{ marginTop: 36, fontSize: 64, fontWeight: 700, color: "#f7e8c2" }}>
          Y Viện Toplink
        </div>
        <div style={{ marginTop: 12, fontSize: 32, color: "#f3d27a", letterSpacing: 4 }}>
          DƯỠNG THÂN · TỈNH THỨC
        </div>
        <div style={{ marginTop: 24, fontSize: 26, color: "#fff4df", opacity: 0.85 }}>
          Đông y dưỡng sinh · Trị liệu · Công nghệ cao
        </div>
      </div>
    ),
    { ...size }
  );
}
