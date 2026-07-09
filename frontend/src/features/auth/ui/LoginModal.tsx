"use client"

import { useTranslations } from "next-intl"

import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Modal } from "@/shared/ui/widgets"

interface LoginModalProps {
  open: boolean
  onClose: (open: boolean) => void
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const t = useTranslations("auth")

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t("title")}
      footer={
        <Button type="submit" rounded="default" size="lg" form="login-form">
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
