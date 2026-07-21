"use client"

import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { toast } from "sonner"

import { useMe } from "@/features/auth/api/useAuth"
import { AppRoutes } from "@/shared/config"
import { useRouter } from "@/shared/i18n"

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { data, isPending } = useMe()
  const router = useRouter()
  const t = useTranslations("admin")
  const hasRedirected = useRef(false)

  // TODO: when will the role be added
  // const isAdmin = data?.data.role === "admin"
  const isAdmin = !!data

  useEffect(() => {
    if (isPending || isAdmin || hasRedirected.current) return

    hasRedirected.current = true
    toast.error(t("accessDenied"))
    router.replace(AppRoutes.HOME)
  }, [isPending, isAdmin, router, t])

  if (isPending) return null
  if (!isAdmin) return null

  return children
}

export { AdminGuard }
