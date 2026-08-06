import { useQuery } from "@tanstack/react-query"

import { client } from "@/shared/api"
import { QueryKeys } from "@/shared/config"

export function useMe() {
  return useQuery({
    queryKey: [QueryKeys.USER],
    queryFn: async () => {
      const { data, error } = await client.GET("/users/me")
      if (error) throw error
      return data.data ?? null
    },
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
