import { getTranslations } from "next-intl/server"
import Image from "next/image"

import { LIBRARY_ITEMS } from "@/widgets/library/config/library"
import { AppRoutes } from "@/shared/config"
import { Link } from "@/shared/i18n"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel"
import { Typography } from "@/shared/ui/typography"
import { Container, SectionTitle } from "@/shared/ui/widgets"

export async function LibrarySection() {
  const t = await getTranslations("main")

  return (
    <Container id="library">
      <SectionTitle>{t("libraryTitle")}</SectionTitle>

      <Carousel opts={{ loop: true }}>
        <CarouselContent className="justify-center">
          {LIBRARY_ITEMS.map(({ image, titleKey }) => (
            <CarouselItem key={titleKey} className="sm:basis-1/2 lg:basis-1/3">
              <figure className="flex flex-col items-center gap-4">
                <Image
                  src={image}
                  alt={t(titleKey)}
                  width={480}
                  height={640}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-3/4 w-full rounded-2xl object-cover"
                />
                <Typography as="figcaption" variant="bodyLg" className="text-center">
                  {t(titleKey)}
                </Typography>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="-left-2 size-10 sm:-left-4 sm:size-12 lg:-left-8 lg:size-16"
          size="icon"
        />
        <CarouselNext
          className="-right-2 size-10 sm:-right-4 sm:size-12 lg:-right-8 lg:size-16"
          size="icon"
        />
      </Carousel>

      <Typography color="burgundy" className="mt-14 font-bold">
        {t("libraryCtaText")}{" "}
        <Link href={AppRoutes.PROFILE} className="font-bold underline">
          {t("libraryCtaLink")}
        </Link>
      </Typography>
    </Container>
  )
}
