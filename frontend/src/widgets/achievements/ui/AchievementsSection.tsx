import { getTranslations } from "next-intl/server"

import { Container } from "@/shared/ui/widgets"

import { TypographyBorderedItem } from "./TypographyBorderedItem"

export async function AchievementsSection() {
  const t = await getTranslations("main")

  return (
    <Container>
      <ul className="flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:justify-center lg:flex-nowrap lg:justify-start">
        <TypographyBorderedItem>{t("cases")}</TypographyBorderedItem>
        <TypographyBorderedItem>{t("deals")}</TypographyBorderedItem>
        <TypographyBorderedItem className="order-last lg:order-0 lg:max-w-70 lg:min-w-70">
          {t("realty")}
        </TypographyBorderedItem>
        <TypographyBorderedItem>{t("experience")}</TypographyBorderedItem>
        <TypographyBorderedItem>{t("mediation")}</TypographyBorderedItem>
      </ul>
    </Container>
  )
}
