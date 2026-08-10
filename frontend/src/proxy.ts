import type { NextRequest } from "next/server"

import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"

import { USER_ROLE_COOKIE } from "./shared/config"
import { routing } from "./shared/i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.match(/^\/(ru|en)\/admin(\/|$)/)) {
    const role = request.cookies.get(USER_ROLE_COOKIE)?.value

    if (role !== "admin") {
      const url = request.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
