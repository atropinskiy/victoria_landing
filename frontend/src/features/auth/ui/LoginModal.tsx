"use client"

import type { LoginFormValues } from "@/features/auth/model/schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { Suspense } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { loginSchema } from "@/features/auth/model/schema"
import { ModalIds } from "@/shared/config"
import { useModalParam } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"
import { FieldGroup, FieldLegend } from "@/shared/ui/field"
import { FormInput, FormPasswordInput, Modal } from "@/shared/ui/widgets"

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

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(data: LoginFormValues) {
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
        <Button type="submit" rounded="default" size="lg" form="login-form">
          {t("submit")}
        </Button>
      }
    >
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FieldGroup>
          <FieldLegend className="sr-only">Login / Registration</FieldLegend>
          <FormInput
            name="username"
            control={form.control}
            variant="light"
            autoComplete="username"
            label={t("usernamePlaceholder")}
          />
          <FormPasswordInput
            name="password"
            control={form.control}
            variant="light"
            autoComplete="current-password"
            label={t("passwordPlaceholder")}
            toggleLabel={t("togglePassword")}
          />
        </FieldGroup>
      </form>
    </Modal>
  )
}
