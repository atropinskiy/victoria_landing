import type { paths } from "./schema"

import createClient from "openapi-fetch"

import { BASE_URL } from "@/shared/config"
import { getAuthToken, removeAuthToken } from "@/shared/lib/auth"

export const client = createClient<paths>({ baseUrl: BASE_URL })

client.use({
  onRequest({ request }) {
    const token = getAuthToken()
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`)
    }
    return request
  },
  onResponse({ response }) {
    if (response.status === 401) {
      removeAuthToken()
    }
    return response
  },
})
