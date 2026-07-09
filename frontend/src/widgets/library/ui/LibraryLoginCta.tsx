"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"

import { LoginModal } from "@/features/auth"
import { Typography } from "@/shared/ui/typography"

export function LibraryLoginCta() {
  const t = useTranslations("main")
  const [open, setOpen] = useState(false)

  return (
    <>
      <Typography color="burgundy" className="mt-14 font-bold">
        {t("libraryCtaText")}{" "}
        <button type="button" className="font-bold underline" onClick={() => setOpen(true)}>
          {t("libraryCtaLink")}
        </button>
      </Typography>

      <LoginModal open={open} onClose={setOpen} />
    </>
  )
}
