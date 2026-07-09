"use client"

import type { SyntheticEvent } from "react"

import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Modal } from "@/shared/ui/widgets"

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const t = useTranslations("auth")

  const handleLogin = (e: SyntheticEvent) => {
    e.preventDefault()
    toast.promise(
      () =>
        new Promise<void>((resolve) =>
          setTimeout(() => {
            onClose()
            resolve()
          }, 2000)
        ),
      {
        loading: t("loading"),
        position: "top-center",
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
      open={open}
      onClose={onClose}
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
