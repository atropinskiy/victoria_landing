import { getTranslations } from "next-intl/server"

import { FOOTER_DOCUMENT_LINKS } from "@/widgets/footer/config/links"
import { Link } from "@/shared/i18n"
import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

export async function Footer() {
  const t = await getTranslations("footer")

  return (
    <footer className="bg-default">
      <Container className="pb-6">
        <Typography className="text-center text-sm sm:text-sm">{t("disclaimer")}</Typography>

        <div className="flex flex-col items-center">
          {FOOTER_DOCUMENT_LINKS.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline"
            >
              {t(key)}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  )
}
