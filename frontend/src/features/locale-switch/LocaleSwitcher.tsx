"use client"

import type { Locale } from "@/shared/i18n/config"

import { useLocale } from "next-intl"
import { useTransition } from "react"

import { locales } from "@/shared/i18n/config"
import { usePathname, useRouter } from "@/shared/i18n/routing"
import { Button } from "@/shared/ui/button"

export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const nextLocale = locales.find((l) => l !== locale) as Locale

  function toggle() {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false })
    })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      disabled={isPending}
      // className={isPending ? "opacity-40" : "opacity-100"}
      className="bg-background"
    >
      {locale.toUpperCase()}
    </Button>
  )
}
