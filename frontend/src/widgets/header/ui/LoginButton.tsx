"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"

import { LoginModal } from "@/features/auth"
import { Button } from "@/shared/ui/button"

export function LoginButton() {
  const t = useTranslations("auth")
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.currentTarget.blur()
          setOpen(true)
        }}
        aria-label={t("loginButton")}
        className="bg-background h-9"
      >
        {t("loginButton")}
      </Button>

      <LoginModal open={open} onClose={setOpen} />
    </>
  )
}
