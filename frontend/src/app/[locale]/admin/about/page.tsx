import { setRequestLocale } from "next-intl/server"

import { AboutEdit } from "@/widgets/admin/about"

export default async function AdminAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  return <AboutEdit />
}
