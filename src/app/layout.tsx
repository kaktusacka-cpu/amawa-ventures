import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amawa Ventures",
  description: "Landing page for Amawa Ventures",
  icons: {
    icon: "/logo-amawa-mark.svg",
    shortcut: "/logo-amawa-mark.svg",
    apple: "/logo-amawa-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Script
          src="https://mcp.figma.com/mcp/html-to-design/capture.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
