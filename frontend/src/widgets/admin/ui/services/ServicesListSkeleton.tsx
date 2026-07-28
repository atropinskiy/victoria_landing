import { Skeleton } from "@/shared/ui/skeleton"

export function ServicesListSkeleton() {
  return (
    <ul className="overflow-hidden rounded-sm border bg-white">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton
          key={i}
          className="border-border flex h-[48.75px] items-center justify-between gap-3 border-b bg-white px-3 py-1.5 last:border-b-0"
        >
          <Skeleton className="ml-2 h-4.75 max-w-48 flex-1 bg-black/10" />
          <div className="flex shrink-0 gap-2">
            <Skeleton className="bg-navy/10 mx-2 size-5 rounded-sm" />
            <Skeleton className="bg-navy/10 mx-2 size-5 rounded-sm" />
          </div>
        </Skeleton>
      ))}
    </ul>
  )
}
