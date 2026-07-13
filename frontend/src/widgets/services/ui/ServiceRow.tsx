import type { Service } from "@/widgets/services/config/services"
import type { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { Typography } from "@/shared/ui/typography"

import { ServiceStageCard } from "./ServiceStageCard"

type Translator = Awaited<ReturnType<typeof getTranslations>>

interface ServiceRowProps {
  service: Service
  t: Translator
}

export function ServiceRow({ service, t }: ServiceRowProps) {
  const { titleKey, approach, stages, who } = service

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h3" color="burgundy">
        {t(titleKey)}
      </Typography>

      <div className="flex snap-x snap-mandatory flex-row flex-nowrap items-stretch gap-6 overflow-x-auto pb-6">
        {approach && (
          <Card className="w-120 shrink-0 snap-start gap-10" variant="slate" rounded="default">
            {approach.titleKey && <CardHeader>{t(approach.titleKey)}</CardHeader>}
            <CardContent className="flex flex-1 flex-col justify-end">
              <Typography variant="bodySm">{t(approach.textKey)}</Typography>
              {approach.noteKey && (
                <Typography variant="bodySm" className="mt-4">
                  {t(approach.noteKey)}
                </Typography>
              )}
            </CardContent>
          </Card>
        )}

        {stages.map((stage, index) => (
          <ServiceStageCard
            key={stage.titleKey}
            title={t(stage.titleKey)}
            variant={index === 0 ? "primary" : "accent"}
          >
            {stage.itemKeys.map((itemKey) => (
              <Typography key={itemKey} variant="bodySm">
                {t(itemKey)}
              </Typography>
            ))}
          </ServiceStageCard>
        ))}

        {who && (
          <div className="w-60 shrink-0 snap-start self-center">
            <Typography className="font-bold">{t(who.titleKey)}</Typography>
            <Typography variant="bodySm" className="mt-2">
              {t(who.textKey)}
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}
