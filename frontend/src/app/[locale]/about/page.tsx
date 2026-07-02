import type { Metadata } from "next"

import { getTranslations, setRequestLocale } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about")

  return {
    title: t("title"),
  }
}
export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("about")

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">{t("title")}</h1>
    </section>
  )
}
