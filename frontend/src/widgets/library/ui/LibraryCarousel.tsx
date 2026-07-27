"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

import { LIBRARY_ITEMS } from "@/widgets/library/config/library"
import { useMe } from "@/features/auth"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel"
import { Typography } from "@/shared/ui/typography"

export function LibraryCarousel() {
  const t = useTranslations("main")
  const { data: user } = useMe()

  const isAuth = Boolean(user)
  const items = isAuth ? LIBRARY_ITEMS : LIBRARY_ITEMS.slice(0, 1)

  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent className={isAuth ? "justify-between" : "justify-center"}>
        {items.map(({ image, titleKey }, index) => (
          <CarouselItem key={titleKey} className="sm:basis-1/2 lg:basis-1/3">
            <figure className="flex flex-col items-center gap-4">
              <Image
                src={image}
                alt={t(titleKey)}
                width={480}
                height={640}
                quality={80}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-3/4 w-full rounded-xl object-cover"
                loading={index === 0 ? "eager" : "lazy"}
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
  )
}
