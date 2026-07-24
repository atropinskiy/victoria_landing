import type { Service, ServicePayload } from "@/entities/service/model/types"

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

export function useServiceUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    // TODO: вернуть реальный запрос, когда на бэкенде появится PUT /services/{id}
    // mutationFn: async ({ id, body }: { id: number; body: ServicePayload }) => {
    //   //@ts-ignore
    //   const { data, error } = await client.PUT("/services/{id}", { body, params: { id } })
    //   if (error) throw error
    //   return data
    // },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY })
    // },
    mutationFn: async ({ id, body }: { id: number; body: ServicePayload }) => {
      const previous = queryClient.getQueryData<Service[]>(SERVICES_QUERY_KEY)
      const existing = previous?.find((service) => service.id === id)
      return { ...existing, ...body, id } as Service
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<Service[]>(SERVICES_QUERY_KEY, (old) =>
        old?.map((service) => (service.id === updated.id ? updated : service))
      )
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

export function useServiceOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    // TODO: вернуть реальный запрос, когда на бэкенде появится PATCH /services/order
    // mutationFn: async (ids: number[]) => {
    //   const { data, error } = await client.PATCH("/services/order", { body: { ids } })
    //   if (error) throw error
    //   return data
    // },
    mutationFn: async (ids: number[]) => {
      return ids
    },
    onError: (_error, _ids, context) => {
      if (context?.previous) {
        queryClient.setQueryData(SERVICES_QUERY_KEY, context.previous)
      }
    },
    onMutate: async (ids: number[]) => {
      await queryClient.cancelQueries({ queryKey: SERVICES_QUERY_KEY })
      const previous = queryClient.getQueryData<Service[]>(SERVICES_QUERY_KEY)

      queryClient.setQueryData<Service[]>(SERVICES_QUERY_KEY, (old) => {
        if (!old) return old
        const byId = new Map(old.map((service) => [service.id, service]))
        return ids.map((id) => byId.get(id)).filter((s): s is Service => Boolean(s))
      })

      return { previous }
    },
  })
}

export function useServices() {
  return useQuery({
    queryKey: SERVICES_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await client.GET("/services")
      if (error) throw error
      return data.data
    },
    staleTime: Infinity,
  })
}
