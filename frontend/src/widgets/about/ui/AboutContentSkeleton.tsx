import { Skeleton } from "@/shared/ui/skeleton"

const PARAGRAPH_LINES = [2, 3, 2, 2, 2]

interface AboutContentSkeletonProps {
  lines?: number[]
}

export function AboutContentSkeleton({
  lines: paragraphs = PARAGRAPH_LINES,
}: AboutContentSkeletonProps) {
  return (
    <div className="flex w-full flex-col gap-9">
      {paragraphs.map((lines, i) => (
        <div key={i} className="flex flex-col gap-4">
          {Array.from({ length: lines }).map((_, j) => (
            <Skeleton key={j} className="h-5 w-full rounded-full bg-current/15 last:w-2/3" />
          ))}
        </div>
      ))}
    </div>
  )
}
