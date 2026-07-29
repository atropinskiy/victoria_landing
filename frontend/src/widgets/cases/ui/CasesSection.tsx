import { getTranslations } from "next-intl/server"
import Image from "next/image"

import { CASES } from "@/widgets/cases/config/cases"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel"
import { Typography } from "@/shared/ui/typography"
import { Container, SectionTitle } from "@/shared/ui/widgets"

export async function CasesSection() {
  const t = await getTranslations("main")

  return (
    <Container id="cases" bg="secondary">
      <SectionTitle>{t("casesTitle")}</SectionTitle>

      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {CASES.map(({ image, titleKey }) => (
            <CarouselItem key={titleKey} className="sm:basis-1/2 lg:basis-1/3">
              <figure className="flex flex-col items-center gap-4">
                <Image
                  src={image}
                  alt={t(titleKey)}
                  width={480}
                  quality={85}
                  height={640}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-3/4 w-full rounded-xl object-cover"
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
          color="bg-default/20 sm:bg-default/80"
        />
        <CarouselNext
          className="-right-2 size-10 sm:-right-4 sm:size-12 lg:-right-8 lg:size-16"
          size="icon"
          color="bg-default/20 sm:bg-default/80"
        />
      </Carousel>
    </Container>
  )
}
