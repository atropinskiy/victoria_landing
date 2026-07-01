// import { getTranslations } from "next-intl/server"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"

export const dynamic = "force-static"

export default async function HomePage() {
  // const t = await getTranslations("main")

  return (
    <div className="mx-auto w-full">
      <div className="flex justify-center">
        <div>
          <div className="-mr-7">
            <Typography variant="h2" as="span" color="burgundy">
              Виктори
            </Typography>
            <Typography variant="h2" as="span" color="cream" className="z-500">
              я
            </Typography>
          </div>
          <Typography variant="h5" className="mt-2">
            юрист медиатор
          </Typography>
          <Typography variant="h1" color="burgundy">
            кезик
          </Typography>
        </div>
        <Image
          src="/images/portrait.avif"
          alt="Виктория Кезик"
          width={504}
          height={578}
          priority
          className="-z-30 -mt-8"
        />
      </div>

      <Typography variant="bodyLg">
        18 лет помогаю оберегать от рисков бизнес, браки, недвижимость - максимально комфортно,
        сохраняя конфиденциальность
      </Typography>
      <Button size="xl">Записаться на консультацию</Button>
    </div>
  )
}
