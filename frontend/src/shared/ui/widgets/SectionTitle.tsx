import * as React from "react"

import { cn } from "@/shared/lib/utils"
import { Typography } from "@/shared/ui/typography"

function SectionTitle({ className, ...props }: React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      as="h1"
      variant="h1"
      color="burgundy"
      className={cn(
        "mb-10 self-center text-center text-shadow-sm sm:self-start sm:text-left",
        className
      )}
      {...props}
    />
  )
}

export { SectionTitle }
