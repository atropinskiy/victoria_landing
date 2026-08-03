import { useQuery } from "@tanstack/react-query"

import { USER_QUERY_KEY } from "@/entities/user/config/queryKeys"
import { client } from "@/shared/api"

export function useMe() {
  return useQuery({
    queryKey: USER_QUERY_KEY,
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
