import { ImageResponse } from "next/og";
import { weddingData } from "@/lib/weddingData";

export const alt = "Undangan pernikahan Fedy & Suci";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family: string, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`,
    ).then((res) => res.text());
    const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    const res = await fetch(match[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  const weekday = date
    .toLocaleDateString("id-ID", { weekday: "long" })
    .toUpperCase();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${weekday}, ${day}.${month}.${date.getFullYear()}`;
}

export default async function OpenGraphImage() {
  const { groom, bride, akad } = weddingData;
  const names = `${groom.nickname}${bride.nickname}FS&`;
  const dateText = formatDate(akad.date);
  const caption = `THE WEDDING OF${dateText}Kepada tamu undangan`;

  const [serif, script, sans] = await Promise.all([
    loadGoogleFont("Cormorant+Garamond:wght@600", names),
    loadGoogleFont("Italianno", "&"),
    loadGoogleFont("Geist:wght@600", caption),
  ]);

  const fonts = [
    serif && { name: "Cormorant", data: serif, weight: 600 as const },
    script && { name: "Italianno", data: script, weight: 400 as const },
    sans && { name: "Geist", data: sans, weight: 600 as const },
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 600;
  }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(70% 70% at 50% 45%, #ffffff 0%, #faf8f4 55%, #efe3c9 100%)",
          fontFamily: "Geist",
          color: "#3a332c",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 26,
            right: 26,
            bottom: 26,
            borderRadius: 36,
            border: "2px solid #dfc995",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            right: 36,
            bottom: 36,
            borderRadius: 28,
            border: "1px solid #efe0bd",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 26,
          }}
        >
          <div
            style={{
              width: 116,
              height: 116,
              borderRadius: 999,
              background: "linear-gradient(180deg, #c9a24f 0%, #94712a 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                right: 8,
                bottom: 8,
                borderRadius: 999,
                border: "1.5px solid rgba(246,238,221,0.7)",
                display: "flex",
              }}
            />
            <span
              style={{
                fontFamily: "Cormorant",
                fontSize: 44,
                color: "#fdf9f0",
                display: "flex",
                alignItems: "baseline",
                gap: 4,
              }}
            >
              F
              <span style={{ fontFamily: "Italianno", fontSize: 44, color: "#f3e3bb" }}>
                &amp;
              </span>
              S
            </span>
          </div>

          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 9,
              color: "#94712a",
            }}
          >
            THE WEDDING OF
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 26,
              fontFamily: "Cormorant",
              fontSize: 112,
              lineHeight: 1,
              color: "#94712a",
            }}
          >
            <span>{groom.nickname}</span>
            <span style={{ fontFamily: "Italianno", fontSize: 120, color: "#b8923f" }}>
              &amp;
            </span>
            <span>{bride.nickname}</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 5,
              color: "#776c61",
            }}
          >
            <span style={{ width: 56, height: 2, background: "#dfc995" }} />
            {dateText}
            <span style={{ width: 56, height: 2, background: "#dfc995" }} />
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}