import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
import { organizationSchema, toJsonLd, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}（レスフリクション）｜暮らしの手間を減らす道具選び`,
    template: `%s｜${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author.name, url: SITE.author.url }],
  creator: SITE.author.name,
  publisher: SITE.publisher,
  keywords: [
    "暮らしの道具",
    "買ってよかったもの",
    "生活の手間を減らす",
    "便利グッズ 選び方",
    "収納 選び方",
    "ガジェット 選び方",
    "LessFriction",
    "レスフリクション",
  ],
  alternates: {
    canonical: "/",
    languages: { "ja-JP": "/" },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name}｜${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}｜${SITE.tagline}`,
    description: SITE.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg" }],
  },
  formatDetection: { telephone: false, email: false, address: false },
  category: "lifestyle",
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(websiteSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(organizationSchema()) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
