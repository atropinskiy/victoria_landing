import * as React from "react"

import { cn } from "@/shared/lib/utils"
import { Typography } from "@/shared/ui/typography"

function SectionTitle({ className, ...props }: React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      as="h1"
      variant="h1"
      color="burgundy"
      className={cn("self-center sm:self-start", className)}
      {...props}
    />
  )
}

export { SectionTitle }
