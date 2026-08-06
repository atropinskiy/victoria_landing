import { setRequestLocale } from "next-intl/server"

import { AboutForm } from "@/widgets/admin"

export default async function AdminAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  return <AboutForm />
}
