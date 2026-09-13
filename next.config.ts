import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  agentRules: false,
  images: {
    // Next 16 requires an explicit allowlist; 90 is for the alpha lettering and
    // stamps, whose thin glyph edges fringe at the default 75.
    qualities: [75, 90],
  },
};

export default nextConfig;
