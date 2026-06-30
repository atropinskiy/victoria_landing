// import { getTranslations } from "next-intl/server"
import Image from "next/image"

import { Button } from "@/components/ui/Button"
import { Typography } from "@/components/ui/Typography"

export default async function HomePage() {
  // const t = await getTranslations("main")

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex">
        <div>
          <Typography variant="h2" color="burgundy">
            Виктория
          </Typography>
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
          className="-mt-8"
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
