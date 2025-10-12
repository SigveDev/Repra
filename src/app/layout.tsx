import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeColorClient from "./components/ThemeColorClient";
import { Analytics } from "@vercel/analytics/next";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../..//public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Repra",
  description: "A workout tracker app built for Gymrats by Gymrats.",
};

export const viewport: Viewport = {
  viewportFit: "contain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
            try {
              var theme = '#111111';
              if (typeof localStorage !== 'undefined') {
                var o = localStorage.getItem('overrideThemeColor');
                if (o && o.trim() !== '') theme = o;
              }
              var meta = document.querySelector("meta[name=theme-color]");
              if (!meta) { meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }
              meta.content = theme;
              var vp = document.querySelector("meta[name=viewport]");
              if (!vp) { vp = document.createElement('meta'); vp.name = 'viewport'; document.head.appendChild(vp); }
              var cur = vp.content || 'width=device-width,initial-scale=1';
              cur = cur.split(',').map(function(p){return p.trim();}).filter(function(p){return p && p.indexOf('viewport-fit')!==0;}).join(', ');
              vp.content = (cur ? cur + ', ' : '') + 'viewport-fit=contain';
            } catch (e) { /* ignore */ }
          })();`,
          }}
        />
      </head>
      <body
        className={`${satoshi.variable} bg-bg-primary text-fg-primary min-h-screen`}
      >
        {/* Client component keeps meta tags updated after hydration */}
        <ThemeColorClient />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
