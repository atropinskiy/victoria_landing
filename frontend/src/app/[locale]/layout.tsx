import type { Metadata } from "next"

import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { Inter, PT_Sans_Caption } from "next/font/google"

import { Container } from "@/components/layout/Container"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { QueryProvider } from "@/providers/QueryProvider"

import "../globals.css"

const ptSansCaption = PT_Sans_Caption({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
})

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
})

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const messages = await getMessages({ locale })

  return (
    <html lang={locale} className={`${ptSansCaption.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <QueryProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Header />
            <Container>{children}</Container>
            <Footer />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
