"use client"

import type { Locale } from "@/i18n/config"

import { useLocale } from "next-intl"
import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import { locales } from "@/i18n/config"
import { usePathname, useRouter } from "@/i18n/routing"

export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const nextLocale = locales.find((l) => l !== locale) as Locale

  function toggle() {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
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
