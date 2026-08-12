"use client"

import type { LibraryItem } from "@/entities/library"
import type { Locale } from "@/shared/i18n"

import { ImageOff } from "lucide-react"
import { useLocale } from "next-intl"
import Image from "next/image"

import { useMe } from "@/entities/user"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel"
import { Typography } from "@/shared/ui/typography"

interface LibraryCarouselProps {
  items: LibraryItem[]
}

export function LibraryCarousel({ items }: LibraryCarouselProps) {
  const locale = useLocale() as Locale
  const { data: user } = useMe()

  const isAuth = Boolean(user)
  const visibleItems = isAuth ? items : items.slice(0, 1)

  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent className={isAuth ? "justify-between" : "justify-center"}>
        {visibleItems.map(({ id, title, image, document }, index) => {
          const caption = title[locale] ?? ""

          const figure = (
            <figure className="flex flex-col items-center gap-4">
              {image ? (
                <Image
                  src={image}
                  alt={caption}
                  width={480}
                  height={640}
                  quality={80}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-3/4 w-full rounded-xl object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ) : (
                <div className="bg-muted text-slate flex aspect-3/4 w-full items-center justify-center rounded-xl">
                  <ImageOff className="size-8" />
                </div>
              )}
              <Typography as="figcaption" variant="bodyLg" className="text-center">
                {caption}
              </Typography>
            </figure>
          )

          return (
            <CarouselItem key={id} className="sm:basis-1/2 lg:basis-1/3">
              {document ? (
                <a
                  href={document}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="focus-visible:ring-burgundy/40 block rounded-xl transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none"
                >
                  {figure}
                </a>
              ) : (
                figure
              )}
            </CarouselItem>
          )
        })}
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
