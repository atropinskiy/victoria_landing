"use client"

import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

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

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <Container>
      <Card
        id="book"
        variant="accent"
        className={cn(
          "w-full py-4 opacity-0 transition-opacity duration-500 sm:fixed sm:right-[calc(1.5rem+var(--removed-body-scroll-bar-size,0px))] sm:bottom-6 sm:z-40 sm:mt-0 sm:w-auto sm:max-w-80",
          visible && "opacity-100"
        )}
      >
        <CardContent className="flex flex-col gap-4 px-4">
          <Typography
            as="h3"
            variant="h4"
            color="cream"
            className="text-center text-[16px] whitespace-pre-line sm:text-[16px]"
          >
            {t("title")}
          </Typography>

          <form className="flex flex-col gap-4">
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
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="consultation-consent" className="border-cream/60" />
                <label htmlFor="consultation-consent" className="text-cream text-xs">
                  {t("consent")}
                </label>
              </div>

              <Button type="button" className="self-end sm:w-auto">
                {t("submit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}
