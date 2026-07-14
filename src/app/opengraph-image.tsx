import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamically generated social-sharing image (used site-wide). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 55%, #0b1f4d 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 76,
              height: 76,
              borderRadius: 18,
              background: "#2563eb",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            AM
          </div>
          <div style={{ fontSize: 26, color: "#94a3b8" }}>{siteConfig.contact.email}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: "-0.03em" }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: "#60a5fa" }}>
            Software Engineer · Java Full-Stack · Cloud &amp; AI
          </div>
          <div style={{ fontSize: 26, color: "#cbd5e1", maxWidth: 900, lineHeight: 1.4 }}>
            Building scalable enterprise systems, cloud-native applications, and intelligent
            digital products.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["Java", "Spring Boot", "React", "AWS", "Microservices", "DevOps"].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 22,
                color: "#e2e8f0",
                border: "1px solid #334155",
                borderRadius: 999,
                padding: "6px 18px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
