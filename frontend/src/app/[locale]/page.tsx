import { getTranslations, setRequestLocale } from "next-intl/server"
import Image from "next/image"

import { AboutSection } from "@/widgets/about"
import { AchievementsSection } from "@/widgets/achievements"
import { CasesSection } from "@/widgets/cases"
import { ConsultationForm } from "@/widgets/consultation-form"
import { ContactsSection } from "@/widgets/contacts"
import { CustomerIndustriesSection } from "@/widgets/customer-industries"
import { DirectionsSection } from "@/widgets/directions"
import { LibrarySection } from "@/widgets/library"
import { ServicesSection } from "@/widgets/services"
import { AppRoutes } from "@/shared/config"
import { Link, LOCALE } from "@/shared/i18n"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("main")

  return (
    <main>
      <Container className="sm:items-center">
        <div className="flex flex-col sm:max-w-130 lg:w-250 lg:max-w-250">
          <div className="flex flex-col-reverse items-center sm:flex-row sm:items-start sm:justify-end">
            <div
              className={cn(
                "mt-6 mr-0 text-center sm:mt-0 sm:-mr-8 sm:w-88 sm:text-left lg:w-107 lg:min-w-109",
                locale === LOCALE.EN && "lg:-mr-23"
              )}
            >
              <Typography variant="h1" as="h1" className="inline">
                <Typography
                  as="span"
                  variant="h2"
                  color="burgundy"
                  className="text-[47px] leading-none tracking-[0.02em] sm:text-[47px] lg:text-[85px]"
                >
                  {t("namePart1")}
                </Typography>
                <Typography
                  as="span"
                  variant="h2"
                  color="cream"
                  className="text-burgundy sm:text-cream relative text-[47px] sm:text-[47px] lg:text-[85px]"
                >
                  {t("namePart2")}
                </Typography>
              </Typography>

              <Typography
                as="p"
                variant="h1"
                className="text-[24px] tracking-tight sm:text-[24px] lg:text-[42px]"
              >
                {t("subtitle")}
              </Typography>

              <Typography
                as="span"
                variant="h1"
                color="burgundy"
                className="-ml-1.5 text-[67px] leading-none tracking-tight sm:text-[67px] lg:text-[122px]"
              >
                {t("surname")}
              </Typography>
            </div>

            <Image
              src="/images/portrait.avif"
              alt={t("alt")}
              width={1512}
              height={1734}
              priority
              sizes="(min-width: 1024px) 548px, (min-width: 640px) 420px, 100vw"
              className="-mx-4 -mt-12 h-auto w-[calc(100%+2rem)] max-w-none sm:mx-0 sm:w-105 lg:w-137"
            />
          </div>
          <Typography
            as="p"
            variant="bodyLg"
            className="mt-6 text-justify sm:ml-auto sm:w-105 lg:w-137"
          >
            {t("description")}
          </Typography>

          <Button size="xl" asChild className="mt-16 w-full sm:ml-auto sm:hidden sm:w-auto">
            <Link href={AppRoutes.BOOK}> {t("cta")}</Link>
          </Button>
        </div>
      </Container>

      <AchievementsSection />

      <DirectionsSection />

      <CustomerIndustriesSection />

      <ConsultationForm />

      <AboutSection />

      <ServicesSection />

      <CasesSection />

      <LibrarySection />

      <ContactsSection />
    </main>
  )
}
