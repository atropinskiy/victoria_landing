import { client } from "@/shared/api"
import { QueryKeys } from "@/shared/config"

export async function getCases() {
  try {
    const { data, error } = await client.GET("/cases", {
      baseUrl: process.env.INTERNAL_API_URL || "http://backend:8000",
      cache: "force-cache",
      next: { tags: [QueryKeys.CASES] },
    })
    if (error) throw error
    return data.data ?? []
  } catch {
    return []
  }
}
