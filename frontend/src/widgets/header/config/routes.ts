import { AppRoutes } from "@/shared/config"

export const NAV_LINKS: { href: string; key: string; subKey?: string }[] = [
  { href: AppRoutes.ABOUT, key: "about" },
  { href: AppRoutes.SERVICES, key: "services", subKey: "services_items" },
  { href: AppRoutes.CASES, key: "cases" },
  { href: AppRoutes.LIBRARY, key: "library" },
  { href: AppRoutes.PROFILE, key: "profile" },
  { href: AppRoutes.CONTACTS, key: "contacts" },
]
