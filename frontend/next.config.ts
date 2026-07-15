import path from "node:path"
import type { NextConfig } from "next"

import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts")

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    webpackMemoryOptimizations: true,
    preloadEntriesOnStart: false,
  },
  images: {
    qualities: [75, 80, 85],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [path.join(process.cwd(), "node_modules/@svgr/webpack")],
        as: "*.js",
      },
    },
  },
  typedRoutes: false,
}

export default withNextIntl(nextConfig)
