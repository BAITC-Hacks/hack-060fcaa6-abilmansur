import type { Metadata } from "next";
import localFont from "next/font/local";

import { Providers } from "@/components/Providers";
import "./globals.css";

/** Display face for the product name: shipped with the app (no font service at build or run time), so the
 *  wordmark renders the same on every device. */
const display = localFont({
  src: "./fonts/unbounded-latin-600.woff2",
  weight: "600",
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Falcon — расследование финансовых сетей",
  description: "Автономный финансовый следователь: восстанавливает структуру группы по банковским транзакциям.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={display.variable} suppressHydrationWarning>
      <head>
        {/* The design-system type tokens name the family "Inter" directly, so it is loaded under that name
            (variable axis: the design system uses weights 375/475). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- applied app-wide from the root layout */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
