"use client"

import { useTranslations } from "next-intl"
import { Suspense } from "react"

import { useMe } from "@/entities/user"
import { ModalIds } from "@/shared/config"
import { useHasMounted, useModalParam } from "@/shared/lib/hooks"
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
  const hasMounted = useHasMounted()
  const { data: user } = useMe()
  const isAuth = hasMounted && Boolean(user)
  const { open: openLogin } = useModalParam(ModalIds.LOGIN)
  const { open: openRegistration } = useModalParam(ModalIds.REGISTRATION)

  if (isAuth) return null

  return (
    <Typography className={"mt-14 font-bold"}>
      {t("libraryCtaText")}{" "}
      <Typography
        as="button"
        type="button"
        color="burgundy"
        aria-haspopup="dialog"
        className="cursor-pointer"
        onClick={openLogin}
      >
        {t("libraryCtaLoginLink")}
      </Typography>{" "}
      {t("libraryCtaOr")}{" "}
      <Typography
        as="button"
        type="button"
        color="burgundy"
        aria-haspopup="dialog"
        className="cursor-pointer"
        onClick={openRegistration}
      >
        {t("libraryCtaRegisterLink")}
      </Typography>
    </Typography>
  )
}
