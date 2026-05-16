import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amawa Ventures",
    template: "%s · Amawa Ventures",
  },
  description:
    "Amawa Ventures designs learning, innovation and entrepreneurial experiences that help individuals and organizations think differently and grow.",
  icons: {
    icon: "/logo-amawa-mark.svg",
    shortcut: "/logo-amawa-mark.svg",
    apple: "/logo-amawa-mark.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Amawa Ventures",
    title: "Amawa Ventures",
    description:
      "Designing learning, innovation and entrepreneurial experiences for people and organizations ready to think differently and grow.",
    url: siteUrl,
    images: [
      {
        url: "/logo-amawa-full.svg",
        width: 1200,
        height: 630,
        alt: "Amawa Ventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amawa Ventures",
    description:
      "Designing learning, innovation and entrepreneurial experiences for people and organizations ready to think differently and grow.",
  },
};

async function getLocaleFromHeaders(): Promise<string> {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "";
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : defaultLocale;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLocaleFromHeaders();

  return (
    <html lang={lang}>
      <body className="antialiased">
        {children}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        <Analytics />
      </body>
    </html>
  );
}
