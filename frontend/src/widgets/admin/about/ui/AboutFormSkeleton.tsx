import { Skeleton } from "@/shared/ui/skeleton"

export function AboutFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Skeleton className="h-6 w-24 rounded-sm" />
        <div className="mt-1.5 flex flex-col gap-1 sm:flex-row sm:gap-5">
          <Skeleton className="h-51 w-full rounded-[3px]" />
          <Skeleton className="h-51 w-full rounded-[3px]" />
        </div>
      </div>
      <div>
        <Skeleton className="h-6 w-24 rounded-sm" />
        <div className="mt-1.5 flex flex-col gap-1 sm:flex-row sm:gap-6">
          <Skeleton className="h-69.25 w-full rounded-[3px]" />
          <Skeleton className="h-69.25 w-full rounded-[3px]" />
        </div>
      </div>
      <Skeleton className="h-10 w-full rounded-sm" />
    </div>
  )
}
