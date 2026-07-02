export const LOCALE = {
  RU: "ru",
  EN: "en",
} as const

export const locales = Object.values(LOCALE)

export type Locale = (typeof LOCALE)[keyof typeof LOCALE]

export const defaultLocale: Locale = LOCALE.RU
