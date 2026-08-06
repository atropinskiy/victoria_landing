import type { Locale } from "@/shared/i18n"

import { getLocale } from "next-intl/server"

import { getAbout } from "@/entities/about"
import { RichText } from "@/shared/ui/widgets"

export async function AboutContent() {
  const locale = (await getLocale()) as Locale
  const about = await getAbout()

  if (!about) return null

  return <RichText html={about.promo[locale]} />
}
