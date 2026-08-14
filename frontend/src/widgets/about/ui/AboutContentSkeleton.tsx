import { Skeleton } from "@/shared/ui/skeleton"

const PARAGRAPH_LINES = {
  default: [2, 3, 2, 2, 2],
  full: [4, 4, 5, 2, 10],
} as const

type AboutContentSkeletonVariant = keyof typeof PARAGRAPH_LINES

interface AboutContentSkeletonProps {
  variant?: AboutContentSkeletonVariant
}

export function AboutContentSkeleton({ variant = "default" }: AboutContentSkeletonProps) {
  return (
    <div className="flex w-full flex-col gap-9">
      {PARAGRAPH_LINES[variant].map((lines, i) => (
        <div key={i} className="flex flex-col gap-4">
          {Array.from({ length: lines }).map((_, j) => (
            <Skeleton key={j} className="h-5 w-full rounded-full bg-current/15 last:w-2/3" />
          ))}
        </div>
      ))}
    </div>
  )
}
