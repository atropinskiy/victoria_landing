import type { Case, CaseOrderItem, CasePayload } from "@/entities/case/model/types"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { revalidateCases } from "@/entities/case/api/actions"
import { client } from "@/shared/api"
import { QueryKeys } from "@/shared/config"

function toFormData(body: CasePayload) {
  const formData = new FormData()

  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined && value !== null) formData.append(key, value)
  }

  return formData
}

export function useCaseCreate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: CasePayload) => {
      const { data, error } = await client.POST("/cases", { body, bodySerializer: toFormData })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CASES] })
      revalidateCases()
    },
  })
}

export function useCaseUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ case_id, body }: { case_id: number; body: CasePayload }) => {
      const { data, error } = await client.PATCH("/cases/{case_id}", {
        body,
        bodySerializer: toFormData,
        params: { path: { case_id } },
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CASES] })
      revalidateCases()
    },
  })
}

export function useCaseDelete() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (case_id: number) => {
      const { error } = await client.DELETE("/cases/{case_id}", {
        params: { path: { case_id } },
      })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CASES] })
      revalidateCases()
    },
  })
}

export function useCaseOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: CaseOrderItem[]) => {
      const { data, error } = await client.PUT("/cases/reorder", { body })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      revalidateCases()
    },
    onError: (_error, _items, context) => {
      if (context?.previous) {
        queryClient.setQueryData([QueryKeys.CASES], context.previous)
      }
    },
    onMutate: async (items: CaseOrderItem[]) => {
      await queryClient.cancelQueries({ queryKey: [QueryKeys.CASES] })
      const previous = queryClient.getQueryData<Case[]>([QueryKeys.CASES])

      queryClient.setQueryData<Case[]>([QueryKeys.CASES], (old) => {
        if (!old) return old
        const byId = new Map(old.map((item) => [item.id, item]))
        return items.map(({ id }) => byId.get(id)).filter((item): item is Case => Boolean(item))
      })

      return { previous }
    },
  })
}

export function useCases() {
  return useQuery({
    queryKey: [QueryKeys.CASES],
    queryFn: async () => {
      const { data, error } = await client.GET("/cases")
      if (error) throw error
      return data.data
    },
    staleTime: Infinity,
  })
}
