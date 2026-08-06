import type { getTranslations } from "next-intl/server"

export const LOCALE = {
  RU: "ru",
  EN: "en",
} as const

export type Translator = Awaited<ReturnType<typeof getTranslations>>

export const locales = Object.values(LOCALE)

export type Locale = (typeof LOCALE)[keyof typeof LOCALE]

export const defaultLocale: Locale = LOCALE.RU
