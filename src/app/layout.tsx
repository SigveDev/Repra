import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import NotificationProvider from "../components/notifications";

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
      path: "../../public/fonts/Satoshi-Bold.woff2",
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

export const generateViewport = (): Viewport => {
  const currentThemeColor = "#111111";
  return {
    themeColor: currentThemeColor,
    viewportFit: "contain",
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/favicon.ico" sizes="48x48" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body
        className={`${satoshi.variable} bg-bg-primary text-fg-primary min-h-screen font-semibold`}
      >
        <NotificationProvider>{children}</NotificationProvider>
        <Analytics />
      </body>
    </html>
  );
}
