"use client"

import { useExamplePosts } from "@/hooks/useExample"

export function PostList() {
  const { data, isLoading, error } = useExamplePosts()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <ul>
      {data?.slice(0, 5).map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
