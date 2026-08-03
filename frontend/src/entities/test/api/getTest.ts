import { client } from "@/shared/api"

export async function getTest() {
  const { data, error } = await client.GET("/tests", {
    cache: "force-cache",
  })
  if (error) throw error
  return data?.data ?? null
}
