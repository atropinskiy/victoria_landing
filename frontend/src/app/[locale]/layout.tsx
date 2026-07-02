import type { Metadata } from "next"

import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { Inter, PT_Sans_Caption } from "next/font/google"

import { QueryProvider } from "@/app/providers/QueryProvider"
import { Footer } from "@/widgets/footer/ui/Footer"
import { Header } from "@/widgets/header/ui/Header"

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
            <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
              {children}
            </div>{" "}
            <Footer />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
