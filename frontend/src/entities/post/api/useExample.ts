import type { Post } from "@/entities/post/model/types"

import { useQuery } from "@tanstack/react-query"

import { api } from "@/shared/api/base"

export function useExamplePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => api.get<Post[]>("/posts"),
    staleTime: 5 * 60 * 1000,
  })
}
