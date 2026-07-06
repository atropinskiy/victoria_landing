"use client"

import { useTranslations } from "next-intl"

import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Checkbox } from "@/shared/ui/checkbox"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { Typography } from "@/shared/ui/typography"

export function ConsultationForm() {
  const t = useTranslations("consultationForm")

  return (
    <Card variant="accent" className="mt-20 max-w-110 gap-6 self-center sm:self-end">
      <CardContent className="flex flex-col gap-6">
        <Typography as="h3" variant="h5" color="cream" className="text-center">
          {t("title")}
        </Typography>

        <form className="flex flex-col gap-4">
          <Input name="name" placeholder={t("namePlaceholder")} aria-label={t("namePlaceholder")} />
          <Input
            type="tel"
            name="phone"
            placeholder={t("phonePlaceholder")}
            aria-label={t("phonePlaceholder")}
          />
          <Input
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
            <label htmlFor="consultation-consent" className="text-cream text-sm">
              {t("consent")}
            </label>
          </div>

          <Button type="button" size="lg" className="mt-2 self-end sm:w-auto">
            {t("submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
