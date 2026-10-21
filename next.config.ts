import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  agentRules: false,
  async headers() {
    return [{
      // These filenames include a content hash; replacements get a new URL.
      source: "/tacki/cached/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }];
  },
  images: {
    // Next 16 requires an explicit allowlist; 90 is for the alpha lettering and
    // stamps, whose thin glyph edges fringe at the default 75.
    qualities: [75, 90],
  },
};

export default nextConfig;
