import type { Locale } from "@/shared/i18n"

import { ImageOff } from "lucide-react"
import { getLocale } from "next-intl/server"
import Image from "next/image"

import { getCases } from "@/entities/case"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel"
import { Typography } from "@/shared/ui/typography"

export async function CasesList() {
  const locale = (await getLocale()) as Locale
  const cases = await getCases()

  if (!cases.length) return null

  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {cases.map(({ id, title, image }) => (
          <CarouselItem key={id} className="sm:basis-1/2 lg:basis-1/3">
            <figure className="flex flex-col items-center gap-4">
              {image ? (
                <Image
                  src={image}
                  alt={title[locale]}
                  width={480}
                  quality={90}
                  height={640}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-3/4 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="bg-muted text-slate flex aspect-3/4 w-full items-center justify-center rounded-xl">
                  <ImageOff className="size-8" />
                </div>
              )}
              <Typography as="figcaption" variant="bodyLg" className="text-center">
                {title[locale]}
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
