import { getTranslations } from "next-intl/server"

import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from "@/widgets/contacts/config/contacts"
import { Typography } from "@/shared/ui/typography"
import { Container, SectionTitle } from "@/shared/ui/widgets"

export async function ContactsSection() {
  const t = await getTranslations("main")

  return (
    <Container id="contacts" bg="secondary">
      <SectionTitle>{t("contactsTitle")}</SectionTitle>

      <ul className="flex flex-col gap-6">
        <li>
          <Typography as="span" className="font-bold">
            {t("contactEmailLabel")}{" "}
          </Typography>
          <Typography as="a" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </Typography>
        </li>

        <li>
          <Typography as="span" className="font-bold">
            {t("contactPhoneLabel")}{" "}
          </Typography>
          <Typography as="a" href={`tel:${CONTACT_PHONE_HREF}`}>
            {CONTACT_PHONE}
          </Typography>
        </li>

        <li>
          <Typography as="span" className="font-bold">
            {t("contactAddressLabel")}{" "}
          </Typography>
          <Typography
            as="a"
            href={`https://yandex.ru/maps/?text=${encodeURIComponent(CONTACT_ADDRESS)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {CONTACT_ADDRESS}
          </Typography>
        </li>

        <li>
          <Typography as="span" className="font-bold">
            {t("contactHoursLabel")}{" "}
          </Typography>
          <Typography as="span">{t("contactHoursValue")}</Typography>
        </li>
      </ul>
    </Container>
  )
}
