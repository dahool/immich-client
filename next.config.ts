import type { NextConfig } from "next";
import { withNextDevtools } from '@next-devtools/core/plugin'

const nextConfig: NextConfig = withNextDevtools({
  output: "standalone",
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
})

export default nextConfig;
