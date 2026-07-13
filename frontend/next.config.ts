import path from "node:path"
import type { NextConfig } from "next"

import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts")

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
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
