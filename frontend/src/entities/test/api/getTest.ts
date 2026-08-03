import { client } from "@/shared/api"

export async function getTest() {
  const { data, error, response } = await client.GET("/tests", {
    baseUrl: process.env.INTERNAL_API_URL || "http://backend:8000",
    cache: "force-cache",
  })
  if (error) {
    if (response.status === 404) return null
    throw error
  }
  return data?.data ?? null
}
