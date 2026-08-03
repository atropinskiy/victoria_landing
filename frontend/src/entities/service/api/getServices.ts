import { client } from "@/shared/api"
import { QueryKeys } from "@/shared/config"

export async function getServices() {
  const { data, error } = await client.GET("/services", {
    cache: "force-cache",
    next: { tags: [QueryKeys.SERVICES] },
  })
  if (error) throw error
  return data.data ?? []
}
