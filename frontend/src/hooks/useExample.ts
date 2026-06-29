import type { Post } from "@/types/ExamplePosts"

import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/api"

export function useExamplePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => api.get<Post[]>("/posts"),
    staleTime: 5 * 60 * 1000,
  })
}
