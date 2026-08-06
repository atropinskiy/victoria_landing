import type { AboutPayload } from "@/entities/about/model/types"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { revalidateAbout } from "@/entities/about/api/actions"
import { client } from "@/shared/api"
import { QueryKeys } from "@/shared/config"

export function useAboutUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ body }: { body: AboutPayload }) => {
      const { data, error } = await client.PATCH("/about", { body })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ABOUT] })
      revalidateAbout()
    },
  })
}

export function useAbout() {
  return useQuery({
    queryKey: [QueryKeys.ABOUT],
    queryFn: async () => {
      const { data, error } = await client.GET("/about")
      if (error) throw error
      return data.data
    },
    staleTime: Infinity,
  })
}
