"use client"

import { ArrowLeft } from "lucide-react"
import { useTranslations } from "next-intl"

import { ADMIN_SIDEBAR_LINKS } from "@/widgets/admin/config/routes"
import { AppRoutes } from "@/shared/config"
import { Link, usePathname } from "@/shared/i18n"
import { cn } from "@/shared/lib/utils"
import { Typography } from "@/shared/ui/typography"

export function Sidebar() {
  const t = useTranslations("admin")
  const pathname = usePathname()

  return (
    <aside className="bg-accent flex w-16 shrink-0 flex-col gap-8 px-2 py-8 sm:w-60 sm:px-6">
      <Typography
        as="span"
        className="text-accent-foreground hidden text-lg font-bold tracking-wide uppercase sm:block"
      >
        {t("sidebarTitle")}
      </Typography>

      <nav className="flex flex-1 flex-col gap-1">
        {ADMIN_SIDEBAR_LINKS.map(({ href, key, icon: Icon }) => {
          const isActive = pathname === href

          return (
            <Link
              key={key}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center justify-center gap-3 rounded-sm px-2 py-2.5 sm:justify-start",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-accent-foreground/60 hover:text-accent-foreground"
              )}
            >
              <Icon className="size-5 shrink-0" />
              <Typography as="span" className="hidden font-medium text-inherit sm:inline">
                {t(key)}
              </Typography>
            </Link>
          )
        })}
      </nav>

      <Link
        href={AppRoutes.HOME}
        aria-label={t("backToSite")}
        className="text-accent-foreground/60 hover:text-accent-foreground flex items-center justify-center gap-3 rounded-sm px-2 py-2.5 sm:justify-start"
      >
        <ArrowLeft className="size-5 shrink-0" />
        <Typography as="span" className="hidden font-medium text-inherit sm:inline">
          {t("backToSite")}
        </Typography>
      </Link>
    </aside>
  )
}
