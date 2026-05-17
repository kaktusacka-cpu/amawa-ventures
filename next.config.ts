import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Editors paste image URLs from Notion into the CMS. Accepting any
    // HTTPS host means a new partner/CDN/URL "just works" without a code
    // change. HTTP is still blocked.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
