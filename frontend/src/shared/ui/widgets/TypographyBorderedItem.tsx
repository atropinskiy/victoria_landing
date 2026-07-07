import * as React from "react"

import { cn } from "@/shared/lib/utils"
import { Typography } from "@/shared/ui/typography"

function TypographyBorderedItem({ className, ...props }: React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      as="li"
      variant="h4"
      className={cn(
        "border-burgundy w-full border-t-8 pt-2 text-left sm:w-auto sm:basis-[calc(33.333%-1.667rem)] lg:basis-auto",
        className
      )}
      {...props}
    />
  )
}

export { TypographyBorderedItem }
