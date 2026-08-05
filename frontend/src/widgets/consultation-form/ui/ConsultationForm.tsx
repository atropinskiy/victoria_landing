"use client"

import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_KEY } from "@/shared/config"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Checkbox } from "@/shared/ui/checkbox"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

export function ConsultationForm() {
  const t = useTranslations("consultationForm")
  const [visible, setVisible] = useState(false)
  const [hasCookieBanner, setHasCookieBanner] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const hasConsent = !!localStorage.getItem(COOKIE_CONSENT_KEY)
    const applyHasCookieBanner = () => setHasCookieBanner(!hasConsent)
    applyHasCookieBanner()

    if (hasConsent) return

    const handleCookieConsentChange = () => {
      setHasCookieBanner(false)
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleCookieConsentChange)
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, handleCookieConsentChange)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleCookieConsentChange)
  }, [])

  return (
    <Container>
      <Card
        id="book"
        variant="accent"
        className={cn(
          "w-full py-4 opacity-0 transition-[opacity,bottom] duration-500 sm:fixed sm:right-6 sm:z-40 sm:mt-0 sm:w-72 sm:max-w-72",
          visible && "opacity-100",
          // hasCookieBanner ? "sm:bottom-22" : "sm:bottom-6"
          "sm:bottom-6"
        )}
      >
        <CardContent className="flex flex-col gap-3.5 px-4">
          <Typography
            as="h6"
            variant="h6"
            color="cream"
            className="text-center font-semibold whitespace-pre-line"
          >
            {t("title")}
          </Typography>

          <form className="flex flex-col gap-3.5">
            <Input
              size="sm"
              name="name"
              placeholder={t("namePlaceholder")}
              aria-label={t("namePlaceholder")}
            />
            <Input
              size="sm"
              type="tel"
              name="phone"
              placeholder={t("phonePlaceholder")}
              aria-label={t("phonePlaceholder")}
            />
            <Input
              size="sm"
              type="email"
              name="email"
              placeholder={t("emailPlaceholder")}
              aria-label={t("emailPlaceholder")}
            />
            <Textarea
              name="message"
              placeholder={t("messagePlaceholder")}
              aria-label={t("messagePlaceholder")}
            />
            <div className="flex items-center gap-2">
              <Checkbox id="consultation-consent" className="border-cream/60" />
              <label htmlFor="consultation-consent" className="text-cream text-justify text-sm">
                {t("consent")}
              </label>
            </div>
            <Button type="button" className="self-end sm:w-auto">
              {t("submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}
