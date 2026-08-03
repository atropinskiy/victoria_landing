import { client } from "@/shared/api"
import { QueryKeys } from "@/shared/config"

export async function getServices() {
  const { data, error } = await client.GET("/services", {
    baseUrl: process.env.INTERNAL_API_URL || "http://backend:8000",
    cache: "force-cache",
    next: { tags: [QueryKeys.SERVICES] },
  })
  if (error) throw error
  return data.data ?? []
}
