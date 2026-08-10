import { USER_ROLE_COOKIE } from "@/shared/config"

export function getUserRole(): string | null {
  if (typeof document === "undefined") return null

  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${USER_ROLE_COOKIE}=([^;]*)`))

  return match ? decodeURIComponent(match[1]) : null
}

export function clearUserRole(): void {
  if (typeof document === "undefined") return

  document.cookie = `${USER_ROLE_COOKIE}=; path=/; max-age=0`
}
