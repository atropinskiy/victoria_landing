"use client"

import { useTranslations } from "next-intl"
import { Suspense } from "react"

import { LoginModal } from "@/features/auth"
import { ModalIds } from "@/shared/config"
import { useModalParam } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"

export function LoginButton() {
  return (
    <Suspense fallback={null}>
      <LoginButtonContent />
    </Suspense>
  )
}

function LoginButtonContent() {
  const t = useTranslations("auth")
  const { open } = useModalParam(ModalIds.LOGIN)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.currentTarget.blur()
          open()
        }}
        aria-label={t("loginButton")}
        className="bg-background h-9"
      >
        {t("loginButton")}
      </Button>
      <LoginModal />
    </>
  )
}
