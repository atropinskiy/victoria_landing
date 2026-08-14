"use client"

import { useAbout } from "@/entities/about"

import { AboutForm } from "./AboutForm"
import { AboutFormSkeleton } from "./AboutFormSkeleton"

export function AboutEdit() {
  const { data } = useAbout()

  if (!data) return <AboutFormSkeleton />

  return <AboutForm about={data} />
}
