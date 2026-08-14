import type { Locale } from "@/shared/i18n"

import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"

import { getContacts } from "@/entities/contact"
import { Typography } from "@/shared/ui/typography"
import { IconBadge } from "@/shared/ui/widgets"

export async function ContactsContent() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations("main")
  const contacts = await getContacts()

  if (!contacts) return null

  return (
    <ul className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-10">
      {contacts.email && (
        <li>
          <a
            href={`mailto:${contacts.email}`}
            target="_blank"
            aria-label={`${t("contactEmailLabel")}: ${contacts.email}`}
            className="inline-flex items-start gap-4"
          >
            <IconBadge active>
              <Mail />
            </IconBadge>
            <span className="flex flex-col gap-0.5">
              <Typography
                as="span"
                variant="hint"
                className="text-slate font-bold tracking-wide uppercase"
              >
                {t("contactEmailLabel")}
              </Typography>
              <Typography as="span" color="burgundy">
                {contacts.email}
              </Typography>
            </span>
          </a>
        </li>
      )}
      {contacts.phone && (
        <li>
          <a
            href={`tel:${contacts.phone}`}
            aria-label={`${t("contactPhoneLabel")}: ${contacts.phone}`}
            className="inline-flex items-start gap-4"
          >
            <IconBadge active>
              <Phone />
            </IconBadge>
            <span className="flex flex-col gap-0.5">
              <Typography
                as="span"
                variant="hint"
                className="text-slate font-bold tracking-wide uppercase"
              >
                {t("contactPhoneLabel")}
              </Typography>
              <Typography as="span" color="burgundy">
                {contacts.phone}
              </Typography>
            </span>
          </a>
        </li>
      )}
      {contacts.address &&
        (contacts.map_url ? (
          <li>
            <a
              href={contacts.map_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("contactAddressLabel")}: ${contacts.address[locale]}`}
              className="inline-flex items-start gap-4"
            >
              <IconBadge active>
                <MapPin />
              </IconBadge>
              <span className="flex flex-col gap-0.5">
                <Typography
                  as="span"
                  variant="hint"
                  className="text-slate font-bold tracking-wide uppercase"
                >
                  {t("contactAddressLabel")}
                </Typography>
                <Typography as="span" color="burgundy">
                  {contacts.address[locale]}
                </Typography>
              </span>
            </a>
          </li>
        ) : (
          <li className="flex items-start gap-4">
            <IconBadge active={false}>
              <MapPin />
            </IconBadge>
            <span className="flex flex-col gap-0.5">
              <Typography
                as="span"
                variant="hint"
                className="text-slate font-bold tracking-wide uppercase"
              >
                {t("contactAddressLabel")}
              </Typography>
              <Typography as="span">{contacts.address[locale]}</Typography>
            </span>
          </li>
        ))}
      {contacts.hours && (
        <li className="flex items-start gap-4">
          <IconBadge active={false}>
            <Clock />
          </IconBadge>
          <span className="flex flex-col gap-0.5">
            <Typography
              as="span"
              variant="hint"
              className="text-slate font-bold tracking-wide uppercase"
            >
              {t("contactHoursLabel")}
            </Typography>
            <Typography as="span">{contacts.hours[locale]}</Typography>
          </span>
        </li>
      )}
    </ul>
  )
}
