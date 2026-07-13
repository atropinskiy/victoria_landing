import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { Typography } from "@/shared/ui/typography"
import { Container, SectionTitle } from "@/shared/ui/widgets"

import { ServiceStageCard } from "./ServiceStageCard"

export async function ServicesSection() {
  const t = await getTranslations("main")

  return (
    <Container id="services">
      <SectionTitle>{t("servicesTitle")}</SectionTitle>

      <Typography variant="h3" color="burgundy">
        {t("servicePartnershipTitle")}
      </Typography>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:flex-nowrap sm:items-stretch sm:overflow-x-auto sm:pb-4">
        <Card className="gap-10 sm:w-120 sm:shrink-0" variant="slate" rounded="default">
          <CardHeader>{t("servicePartnershipApproachTitle")}</CardHeader>
          <CardContent>
            <Typography variant="bodySm">{t("servicePartnershipApproachText")}</Typography>
          </CardContent>
        </Card>

        <ServiceStageCard title={t("servicePartnershipStage1Title")} variant="primary">
          <Typography variant="bodySm">{t("servicePartnershipStage1Item1")}</Typography>
          <Typography variant="bodySm">{t("servicePartnershipStage1Item2")}</Typography>
        </ServiceStageCard>

        <ServiceStageCard title={t("servicePartnershipStage2Title")}>
          <Typography variant="bodySm">{t("servicePartnershipStage2Item1")}</Typography>
          <Typography variant="bodySm">{t("servicePartnershipStage2Item2")}</Typography>
        </ServiceStageCard>

        <ServiceStageCard title={t("servicePartnershipStage3Title")}>
          <Typography variant="bodySm">{t("servicePartnershipStage3Item1")}</Typography>
          <Typography variant="bodySm">{t("servicePartnershipStage3Item2")}</Typography>
        </ServiceStageCard>

        <div className="sm:w-70 sm:shrink-0">
          <Typography variant="bodySm" className="font-bold">
            {t("servicePartnershipWhoTitle")}
          </Typography>
          <Typography variant="bodySm" className="mt-2">
            {t("servicePartnershipWhoText")}
          </Typography>
        </div>
      </div>
    </Container>
  )
}
