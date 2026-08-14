import { client } from "@/shared/api"
import { QueryKeys } from "@/shared/config"

export async function getLibrary() {
  try {
    const { data, error } = await client.GET("/library", {
      baseUrl: process.env.INTERNAL_API_URL || "http://backend:8000",
      cache: "force-cache",
      next: { tags: [QueryKeys.LIBRARY] },
    })
    if (error) throw error
    return data.data ?? []
  } catch {
    return []
  }
}
