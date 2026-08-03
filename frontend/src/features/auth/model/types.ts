import type { components } from "@/shared/api"

export type RegisterPayload = components["schemas"]["UserCreate"]
export type LoginPayload = components["schemas"]["UserLogin"]
