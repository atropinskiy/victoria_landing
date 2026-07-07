import { getTranslations } from "next-intl/server"

import { AppRoutes } from "@/shared/config"
import { Link } from "@/shared/i18n"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { Container, SectionTitle } from "@/shared/ui/widgets"

export async function AboutSection() {
  const t = await getTranslations("main")

  return (
    <Container id="about" bg="secondary" className="items-center gap-10">
      <SectionTitle>{t("aboutTitle")}</SectionTitle>
      <div className="flex flex-col gap-8 text-justify">
        <Typography variant="body" className="font-bold">
          {t("aboutIntro")}
        </Typography>
        <div>
          <Typography variant="body" className="font-bold">
            {t("aboutEducationTitle")}
          </Typography>
          <Typography variant="body">{t("aboutEducationMgua")}</Typography>
          <Typography variant="body">{t("aboutEducationMgavt")}</Typography>
        </div>
        <Typography variant="body">{t("aboutSince2008")}</Typography>
        <Typography variant="body">{t("aboutLocation")}</Typography>
        <Typography variant="body">{t("aboutClosing")}</Typography>
      </div>
      <Button size="lg" asChild>
        <Link href={AppRoutes.ABOUT_PAGE}>{t("aboutCta")}</Link>
      </Button>
    </Container>
  )
}
