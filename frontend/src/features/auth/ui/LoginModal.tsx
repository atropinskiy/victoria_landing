"use client"

import type { SyntheticEvent } from "react"

import { useTranslations } from "next-intl"
import { Suspense } from "react"
import { toast } from "sonner"

import { ModalIds } from "@/shared/config"
import { useModalParam } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Modal } from "@/shared/ui/widgets"

export function LoginModal() {
  return (
    <Suspense fallback={null}>
      <LoginModalContent />
    </Suspense>
  )
}

function LoginModalContent() {
  const t = useTranslations("auth")
  const { isOpen, close } = useModalParam(ModalIds.LOGIN)

  const handleLogin = (e: SyntheticEvent) => {
    e.preventDefault()
    toast.promise(
      () =>
        new Promise<void>((resolve) =>
          setTimeout(() => {
            close()
            resolve()
          }, 2000)
        ),
      {
        loading: t("loading"),
        success: t("successTitle"),
        error: {
          message: t("errorTitle"),
          description: t("errorDescription"),
        },
      }
    )
  }

  return (
    <Modal
      open={isOpen}
      onClose={close}
      title={t("title")}
      footer={
        <Button rounded="default" size="lg" form="login-form" onClick={handleLogin}>
          {t("submit")}
        </Button>
      }
    >
      <form id="login-form" className="flex flex-col gap-4">
        <Input
          variant="light"
          name="name"
          placeholder={t("usernamePlaceholder")}
          aria-label={t("usernamePlaceholder")}
        />
        <Input
          variant="light"
          name="password"
          type="password"
          placeholder={t("passwordPlaceholder")}
          aria-label={t("passwordPlaceholder")}
        />
      </form>
    </Modal>
  )
}
