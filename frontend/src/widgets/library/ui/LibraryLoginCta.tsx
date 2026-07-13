"use client"

import { useTranslations } from "next-intl"
import { Suspense } from "react"

import { ModalIds } from "@/shared/config"
import { useModalParam } from "@/shared/lib/hooks"
import { Typography } from "@/shared/ui/typography"

export function LibraryLoginCta() {
  return (
    <Suspense fallback={null}>
      <LibraryLoginCtaContent />
    </Suspense>
  )
}

function LibraryLoginCtaContent() {
  const t = useTranslations("main")
  const { open } = useModalParam(ModalIds.LOGIN)

  return (
    <Typography color="burgundy" className="mt-14 font-bold">
      {t("libraryCtaText")}{" "}
      <Typography
        as="button"
        type="button"
        color="burgundy"
        aria-haspopup="dialog"
        className="cursor-pointer underline"
        onClick={open}
      >
        {t("libraryCtaLink")}
      </Typography>
    </Typography>
  )
}
