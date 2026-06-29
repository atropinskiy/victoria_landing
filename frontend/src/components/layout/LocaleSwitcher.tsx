"use client"

import type { Locale } from "@/i18n/config"

import { useLocale } from "next-intl"
import { useTransition } from "react"

import { locales } from "@/i18n/config"
import { usePathname, useRouter } from "@/i18n/routing"

export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function onChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <div className="flex items-center gap-1 rounded-md border border-zinc-200 bg-white p-1">
      {locales.map((l) => {
        const active = l === locale

        return (
          <button
            key={l}
            onClick={() => onChange(l)}
            disabled={isPending}
            className={[
              "cursor-pointer rounded px-2 py-1 text-sm font-medium transition-all duration-200",
              isPending ? "opacity-40" : "opacity-100",
              active
                ? "scale-[1.02] bg-zinc-900 text-white"
                : "text-zinc-600 hover:scale-[1.02] hover:text-zinc-900",
            ].join(" ")}
          >
            {l.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
