import { getTranslations } from "next-intl/server"

import { Container, SectionTitle } from "@/shared/ui/widgets"

import { IndustryChip } from "./IndustryChip"

export async function CustomerIndustriesSection() {
  const t = await getTranslations("main")

  return (
    <Container className="items-center">
      {/* <Typography variant="h4" color="slate" className="mb-10 tracking-widest">
        {t("customersTitle")}
      </Typography> */}
      <SectionTitle>{t("customersTitle")}</SectionTitle>

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
