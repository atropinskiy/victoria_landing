import type { Metadata } from "next"

import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"

import { inter, ptSansCaption } from "@/app/fonts"
import { Header } from "@/widgets/header"
import { AuthModals } from "@/features/auth"
import { Toaster } from "@/shared/ui/sonner"

import "../globals.css"

// TODO: временно отключено, включить когда фича будет готова к показу
// import { CookieConsentBanner } from "@/features/cookie-consent"

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

  setRequestLocale(locale)

  const messages = await getMessages({ locale })

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${ptSansCaption.variable} ${inter.variable} overscroll-none scroll-smooth`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <div className="flex flex-1 flex-col">{children}</div>
          <Toaster />
          <AuthModals />
          {/* <CookieConsentBanner /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
