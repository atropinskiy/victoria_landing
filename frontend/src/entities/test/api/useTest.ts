import type { TestSubmitRequest } from "@/entities/test/model/types"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MOCK_TEST } from "@/entities/test/model/mock"
import { client } from "@/shared/api"
import { QueryKeys } from "@/shared/config"

export function useTest() {
  return useQuery({
    queryKey: [QueryKeys.TEST],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const { data, error } = await client.GET("/tests")
      if (error) throw error
      return data ?? MOCK_TEST
    },
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

export function useTestSubmit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: TestSubmitRequest) => {
      const { data, error } = await client.POST("/tests/submit", { body })
      if (error) throw error
      return data?.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] })
    },
  })
}
