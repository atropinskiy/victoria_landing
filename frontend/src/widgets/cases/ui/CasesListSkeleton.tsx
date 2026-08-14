import { Skeleton } from "@/shared/ui/skeleton"

export function CasesListSkeleton() {
  return (
    <div className="flex gap-8 overflow-hidden">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex w-full flex-col items-center gap-4 sm:w-1/2 lg:w-1/3">
          <Skeleton className="bg-slate/20 aspect-3/4 w-full rounded-2xl" />
          <Skeleton className="bg-slate/20 h-7.5 w-40 rounded-full" />
        </div>
      ))}
    </div>
  )
}
