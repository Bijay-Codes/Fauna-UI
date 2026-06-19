import { useState, useMemo } from "react";

/* ══════════════════════════════════════════════════════════
   OKLCH COLOR MATH  —  zero deps, pure functions
   ══════════════════════════════════════════════════════════ */

function oklchToLinearSRGB(L, C, H) {
  const rad = (H * Math.PI) / 180;
  const a = C * Math.cos(rad);
  const b = C * Math.sin(rad);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const lc = l_ * l_ * l_, mc = m_ * m_ * m_, sc = s_ * s_ * s_;
  return [
    Math.max(0, Math.min(1, 4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc)),
    Math.max(0, Math.min(1, -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc)),
    Math.max(0, Math.min(1, -0.0041960863 * lc - 0.7034186147 * mc + 1.7076147010 * sc)),
  ];
}

function relativeLuminance(L, C, H) {
  const [r, g, b] = oklchToLinearSRGB(L, C, H);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(L1, C1, H1, L2, C2, H2) {
  const y1 = relativeLuminance(L1, C1, H1);
  const y2 = relativeLuminance(L2, C2, H2);
  return (Math.max(y1, y2) + 0.05) / (Math.min(y1, y2) + 0.05);
}

// Iteratively nudges bg lightness until contrast >= minRatio
function nudgeLightness(bgL, bgC, bgH, fgL, fgC, fgH, minRatio = 4.5) {
  const fgIsLight = fgL > 0.6;
  let L = Math.max(0.01, Math.min(0.99, bgL));
  for (let i = 0; i < 100; i++) {
    if (contrastRatio(L, bgC, bgH, fgL, fgC, fgH) >= minRatio) break;
    L = fgIsLight ? Math.max(0.01, L - 0.005) : Math.min(0.99, L + 0.005);
  }
  return L;
}

function parseOklch(str) {
  const m = str.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
  return m ? [+m[1], +m[2], +m[3]] : [0, 0, 0];
}

/* ══════════════════════════════════════════════════════════
   PALETTE GENERATOR  —  the exportable core function
   ══════════════════════════════════════════════════════════ */

const f = (n) => parseFloat(n.toFixed(4));
const ok = (l, c, h) => `oklch(${f(l)} ${f(c)} ${f(h)})`;

export function generatePalette({ primaryHue: pH, accentHue: aH, saturation }) {
  const s = saturation / 100;

  // Secondary hue: 35% blend from primary toward accent (handles wraparound)
  const diff = ((aH - pH + 540) % 360) - 180;
  const sH = (pH + diff * 0.35 + 360) % 360;

  // Chroma levels, all scaled by saturation
  const ch = {
    trace: 0.005,
    muted: 0.008 + 0.012 * s,
    soft: 0.012 + 0.018 * s,
    base: 0.040 + 0.070 * s,
    vivid: 0.080 + 0.120 * s,
  };

  const SEM = { su: 150, wa: 58, da: 25 };

  // ── LIGHT MODE ──────────────────────────────────────────
  const lL = {
    p: nudgeLightness(0.50, ch.vivid, pH, 1, 0, 0),
    s: nudgeLightness(0.52, ch.base, sH, 1, 0, 0),
    a: nudgeLightness(0.75, ch.vivid, aH, 0.25, ch.base, aH),
    su: nudgeLightness(0.50, 0.13 + 0.04 * s, SEM.su, 1, 0, 0),
    wa: nudgeLightness(0.55, 0.13 + 0.04 * s, SEM.wa, 1, 0, 0),
    da: nudgeLightness(0.50, 0.18 + 0.04 * s, SEM.da, 1, 0, 0),
  };

  const light = {
    page_bg: ok(0.99, ch.trace, pH),
    page_fg: ok(0.22, ch.soft, pH),
    surface_bg: ok(0.96, ch.muted, pH),
    surface_fg: ok(0.30, ch.soft, pH),
    surface_muted_bg: ok(0.91, ch.soft, pH),
    surface_muted_fg: ok(0.48, ch.soft, pH),
    primary_bg: ok(lL.p, ch.vivid, pH),
    primary_fg: ok(1, 0, 0),
    secondary_bg: ok(lL.s, ch.base, sH),
    secondary_fg: ok(1, 0, 0),
    accent_bg: ok(lL.a, ch.vivid, aH),
    accent_fg: ok(0.25, ch.base, aH),
    success_color: ok(lL.su, 0.13 + 0.04 * s, SEM.su),
    success_fg: ok(1, 0, 0),
    warning_color: ok(lL.wa, 0.13 + 0.04 * s, SEM.wa),
    warning_fg: ok(1, 0, 0),
    danger_color: ok(lL.da, 0.18 + 0.04 * s, SEM.da),
    danger_fg: ok(1, 0, 0),
  };

  // ── DARK MODE ───────────────────────────────────────────
  const dL = {
    p: nudgeLightness(0.77, ch.vivid, pH, 0.25, ch.base, pH),
    s: nudgeLightness(0.72, ch.base, sH, 0.22, ch.muted, sH),
    a: nudgeLightness(0.82, ch.vivid, aH, 0.27, ch.base, aH),
    su: nudgeLightness(0.79, 0.17 + 0.05 * s, SEM.su, 0.25, 0.06, SEM.su),
    wa: nudgeLightness(0.82, 0.16 + 0.05 * s, SEM.wa, 0.27, 0.07, SEM.wa),
    da: nudgeLightness(0.71, 0.17 + 0.05 * s, SEM.da, 0.25, 0.09, SEM.da),
  };

  const dark = {
    page_bg: ok(0.18, ch.muted, pH),
    page_fg: ok(0.97, ch.trace, pH),
    surface_bg: ok(0.24, ch.muted, pH),
    surface_fg: ok(0.93, ch.trace, pH),
    surface_muted_bg: ok(0.30, ch.soft, pH),
    surface_muted_fg: ok(0.82, ch.soft, pH),
    primary_bg: ok(dL.p, ch.vivid, pH),
    primary_fg: ok(0.25, ch.base, pH),
    secondary_bg: ok(dL.s, ch.base, sH),
    secondary_fg: ok(0.22, ch.muted, sH),
    accent_bg: ok(dL.a, ch.vivid, aH),
    accent_fg: ok(0.27, ch.base, aH),
    success_color: ok(dL.su, 0.17 + 0.05 * s, SEM.su),
    success_fg: ok(0.25, 0.06, SEM.su),
    warning_color: ok(dL.wa, 0.16 + 0.05 * s, SEM.wa),
    warning_fg: ok(0.27, 0.07, SEM.wa),
    danger_color: ok(dL.da, 0.17 + 0.05 * s, SEM.da),
    danger_fg: ok(0.25, 0.09, SEM.da),
  };

  return { light, dark };
}

/* ══════════════════════════════════════════════════════════
   DEMO UI
   ══════════════════════════════════════════════════════════ */

const PAIRS = [
  { label: "Page", bg: "page_bg", fg: "page_fg", min: 4.5 },
  { label: "Surface", bg: "surface_bg", fg: "surface_fg", min: 4.5 },
  { label: "Muted", bg: "surface_muted_bg", fg: "surface_muted_fg", min: 3.0 },
  { label: "Primary", bg: "primary_bg", fg: "primary_fg", min: 4.5 },
  { label: "Secondary", bg: "secondary_bg", fg: "secondary_fg", min: 4.5 },
  { label: "Accent", bg: "accent_bg", fg: "accent_fg", min: 4.5 },
  { label: "Success", bg: "success_color", fg: "success_fg", min: 4.5 },
  { label: "Warning", bg: "warning_color", fg: "warning_fg", min: 4.5 },
  { label: "Danger", bg: "danger_color", fg: "danger_fg", min: 4.5 },
];

function wcagBadge(ratio, min) {
  if (ratio >= 7.0) return { label: "AAA", ok: true };
  if (ratio >= 4.5) return { label: "AA", ok: true };
  if (ratio >= 3.0) return { label: "AA Large", ok: min <= 3.0 };
  return { label: "FAIL", ok: false };
}

function SwatchCard({ pair, colors }) {
  const bg = colors[pair.bg];
  const fg = colors[pair.fg];
  const [bL, bC, bH] = parseOklch(bg);
  const [fL, fC, fH] = parseOklch(fg);
  const ratio = contrastRatio(bL, bC, bH, fL, fC, fH);
  const { label: wl, ok: pass } = wcagBadge(ratio, pair.min);

  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{
        backgroundColor: bg, color: fg,
        padding: "14px 12px 10px", minHeight: 68,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>{pair.label}</span>
        <span style={{ fontSize: 11, opacity: 0.75 }}>Aa Bb 123</span>
      </div>
      <div style={{
        background: "#0e0e1c", padding: "6px 10px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 10, color: "#666", fontFamily: "monospace" }}>
          {ratio.toFixed(2)}:1
        </span>
        <span style={{
          fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3, letterSpacing: "0.04em",
          background: pass ? "rgba(80,200,100,0.12)" : "rgba(220,60,60,0.12)",
          color: pass ? "#55cc77" : "#e05555",
        }}>
          {wl}
        </span>
      </div>
    </div>
  );
}

const PRESETS = [
  { id: 6, name: "Firefly", primaryHue: 130, accentHue: 70, saturation: 65 },
  { id: 7, name: "Panther", primaryHue: 270, accentHue: 285, saturation: 30 },
  { id: 8, name: "Koi", primaryHue: 20, accentHue: 45, saturation: 88 },
  { id: 9, name: "Jellyfish", primaryHue: 290, accentHue: 185, saturation: 45 },
  { id: 10, name: "Moth", primaryHue: 265, accentHue: 45, saturation: 25 },
  { id: 11, name: "Cobra", primaryHue: 150, accentHue: 55, saturation: 72 },
  { id: 12, name: "Manta Ray", primaryHue: 215, accentHue: 230, saturation: 65 },
  { id: 13, name: "Phoenix", primaryHue: 15, accentHue: 45, saturation: 95 },
  { id: 14, name: "Snow Leopard", primaryHue: 205, accentHue: 30, saturation: 18 },
  { id: 15, name: "Mantis Shrimp", primaryHue: 175, accentHue: 320, saturation: 90 },
  { id: 16, name: "Black Widow", primaryHue: 355, accentHue: 270, saturation: 75 },
  { id: 17, name: "Barn Owl", primaryHue: 35, accentHue: 48, saturation: 45 },
  { id: 18, name: "Dragonfly", primaryHue: 170, accentHue: 240, saturation: 78 },
  { id: 19, name: "Electric Eel", primaryHue: 160, accentHue: 65, saturation: 82 },
  { id: 20, name: "Lynx", primaryHue: 30, accentHue: 200, saturation: 30 },
  { id: 21, name: "Axolotl", primaryHue: 340, accentHue: 300, saturation: 58 },
  { id: 22, name: "Viper", primaryHue: 140, accentHue: 85, saturation: 82 },
  { id: 23, name: "Hummingbird", primaryHue: 155, accentHue: 315, saturation: 90 },
  { id: 24, name: "Osprey", primaryHue: 205, accentHue: 35, saturation: 32 },
  { id: 25, name: "Crow", primaryHue: 250, accentHue: 40, saturation: 18 },
  { id: 26, name: "Chameleon", primaryHue: 115, accentHue: 30, saturation: 78 },
  { id: 27, name: "Mantis", primaryHue: 128, accentHue: 80, saturation: 85 },
  { id: 28, name: "Narwhal", primaryHue: 195, accentHue: 275, saturation: 48 },
  { id: 29, name: "Octopus", primaryHue: 272, accentHue: 165, saturation: 62 },
  { id: 30, name: "Salamander", primaryHue: 22, accentHue: 135, saturation: 80 },
]
export function TestApp() {
  const [mode, setMode] = useState("light");
  const [pH, setPH] = useState(290);
  const [aH, setAH] = useState(185);
  const [sat, setSat] = useState(45);
  const [copied, setCopied] = useState(false);
  const [showJSON, setShowJSON] = useState(false);
  const [active, setActive] = useState("Jellyfish");

  const palette = useMemo(
    () => generatePalette({ primaryHue: pH, accentHue: aH, saturation: sat }),
    [pH, aH, sat]
  );
  const colors = palette[mode];

  const diff = ((aH - pH + 540) % 360) - 180;
  const secHue = Math.round((pH + diff * 0.35 + 360) % 360);
  const accent = `oklch(0.65 0.15 ${pH})`;

  const handlePreset = (p) => {
    setPH(p.primaryHue); setAH(p.accentHue); setSat(p.saturation); setActive(p.name);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      "color: " + JSON.stringify({ light: palette.light, dark: palette.dark }, null, 2)
    ).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };

  const sliders = [
    { label: "Primary hue", val: pH, set: (v) => { setPH(v); setActive(""); }, max: 359, dot: `oklch(0.65 0.2 ${pH})` },
    { label: "Accent hue", val: aH, set: (v) => { setAH(v); setActive(""); }, max: 359, dot: `oklch(0.65 0.2 ${aH})` },
    { label: "Saturation", val: sat, set: (v) => { setSat(v); setActive(""); }, max: 100, dot: `oklch(0.65 ${(0.02 + 0.18 * sat / 100).toFixed(3)} ${pH})` },
  ];

  return (
    <div style={{
      background: "#0b0b18", minHeight: "100vh", color: "#dde0f0",
      fontFamily: "system-ui, sans-serif", padding: "20px 18px 48px",
    }}>
      <div style={{ maxWidth: 740, margin: "0 auto" }}>

        {/* header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h1 style={{ margin: "0 0 3px", fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: accent }}>
              FaunaUI Palette Generator
            </h1>
            <p style={{ margin: 0, fontSize: 11, color: "#555" }}>OKLCH · WCAG auto-contrast · light + dark</p>
          </div>
          <button
            onClick={() => setMode(m => m === "light" ? "dark" : "light")}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#ccc", padding: "5px 13px", borderRadius: 6, fontSize: 12, cursor: "pointer",
            }}
          >
            {mode === "light" ? "☀ Light" : "☽ Dark"}
          </button>
        </div>

        {/* presets */}
        <div style={{ display: "flex", gap: 7, marginBottom: 20, flexWrap: "wrap" }}>
          {PRESETS.map(p => (
            <button key={p.name} onClick={() => handlePreset(p)} style={{
              padding: "4px 11px", borderRadius: 5, cursor: "pointer", fontSize: 12,
              border: `1px solid ${active === p.name ? accent : "rgba(255,255,255,0.09)"}`,
              background: active === p.name ? "rgba(255,255,255,0.06)" : "transparent",
              color: active === p.name ? accent : "#777",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{
                width: 9, height: 9, borderRadius: "50%", display: "inline-block", flexShrink: 0,
                background: `oklch(0.6 0.18 ${p.primaryHue})`,
                outline: `2px solid oklch(0.65 0.18 ${p.accentHue})`, outlineOffset: 1,
              }} />
              {p.name}
            </button>
          ))}
        </div>

        {/* controls */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.055)",
          borderRadius: 10, padding: "15px 18px", marginBottom: 18,
        }}>
          {sliders.map(({ label, val, set, max, dot }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 100, fontSize: 11, color: "#777", flexShrink: 0 }}>{label}</div>
              <input type="range" min={0} max={max} value={val}
                onChange={e => set(+e.target.value)}
                style={{ flex: 1, accentColor: dot, cursor: "pointer" }} />
              <div style={{ width: 28, textAlign: "right", fontSize: 11, fontFamily: "monospace", color: "#bbb" }}>{val}</div>
              <div style={{ width: 18, height: 18, borderRadius: 3, background: dot, flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)" }} />
            </div>
          ))}
          <div style={{ fontSize: 10, color: "#444", marginTop: 4, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            secondary hue derived → <span style={{ color: `oklch(0.6 0.15 ${secHue})`, fontFamily: "monospace" }}>{secHue}°</span>
            &nbsp;(35% blend primary → accent)
          </div>
        </div>

        {/* swatches */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 9, marginBottom: 16 }}>
          {PAIRS.map(p => <SwatchCard key={p.label} pair={p} colors={colors} />)}
        </div>

        {/* actions */}
        <div style={{ display: "flex", gap: 8, marginBottom: showJSON ? 14 : 0 }}>
          <button onClick={handleCopy} style={{
            background: `oklch(0.48 ${0.08 + 0.12 * sat / 100} ${pH})`,
            color: "white", border: "none", padding: "7px 15px",
            borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            {copied ? "✓ Copied!" : "Copy JSON"}
          </button>
          <button onClick={() => setShowJSON(j => !j)} style={{
            background: "rgba(255,255,255,0.04)", color: "#888",
            border: "1px solid rgba(255,255,255,0.07)", padding: "7px 13px",
            borderRadius: 6, fontSize: 12, cursor: "pointer",
          }}>
            {showJSON ? "▲ Hide" : "▼ Show"} output
          </button>
        </div>

        {showJSON && (
          <pre style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)",
            borderRadius: 8, padding: "14px 16px", fontSize: 10, color: "#777",
            overflowX: "auto", lineHeight: 1.7, maxHeight: 360, overflowY: "auto", margin: 0,
          }}>
            {"color: " + JSON.stringify({ light: palette.light, dark: palette.dark }, null, 2)}
          </pre>
        )}

      </div>
    </div>
  );
}
