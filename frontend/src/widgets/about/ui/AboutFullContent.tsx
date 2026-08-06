import type { Locale } from "@/shared/i18n"

import { getLocale } from "next-intl/server"
import { notFound } from "next/navigation"

import { getAbout } from "@/entities/about"
import { RichText } from "@/shared/ui/widgets"

export async function AboutFullContent() {
  const locale = (await getLocale()) as Locale
  const about = await getAbout()

  if (!about) notFound()

  return <RichText html={about.full[locale]} className="text-justify" />
}
