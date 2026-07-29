"use client"

import type { ModalId } from "@/shared/config"

import { useSearchParams } from "next/navigation"

import { MODAL_PARAM } from "@/shared/config"
import { usePathname, useRouter } from "@/shared/i18n"

export function useModalParam(id: ModalId) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isOpen = searchParams.get(MODAL_PARAM) === id

  // params - readonly, cloneParams - changeable copy
  const cloneParams = () => new URLSearchParams(searchParams)

  const open = () => {
    const params = cloneParams()
    params.set(MODAL_PARAM, id)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const close = () => {
    const params = cloneParams()
    params.delete(MODAL_PARAM)
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  return { isOpen, open, close }
}
