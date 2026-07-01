type OKLCH = { l: number; c: number; h: number }; // l: 0-1, c: chroma, h: degrees

// --- Parsing ---

export function parseOklch(oklchString: string): OKLCH {
  // Matches: oklch(0.2575 0.0886 26.0418) — also tolerates % on L and deg on H
  const match = oklchString
    .trim()
    .match(/^oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*\)$/i);

  if (!match) {
    throw new Error(`Invalid oklch string: "${oklchString}"`);
  }

  const [, lStr, cStr, hStr] = match;
  return {
    l: parseFloat(lStr),
    c: parseFloat(cStr),
    h: parseFloat(hStr),
  };
}


function oklchToOklab({ l, c, h }: OKLCH) {
  const hRad = (h * Math.PI) / 180;
  return {
    L: l,
    a: c * Math.cos(hRad),
    b: c * Math.sin(hRad),
  };
}

function oklabToLinearSrgb({ L, a, b }: { L: number; a: number; b: number }) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  return {
    r: +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  };
}

function linearToSrgbChannel(x: number): number {
  const clamped = Math.min(1, Math.max(0, x));
  return clamped <= 0.0031308
    ? 12.92 * clamped
    : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
}

function relativeLuminance(r: number, g: number, b: number): number {
  const toLin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
}

function oklchToLuminance(color: OKLCH): number {
  const lab = oklchToOklab(color);
  const linear = oklabToLinearSrgb(lab);
  const r = linearToSrgbChannel(linear.r);
  const g = linearToSrgbChannel(linear.g);
  const b = linearToSrgbChannel(linear.b);
  return relativeLuminance(r, g, b);
}


function getContrastRatio(colorA: OKLCH, colorB: OKLCH): number {
  const lumA = oklchToLuminance(colorA);
  const lumB = oklchToLuminance(colorB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

export type WCAGLevel = "AAA" | "AA" | "AA Large" | "Fail";

/*
  Get WCAG contrast rating between two oklch() color strings.
 
  param colorA  e.g. "oklch(0.9761 0.0134 100.6)"
  param colorB  e.g. "oklch(0.2575 0.0886 26.0418)"
  param context "normal" = body text (default). "large" = 18px+ regular or 14px+ bold.
 */
export function getWCAGRating(
  colorA: string,
  colorB: string,
  context: "normal" | "large" = "normal"
): { ratio: number; rating: WCAGLevel } {
  const a = parseOklch(colorA);
  const b = parseOklch(colorB);
  const ratio = getContrastRatio(a, b);

  let rating: WCAGLevel;
  if (context === "large") {
    if (ratio >= 4.5) rating = "AAA";
    else if (ratio >= 3) rating = "AA";
    else rating = "Fail";
  } else {
    if (ratio >= 7) rating = "AAA";
    else if (ratio >= 4.5) rating = "AA";
    else if (ratio >= 3) rating = "AA Large";
    else rating = "Fail";
  }
  return { ratio: Math.round(ratio * 10) / 10, rating };
}
