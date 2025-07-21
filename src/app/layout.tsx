import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  adjustFontFallback: true,
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body
        className="flex flex-col min-h-screen"
        style={{
          fontFamily: `"SF Pro Display", "SF Pro Text", Helvetica, ${inter.style.fontFamily}`,
        }}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
