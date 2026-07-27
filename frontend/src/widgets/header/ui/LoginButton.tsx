"use client"

import { useTranslations } from "next-intl"
import { Suspense } from "react"
import { toast } from "sonner"

import { useLogout, useMe } from "@/features/auth"
import { ModalIds } from "@/shared/config"
import { getAuthToken } from "@/shared/lib/auth"
import { useHasMounted, useModalParam } from "@/shared/lib/hooks"
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

  const hasMounted = useHasMounted()
  const isAuthenticated = hasMounted && Boolean(getAuthToken())
  const { isLoading } = useMe()
  const { mutateAsync: logout, isPending } = useLogout()
  const label = t(isAuthenticated ? "logoutButton" : "loginButton")

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.currentTarget.blur()

    if (isAuthenticated) {
      toast.promise(logout, {
        loading: t("logoutLoading"),
        success: t("logoutSuccessTitle"),
        error: t("logoutErrorTitle"),
      })
    } else {
      open()
    }
  }

  if (!hasMounted) return null

  return (
    <Button
      variant="glass"
      size="sm"
      disabled={isPending || isLoading}
      onClick={handleClick}
      aria-label={label}
      className="h-9"
    >
      {label}
    </Button>
  )
}
