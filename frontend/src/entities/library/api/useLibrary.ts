import type {
  LibraryBody,
  LibraryItem,
  LibraryOrderItem,
  LibraryPayload,
} from "@/entities/library/model/types"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { revalidateLibrary } from "@/entities/library/api/actions"
import { client } from "@/shared/api"
import { QueryKeys } from "@/shared/config"

function toFormData({ title, description, image, document }: LibraryPayload) {
  const fields: Record<keyof LibraryBody, string | File | undefined> = {
    title_ru: title.ru,
    title_en: title.en,
    description_ru: description?.ru,
    description_en: description?.en,
    image,
    document,
  }

  const formData = new FormData()

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) formData.append(key, value)
  }

  return formData
}

export function useLibraryCreate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: LibraryPayload) => {
      const { data, error } = await client.POST("/library", {
        body: payload as unknown as LibraryBody,
        bodySerializer: () => toFormData(payload),
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LIBRARY] })
      revalidateLibrary()
    },
  })
}

export function useLibraryUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ item_id, payload }: { item_id: number; payload: LibraryPayload }) => {
      const { data, error } = await client.PATCH("/library/{item_id}", {
        body: payload as unknown as LibraryBody,
        bodySerializer: () => toFormData(payload),
        params: { path: { item_id } },
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LIBRARY] })
      revalidateLibrary()
    },
  })
}

export function useLibraryDelete() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (item_id: number) => {
      const { error } = await client.DELETE("/library/{item_id}", {
        params: { path: { item_id } },
      })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LIBRARY] })
      revalidateLibrary()
    },
  })
}

export function useLibraryOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: LibraryOrderItem[]) => {
      const { data, error } = await client.PUT("/library/reorder", { body })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      revalidateLibrary()
    },
    onError: (_error, _items, context) => {
      if (context?.previous) {
        queryClient.setQueryData([QueryKeys.LIBRARY], context.previous)
      }
    },
    onMutate: async (items: LibraryOrderItem[]) => {
      await queryClient.cancelQueries({ queryKey: [QueryKeys.LIBRARY] })
      const previous = queryClient.getQueryData<LibraryItem[]>([QueryKeys.LIBRARY])

      queryClient.setQueryData<LibraryItem[]>([QueryKeys.LIBRARY], (old) => {
        if (!old) return old
        const byId = new Map(old.map((item) => [item.id, item]))
        return items
          .map(({ id }) => byId.get(id))
          .filter((item): item is LibraryItem => Boolean(item))
      })

      return { previous }
    },
  })
}

export function useLibrary() {
  return useQuery({
    queryKey: [QueryKeys.LIBRARY],
    queryFn: async () => {
      const { data, error } = await client.GET("/library")
      if (error) throw error
      return data.data
    },
    staleTime: Infinity,
  })
}
