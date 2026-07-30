import { Skeleton } from "@/shared/ui/skeleton"

import { ServiceDescriptionCard } from "./ServiceDescriptionCard"
import { ServiceStageCard } from "./ServiceStageCard"

const SKELETON_LINE = "h-4 w-full rounded-full bg-current/15 last:w-2/3"

export function ServiceRowSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="bg-burgundy/30 h-8.75 w-full rounded-full sm:w-80" />

      <div className="-mx-3 flex snap-x snap-mandatory scroll-px-3 flex-row flex-nowrap items-stretch gap-6 overflow-x-auto px-3 pb-6">
        <ServiceDescriptionCard
          title={<Skeleton className="my-1 h-6 w-88 rounded-full bg-current/15" />}
        >
          <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className={SKELETON_LINE} />
            ))}
          </div>
        </ServiceDescriptionCard>

        {Array.from({ length: 3 }).map((_, i) => (
          <ServiceStageCard
            key={i}
            variant={i === 0 ? "primary" : "accent"}
            title={<Skeleton className="ml-auto h-6 w-19 rounded-full bg-current/15" />}
          >
            <Skeleton className={SKELETON_LINE} />
            <Skeleton className={`${SKELETON_LINE} mt-2`} />
          </ServiceStageCard>
        ))}
      </div>
    </div>
  )
}
