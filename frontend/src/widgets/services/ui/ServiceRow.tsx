import type { Service } from "@/entities/service"
import type { Locale } from "@/shared/i18n"
import type { getTranslations } from "next-intl/server"

import { useLocale } from "next-intl"

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

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h3" color="burgundy">
        {title[locale]}
      </Typography>

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
