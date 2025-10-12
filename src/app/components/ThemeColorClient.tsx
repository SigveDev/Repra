"use client";
import { useEffect } from "react";

function setMetaThemeColor(color: string) {
  let el = document.querySelector(
    "meta[name=theme-color]"
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.name = "theme-color";
    document.head.appendChild(el);
  }
  el.content = color;
}

function setViewportFit(fit: string) {
  // Look for an existing viewport meta tag and update/add viewport-fit
  let el = document.querySelector(
    "meta[name=viewport]"
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.name = "viewport";
    document.head.appendChild(el);
  }

  // Merge with existing content but ensure viewport-fit is set
  const current = el.content || "width=device-width,initial-scale=1";
  // Remove any existing viewport-fit entry
  const parts = current
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .filter((p) => !p.startsWith("viewport-fit"));
  parts.push(`viewport-fit=${fit}`);
  el.content = parts.join(", ");
}

export default function ThemeColorClient() {
  useEffect(() => {
    const override =
      typeof window !== "undefined"
        ? sessionStorage.getItem("overrideThemeColor")
        : null;
    const themeColor =
      override && override.trim() !== "" ? override : "#111111";
    setMetaThemeColor(themeColor);
    setViewportFit("contain");

    function onCustom(e: Event) {
      try {
        const detail = (e as CustomEvent).detail as string | null;
        const color = detail && detail.trim() !== "" ? detail : "#111111";
        setMetaThemeColor(color);
      } catch {
        /* ignore */
      }
    }

    // sessionStorage doesn't emit cross-window storage events. We rely
    // on the custom event for same-tab updates. For cross-tab syncing
    // consider BroadcastChannel if needed.
    window.addEventListener(
      "overrideThemeColorChange",
      onCustom as EventListener
    );
    return () => {
      window.removeEventListener(
        "overrideThemeColorChange",
        onCustom as EventListener
      );
    };
  }, []);

  return null;
}
