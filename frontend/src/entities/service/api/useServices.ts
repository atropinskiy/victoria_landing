import type { ServicePayload } from "@/entities/service/model/types"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { SERVICES_QUERY_KEY } from "@/entities/service/config/queryKeys"
import { client } from "@/shared/api"

export function useServiceCreate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: ServicePayload) => {
      const { data, error } = await client.POST("/services", { body })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY })
    },
  })
}

export function useServiceDelete() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (service_id: number) => {
      const { error } = await client.DELETE("/services/{service_id}", {
        params: { path: { service_id } },
      })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY })
    },
  })
}

export function useServices() {
  return useQuery({
    queryKey: SERVICES_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await client.GET("/services")
      if (error) throw error
      return data
    },
  })
}
