import type { Service } from "@/entities/service"
import type { Locale } from "@/shared/i18n"
import type { getTranslations } from "next-intl/server"

import { ArrowRight } from "lucide-react"
import { useLocale } from "next-intl"

import { AppRoutes } from "@/shared/config"
import { Link } from "@/shared/i18n"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

import { ServiceDescriptionCard } from "./ServiceDescriptionCard"
import { ServiceStageCard } from "./ServiceStageCard"

type Translator = Awaited<ReturnType<typeof getTranslations>>

interface ServiceRowProps {
  service: Service
  t: Translator
}

export function ServiceRow({ service, t }: ServiceRowProps) {
  const { title, description, stages } = service
  const locale = useLocale() as Locale

  const isBusinessPartnerRow =
    title.ru.trim().toLowerCase() === "бизнес-партнёрство" ||
    title.en.trim().toLowerCase() === "business partnership"

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-10">
        <Typography variant="h3" color="burgundy" className="sm:h-9">
          {title[locale]}
        </Typography>
        {isBusinessPartnerRow && (
          <Button
            asChild
            rounded="full"
            size="sm"
            className="h-auto w-full gap-1.5 px-4 py-2 text-center whitespace-normal uppercase sm:h-9 sm:w-auto sm:whitespace-nowrap"
          >
            <Link href={AppRoutes.TEST_PAGE}>
              {t("servicePartnershipTestCta")}
              <ArrowRight className="ml-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="-mx-3 flex snap-x snap-mandatory scroll-px-3 flex-row flex-nowrap items-stretch gap-6 overflow-x-auto px-3 pb-6">
        {description && (
          <ServiceDescriptionCard title={t("approachTitleKey")}>
            <Typography variant="bodySm">{description[locale]}</Typography>
          </ServiceDescriptionCard>
        )}

        {stages.map((stage, index) => (
          <ServiceStageCard
            key={stage.title.ru}
            title={stage.title[locale]}
            variant={index === 0 ? "primary" : "accent"}
          >
            {stage.items.map((stage) => (
              <Typography key={stage.ru} variant="bodySm">
                {stage[locale]}
              </Typography>
            ))}
          </ServiceStageCard>
        ))}
      </div>
    </div>
  )
}
