import type { components } from "@/shared/api"

export type User = components["schemas"]["UserRead"]

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]
