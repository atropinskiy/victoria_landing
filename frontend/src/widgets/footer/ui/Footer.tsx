import { useTranslations } from "next-intl"

import { FOOTER_DOCUMENT_LINKS } from "@/widgets/footer/config/links"
import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

export function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="bg-default">
      <Container className="pb-6">
        <Typography className="text-center text-sm sm:text-sm">{t("disclaimer")}</Typography>

        <div className="flex flex-col items-center">
          {FOOTER_DOCUMENT_LINKS.map(({ href, key }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline"
            >
              {t(key)}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  )
}
