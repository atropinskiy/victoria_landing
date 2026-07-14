import type {
  AuthResponse,
  GeneralResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/features/auth/model/types"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { AUTH_USER_QUERY_KEY } from "@/features/auth/config/queryKeys"
import { api } from "@/shared/api"
import { getAuthToken, removeAuthToken, setAuthToken } from "@/shared/lib/auth"

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterPayload) =>
      api.post<GeneralResponse<AuthResponse>>("/auth/register", data),
    onSuccess: (response) => {
      setAuthToken(response.data.access_token)
      queryClient.setQueryData(AUTH_USER_QUERY_KEY, response.data.user)
    },
  })
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginPayload) =>
      api.post<GeneralResponse<AuthResponse>>("/auth/login", data),
    onSuccess: (response) => {
      setAuthToken(response.data.access_token)
      queryClient.setQueryData(AUTH_USER_QUERY_KEY, response.data.user)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => api.post<GeneralResponse<User>>("/users/logout", undefined),
    onSuccess: () => {
      removeAuthToken()
      queryClient.setQueryData(AUTH_USER_QUERY_KEY, null)
    },
  })
}

export function useMe() {
  return useQuery({
    queryKey: AUTH_USER_QUERY_KEY,
    queryFn: () => api.get<GeneralResponse<User>>("/users/me"),
    enabled: Boolean(getAuthToken()),
    retry: false,
  })
}
