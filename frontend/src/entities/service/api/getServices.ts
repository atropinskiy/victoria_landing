import { SERVICES_QUERY_KEY } from "@/entities/service/config/queryKeys"
import { client } from "@/shared/api"

export async function getServices() {
  const { data, error } = await client.GET("/services", {
    cache: "force-cache",
    next: { tags: SERVICES_QUERY_KEY },
  })
  if (error) throw error
  return data.data ?? []
}
