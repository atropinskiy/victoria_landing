import type { Link } from "@/shared/i18n"
import type { ComponentProps } from "react"

import { AppRoutes } from "@/shared/config"

export const NAV_LINKS: {
  href: ComponentProps<typeof Link>["href"]
  key: string
  subKey?: string
  disabled?: boolean
}[] = [
  { href: AppRoutes.ABOUT, key: "about" },
  { href: AppRoutes.SERVICES, key: "services", subKey: "services_items" },
  { href: AppRoutes.CASES, key: "cases" },
  { href: AppRoutes.LIBRARY, key: "library" },
  // { href: AppRoutes.PROFILE, key: "profile" },
  { href: AppRoutes.CONTACTS, key: "contacts" },
]
