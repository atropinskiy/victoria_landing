import { Briefcase, FileText, LayoutList, Phone, User } from "lucide-react"

import { AppRoutes } from "@/shared/config"

export const ADMIN_SIDEBAR_LINKS = [
  { href: AppRoutes.ADMIN.ABOUT, key: "about", icon: User },
  { href: AppRoutes.ADMIN.CASES, key: "cases", icon: Briefcase },
  { href: AppRoutes.ADMIN.SERVICES, key: "services", icon: LayoutList },
  { href: AppRoutes.ADMIN.LIBRARY, key: "library", icon: FileText },
  { href: AppRoutes.ADMIN.CONTACTS, key: "contacts", icon: Phone },
] as const
