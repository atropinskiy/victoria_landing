import type { Metadata } from "next"

import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta")

  return {
    title: t("home"),
  }
}

export default function HomePage() {
  const t = useTranslations("nav")

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">{t("home")}</h1>
      <p className="mt-4 text-lg text-zinc-600">{t("welcome")}</p>
    </div>
  )
}
