import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "🐊 CrocoDocs - Your Robotics Guide",
  description: "A powerful guide to FIRST robotics programming! Tips, tricks, and insights for FTC and FGC teams. 🔴⚪",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body
        className="flex flex-col min-h-screen"
        style={{
          fontFamily: poppins.style.fontFamily,
        }}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
