import { setRequestLocale } from "next-intl/server"

import { Footer } from "@/widgets/footer"

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  return (
    <>
      {children}
      <Footer />
    </>
  )
}
