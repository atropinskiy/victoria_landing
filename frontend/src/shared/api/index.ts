import { BASE_URL } from "@/shared/config"
import { getAuthToken, removeAuthToken } from "@/shared/lib/auth"

interface ApiErrorResponse {
  success: false
  message: string
  data: null
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getAuthToken()

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    if (response.status === 401) {
      removeAuthToken()
      // TODO: What should we do if there is an authorization error?
    }

    const body = (await response.json().catch(() => null)) as ApiErrorResponse | null
    throw new ApiError(body?.message ?? "", response.status)
  }

  return response.json() as Promise<T>
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { method: "GET", ...options }),

  post: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(body), ...options }),

  put: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    request<T>(endpoint, { method: "PUT", body: JSON.stringify(body), ...options }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { method: "DELETE", ...options }),
}
