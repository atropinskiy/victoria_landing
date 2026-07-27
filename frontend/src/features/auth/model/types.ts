import type { components } from "@/shared/api"

export type User = components["schemas"]["UserRead"]
export type RegisterPayload = components["schemas"]["UserCreate"]
export type LoginPayload = components["schemas"]["UserLogin"]
export type AuthResponse = components["schemas"]["TokenRead"]
