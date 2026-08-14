import { Skeleton } from "@/shared/ui/skeleton"

export function ContactsContentSkeleton() {
  return (
    <div className="flex w-full max-w-120 flex-col gap-6.25 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-12 lg:gap-y-11">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex max-h-11.75 items-start gap-4">
          <Skeleton className="size-9 shrink-0 rounded-md bg-current/15" />
          <div className="flex flex-col gap-1.5 pt-0.5">
            <Skeleton className="h-4 w-30 rounded-full bg-current/15" />
            <Skeleton className="h-6 w-58 rounded-full bg-current/15" />
          </div>
        </div>
      ))}
    </div>
  )
}
