import type { JWK } from "jose"

import { compactVerify, importJWK } from "jose"

let keyPromise: ReturnType<typeof importJWK> | null = null
function getPublicKey() {
  keyPromise ??= fetchPublicKey().catch((error) => {
    keyPromise = null
    throw error
  })
  return keyPromise
}

async function fetchPublicKey() {
  const baseUrl = process.env.INTERNAL_API_URL ?? "http://backend:8000"
  const response = await fetch(`${baseUrl}/auth/public-key`)
  if (!response.ok) throw new Error(`public-key request failed: ${response.status}`)

  const { data } = (await response.json()) as { data: JWK }
  return importJWK(data, "ES256")
}

export async function getRoleFromToken(token: string | undefined): Promise<string | null> {
  if (!token) return null

  try {
    const { payload } = await compactVerify(token, await getPublicKey(), {
      algorithms: ["ES256"],
    })
    const data: unknown = JSON.parse(new TextDecoder().decode(payload))
    const role = (data as { role?: unknown }).role

    return typeof role === "string" ? role : null
  } catch {
    return null
  }
}
