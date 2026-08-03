"use server"

import { updateTag } from "next/cache"

import { SERVICES_QUERY_KEY } from "@/entities/service/config/queryKeys"

export async function revalidateServices() {
  updateTag(SERVICES_QUERY_KEY[0])
}
