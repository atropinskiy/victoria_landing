import type { LoginPayload, RegisterPayload } from "@/features/auth/model/types"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/shared/api"
import { QueryKeys } from "@/shared/config"
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
        queryClient.setQueryData([QueryKeys.USER], response.data)
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
        queryClient.setQueryData([QueryKeys.USER], response.data)
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
      queryClient.setQueryData([QueryKeys.USER], null)
    },
  })
}
