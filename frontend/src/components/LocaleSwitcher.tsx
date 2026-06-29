"use client"

import type { Locale } from "@/i18n/config"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { locales } from "@/i18n/config"

export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFading, setIsFading] = useState(false)

  function onChange(nextLocale: Locale) {
    const segments = pathname.split("/")
    segments[1] = nextLocale
    const newPath = segments.join("/")
    setIsFading(true)

    startTransition(() => {
      router.replace(newPath)
      setTimeout(() => setIsFading(false), 500)
    })
  }

  return (
    <div
      className={[
        "flex items-center gap-1 rounded-md border border-zinc-200 bg-white p-1 transition-opacity duration-200",
        isFading ? "opacity-40" : "opacity-100",
      ].join(" ")}
    >
      {locales.map((l) => {
        const active = l === locale

        return (
          <button
            key={l}
            onClick={() => onChange(l)}
            disabled={isPending}
            className={[
              "rounded px-2 py-1 text-sm font-medium transition-all duration-200",
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
