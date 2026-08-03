import type { Service, ServiceOrderItem, ServicePayload } from "@/entities/service/model/types"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { revalidateServices } from "@/entities/service/api/actions"
import { client } from "@/shared/api"
import { QueryKeys } from "@/shared/config"

export function useServiceCreate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: ServicePayload) => {
      const { data, error } = await client.POST("/services", { body })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SERVICES] })
      revalidateServices()
    },
  })
}

export function useServiceUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ service_id, body }: { service_id: number; body: ServicePayload }) => {
      const { data, error } = await client.PATCH("/services/{service_id}", {
        body,
        params: { path: { service_id } },
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SERVICES] })
      revalidateServices()
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
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SERVICES] })
      revalidateServices()
    },
  })
}

export function useServiceOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: ServiceOrderItem[]) => {
      const { data, error } = await client.PATCH("/services/reorder", { body })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      revalidateServices()
    },
    onError: (_error, _items, context) => {
      if (context?.previous) {
        queryClient.setQueryData([QueryKeys.SERVICES], context.previous)
      }
    },
    onMutate: async (items: ServiceOrderItem[]) => {
      await queryClient.cancelQueries({ queryKey: [QueryKeys.SERVICES] })
      const previous = queryClient.getQueryData<Service[]>([QueryKeys.SERVICES])

      queryClient.setQueryData<Service[]>([QueryKeys.SERVICES], (old) => {
        if (!old) return old
        const byId = new Map(old.map((service) => [service.id, service]))
        return items.map(({ id }) => byId.get(id)).filter((s): s is Service => Boolean(s))
      })

      return { previous }
    },
  })
}

export function useServices() {
  return useQuery({
    queryKey: [QueryKeys.SERVICES],
    queryFn: async () => {
      const { data, error } = await client.GET("/services")
      if (error) throw error
      return data.data
    },
    staleTime: Infinity,
  })
}
