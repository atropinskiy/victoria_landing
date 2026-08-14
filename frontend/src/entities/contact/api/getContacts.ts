import { client } from "@/shared/api"
import { QueryKeys } from "@/shared/config"

export async function getContacts() {
  try {
    const { data, error } = await client.GET("/contacts", {
      baseUrl: process.env.INTERNAL_API_URL || "http://backend:8000",
      cache: "force-cache",
      next: { tags: [QueryKeys.CONTACTS] },
    })
    if (error) throw error
    return data.data ?? null
  } catch {
    return null
  }
}
