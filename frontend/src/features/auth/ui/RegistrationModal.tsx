"use client"

import type { RegistrationFormValues } from "@/features/auth/model/registration-schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { Suspense, useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { useRegister } from "@/features/auth"
import { createRegistrationSchema } from "@/features/auth/model/registration-schema"
import type { ApiError } from "@/shared/api"
import { ModalIds } from "@/shared/config"
import { useModalParam } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"
import { DialogFooter } from "@/shared/ui/dialog"
import { FieldGroup, FieldLegend } from "@/shared/ui/field"
import { Typography } from "@/shared/ui/typography"
import { FormInput, FormPasswordInput, Modal } from "@/shared/ui/widgets"

export function RegistrationModal() {
  return (
    <Suspense fallback={null}>
      <RegistrationModalContent />
    </Suspense>
  )
}

function RegistrationModalContent() {
  const t = useTranslations("auth")
  const { isOpen, close } = useModalParam(ModalIds.REGISTRATION)
  const { open: openLogin } = useModalParam(ModalIds.LOGIN)

  const { mutateAsync: register, isPending } = useRegister()

  const registrationSchema = useMemo(() => createRegistrationSchema(t), [t])

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit({ email, username, password }: RegistrationFormValues) {
    toast.promise(
      () =>
        register({ username, password, email: email || undefined }).then(() => {
          close()
          form.reset()
        }),
      {
        loading: t("registrationLoading"),
        success: t("registrationSuccessTitle"),
        error: (error: ApiError) => ({
          message: t("registrationErrorTitle"),
          description: error.message || t("registrationErrorDescription"),
        }),
      }
    )
  }

  return (
    <Modal open={isOpen} onClose={close} title={t("registrationTitle")}>
      <form
        id="registration-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FieldGroup>
          <FieldLegend className="sr-only">Login / Registration</FieldLegend>
          <FormInput
            name="username"
            control={form.control}
            variant="light"
            autoComplete="username"
            label={t("usernamePlaceholder")}
          />
          <FormInput
            name="email"
            control={form.control}
            variant="light"
            type="email"
            autoComplete="email"
            label={t("emailPlaceholder")}
          />
          <FormPasswordInput
            name="password"
            control={form.control}
            variant="light"
            autoComplete="new-password"
            label={t("passwordPlaceholder")}
            toggleLabel={t("togglePassword")}
          />
          <FormPasswordInput
            name="confirmPassword"
            control={form.control}
            variant="light"
            autoComplete="new-password"
            label={t("confirmPasswordPlaceholder")}
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
          form="registration-form"
          disabled={isPending}
        >
          {t("registerLink")}
        </Button>

        <Typography variant="bodyXs" className="text-muted-foreground text-center">
          {t("hasAccountText")}{" "}
          <Typography
            color="burgundy"
            as="button"
            type="button"
            variant="bodyXs"
            aria-haspopup="dialog"
            className="cursor-pointer underline"
            onClick={openLogin}
          >
            {t("loginButton")}
          </Typography>
        </Typography>
      </DialogFooter>
    </Modal>
  )
}
