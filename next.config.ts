import type { NextConfig } from "next";
import { withNextDevtools } from '@next-devtools/core/plugin'

const nextConfig: NextConfig = withNextDevtools({
  /* config options here */
})

export default nextConfig;
