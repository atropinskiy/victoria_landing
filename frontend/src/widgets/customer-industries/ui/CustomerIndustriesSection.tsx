import { getTranslations } from "next-intl/server"

import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

import { IndustryChip } from "./IndustryChip"

export async function CustomerIndustriesSection() {
  const t = await getTranslations("main")

  return (
    <Container className="items-center gap-6">
      <Typography variant="h4" color="slate" className="tracking-widest">
        {t("customersTitle")}
      </Typography>

      <ul className="flex max-w-200 flex-wrap justify-center gap-4">
        <IndustryChip>{t("customerIndustry1")}</IndustryChip>
        <IndustryChip>{t("customerIndustry2")}</IndustryChip>
        <IndustryChip>{t("customerIndustry3")}</IndustryChip>
        <IndustryChip>{t("customerIndustry4")}</IndustryChip>
        <IndustryChip>{t("customerIndustry5")}</IndustryChip>
        <IndustryChip>{t("customerIndustry6")}</IndustryChip>
        <IndustryChip>{t("customerIndustry7")}</IndustryChip>
      </ul>
    </Container>
  )
}
