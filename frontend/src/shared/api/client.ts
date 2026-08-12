import type { paths } from "./schema"

import createClient from "openapi-fetch"

import { BASE_URL } from "@/shared/config"

let refreshPromise: Promise<boolean> | null = null

function refreshSession(): Promise<boolean> {
  refreshPromise ??= client
    .POST("/auth/refresh")
    .then(({ response }) => response.ok)
    .catch(() => false)
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

async function fetchWithRefresh(request: Request): Promise<Response> {
  const retryRequest = request.clone()
  const response = await fetch(request)

  const isSessionExpired = response.status === 401 && !request.url.includes("/auth/")
  if (!isSessionExpired) return response

  return (await refreshSession()) ? fetch(retryRequest) : response
}

export const client = createClient<paths>({
  baseUrl: BASE_URL,
  credentials: "include",
  fetch: fetchWithRefresh,
})
