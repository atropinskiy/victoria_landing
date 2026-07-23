import type { LoginPayload, RegisterPayload } from "@/features/auth/model/types"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { AUTH_USER_QUERY_KEY } from "@/features/auth/config/queryKeys"
import { client } from "@/shared/api"
import { removeAuthToken, setAuthToken } from "@/shared/lib/auth"

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: RegisterPayload) => {
      const { data, error } = await client.POST("/auth/register", { body })
      if (error) throw error
      return data
    },
    onSuccess: (response) => {
      if (response.data) {
        setAuthToken(response.data.access_token)
        queryClient.setQueryData(AUTH_USER_QUERY_KEY, response.data)
      }
    },
  })
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: LoginPayload) => {
      const { data, error } = await client.POST("/auth/login", { body })
      if (error) throw error
      return data
    },
    onSuccess: (response) => {
      if (response?.data) {
        setAuthToken(response.data.access_token)
        queryClient.setQueryData(AUTH_USER_QUERY_KEY, response.data)
      }
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await client.POST("/users/logout")
    },
    onSettled: () => {
      removeAuthToken()
      queryClient.setQueryData(AUTH_USER_QUERY_KEY, null)
    },
  })
}

export function useMe() {
  return useQuery({
    queryKey: AUTH_USER_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await client.GET("/users/me")
      if (error) throw error
      return data
    },
    retry: false,
  })
}
