"use client"

import { useTranslations } from "next-intl"
import { Suspense } from "react"
import { toast } from "sonner"

import { useLogout } from "@/features/auth"
import { useMe } from "@/entities/user"
import { ModalIds } from "@/shared/config"
import { getAuthToken } from "@/shared/lib/auth"
import { useHasMounted, useModalParam } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button"
import { Skeleton } from "@/shared/ui/skeleton"

export function LoginButton() {
  return (
    <Suspense fallback={<LoginButtonSkeleton />}>
      <LoginButtonContent />
    </Suspense>
  )
}

function LoginButtonSkeleton() {
  return (
    <Button variant="burgundy" size="sm" className="h-9 w-18" aria-hidden="true">
      <Skeleton className="h-4 w-11 rounded-md" />
    </Button>
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

  if (!hasMounted) return <LoginButtonSkeleton />

  return (
    <Button
      variant="burgundy"
      size="sm"
      disabled={isPending || isLoading}
      onClick={handleClick}
      aria-label={label}
      className="h-9 w-18"
    >
      {label}
    </Button>
  )
}
