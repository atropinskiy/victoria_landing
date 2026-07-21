import type { NextRequest } from "next/server"

import createMiddleware from "next-intl/middleware"

// import { NextResponse } from "next/server"

import { routing } from "./shared/i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default function proxy(request: NextRequest) {
  // TODO: включить когда токен будет в httpOnly cookie. Роль в отдельной cookie лучше!
  //
  // if (request.nextUrl.pathname.match(/^\/(ru|en)\/admin(\/|$)/)) {
  //   const role = request.cookies.get("user_role")?.value
  //
  //   if (role !== "admin") {
  //     const url = request.nextUrl.clone()
  //     url.pathname = "/"
  //     return NextResponse.redirect(url)
  //   }
  // }

  return intlMiddleware(request)
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
