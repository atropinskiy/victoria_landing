"use client"

import { AboutFormFields } from "@/widgets/admin/ui/about/AboutFormFields"
import { AboutFormSkeleton } from "@/widgets/admin/ui/about/AboutFormSkeleton"
import { useAbout } from "@/entities/about"

export function AboutForm() {
  const { data } = useAbout()

  if (!data) return <AboutFormSkeleton />

  return <AboutFormFields about={data} />
}
