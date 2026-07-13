import { getTranslations } from "next-intl/server"

import { Container, SectionTitle } from "@/shared/ui/widgets"

import { DirectionItem } from "./DirectionItem"

export async function DirectionsSection() {
  const t = await getTranslations("main")

  return (
    <Container>
      <SectionTitle>{t("directionsTitle")}</SectionTitle>

      <ul className="marker:text-primary flex w-full list-disc flex-col gap-8 pl-5 sm:grid sm:list-none sm:grid-cols-2 sm:gap-6 sm:pl-0">
        <DirectionItem>{t("directionsItem1")}</DirectionItem>
        <DirectionItem>{t("directionsItem2")}</DirectionItem>
        <DirectionItem>{t("directionsItem3")}</DirectionItem>
        <DirectionItem>{t("directionsItem4")}</DirectionItem>
        <DirectionItem>{t("directionsItem5")}</DirectionItem>
        <DirectionItem>{t("directionsItem6")}</DirectionItem>
      </ul>
    </Container>
  )
}
