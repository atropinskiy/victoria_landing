"use server"

import { updateTag } from "next/cache"

import { QueryKeys } from "@/shared/config"

export async function revalidateCases() {
  updateTag(QueryKeys.CASES)
}
