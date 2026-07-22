"use client"

import type { LoginFormValues } from "@/features/auth/model/login-schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { Suspense, useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { useLogin } from "@/features/auth"
import { createLoginSchema } from "@/features/auth/model/login-schema"
import { ModalIds } from "@/shared/config"
import { useModalParam } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"
import { DialogFooter } from "@/shared/ui/dialog"
import { FieldGroup, FieldLegend } from "@/shared/ui/field"
import { Typography } from "@/shared/ui/typography"
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
  const { open: openRegistration } = useModalParam(ModalIds.REGISTRATION)

  const loginSchema = useMemo(() => createLoginSchema(t), [t])

  const { mutateAsync: login } = useLogin()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  })

  function onSubmit(data: LoginFormValues) {
    toast.promise(
      () =>
        login(data).then(() => {
          close()
          form.reset()
        }),
      {
        loading: t("loading"),
        success: t("successTitle"),
        error: (error) => ({
          message: t("errorTitle"),
          description: error.message || t("errorDescription"),
        }),
      }
    )
  }

  return (
    <Modal open={isOpen} onClose={close} title={t("title")}>
      <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FieldGroup>
          <FieldLegend className="sr-only">Login / Registration</FieldLegend>
          <FormInput
            name="login"
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

      <DialogFooter className="mt-1 flex-1 flex-col items-center gap-5 sm:flex-col sm:justify-center">
        <Button
          className="self-stretch"
          type="submit"
          rounded="default"
          size="lg"
          form="login-form"
        >
          {t("submit")}
        </Button>

        <Typography variant="bodyXs" className="text-muted-foreground">
          {t("noAccountText")}{" "}
          <Typography
            color="burgundy"
            as="button"
            type="button"
            variant="bodyXs"
            aria-haspopup="dialog"
            className="cursor-pointer underline"
            onClick={openRegistration}
          >
            {t("registerLink")}
          </Typography>
        </Typography>
      </DialogFooter>
    </Modal>
  )
}
