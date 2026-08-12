import type { NextRequest } from "next/server"

import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"

import { REFRESH_TOKEN_COOKIE } from "@/shared/config"

import { routing } from "./shared/i18n/routing"
import { getRoleFromToken } from "./shared/lib/auth"

const intlMiddleware = createMiddleware(routing)

export default async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.match(/^\/(ru|en)\/admin(\/|$)/)) {
    const role = await getRoleFromToken(request.cookies.get(REFRESH_TOKEN_COOKIE)?.value)
    if (role !== "admin") {
      const url = request.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
  }
  return intlMiddleware(request)
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
