import type { Metadata } from "next"

import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact")

  return {
    title: t("title"),
  }
}

export default async function ContactPage() {
  const t = await getTranslations("contact")

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">{t("title")}</h1>
    </section>
  )
}
