import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";

import { Providers } from "@/components/Providers";
import pt from "@/i18n/locales/pt.json";

import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = "NEBe · Núcleo de Estudantes de Bioengenharia da UAlg";
const description =
  "Núcleo de Estudantes de Bioengenharia da Universidade do Algarve. A vida inspira e a engenharia transforma.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "NEBe",
    "Bioengenharia",
    "UAlg",
    "Universidade do Algarve",
    "AAUAlg",
    "núcleo",
  ],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    alternateLocale: ["en_GB"],
    siteName: "NEBe",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#061327" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-PT"
      className={`${lexend.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh font-sans">
        <a
          href="#conteudo"
          className="sr-only z-[60] rounded-full bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {pt.meta.skip}
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
