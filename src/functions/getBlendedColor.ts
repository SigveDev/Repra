// Client-side helper to compute the hex color resulting from drawing an
// overlay (hex color + alpha) over the page background (detects --bg-primary
// or falls back to probing `.bg-bg-primary`). Returns the blended hex and a
// background hex that can be used to restore theme-color on unmount.
export async function getBlendedColor(
  overlayHex: string,
  alphaHex: string = "66"
): Promise<{ blendedHex: string; bgHexForRestore: string | null }> {
  // guard: must run in browser
  if (typeof window === "undefined" || typeof document === "undefined") {
    // server-side fallback: just return the overlay color without alpha applied
    const h = overlayHex.startsWith("#") ? overlayHex : `#${overlayHex}`;
    return { blendedHex: h, bgHexForRestore: null };
  }

  const rgbStringToObj = (s: string) => {
    const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
    if (!m) return null;
    return {
      r: Number(m[1]),
      g: Number(m[2]),
      b: Number(m[3]),
      a: m[4] ? Number(m[4]) : 1,
    };
  };

  const hexToObj = (hex: string) => {
    if (!hex) return null;
    let h = hex.replace("#", "").trim();
    if (h.length === 3)
      h = h
        .split("")
        .map((ch) => ch + ch)
        .join("");
    if (h.length !== 6) return null;
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: 1,
    };
  };

  const objToHex = (o: { r: number; g: number; b: number }) =>
    `#${[o.r, o.g, o.b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")}`;

  const blend = (
    bg: { r: number; g: number; b: number },
    fg: { r: number; g: number; b: number; a: number }
  ) => {
    const a = fg.a;
    return {
      r: Math.round(a * fg.r + (1 - a) * bg.r),
      g: Math.round(a * fg.g + (1 - a) * bg.g),
      b: Math.round(a * fg.b + (1 - a) * bg.b),
    };
  };

  // 1) find raw background color string
  let rawBgColor: string | null = null;
  try {
    const rootStyle = getComputedStyle(document.documentElement);
    const cssVar = rootStyle.getPropertyValue("--color-bg-primary").trim();
    if (cssVar) rawBgColor = cssVar;
  } catch (e) {
    void e;
  }

  if (!rawBgColor) {
    const probe = document.createElement("div");
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.width = "1px";
    probe.style.height = "1px";
    probe.className = "bg-bg-primary";
    document.body.appendChild(probe);
    const cs = getComputedStyle(probe).backgroundColor;
    rawBgColor = cs || null;
    document.body.removeChild(probe);
  }

  let bgObj = null as null | { r: number; g: number; b: number; a?: number };
  if (rawBgColor)
    bgObj = rgbStringToObj(rawBgColor) || hexToObj(rawBgColor) || null;
  if (!bgObj) bgObj = { r: 255, g: 255, b: 255, a: 1 };

  // parse overlay hex and alpha
  const overlayObj = hexToObj(overlayHex) || { r: 0, g: 0, b: 0, a: 1 };
  // alphaHex might be like '66' or '#66' or '0.4' - support hex or decimal
  let alpha = 1;
  const aTrim = String(alphaHex).replace("#", "").trim();
  if (/^[0-9a-fA-F]{2}$/.test(aTrim)) {
    alpha = parseInt(aTrim, 16) / 255;
  } else {
    const n = Number(aTrim);
    if (!Number.isNaN(n)) alpha = n;
  }
  overlayObj.a = alpha;

  const blended = blend(
    bgObj as { r: number; g: number; b: number },
    overlayObj as { r: number; g: number; b: number; a: number }
  );
  const blendedHex = objToHex(blended);
  const bgHexForRestore = objToHex(bgObj);

  return { blendedHex, bgHexForRestore };
}

export default getBlendedColor;
