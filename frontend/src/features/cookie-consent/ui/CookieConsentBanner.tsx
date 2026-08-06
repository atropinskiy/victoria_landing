"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"

import { CookieConsentStatuses } from "@/features/cookie-consent/config/cookie-consent-status"
import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_KEY } from "@/shared/config"
import { useHasMounted } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

export function CookieConsentBanner() {
  const hasMounted = useHasMounted()
  const t = useTranslations("cookieConsent")
  const [status, setStatus] = useState(
    typeof window !== "undefined" ? localStorage.getItem(COOKIE_CONSENT_KEY) : null
  )

  const open = hasMounted && !status

  const handleAgree = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, CookieConsentStatuses.ACCEPTED)
    setStatus(CookieConsentStatuses.ACCEPTED)
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))
  }

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, CookieConsentStatuses.DECLINED)
    setStatus(CookieConsentStatuses.DECLINED)
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))
  }

  if (!open) return null

  return (
    <div className="bg-navy fixed bottom-0 z-100 w-full shadow-[0_-14px_32px_-12px_rgba(42,46,58,0.37)]">
      <Container className="items-center justify-between gap-6 py-4 sm:flex-row">
        <Typography color="cream" variant="bodyXs">
          {t("text")}
        </Typography>
        <div className="flex w-full gap-4 sm:w-auto">
          <Button variant="outline" size="sm" onClick={handleDecline} className="flex-1 sm:w-27.5">
            {t("decline")}
          </Button>
          <Button onClick={handleAgree} size="sm" className="flex-1 sm:w-27.5">
            {t("accept")}
          </Button>
        </div>
      </Container>
    </div>
  )
}
