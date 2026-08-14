import { Skeleton } from "@/shared/ui/skeleton"

export function ContactsFormSkeleton() {
  return (
    <div className="flex flex-col gap-5 bg-white p-5">
      <div className="flex flex-1 flex-col gap-1 md:flex-row md:gap-6">
        <div className="flex-1">
          <Skeleton className="bg-navy/10 h-5 w-16 rounded-sm" />
          <Skeleton className="bg-navy/10 mt-2 h-9 w-full rounded-sm" />
        </div>
        <div className="flex-1">
          <Skeleton color="stale bg-navy/10" className="h-5 w-20 rounded-sm" />
          <Skeleton className="bg-navy/10 mt-2.5 h-9 w-full rounded-sm" />
        </div>
      </div>

      <div>
        <Skeleton className="bg-navy/10 h-5 w-20 rounded-sm" />
        <div className="mt-2.5 flex flex-col gap-1 md:flex-row md:gap-6">
          <Skeleton className="bg-navy/10 h-9 w-full rounded-sm" />
          <Skeleton className="bg-navy/10 h-9 w-full rounded-sm" />
        </div>
      </div>

      <div>
        <Skeleton className="bg-navy/10 h-5 w-32 rounded-sm" />
        <div className="mt-2.5 flex flex-col gap-1 md:flex-row md:gap-6">
          <Skeleton className="bg-navy/10 h-9 w-full rounded-sm" />
          <Skeleton className="bg-navy/10 h-9 w-full rounded-sm" />
        </div>
      </div>

      <div>
        <Skeleton className="bg-navy/10 h-5 w-24 rounded-sm" />
        <Skeleton className="bg-navy/10 mt-2 h-9 w-full rounded-sm" />
      </div>

      <Skeleton className="bg-burgundy/30 mt-8.5 h-10 w-full rounded-sm" />
    </div>
  )
}
